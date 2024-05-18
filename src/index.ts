import {Lexer} from './lexer';
import {Parser} from './parser';
// Example usage
const sourceCode = `let x = 2; let y = if x == 3 { 4 } else {0}; if y > x { return y; }`;
// const sourceCode = 'let x = 2;';
try  {

	const lexer = new Lexer(sourceCode);
	const tokens = lexer.tokenize();
	console.log(JSON.stringify(tokens, null, 2));
	const parser = new Parser(tokens);
	console.log(JSON.stringify(parser, null, 2));
	const ast = parser.parseProgram();
	console.log(JSON.stringify(ast, null, 2));
 } catch (e) {
	console.error(e);
 }
