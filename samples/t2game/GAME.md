Game Engine Design Document
⸻
license: public domain CC0
1. Overview
A 2D game engine written in t2lang (s-expr macros for TypeScript). The architecture prioritises
determinism, replayability, and a clean client/server separation — even when running locally in
the same thread. Everything is a number. Strings never enter the hot path.
⸻
2. Core Philosophy
●​ All entity state lives in flat numeric buffers — no object graphs, no heap allocation per
entity per frame
●​ All entity access goes through flyweight wrapper objects with getter/setter properties
●​ Systems define interfaces, entity types self-register — systems never import entity types
●​ The client/server boundary is enforced architecturally from day one, even in single-player
local mode
●​ Everything that can be a macro should be — boilerplate is generated, not written
⸻
3. Entity Buffers
3.1 Layout
Each entity type has its own dedicated Float64Array buffer. All fields — positions, velocities,
flags, handles, masks — are stored as JS numbers (floats used as ints where needed). No
dual-view, no typed array switching.
Buffer access:
base = (handle & 0xFFFF) * STRIDE
value = buf[base + FIELD_OFFSET]
3.2 Struct Declaration — defentity macro
Fields are declared via the defentity macro in t2lang. The macro auto-calculates stride from field
count and emits all offset constants.
(defentity Ship

(float x y vx vy hp dmg)
(int colMask shotHandle))
Expands to:
const SHIP_STRIDE= 10 // auto-calculated

const SHIP_TYPE=0

// header — auto-prepended

const SHIP_GENERATION = 1

// header — auto-prepended

const SHIP_COL_MASK

// header — auto-prepended

const SHIP_X=3

const SHIP_Y=4

const SHIP_VX=5

const SHIP_VY=6

const SHIP_HP=7

const SHIP_DMG=8

const SHIP_SHOT_HANDLE = 9

3.3 Common Header
Every entity type has the same three fields at the same offsets, auto-prepended by defentity:

Offset

Field

Purpose

0

type

disjoint type bit — one bit per
type

1

generation

stale handle detection

2

colMask

collision reaction mask

This allows collision detection and handle resolution to read any entity's type and generation
without knowing its concrete type.
3.4 Field Setters — Math.fround and | 0
All writes go through macro-generated setter properties on the flyweight wrapper. Float fields
are quantized via Math.fround on write to guarantee cross-platform determinism (defeats FMA
variance). Integer fields are coerced with | 0.
set x(v: number)

{ buf[base + SHIP_X]= Math.fround(v) }

set colMask(v: number) { buf[base + SHIP_COL_MASK] = v | 0 }
Direct buffer writes outside macro-generated setters are forbidden (lint rule).
⸻
4. Entity Handles
Each entity is referenced by a single integer handle:
handle = packHandle(gen, idx)   // (gen << 16) | idx
index  = unpackIdx(handle)       // handle & 0xFFFF
gen    = unpackGen(handle)       // (handle >> 16) & 0x7FFF

●​ 16 bits index — up to 65535 slots per type
●​ 15 bits generation — up to 32767 reuses before wrap; stays positive by construction
●​ JS bitwise ops work on signed 32-bit integers — 15+16 layout keeps bit 31 always 0,
  no negative handle values, no >>> 0 needed
●​ pack/unpack encapsulated in generated helpers: packHandle(gen, idx), unpackGen(h),
  unpackIdx(h) — one auditable place to change the layout
Handle resolution validates generation before returning base offset. Stale handles return null.
⸻
5. Buffer Allocation and Free List
5.1 Chunked / Linked Allocation
Buffers are managed by a ChunkedBuffer helper that presents a flat index API externally
while internally routing through chunked storage. Flyweight getters/setters use plain flat-index
arithmetic (eid * STRIDE + OFFSET); ChunkedBuffer translates that to the real chunk:

// ChunkedBuffer internals (one place to audit or replace):
read(flatIdx):     chunk = chunks[flatIdx >> CHUNK_BITS]
                   return chunk[flatIdx & CHUNK_MASK]
write(flatIdx, v): identical routing

Flyweight callers see only:
buf.read(eid * STRIDE + OFFSET)
buf.write(eid * STRIDE + OFFSET, value)

Each chunk is a Float64Array of CHUNK_SIZE slots. Initial chunk size: 128 * STRIDE per type.
When all chunks are full, a new chunk is allocated. The metrics system records chunk allocation
events to inform future fixed-size tuning.
Later, once metrics provide evidence, defentity accepts an optional :fixed N argument to emit a
single flat buffer instead of chunked — same interface, one less indirection.
5.2 Intrusive FIFO Free List
Dead entity slots store the free list inline — no separate array. Each dead slot's first field holds
the index of the next free slot. Three variables per type:
FREE_HEAD
FREE_TAIL
NEXT_FRESH

