import { CodeGenerator } from '../code-generator';
import { Lexer } from '../lexer';
import { Parser } from '../parser';
import { SemanticAnalyzer } from '../semantic-analyzer';

describe('Integration', () => {
  it('should compile code from source to JavaScript', () => {
    const sourceCode = `
            let x = 2;
            let y = match x {
              1 => 10,
              2 => 20,
              _ => 0
            };
`.trim();
    const lexer = new Lexer(sourceCode);
    const tokens = lexer.tokenize();
    const parser = new Parser(tokens);
    const ast = parser.parseProgram();
    const analyzer = new SemanticAnalyzer();
    analyzer.analyze(ast);
    const generator = new CodeGenerator();
    const generatedCode = generator.generate(ast);
    console.log(generatedCode);
    const expectedCode = `
					let x = 2;
					let y = (function(value) {
						if (value === 1) return 10;
						if (value === 2) return 20;
						return 0;
					})(x);
        `.trim();
    expect(generatedCode).toBe(expectedCode);
  });

  // Add more integration tests for different cases
});
