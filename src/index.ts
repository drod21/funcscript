import {Lexer} from './lexer';
import {Parser} from './parser';
// Example usage
// const sourceCode = `let x = 2; let y = if x == 3 then 4 else 0; if y > x { return y; }`;
const sourceCode = 'let x = 2;';
const lexer = new Lexer(sourceCode);
const tokens = lexer.tokenize();
const parser = new Parser(tokens);
const ast = parser.parseProgram();
console.log(JSON.stringify(ast, null, 2));