— dequeue from here on alloc
— enqueue here on free
— next never-used index

FIFO ordering means a freed slot is not reused until all older free slots are consumed — natural
one-frame deferral, avoids same-frame stale reads on shots without explicit delay logic.
Alloc/free functions are emitted by the defentity macro.
⸻
6. Type System and Collision Masks
6.1 Type Bits
Each entity type is assigned one bit in a Uint32. Bits are disjoint — no two types share a bit.
const TYPE_PLAYER_SHIP = 1 << 0
const TYPE_ENEMY_SHIP = 1 << 1
const TYPE_PLAYER_SHOT = 1 << 2
const TYPE_ENEMY_SHOT = 1 << 3
const TYPE_ASTEROID = 1 << 4

The type header field holds exactly one bit set. Up to 32 entity types per Uint32. The type bit IS
the collision layer — no separate layer field needed.
6.2 Collision Mask
The colMask header field is an OR of type bits the entity reacts to. Declared as a constant per
type, set at spawn, overridable per instance.

const MASK_PLAYER_SHIP = TYPE_ENEMY_SHOT | TYPE_ASTEROID
const MASK_ENEMY_SHIP = TYPE_PLAYER_SHOT | TYPE_ASTEROID
const MASK_PLAYER_SHOT = TYPE_ENEMY_SHIP | TYPE_ASTEROID
const MASK_ENEMY_SHOT = TYPE_PLAYER_SHIP
const MASK_ASTEROID = 0 // asteroid doesn't react, others react to it

6.3 Asymmetric Collision
A collision pair (A, B) generates zero, one, or two hit events independently:
aHitsB = (A.colMask & B.type) !== 0 → call A.onHit(B.handle)
bHitsA = (B.colMask & A.type) !== 0 → call B.onHit(A.handle)
onHit(otherHandle) receives a plain integer. The receiver reads what it needs directly from the
other entity's buffer via the handle. No double dispatch, no visitor pattern, no method calls on
the other entity.
Inside onHit, type discrimination uses the type header field:
const otherType = buf[otherBase + ENTITY_TYPE]
if (otherType & TYPE_PLAYER_SHOT) { /* take damage */ }
if (otherType & TYPE_ASTEROID)

{ /* different reaction */ }

6.4 Collision Broadphase
2D regular bucket grid. Cell size is a tunable constant. Entities are inserted into grid cells each
frame before the narrowphase pair check. Only pairs sharing a cell are checked. Grid fits the
numeric buffer architecture — cell membership is computed from x, y fields directly.
⸻
7. Flyweight Wrappers
One wrapper instance per entity type, allocated once at startup. reset(handle) validates the
generation counter and rebinds the wrapper to the new entity. No allocation per frame.
class BaseEntity {
protected eid = 0
reset(handle: number): this {
  const eid = unpackIdx(handle)
  const gen = unpackGen(handle)
  if (buf.read(eid * STRIDE + ENTITY_GENERATION) !== gen) throw new Error('stale handle')
  this.eid = eid
  return this
}
get type()     { return buf.read(this.eid * STRIDE + ENTITY_TYPE)      }
get colMask()  { return buf.read(this.eid * STRIDE + ENTITY_COL_MASK)  }
set colMask(v) { buf.write(this.eid * STRIDE + ENTITY_COL_MASK, v | 0) }
}
Each concrete type's wrapper extends BaseEntity with type-specific getters/setters, all emitted
by the defentity macro.
⸻
8. Systems
8.1 Registration
Systems define a TypeScript interface. Entity types implement it and self-register at module load
time. Systems never import entity types — the dependency goes one way only.
interface IPhysics {
move(dt: number): void
}
PhysicsSystem.register({
forEach: (fn) => ShipBuffer.forEachLive(fn),
wrapper: shipFlyweight,
})

8.2 Execution Order
Hardcoded in the game loop. Not data-driven. Order is explicit and stable:
1.​ drain input queue
2.​ drain canonical command queue (spawns, destroys)
3.​ AI / player systems
4.​ physics
5.​ collision broadphase + narrowphase
6.​ health / death cleanup
7.​ drain FX command queue
8.​ snapshot → client
9.​ client applies snapshot → render buffers
10.​render
8.3 Collision System Registration
Types register with a role for collision:
CollisionSystem.registerAs('solid',PlayerShip)
CollisionSystem.registerAs('solid',EnemyShip)
CollisionSystem.registerAs('projectile', PlayerShot)
CollisionSystem.registerAs('projectile', EnemyShot)
System cross-checks solid × projectile and solid × solid pairs.
⸻
9. Command System
9.1 defcommand macro
Commands use the same pattern as entities — flat buffer, fixed stride, macro-generated.
Slimmer header: type and frame only. No colMask, no generation (commands don't outlive the
frame).
(defcommand SpawnShip    { canonical: true,  fields: [ownerHandle x y vx vy tag] })
(defcommand DestroyEntity { canonical: true,  fields: [targetHandle] })
(defcommand PlaySound    { canonical: false, fields: [soundId volume pan] })
(defcommand SpawnParticle { canonical: false, fields: [x y vx vy lifetime] })

