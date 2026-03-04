import { Project, Node } from "ts-morph";

function toSExpr(node: Node, indent: number=0): string {
  const dent = " ".repeat(indent);
  const kind = node.getKindName();
  const children: string[] = [];

  // Recursively collect S-expressions for all children
  node.forEachChild(child => {
      children.push(toSExpr(child, indent+1));
  });

  // If the node has no children, return just the kind name
  if (children.length === 0) {
      return `(${kind} ${node.getText()})`;
  }

  // Otherwise, return (Kind Child1 Child2 ...)
  return `(${kind}\n${dent}${children.join(`\n${dent}`)})`;
}

const args = process.argv.slice(2);
if (args.length === 0) {
    console.error("Missing required argument: path to .ts source file");
    process.exit(1);
}
if (args.length > 1) {
    console.error("Currently only support 1 file at a time");
    process.exit(1);
}
const project = new Project();
const sourceFile = project.addSourceFileAtPath(args[0]);
console.log(toSExpr(sourceFile));
