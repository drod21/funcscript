export enum TokenType {
	Keyword,
	Identifier,
	Number,
	Operator,
	String,
	Punctuation,
	Whitespace,
	Comment,
	EOF
}


export class Token {
	constructor(public type: TokenType, public value: string) {}
}

export class Lexer {
	private input: string;
	private position: number;
	private tokens: Token[];

	private keywords = new Set(['let', 'if', 'else', 'return', 'match', 'then']);
	private operators = new Set(['+', '-', '*', '/', '=', '==', '!=', '<', '>', '<=', '>=']);
	private punctuations = new Set(['{', '}', '(', ')', ';', ',']);

	constructor(input: string) {
			this.input = input;
			this.position = 0;
			this.tokens = [];
	}

	private isWhitespace(char: string): boolean {
			return /\s/.test(char);
	}

	private isDigit(char: string): boolean {
			return /\d/.test(char);
	}

	private isLetter(char: string): boolean {
			return /[a-zA-Z_]/.test(char);
	}

	private getNextChar(): string {
			return this.input[this.position++];
	}

	private peekNextChar(): string {
			return this.input[this.position];
	}

	private tokenizeNumber(): Token {
			let start = this.position - 1;
			while (this.isDigit(this.peekNextChar())) {
					this.getNextChar();
			}
			return new Token(TokenType.Number, this.input.slice(start, this.position));
	}

	private tokenizeIdentifierOrKeyword(): Token {
			let start = this.position - 1;
			while (this.isLetter(this.peekNextChar()) || this.isDigit(this.peekNextChar())) {
					this.getNextChar();
			}
			const value = this.input.slice(start, this.position);
			if (this.keywords.has(value)) {
					return new Token(TokenType.Keyword, value);
			}
			return new Token(TokenType.Identifier, value);
	}

	private tokenizeString(): Token {
			let result = '"';
			while (this.peekNextChar() !== '"' && this.position < this.input.length) {
					result += this.getNextChar();
			}
			result += this.getNextChar(); // add closing "
			return new Token(TokenType.String, result);
	}

	private tokenizeOperatorOrPunctuation(): Token {
			const char = this.getNextChar();
			console.log('char', char)
			if (this.operators.has(char)) {
					return new Token(TokenType.Operator, char);
			}
			if (this.punctuations.has(char)) {
					return new Token(TokenType.Punctuation, char);
			}
			throw new Error(`Unexpected character: ${char}`);
	}

	public tokenize(): Token[] {
		console.log('this.input', this.input)
			while (this.position < this.input.length) {
					const char = this.getNextChar();

					if (this.isWhitespace(char)) {
							continue;
					}

					if (this.isDigit(char)) {
							this.tokens.push(this.tokenizeNumber());
							continue;
					}

					if (this.isLetter(char)) {
							this.tokens.push(this.tokenizeIdentifierOrKeyword());
							continue;
					}

					if (char === '"') {
							this.tokens.push(this.tokenizeString());
							continue;
					}

					if (this.operators.has(char) || this.punctuations.has(char)) {
							this.tokens.push(this.tokenizeOperatorOrPunctuation());
							continue;
					}

					throw new Error(`Unexpected character: ${char}`);
			}

			this.tokens.push(new Token(TokenType.EOF, ""));
			return this.tokens;
	}
}

// Example usage
// const sourceCode = `let x = 2; let y = if x == 3 then 4 else 0; if y > x { return y; }`;
// const lexer = new Lexer(sourceCode);
// const tokens = lexer.tokenize();

// console.log(tokens);
