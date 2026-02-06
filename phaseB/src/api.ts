import { parsePhaseBRaw } from "./reader.js";
import type { PhaseBNode } from "./reader.js";
import { lowerPhaseB } from "./lower.js";
import { compile as compilePhaseA } from "../../phaseA/dist/api.js";
import type { CompilePhaseAConfig, CompilePhaseAResult } from "../../phaseA/dist/api.js";
import type { PhaseACompilerContext } from "../../phaseA/dist/compilerContext.js";
import type { EventSeverity } from "../../phaseA/dist/events.js";
import type { Program } from "../../phaseA/dist/phaseA1.js";

export interface CompilePhaseBConfig {
  sourcePath?: string;
  seed?: string;
  prettyOption?: "pretty" | "ugly";
  logLevel?: EventSeverity;
  compilerContext?: PhaseACompilerContext;
}

export interface CompilePhaseBResult extends CompilePhaseAResult {
  phaseBNodes: PhaseBNode[];
  phaseAProgram: Program;
}

export async function compile(source: string, config: CompilePhaseBConfig = {}): Promise<CompilePhaseBResult> {
  const sourcePath = config.sourcePath ?? "input.t2";
  const phaseBNodes = parsePhaseBRaw(source, sourcePath);
  const phaseAProgram = lowerPhaseB(phaseBNodes);

  const phaseAConfig: CompilePhaseAConfig = {
    sourcePath,
    seed: config.seed,
    prettyOption: config.prettyOption,
    logLevel: config.logLevel,
    compilerContext: config.compilerContext,
    program: phaseAProgram,
  };

  const result = await compilePhaseA(source, phaseAConfig);
  return {
    ...result,
    phaseBNodes,
    phaseAProgram,
  };
}