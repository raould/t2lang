* Every operator node (union, intersection, extends, conditional, fn, app) is wrapped in parentheses.
* Leaves (id) are emitted raw.
* No precedence logic anywhere.

type Node =
  | { kind: 'id'; name: string }
  | { kind: 'union'; left: Node; right: Node }
  | { kind: 'intersection'; left: Node; right: Node }
  | { kind: 'conditional'; check: Node; then: Node; else: Node }
  | { kind: 'extends'; left: Node; right: Node }
  | { kind: 'fn'; params: { name: string; type: Node }[]; result: Node }
  | { kind: 'app'; callee: Node; args: Node[] }
  | { kind: 'tuple'; elements: Node[] }
  | { kind: 'obj'; props: { name: string; type: Node }[] };
  // | continue with others as needed.

function printType(node: Node): string {
  switch (node.kind) {
    case 'id':
      return node.name;

    case 'union':
      return `(${printType(node.left)} | ${printType(node.right)})`;

    case 'intersection':
      return `(${printType(node.left)} & ${printType(node.right)})`;

    case 'extends':
      return `(${printType(node.left)} extends ${printType(node.right)})`;

    case 'conditional':
      return `(${printType(node.check)} ? ${printType(node.then)} : ${printType(node.else)})`;

    case 'fn': {
      const params = node.params
        .map(p => `${p.name}: ${printType(p.type)}`)
        .join(', ');
      return `((${params}) => ${printType(node.result)})`;
    }

    case 'app': {
      const callee = printType(node.callee);
      const args = node.args.map(printType).join(', ');
      return `(${callee}<${args}>)`;
    }

    case 'tuple': {
      const elems = node.elements.map(printType).join(', ');
      return `([${elems}])`;
    }

    case 'obj': {
      const props = node.props
        .map(p => `${p.name}: ${printType(p.type)}`)
        .join('; ');
      return `({ ${props} })`;
    }

    // continue with others as needed.
  }
}
