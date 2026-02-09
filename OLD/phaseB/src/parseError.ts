import type { ExpansionFrame, SourceLoc } from "./location.js";

export type ReaderErrorCode =
  | "E001"
  | "E002"
  | "E003"
  | "E004"
  | "E005"
  | "E006"
  | "E007"
  | "E008"
  | "E009";

export class ParseError extends Error {
  public readonly loc: SourceLoc;
  public readonly code: ReaderErrorCode;
  public expansionStack?: ExpansionFrame[];

  constructor(message: string, loc: SourceLoc, code: ReaderErrorCode = "E001") {
    super(message);
    this.loc = loc;
    this.code = code;
    this.name = "ParseError";
  }
}
