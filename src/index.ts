import { Lexer } from './lexer';
import { Parser } from './parser';
import { SemanticAnalyzer } from './semantic-analyzer';
const sourceCode = `
let x = 2;
let y = match x {
  1 => 10,
  2 => 20,
  _ => 0
};
if y > x { return y; }
`.trim();

const lexer = new Lexer(sourceCode);
const tokens = lexer.tokenize();
console.log(tokens);

const parser = new Parser(tokens);
const ast = parser.parseProgram();
console.log(JSON.stringify(ast, null, 2));

const analyzer = new SemanticAnalyzer();
try {
    analyzer.analyze(ast);
    console.log('Semantic analysis passed');
} catch (error) {
    console.error(`Semantic analysis failed: ${(error as Error).message}`);
}
