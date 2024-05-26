import { Lexer } from '../lexer';
import { Parser } from '../parser';
import { SemanticAnalyzer } from '../semantic-analyzer';

describe('SemanticAnalyzer', () => {
    it('should pass semantic analysis for valid code', () => {
        const sourceCode = 'let x = 2;';
        const lexer = new Lexer(sourceCode);
        const tokens = lexer.tokenize();
        const parser = new Parser(tokens);
        const ast = parser.parseProgram();
        const analyzer = new SemanticAnalyzer();
        expect(() => analyzer.analyze(ast)).not.toThrow();
    });

    // Add more tests for different cases
});
