const skipToEndOfLine  = (src, i) => {
  while ((i < src.length)) {
    if ((src.charAt(i) === "\n")) {
      return (i + 1);
    }
    i = (i + 1);
  }
  return i;
};
const skipSingleQuoteString  = (src, i) => {
  while ((i < src.length)) {
    {
      let ch  = src.charAt(i);
      i = (i + 1);
      if ((ch === "\\")) {
        i = (i + 1);
      }
      else {
        if ((ch === "'")) {
          return i;
        }
      }
    }
  }
  return i;
};
const skipDoubleQuoteString  = (src, i) => {
  while ((i < src.length)) {
    {
      let ch  = src.charAt(i);
      i = (i + 1);
      if ((ch === "\\")) {
        i = (i + 1);
      }
      else {
        if ((ch === "\"")) {
          return i;
        }
      }
    }
  }
  return i;
};
const skipTripleString  = (src, i) => {
  while ((i < src.length)) {
    if (((src.charAt(i) === "\"") && ((src.charAt((i + 1)) === "\"") && (src.charAt((i + 2)) === "\"")))) {
      return (i + 3);
    }
    i = (i + 1);
  }
  return i;
};
const escapeChunk  = (text) => {
  {
    let s1  = text.split("\\").join("\\\\");
    let s2  = s1.split("\"").join("\\\"");
    let s3  = s2.split("\n").join("\\n");
    let s4  = s3.split("\r").join("\\r");
    let s5  = s4.split("\t").join("\\t");
    return s5;
  }
};
const scanExprUntilClose  = (src, i) => {
  {
    let depth  = 1;
    let buf  = "";
    while (((i < src.length) && (depth > 0))) {
      {
        let ch  = src.charAt(i);
        if (((ch === "\"") && ((src.charAt((i + 1)) === "\"") && (src.charAt((i + 2)) === "\"")))) {
          {
            let end  = skipTripleString(src, (i + 3));
            buf = (buf + src.slice(i, end));
            i = end;
          }
        }
        else {
          if ((ch === "'")) {
            {
              let end  = skipSingleQuoteString(src, (i + 1));
              buf = (buf + src.slice(i, end));
              i = end;
            }
          }
          else {
            if ((ch === "\"")) {
              {
                let end  = skipDoubleQuoteString(src, (i + 1));
                buf = (buf + src.slice(i, end));
                i = end;
              }
            }
            else {
              if (((ch === ";") && (src.charAt((i + 1)) === ";"))) {
                {
                  let end  = skipToEndOfLine(src, (i + 2));
                  buf = (buf + src.slice(i, end));
                  i = end;
                }
              }
              else {
                if ((ch === "{")) {
                  {
                    depth = (depth + 1);
                    buf = (buf + ch);
                    i = (i + 1);
                  }
                }
                else {
                  if ((ch === "}")) {
                    {
                      depth = (depth - 1);
                      if ((depth > 0)) {
                        {
                          buf = (buf + ch);
                          i = (i + 1);
                        }
                      }
                      else {
                        i = (i + 1);
                      }
                    }
                  }
                  else {
                    {
                      buf = (buf + ch);
                      i = (i + 1);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    return [buf, i];
  }
};
const scanTemplate  = (src, i) => {
  {
    let parts  = [];
    let textBuf  = "";
    while ((i < src.length)) {
      {
        let ch  = src.charAt(i);
        if (((ch === "\\") && (src.charAt((i + 1)) === "`"))) {
          {
            textBuf = (textBuf + "`");
            i = (i + 2);
          }
        }
        else {
          if (((ch === "$") && (src.charAt((i + 1)) === "{"))) {
            {
              if ((textBuf !== "")) {
                parts.push(({
                  type: "str",
                  value: textBuf
                }));
              }
              textBuf = "";
              {
                let result  = scanExprUntilClose(src, (i + 2));
                let exprText  = result[0];
                let newI  = result[1];
                parts.push(({
                  type: "expr",
                  value: exprText
                }));
                i = newI;
              }
            }
          }
          else {
            if ((ch === "`")) {
              {
                if ((textBuf !== "")) {
                  parts.push(({
                    type: "str",
                    value: textBuf
                  }));
                }
                return [parts, (i + 1)];
              }
            }
            else {
              {
                textBuf = (textBuf + ch);
                i = (i + 1);
              }
            }
          }
        }
      }
    }
    if ((textBuf !== "")) {
      parts.push(({
        type: "str",
        value: textBuf
      }));
    }
    return [parts, i];
  }
};
const buildTemplateForm  = (parts) => {
  if ((parts.length === 0)) {
    return "\"\"";
  }
  if (((parts.length === 1) && (parts[0].type === "str"))) {
    return (("\"" + escapeChunk(parts[0].value)) + "\"");
  }
  {
    let inner  = "";
    parts.forEach((part) => {
      if ((part.type === "str")) {
        inner = (((inner + " \"") + escapeChunk(part.value)) + "\"");
      }
      else {
        inner = ((inner + " ") + part.value);
      }
    });
    return (("(template" + inner) + ")");
  }
};
const isWhitespace  = (ch) => {
  return ((ch === " ") || ((ch === "\t") || ((ch === "\n") || (ch === "\r"))));
};
const isSubscriptTrigger  = (ch) => {
  if ((ch === undefined)) {
    return false;
  }
  {
    let nonTrigger  = " \t\n\r([,;{#[";
    return (nonTrigger.indexOf(ch) === -1);
  }
};
const METHOD_MODIFIERS  = new Set(["static", "async", "generator", "abstract", "override", "readonly"]);
const scanBracketContent  = (src, i) => {
  {
    let depth  = 1;
    let buf  = "";
    let j  = i;
    while (((j < src.length) && (depth > 0))) {
      {
        let ch  = src.charAt(j);
        if ((ch === "'")) {
          {
            let end  = skipSingleQuoteString(src, (j + 1));
            buf = (buf + src.slice(j, end));
            j = end;
          }
        }
        else {
          if (((ch === "\"") && ((src.charAt((j + 1)) === "\"") && (src.charAt((j + 2)) === "\"")))) {
            {
              let end  = skipTripleString(src, (j + 3));
              buf = (buf + src.slice(j, end));
              j = end;
            }
          }
          else {
            if ((ch === "\"")) {
              {
                let end  = skipDoubleQuoteString(src, (j + 1));
                buf = (buf + src.slice(j, end));
                j = end;
              }
            }
            else {
              if (((ch === ";") && (src.charAt((j + 1)) === ";"))) {
                {
                  let end  = skipToEndOfLine(src, (j + 2));
                  buf = (buf + src.slice(j, end));
                  j = end;
                }
              }
              else {
                if ((ch === "[")) {
                  {
                    depth = (depth + 1);
                    buf = (buf + ch);
                    j = (j + 1);
                  }
                }
                else {
                  if ((ch === "]")) {
                    {
                      depth = (depth - 1);
                      if ((depth > 0)) {
                        {
                          buf = (buf + ch);
                          j = (j + 1);
                        }
                      }
                      else {
                        j = (j + 1);
                      }
                    }
                  }
                  else {
                    {
                      buf = (buf + ch);
                      j = (j + 1);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    return [buf, j];
  }
};
const bracketHasTopLevelComma  = (src, i) => {
  {
    let depth  = 1;
    let j  = (i + 1);
    while (((j < src.length) && (depth > 0))) {
      {
        let ch  = src.charAt(j);
        if ((ch === "'")) {
          {
            j = skipSingleQuoteString(src, (j + 1));
          }
        }
        else {
          if (((ch === "\"") && ((src.charAt((j + 1)) === "\"") && (src.charAt((j + 2)) === "\"")))) {
            {
              j = skipTripleString(src, (j + 3));
            }
          }
          else {
            if ((ch === "\"")) {
              {
                j = skipDoubleQuoteString(src, (j + 1));
              }
            }
            else {
              if (((ch === "[") || ((ch === "(") || (ch === "{")))) {
                {
                  depth = (depth + 1);
                  j = (j + 1);
                }
              }
              else {
                if (((ch === "]") || ((ch === ")") || (ch === "}")))) {
                  {
                    depth = (depth - 1);
                    j = (j + 1);
                  }
                }
                else {
                  if (((ch === ",") && (depth === 1))) {
                    return true;
                  }
                  else {
                    j = (j + 1);
                  }
                }
              }
            }
          }
        }
      }
    }
    return false;
  }
};
const findPrecedingExprStart  = (text) => {
  {
    let j  = (text.length - 1);
    if ((j < 0)) {
      return -1;
    }
    {
      let last  = text.charAt(j);
      if ((last === ")")) {
        {
          let depth  = 1;
          j = (j - 1);
          while (((j >= 0) && (depth > 0))) {
            {
              let c  = text.charAt(j);
              if ((c === ")")) {
                depth = (depth + 1);
              }
              if ((c === "(")) {
                depth = (depth - 1);
              }
            }
            if ((depth > 0)) {
              j = (j - 1);
            }
          }
          return j;
        }
      }
      if ((last === "]")) {
        {
          let depth  = 1;
          j = (j - 1);
          while (((j >= 0) && (depth > 0))) {
            {
              let c  = text.charAt(j);
              if ((c === "]")) {
                depth = (depth + 1);
              }
              if ((c === "[")) {
                depth = (depth - 1);
              }
            }
            if ((depth > 0)) {
              j = (j - 1);
            }
          }
          return j;
        }
      }
      while ((j >= 0)) {
        {
          let c  = text.charAt(j);
          if (((((((((((((c !== " ") && (c !== "\t")) && (c !== "\n")) && (c !== "\r")) && (c !== "(")) && (c !== ")")) && (c !== "[")) && (c !== "]")) && (c !== "{")) && (c !== "}")) && (c !== ",")) && (c !== ";"))) {
            j = (j - 1);
          }
          else {
            return (j + 1);
          }
        }
      }
      return (j + 1);
    }
  }
};
const readerTransform  = (src) => {
  {
    let out  = "";
    let i  = 0;
    let n  = src.length;
    let bracketDepth  = 0;
    let subscriptStack  = [];
    while ((i < n)) {
      {
        let ch  = src.charAt(i);
        if (((ch === "\"") && ((src.charAt((i + 1)) === "\"") && (src.charAt((i + 2)) === "\"")))) {
          {
            let end  = skipTripleString(src, (i + 3));
            out = (out + src.slice(i, end));
            i = end;
          }
        }
        else {
          if ((ch === "'")) {
            {
              let end  = skipSingleQuoteString(src, (i + 1));
              out = (out + src.slice(i, end));
              i = end;
            }
          }
          else {
            if ((ch === "\"")) {
              {
                let end  = skipDoubleQuoteString(src, (i + 1));
                out = (out + src.slice(i, end));
                i = end;
              }
            }
            else {
              if (((ch === ";") && (src.charAt((i + 1)) === ";"))) {
                {
                  let end  = skipToEndOfLine(src, (i + 2));
                  out = (out + src.slice(i, end));
                  i = end;
                }
              }
              else {
                if ((ch === "`")) {
                  {
                    let result  = scanTemplate(src, (i + 1));
                    let parts  = result[0];
                    let newI  = result[1];
                    out = (out + buildTemplateForm(parts));
                    i = newI;
                  }
                }
                else {
                  if ((ch === "[")) {
                    {
                      let prevChar  = ((i > 0) ? src.charAt((i - 1)) : undefined);
                      {
                        let emitSubscript  = (precExpr, prefix) => {
                          {
                            let captured  = scanBracketContent(src, (i + 1));
                            let rawContent  = captured[0];
                            let newI  = captured[1];
                            out = (((((prefix + "(subscript ") + precExpr) + " \"") + escapeChunk(rawContent)) + "\")");
                            i = newI;
                          }
                        };
                        if (isSubscriptTrigger(prevChar)) {
                          {
                            let start  = findPrecedingExprStart(out);
                            if ((start >= 0)) {
                              emitSubscript(out.slice(start), out.slice(0, start));
                            }
                            else {
                              {
                                out = (out + "[");
                                bracketDepth = (bracketDepth + 1);
                                i = (i + 1);
                              }
                            }
                          }
                        }
                        else {
                          if (isWhitespace(prevChar)) {
                            {
                              let trimmedOut  = out.trimEnd();
                              if (isSubscriptTrigger(trimmedOut.charAt((trimmedOut.length - 1)))) {
                                {
                                  let start  = findPrecedingExprStart(trimmedOut);
                                  if ((start >= 0)) {
                                    {
                                      let precExpr  = trimmedOut.slice(start);
                                      let prefix0  = trimmedOut.slice(0, start);
                                      {
                                        let prefix0Trim  = prefix0.trimEnd();
                                        {
                                          let charBefore  = ((prefix0Trim.length > 0) ? prefix0Trim.charAt((prefix0Trim.length - 1)) : "");
                                          if (((charBefore !== "(") && ((charBefore !== ".") && (((precExpr.length === 0) || (precExpr.charAt(0) !== "[")) && ((!METHOD_MODIFIERS.has(precExpr)) && (!bracketHasTopLevelComma(src, i))))))) {
                                            emitSubscript(precExpr, prefix0);
                                          }
                                          else {
                                            {
                                              out = (out + "[");
                                              bracketDepth = (bracketDepth + 1);
                                              i = (i + 1);
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                  else {
                                    {
                                      out = (out + "[");
                                      bracketDepth = (bracketDepth + 1);
                                      i = (i + 1);
                                    }
                                  }
                                }
                              }
                              else {
                                {
                                  out = (out + "[");
                                  bracketDepth = (bracketDepth + 1);
                                  i = (i + 1);
                                }
                              }
                            }
                          }
                          else {
                            {
                              out = (out + "[");
                              bracketDepth = (bracketDepth + 1);
                              i = (i + 1);
                            }
                          }
                        }
                      }
                    }
                  }
                  else {
                    if ((ch === "]")) {
                      {
                        out = (out + "]");
                        bracketDepth = (bracketDepth - 1);
                        i = (i + 1);
                      }
                    }
                    else {
                      {
                        out = (out + ch);
                        i = (i + 1);
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    return out;
  }
};
export { readerTransform };
