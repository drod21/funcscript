import { Lexer } from './lexer';
import { Parser } from './parser';
import { SemanticAnalyzer } from './semantic-analyzer';
// Example usage
const sourceCode = `
let x = 2;
let y = match x {
  1 => 10,
  2 => 20,
  _ => 0
};
if y > x { return y; }
`; // const sourceCode = 'let x = 2;';

try {
  const lexer = new Lexer(sourceCode);
  const tokens = lexer.tokenize();
  const parser = new Parser(tokens);
  const ast = parser.parseProgram();
  console.log(JSON.stringify(ast, null, 2));
  const analyzer = new SemanticAnalyzer();
  analyzer.analyze(ast);
  console.log('Semantic analysis passed');
} catch (error) {
  console.error(`Semantic analysis failed: ${(error as Error).message}`);
  console.error(error);
}
