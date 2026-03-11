const spanTable  = new Map();
let nodeIdCounter_  = 0;
let currentFile_  = "<stdin>";
const nextNodeId  = () => {
  nodeIdCounter_ = (nodeIdCounter_ + 1);
  return nodeIdCounter_;
};
const registerSpan  = (id, ctx) => {
  if ((!(ctx && ctx.start))) {
    return id;
  }
  {
    let start  = ctx.start;
    let stop  = ctx.stop;
    let endLine  = (stop ? stop.line : start.line);
    let endCol  = (stop ? stop.column : start.column);
    spanTable.set(id, ({
      file: currentFile_,
      startLine: start.line,
      startCol: start.column,
      endLine: endLine,
      endCol: endCol
    }));
    return id;
  }
};
const formatSpan  = (id) => {
  {
    let span  = spanTable.get(id);
    if ((!span)) {
      return undefined;
    }
    return ((((span.file + ":") + span.startLine) + ":") + (span.startCol + 1));
  }
};
const resetSpans  = (file) => {
  currentFile_ = ((file === undefined) ? "<stdin>" : file);
};
export { spanTable, nextNodeId, registerSpan, formatSpan, resetSpans };
