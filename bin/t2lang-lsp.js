#!/usr/bin/env tsx
import { createConnection, ProposedFeatures, TextDocumentSyncKind } from 'vscode-languageserver/node';
import { TextDocuments } from 'vscode-languageserver';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { createEvalService, handleT2Eval } from '../lsp.ts';

const connection = createConnection(ProposedFeatures.all);
const documents = new TextDocuments(TextDocument);
const evalService = createEvalService();
let currentAbort = null;

connection.onInitialize(() => {
  return {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Incremental,
    },
  };
});

connection.onRequest('t2/eval', async (params) => {
  // Cancel any in-flight eval before starting a new one
  if (currentAbort) currentAbort.abort();
  const ac = new AbortController();
  currentAbort = ac;

  const doc = documents.get(params.textDocument.uri);
  if (!doc) {
    currentAbort = null;
    return { stdout: '', stderr: '', diagnostics: [{ message: 'document not found' }] };
  }

  const result = await handleT2Eval(evalService, ac.signal, doc, params);

  // Only clear currentAbort if this request is still current
  if (currentAbort === ac) currentAbort = null;
  return result;
});

documents.listen(connection);
connection.listen();
