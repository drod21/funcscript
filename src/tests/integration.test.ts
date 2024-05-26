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
            if y > x { return y; }
        `.trim();

        const lexer = new Lexer(sourceCode);
        const tokens = lexer.tokenize();
        const parser = new Parser(tokens);
        const ast = parser.parseProgram();
        const analyzer = new SemanticAnalyzer();
        analyzer.analyze(ast);
        const generator = new CodeGenerator();
        const generatedCode = generator.generate(ast);
        const expectedCode = `
            let x = 2;
            let y = (function(matchValue) {
                if (matchValue === 1) return 10;
                if (matchValue === 2) return 20;
                if (matchValue === _) return 0;
            })(x);
            if (y > x) { return y; }
        `.trim();
        expect(generatedCode).toBe(expectedCode);
    });

    // Add more integration tests for different cases
});
