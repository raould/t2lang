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
const readerTransform  = (src) => {
  {
    let out  = "";
    let i  = 0;
    let n  = src.length;
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
    return out;
  }
};
export { readerTransform };
