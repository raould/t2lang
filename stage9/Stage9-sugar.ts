const sugarNode  = (node) => {
  if (((node === null) || (typeof node !== "object"))) {
    return node;
  }
  if (Array.isArray(node)) {
    return node.map(sugarNode);
  }
  if ((node.tag === "tilde-unquote")) {
    return ({
      tag: "unquote",
      id: node.id,
      text: node.text,
      expr: sugarNode(node.expr)
    });
  }
  if ((node.tag === "tilde-splice")) {
    return ({
      tag: "unquote-splicing",
      id: node.id,
      text: node.text,
      expr: sugarNode(node.expr)
    });
  }
  return Object.fromEntries(Object.entries(node).map(sugarEntry));
};
const sugarEntry  = (entry) => {
  return [entry[0], sugarNode(entry[1])];
};
const sugarTopLevel  = (node) => {
  return sugarNode(node);
};
export { sugarTopLevel };
