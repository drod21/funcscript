import { Lexer, Token, TokenType } from '../lexer';

describe('Lexer', () => {
  it('should tokenize variable declaration', () => {
    const sourceCode = 'let x = 2;';
    const lexer = new Lexer(sourceCode);
    const tokens = lexer.tokenize();
    expect(tokens).toEqual([
      new Token(TokenType.Keyword, 'let'),
      new Token(TokenType.Identifier, 'x'),
      new Token(TokenType.Operator, '='),
      new Token(TokenType.Number, '2'),
      new Token(TokenType.Punctuation, ';'),
      new Token(TokenType.EOF, ''),
    ]);
  });

  // Add more tests for different cases
});
