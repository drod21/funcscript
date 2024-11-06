import { Lexer, Token, TokenType } from '../lexer';

describe('Lexer', () => {
  let lexer: Lexer;

  beforeEach(() => {
    lexer = new Lexer('');
  });

  test('tokenizes numbers', () => {
    lexer.setInput('123');
    const tokens = lexer.tokenize();
    expect(tokens).toEqual([
      new Token(TokenType.Number, '123'),
      new Token(TokenType.EOF, ''),
    ]);
  });

  test('tokenizes identifiers', () => {
    lexer.setInput('abc');
    const tokens = lexer.tokenize();
    expect(tokens).toEqual([
      new Token(TokenType.Identifier, 'abc'),
      new Token(TokenType.EOF, ''),
    ]);
  });

  test('tokenizes keywords', () => {
    lexer.setInput('let if else return match then function');
    const tokens = lexer.tokenize();
    expect(tokens).toEqual([
      new Token(TokenType.Keyword, 'let'),
      new Token(TokenType.Keyword, 'if'),
      new Token(TokenType.Keyword, 'else'),
      new Token(TokenType.Keyword, 'return'),
      new Token(TokenType.Keyword, 'match'),
      new Token(TokenType.Keyword, 'then'),
      new Token(TokenType.Keyword, 'function'),
      new Token(TokenType.EOF, ''),
    ]);
  });

  test('tokenizes operators', () => {
    lexer.setInput('+ - * / = == != < > <= >= && ||');
    const tokens = lexer.tokenize();
    expect(tokens).toEqual([
      new Token(TokenType.Operator, '+'),
      new Token(TokenType.Operator, '-'),
      new Token(TokenType.Operator, '*'),
      new Token(TokenType.Operator, '/'),
      new Token(TokenType.Operator, '='),
      new Token(TokenType.Operator, '=='),
      new Token(TokenType.Operator, '!='),
      new Token(TokenType.Operator, '<'),
      new Token(TokenType.Operator, '>'),
      new Token(TokenType.Operator, '<='),
      new Token(TokenType.Operator, '>='),
      new Token(TokenType.AND, '&&'),
      new Token(TokenType.OR, '||'),
      new Token(TokenType.EOF, ''),
    ]);
  });

  test('tokenizes punctuation', () => {
    lexer.setInput('{ } ( ) ; ,');
    const tokens = lexer.tokenize();
    expect(tokens).toEqual([
      new Token(TokenType.Punctuation, '{'),
      new Token(TokenType.Punctuation, '}'),
      new Token(TokenType.Punctuation, '('),
      new Token(TokenType.Punctuation, ')'),
      new Token(TokenType.Punctuation, ';'),
      new Token(TokenType.Punctuation, ','),
      new Token(TokenType.EOF, ''),
    ]);
  });

  test('tokenizes strings', () => {
    lexer.setInput('"hello"');
    const tokens = lexer.tokenize();
    expect(tokens).toEqual([
      new Token(TokenType.String, '"hello"'),
      new Token(TokenType.EOF, ''),
    ]);
  });

  test('tokenizes complex expression', () => {
    lexer.setInput('let x = 2 + 3 * 4;');
    const tokens = lexer.tokenize();
    expect(tokens).toEqual([
      new Token(TokenType.Keyword, 'let'),
      new Token(TokenType.Identifier, 'x'),
      new Token(TokenType.Operator, '='),
      new Token(TokenType.Number, '2'),
      new Token(TokenType.Operator, '+'),
      new Token(TokenType.Number, '3'),
      new Token(TokenType.Operator, '*'),
      new Token(TokenType.Number, '4'),
      new Token(TokenType.Punctuation, ';'),
      new Token(TokenType.EOF, ''),
    ]);
  });

  test('tokenizes logical expressions', () => {
    lexer.setInput('if x && y { z = 1; }');
    const tokens = lexer.tokenize();
    expect(tokens).toEqual([
      new Token(TokenType.Keyword, 'if'),
      new Token(TokenType.Identifier, 'x'),
      new Token(TokenType.AND, '&&'),
      new Token(TokenType.Identifier, 'y'),
      new Token(TokenType.Punctuation, '{'),
      new Token(TokenType.Identifier, 'z'),
      new Token(TokenType.Operator, '='),
      new Token(TokenType.Number, '1'),
      new Token(TokenType.Punctuation, ';'),
      new Token(TokenType.Punctuation, '}'),
      new Token(TokenType.EOF, ''),
    ]);
  });

  test('tokenizes match expression', () => {
    lexer.setInput('match x { 1 => 10, _ => 0 }');
    const tokens = lexer.tokenize();
    expect(tokens).toEqual([
      new Token(TokenType.Keyword, 'match'),
      new Token(TokenType.Identifier, 'x'),
      new Token(TokenType.Punctuation, '{'),
      new Token(TokenType.Number, '1'),
      new Token(TokenType.Lambda, '=>'),
      new Token(TokenType.Number, '10'),
      new Token(TokenType.Punctuation, ','),
      new Token(TokenType.Identifier, '_'),
      new Token(TokenType.Lambda, '=>'),
      new Token(TokenType.Number, '0'),
      new Token(TokenType.Punctuation, '}'),
      new Token(TokenType.EOF, ''),
    ]);
  });
});
