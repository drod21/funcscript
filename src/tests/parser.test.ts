import { ASTNode, ASTNodeType } from '../AST';
import { Lexer } from '../lexer';
import { Parser } from '../parser';

describe('Parser', () => {
    it('should parse variable declaration', () => {
        const sourceCode = 'let x = 2;';
        const lexer = new Lexer(sourceCode);
        const tokens = lexer.tokenize();
        const parser = new Parser(tokens);
        const ast = parser.parseProgram();
        expect(ast).toEqual(new ASTNode(ASTNodeType.Program, null, [
            new ASTNode(ASTNodeType.VariableDeclaration, 'x', [
                new ASTNode(ASTNodeType.NumberLiteral, '2')
            ])
        ]));
    });

    // Add more tests for different cases
});
