export interface SourceLoc {
  file: string;
  line: number;
  column: number;
  endLine: number;
  endColumn: number;
}

export interface ExpansionFrame {
  macroName: string;
  callSite: SourceLoc;
  macroDefSite: SourceLoc;
}
