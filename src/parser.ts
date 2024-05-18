import { Token, TokenType } from "./lexer";
import { ASTNode, ASTNodeType } from "./AST";
export class Parser {
	private tokens: Token[];
	private position: number;

	constructor(tokens: Token[]) {
			this.tokens = tokens;
			this.position = 0;
	}

	private currentToken(): Token {
			return this.tokens[this.position];
	}

	private nextToken(): Token {
			return this.tokens[++this.position];
	}

	private expectToken(type: TokenType, value?: string): Token {
			const token = this.currentToken();
			if (token.type !== type || (value && token.value !== value)) {
					throw new Error(`Expected token type ${type} with value "${value}", but got ${token.type} with value "${token.value}"`);
			}
			this.nextToken();
			return token;
	}

	public parseProgram(): ASTNode {
			const statements = [];
			while (this.currentToken().type !== TokenType.EOF) {
					statements.push(this.parseStatement());
			}
			return new ASTNode(ASTNodeType.Program, null, statements);
	}

	private parseStatement(): ASTNode {
			switch (this.currentToken().type) {
					case TokenType.Keyword:
							switch (this.currentToken().value) {
									case "let":
											return this.parseVariableDeclaration();
									case "if":
											return this.parseIfStatement();
									case "return":
											return this.parseReturnStatement();
									case "match":
											return this.parseMatchExpression();
							}
							break;
					case TokenType.Identifier:
							return this.parseAssignment();
			}
			throw new Error(`Unexpected token: ${this.currentToken().value}`);
	}

	private parseVariableDeclaration(): ASTNode {
			this.expectToken(TokenType.Keyword, "let"); // 'let'
			const identifier = this.expectToken(TokenType.Identifier);
			this.expectToken(TokenType.Operator, "="); // '='
			const expression = this.parseExpression();
			this.expectToken(TokenType.Punctuation, ";"); // ';'
			return new ASTNode(ASTNodeType.VariableDeclaration, identifier.value, [expression]);
	}

	private parseAssignment(): ASTNode {
			const identifier = this.expectToken(TokenType.Identifier);
			this.expectToken(TokenType.Operator, "="); // '='
			const expression = this.parseExpression();
			this.expectToken(TokenType.Punctuation, ";"); // ';'
			return new ASTNode(ASTNodeType.Assignment, identifier.value, [expression]);
	}

	private parseIfStatement(): ASTNode {
			this.expectToken(TokenType.Keyword, "if"); // 'if'
			const condition = this.parseExpression();
			if (this.currentToken().value === 'then') {
				this.expectToken(TokenType.Keyword, "then")
			}
			const consequent = this.parseBlock();
			let alternate: ASTNode;
			if (this.currentToken().value === 'else') {
					this.nextToken();
					alternate = this.parseBlock();
					return new ASTNode(ASTNodeType.IfStatement, null, [condition, consequent, alternate]);
			}
			return new ASTNode(ASTNodeType.IfStatement, null, [condition, consequent]);
	}

	private parseReturnStatement(): ASTNode {
			this.expectToken(TokenType.Keyword, "return"); // 'return'
			const expression = this.parseExpression();
			this.expectToken(TokenType.Punctuation, ";"); // ';'
			return new ASTNode(ASTNodeType.ReturnStatement, null, [expression]);
	}

	private parseMatchExpression(): ASTNode {
			this.expectToken(TokenType.Keyword, "match"); // 'match'
			const identifier = this.expectToken(TokenType.Identifier);
			this.expectToken(TokenType.Punctuation, "{"); // '{'
			const cases = [];
			while (this.currentToken().value !== '}') {
					const pattern = this.expectToken(TokenType.Identifier); // pattern
					this.expectToken(TokenType.Operator, "=>"); // '=>'
					const block = this.parseBlock();
					cases.push(new ASTNode(ASTNodeType.MatchExpression, pattern.value, [block]));
			}
			this.expectToken(TokenType.Punctuation, "}"); // '}'
			return new ASTNode(ASTNodeType.MatchExpression, identifier.value, cases);
	}

	private parseExpression(): ASTNode {
			return this.parseComparisonExpression();
	}

	private parseComparisonExpression(): ASTNode {
			let node = this.parseArithmeticExpression();
			while (this.currentToken().type === TokenType.Operator &&
						 (this.currentToken().value === '==' || this.currentToken().value === '!=' ||
							this.currentToken().value === '<=' || this.currentToken().value === '>=' ||
							this.currentToken().value === '<' || this.currentToken().value === '>')) {
					const operator = this.nextToken();
					const right = this.parseArithmeticExpression();
					node = new ASTNode(ASTNodeType.ComparisonExpression, operator.value, [node, right]);
			}
			return node;
	}

	private parseArithmeticExpression(): ASTNode {
			let node = this.parseTerm();
			while (this.currentToken().type === TokenType.Operator && (this.currentToken().value === '+' || this.currentToken().value === '-')) {
					const operator = this.nextToken();
					const right = this.parseTerm();
					node = new ASTNode(ASTNodeType.ArithmeticExpression, operator.value, [node, right]);
			}
			return node;
	}

	private parseTerm(): ASTNode {
			let node = this.parseFactor();
			while (this.currentToken().type === TokenType.Operator && (this.currentToken().value === '*' || this.currentToken().value === '/')) {
					const operator = this.nextToken();
					const right = this.parseFactor();
					node = new ASTNode(ASTNodeType.ArithmeticExpression, operator.value, [node, right]);
			}
			return node;
	}

	private parseFactor(): ASTNode {
			const token = this.currentToken();
			switch (token.type) {
					case TokenType.Identifier:
							this.nextToken();
							return new ASTNode(ASTNodeType.Identifier, token.value);
					case TokenType.Number:
							this.nextToken();
							return new ASTNode(ASTNodeType.NumberLiteral, token.value);
					case TokenType.String:
							this.nextToken();
							return new ASTNode(ASTNodeType.StringLiteral, token.value);
					case TokenType.Punctuation:
							if (token.value === '(') {
									this.nextToken();
									const expression = this.parseExpression();
									this.expectToken(TokenType.Punctuation, ")"); // ')'
									return expression;
							}
							break;
					case TokenType.Keyword:
							if (token.value === "if") {
									return this.parseIfStatement();
							}
							break;
			}
			throw new Error(`Unexpected token: ${token.value}`);
	}

	private parseBlock(): ASTNode {
			this.expectToken(TokenType.Punctuation, "{"); // '{'
			const statements = [];
			while (this.currentToken().type !== TokenType.Punctuation || this.currentToken().value !== "}") {
					statements.push(this.parseStatement());
			}
			this.expectToken(TokenType.Punctuation, "}"); // '}'
			return new ASTNode(ASTNodeType.Block, null, statements);
	}
}

