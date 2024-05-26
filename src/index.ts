import { CodeGenerator } from './code-generator';
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
`.trim();

const lexer = new Lexer(sourceCode);
const tokens = lexer.tokenize();

const parser = new Parser(tokens);
const ast = parser.parseProgram();

const analyzer = new SemanticAnalyzer();
try {
    analyzer.analyze(ast);
    console.log('Semantic analysis passed');

} catch (error) {
    console.error(`Semantic analysis failed: ${(error as Error).message}`);
}

try {
		const generator = new CodeGenerator();
		const generatedCode = generator.generate(ast);
		console.log('Code generation passed')
		console.log(generatedCode);
} catch (error) {
		console.error(`Code generation failed: ${(error as Error).message}`);
}