Macro-time checks: object keys validated against whitelist (canonical, fields, capacity, …).
canonical is required. fields must be non-empty.

9.2 Bump Allocator
Commands use a bump allocator that resets to zero each frame — no free list needed:
alloc: slot = NEXT_FRESH++
drain: iterate 0..NEXT_FRESH, process each
reset: NEXT_FRESH = 0

Overflow policy: throw. If NEXT_FRESH + STRIDE > CAPACITY the push function throws:
  throw new Error('SpawnShip command buffer overflow')
This is always a logic error — size the buffer appropriately. The macro accepts a capacity
field in the options object: { canonical: true, capacity: 512, fields: [...] }.
9.3 Canonical vs FX
:canonical true commands go through the canonical queue, processed server-side, included in
snapshots. :canonical false commands go through the FX queue, processed client-side only,
never snapshotted. Lint rule: no FX command type may be issued from canonical simulation
code.
⸻
10. Client / Server Architecture
10.1 Local Split
Client and server run in the same thread (no Web Workers). The boundary is enforced
architecturally — two separate sets of buffers, two separate update functions, communicating
only through message queues.
inputQueue:

client → server (semantic input commands + frame counter)

snapshotQueue: server → client (serialized full snapshots)
10.2 Full Snapshots
Server sends a full snapshot every frame. No delta compression initially. A snapshot is a
complete serialization of all live entity buffers plus free list state.
Pre-allocated snapshot pool — two Float64Array slots, allocated at startup. Only the slot index
(an integer) passes through the queue. Zero allocation after startup.
10.3 Serialize / Deserialize
Real serialize-to-bytes and deserialize-from-bytes functions, even in local mode. Not a
memcopy shortcut. These are the functions that will run over a real network later — exercised
every frame so they never rot.
Format: binary Uint8Array, schema-driven, generated by macro. No JSON at runtime.
10.4 Input

Inputs are semantic commands — MoveLeft, Fire, Thrust etc. Client handles remapping from
raw DOM events to semantic commands before they enter the queue. Each input command
carries a frame counter. Uses defcommand.
⸻
11. Determinism
11.1 Rules for canonical simulation code
●​
●​
●​
●​

no Math.random() — use canonical PRNG only
no Date.now() or performance.now() — use dt parameter only
no Math.sin, Math.cos etc — use the cross-platform math library only
no expression of the form a + b * c writing to a buffer field — split into two statements
(lint rule)
●​ all float writes go through Math.fround quantized setters
●​ system execution order is fixed
11.2 Two PRNG Instances
Canonical PRNG — xorshift128, 4 integers of state, part of game snapshot. Used only in
simulation code. Seed comes from server. Determines all gameplay-affecting random values:
spawn positions, AI decisions, shot spread.
FX PRNG — separate instance, never snapshotted, client-only. Seed is arbitrary. Used only in
effects code: particle counts, visual variation, sound pitch. Diverging from server is expected
and fine.
Lint rule: fxRand() may not be called inside any canonical system.
11.3 Cross-platform Math Library
A small fixed-point trig library producing identical results on all JS engines. Angles are in
radians, represented as 16.16 fixed point integers.
const PI

= 205887 // Math.round(Math.PI * 65536)

const TWO_PI = 411775
const HALF_PI = 102944
Functions: sin(a), cos(a), atan2(y, x), normalizeAngle(a), angleBetween(a, b).
Implementation: lookup table of 4096 entries precomputed at startup using Math.sin (init only,
never in simulation). Table entries are 16.16 fixed point integers. Angle-to-index conversion is a
multiply by a constant and a bitmask.

XY coordinates remain plain JS floats — +, -, *, / are IEEE 754 mandated and identical
everywhere. Fixed point is only needed for trig.
⸻
12. Schema and Versioning
12.1 Schema Export
defentity emits a named schema constant as a regular export — not a file write, not a
runtime load. No file I/O in macros. External tooling imports the compiled JS to extract schemas.

