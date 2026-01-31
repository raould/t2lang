export type ErrorParams = Record<string, string | number | undefined>;

interface ErrorDefinition {
  code: string;
  template: string;
}

const registry = new Map<string, ErrorDefinition>();

export class PhaseBError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly params?: ErrorParams
  ) {
    super(message);
    this.name = "PhaseBError";
  }
}

function interpolate(template: string, params?: ErrorParams): string {
  if (!params) {
    return template;
  }
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    const value = params[key];
    if (value === undefined || value === null) {
      return match;
    }
    return String(value);
  });
}

export function registerError(code: string, template: string): void {
  if (registry.has(code)) {
    throw new Error(`error code ${code} already registered`);
  }
  registry.set(code, { code, template });
}

export function reportError(code: string, params?: ErrorParams): PhaseBError {
  const definition = registry.get(code);
  if (!definition) {
    throw new Error(`unknown error code ${code}`);
  }
  const message = interpolate(definition.template, params);
  return new PhaseBError(definition.code, message, params);
}

registerError("E101", "macro substitution produced non-SExpr node inside list");
registerError("E102", "unquote-splicing is not supported yet");
registerError("E110", "unexpected token '{token}' in type expression");
registerError("E111", "expected type identifier");
registerError("E112", "expected '{value}' but found '{found}' in type expression");
