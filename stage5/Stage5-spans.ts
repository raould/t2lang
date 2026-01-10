let spanTable  = new Map();
let nodeIdCounter_  = 0;
let currentFile_  = "<stdin>";
let nextNodeId  = () => {
  nodeIdCounter_ = (nodeIdCounter_ + 1);
  return nodeIdCounter_;
};
let registerSpan  = (id, ctx) => {
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
let formatSpan  = (id) => {
  {
    let span  = spanTable.get(id);
    if ((!span)) {
      return "<unknown>";
    }
    return ((((span.file + ":") + span.startLine) + ":") + (span.startCol + 1));
  }
};
let resetSpans  = (file?) => {
  spanTable.clear();
  nodeIdCounter_ = 0;
  currentFile_ = ((file === undefined) ? "<stdin>" : file);
};
export { spanTable, nextNodeId, registerSpan, formatSpan, resetSpans };
