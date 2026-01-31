import type {
  PhaseBDottedIdentifier,
  PhaseBListNode,
  PhaseBNode,
  PhaseBTypeAnnotation,
  SymbolNode,
} from "./reader.js";
import type { SourceLoc } from "./location.js";

export function collectAnnotationSegment(
  elements: PhaseBNode[],
  startIdx: number
): { annotationNode: PhaseBNode | null; consumed: number } {
  if (startIdx >= elements.length) {
    return { annotationNode: null, consumed: 0 };
  }
  let boundary = elements.length;
  let questionDepth = 0;
  for (let i = startIdx; i < elements.length - 1; i += 1) {
    const current = elements[i];
    if (current.phaseKind === "symbol" && (current as SymbolNode).name === "?") {
      questionDepth += 1;
    }
    const next = elements[i + 1];
    if (next && isColon(next)) {
      if (questionDepth > 0) {
        questionDepth -= 1;
        continue;
      }
      boundary = i;
      break;
    }
  }
  boundary = Math.max(boundary, Math.min(startIdx + 1, elements.length));
  const segment = elements.slice(startIdx, boundary);
  if (segment.length === 0) {
    return { annotationNode: null, consumed: 0 };
  }
  const aggregated = serializePhaseBNodes(segment);
  if (aggregated === null) {
    return { annotationNode: segment[0], consumed: segment.length };
  }
  return { annotationNode: createAggregatedSymbol(aggregated, segment), consumed: segment.length };
}

export function serializePhaseBNode(node: PhaseBNode): string {
  switch (node.phaseKind) {
    case "symbol":
      return (node as SymbolNode).name;
    case "literal":
      {
        const value = (node as { value: unknown }).value;
        if (typeof value === "string") {
          return JSON.stringify(value);
        }
        return String(value);
      }
    case "list":
      return `(${(node as PhaseBListNode).elements.map((child) => serializePhaseBNode(child)).join(" ")})`;
    case "dotted":
      return (node as PhaseBDottedIdentifier).parts.join(".");
    case "type-annotation":
      return serializePhaseBNode((node as PhaseBTypeAnnotation).annotation);
  }
}

export function serializePhaseBNodes(nodes: PhaseBNode[]): string | null {
  const pieces: string[] = [];
  for (const node of nodes) {
    const text = serializePhaseBNode(node);
    if (text === undefined) {
      return null;
    }
    pieces.push(text);
  }
  return pieces.join(" ");
}

export function mergeLocs(first: SourceLoc, second: SourceLoc): SourceLoc {
  if (first.file === second.file) {
    return {
      file: first.file,
      line: first.line,
      column: first.column,
      endLine: second.endLine,
      endColumn: second.endColumn,
    };
  }
  return second;
}

function createAggregatedSymbol(value: string, nodes: PhaseBNode[]): PhaseBNode {
  return {
    kind: "symbol",
    name: value,
    phaseKind: "symbol",
    loc: mergeRangeLocs(nodes),
  };
}

function mergeRangeLocs(nodes: PhaseBNode[]): SourceLoc {
  const first = nodes[0].loc;
  const last = nodes[nodes.length - 1].loc;
  return mergeLocs(first, last);
}

function isColon(node: PhaseBNode): node is SymbolNode & { phaseKind: "symbol" } {
  return node.phaseKind === "symbol" && (node as SymbolNode).name === ":";
}