export const SHIP_SCHEMA = {
  type:    'Ship',
  version: 3,
  stride:  SHIP_STRIDE,
  fields: [
    { name: 'type',       index: 0, intent: 'i32' },
    { name: 'generation', index: 1, intent: 'i32' },
    { name: 'colMask',    index: 2, intent: 'i32' },
    { name: 'x',          index: 3, intent: 'f64' },
    { name: 'y',          index: 4, intent: 'f64' },
    { name: 'hp',         index: 5, intent: 'f64' },
  ],
}

A separate CLI tool (t2game-schema) imports all entity modules and writes the JSON files as a
build step, decoupled from compilation.
12.2 Version Diffing and Migration
Two schema JSON files (one per engine version) are diffed to classify changes:

Change

Classification

Generated action

field added

non-breaking

fill with default value

field removed

non-breaking

drop silently

field reordered

non-breaking

remap by name

field renamed

non-breaking (with hint)

copy from old name

intent changed

potentially breaking

flag for human review

Migration functions are generated by an AI agent given the diff. They live in a versioned
migrations file, one function per version step per type. Save files include schema version per
type in their header. On load, if versions differ, run the migration chain.
12.3 Rename Hints
Optional renamedFrom annotation in the schema to distinguish rename from remove+add:
{ "name": "velX", "index": 5, "intent": "f64", "renamedFrom": "vx" }
⸻
13. Looping Audio — Heartbeat Protocol
Looping sounds use a start/stop + heartbeat model to avoid both per-frame command pressure
and missed-stop bugs.
●​ StartSound(entityHandle, soundId) — emitted once when looping begins
●​ StopSound(entityHandle) — emitted once when looping ends
●​ KeepAlive(entityHandle) — emitted every N frames while looping
Client auto-stops a looping sound if no KeepAlive arrives within N + grace frames. Self-healing
— a missed StopSound recovers automatically.
Heartbeats are staggered across entities to avoid thundering herd:
firstHeartbeat = spawnFrame + (entityIndex % heartbeatInterval)
After the first heartbeat, spacing is fixed so at most liveLoopingSounds / heartbeatInterval
heartbeats fire per frame.
⸻

14. Metrics and Autopsy
14.1 Runtime Metrics
The macro-generated alloc/free functions maintain per-type counters:
●​
●​
●​
●​
●​
●​
●​
●​

peak live count
average live count
alloc rate (peak and average per frame)
free rate
chunk allocation events
peak NEXT_FRESH value
stale handle resolution misses (should always be zero)
command queue depth (peak per frame per type)

Written out as JSON at session end, alongside schema files.
14.2 Autopsy / Demo Mode
Full snapshot recording is available during any session (replay is free given deterministic
simulation). Autopsy mode replays a recorded session with the metrics system active and the
renderer showing internal state — buffer occupancy, live entity counts, collision pair counts per
frame.
14.3 Stress Autopsy
Replay the same session N times with different canonical PRNG seeds. Observe metric
variance. If peak entity count varies significantly across seeds, MAX needs headroom. If it's
stable, tune it tighter.
14.4 AI Agent Autopsy
An AI agent drives autopsy mode programmatically — not just replaying recorded sessions but
generating novel semantic input commands to explore edge cases:
●​ maximise simultaneous live entities of type Shot
●​ maximise collision pairs per frame
●​ find inputs that cause peak command queue depth
The agent operates through the same semantic input command interface as a human player.
The canonical PRNG seed is part of the search space.
14.5 Feedback Loop
play session / autopsy run
→ write metrics JSON

→ diff against previous session metrics
→ flag if peak count > 80% of MAX (needs increase)
→ flag if peak count < 20% of MAX (can decrease)
→ AI agent suggests new constants
→ human reviews and applies
→ optionally freeze to :fixed N in defentity
⸻
15. Debug Tooling
●​
●​
●​
●​

debugNames: Map<handle, string> — side table, dev builds only, never serialized
subsystem labels keyed by (eid << 8) | subsystemId — pure integer key, same map
live entity inspector — reads buffer via handle, prints field values, dev console command
JSON schema export for any session's save file — separate CLI tool or dev console
command
●​ replay scrubber — step forward and backward through recorded snapshots
⸻
16. Open Questions
●​ Worker thread split — same thread confirmed for now. Interface is designed so transport
can be swapped later.
●​ World dimensions — horizontal wrap (Defender style)? Affects grid bucket layout and
coordinate representation.
●​ Grid cell size — depends on world dimensions and typical entity sizes.
●​ Multiple players — fixed at one for now? Affects input command layout (player ID field).
●​ Save file trigger — dev console command, CLI tool, or automatic on exit in debug
builds?
●​ t2lang macro maturity — does defentity need to be built from scratch or are primitives
available?
●​ Asset pipeline — sprite sheets, sound effects, tilemaps. Separate design area. Will
dominate memory budget.
