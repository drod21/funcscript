import { CodeGenerator } from '../code-generator';
import { Lexer } from '../lexer';
import { Parser } from '../parser';
import { SemanticAnalyzer } from '../semantic-analyzer';

describe('CodeGenerator', () => {
    it('should generate JavaScript code for variable declaration', () => {
        const sourceCode = 'let x = 2;';
        const lexer = new Lexer(sourceCode);
        const tokens = lexer.tokenize();
        const parser = new Parser(tokens);
        const ast = parser.parseProgram();
        const analyzer = new SemanticAnalyzer();
        analyzer.analyze(ast);
        const generator = new CodeGenerator();
        const generatedCode = generator.generate(ast);
        expect(generatedCode).toBe('let x = 2;');
    });

    // Add more tests for different cases
});
