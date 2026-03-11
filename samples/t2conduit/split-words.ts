import "t2conduit";
const split_words  = pure(lift((text: string): AsyncGenerator<string> => {
  async function*() {
    for (const raw of text.split(" ")) {
      const trimmed  = raw.trim();
      if (not((trimmed == ""))) {
        (yield trimmed);
      }
    }
  };
}));
interface WordLength  { word: string; length: number }
const measure_word_length  = pure(lift((token: string): WordLength => {
  ({
    word: token,
    length: token.length
  });
}));
const describe_word_length  = pure(lift((info: WordLength): string => {
  `Word ${info.word} has ${info.length} characters.`;
}));
const word_length_pipeline  = createPipeline([({
  name: split,
  stage: split_words
}), ({
  name: measure,
  stage: measure_word_length
}), ({
  name: describe,
  stage: describe_word_length
})]);
class example_context implements AsyncDisposable {
  split;
  measure;
  describe;
  [Symbol.asyncDispose]() {
    
  }
}
const sentence_results  = (await run(() => {
  new example_context();
}, word_length_pipeline, fromArray(["The quick brown fox", "jumps over the lazy dog"]), ({
  errorMode: ":fail_fast"
})));
console.log(`Sentence pipeline results: ${sentence_results.results}`);
const padded_results  = (await run(() => {
  new example_context();
}, word_length_pipeline, fromArray(["  Leading and trailing  ", "Multiple   spaces here     "]), ({
  errorMode: ":fail_fast"
})));
console.log(`Padded input pipeline results: ${padded_results.results}`);
