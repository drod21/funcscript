export enum TokenType {
	Keyword,
	Identifier,
	Number,
	Operator,
	String,
	Punctuation,
	Lambda,
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

	private keywords = new Set(['let', 'if', 'else', 'return', 'match', 'then', 'function']);
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

	private tokenizeOperatorOrPunctuation(): Token | null {
			let char = this.getNextChar();
			let nextChar = this.peekNextChar();

			// Handle lambda operator
			if (char === '=' && nextChar === '>') {
					char += this.getNextChar(); // get the second character
					return new Token(TokenType.Lambda, char);
			}

			// Handle multi-character operators
			if ((char === '=' || char === '!' || char === '<' || char === '>') && nextChar === '=') {
					char += this.getNextChar(); // get the second character
					return new Token(TokenType.Operator, char);
			}

			if (this.operators.has(char)) {
					return new Token(TokenType.Operator, char);
			}

			if (this.punctuations.has(char)) {
					return new Token(TokenType.Punctuation, char);
			}

			// Skip over unexpected characters like whitespace
			if (this.isWhitespace(char)) {
					return null;
			}

			throw new Error(`Unexpected character: ${char} at position ${this.position} in input: ${this.input} with next char: ${nextChar}`);
	}

	public tokenize(): Token[] {
			while (this.position < this.input.length) {
					const char = this.peekNextChar();

					if (this.isWhitespace(char)) {
							this.getNextChar(); // skip whitespace
							continue;
					}

					if (this.isDigit(char)) {
							this.getNextChar(); // move the position to include the current char
							this.tokens.push(this.tokenizeNumber());
							continue;
					}

					if (this.isLetter(char)) {
							this.getNextChar(); // move the position to include the current char
							this.tokens.push(this.tokenizeIdentifierOrKeyword());
							continue;
					}

					if (char === '"') {
							this.getNextChar(); // move the position to include the current char
							this.tokens.push(this.tokenizeString());
							continue;
					}

					const token = this.tokenizeOperatorOrPunctuation();
					if (token) {
							this.tokens.push(token);
							continue;
					}
			}

			this.tokens.push(new Token(TokenType.EOF, ""));
			return this.tokens;
	}
}
