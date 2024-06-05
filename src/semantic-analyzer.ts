import { ASTNode, ASTNodeType } from './AST';

export class SemanticAnalyzer {
	public analyze(node: ASTNode): void {
			// console.log(`Analyzing node: ${JSON.stringify(node)}`);
			switch (node.type) {
					case ASTNodeType.Program:
							this.analyzeProgram(node);
							break;
					case ASTNodeType.VariableDeclaration:
							this.analyzeVariableDeclaration(node);
							break;
					case ASTNodeType.Assignment:
							this.analyzeAssignment(node);
							break;
					case ASTNodeType.IfStatement:
							this.analyzeIfStatement(node);
							break;
					case ASTNodeType.IfExpression:
							this.analyzeIfExpression(node);
							break;
					case ASTNodeType.MatchExpression:
							this.analyzeMatchExpression(node);
							break;
					case ASTNodeType.MatchCase:
							this.analyzeMatchCase(node);
							break;
					case ASTNodeType.ComparisonExpression:
							this.analyzeComparisonExpression(node);
							break;
					case ASTNodeType.ArithmeticExpression:
							this.analyzeArithmeticExpression(node);
							break;
					case ASTNodeType.Identifier:
							this.analyzeIdentifier(node);
							break;
					case ASTNodeType.NumberLiteral:
							this.analyzeNumberLiteral(node);
							break;
					case ASTNodeType.StringLiteral:
							this.analyzeStringLiteral(node);
							break;
					case ASTNodeType.Block:
							this.analyzeBlock(node);
							break;
					case ASTNodeType.ReturnStatement:
							this.analyzeReturnStatement(node);
							break;
					case ASTNodeType.FunctionDeclaration:
							this.analyzeFunctionDeclaration(node);
							break;
					case ASTNodeType.LambdaExpression:
							this.analyzeLambdaExpression(node);
							break;
					case ASTNodeType.Parameters:
							this.analyzeParameters(node);
							break;
					default:
							throw new Error(`Unknown AST node type: ${node.type}`);
			}
	}

	private analyzeProgram(node: ASTNode): void {
			for (const child of node.children) {
					this.analyze(child);
			}
	}

	private analyzeVariableDeclaration(node: ASTNode): void {
			this.analyze(node.children[0]);
	}

	private analyzeAssignment(node: ASTNode): void {
			this.analyze(node.children[0]);
	}

	private analyzeIfStatement(node: ASTNode): void {
			this.analyze(node.children[0]); // condition
			this.analyze(node.children[1]); // consequent
			if (node.children[2]) {
					this.analyze(node.children[2]); // alternate
			}
	}

	private analyzeIfExpression(node: ASTNode): void {
			this.analyze(node.children[0]); // condition
			this.analyze(node.children[1]); // consequent
			if (node.children[2]) {
					this.analyze(node.children[2]); // alternate
			}
	}

	private analyzeMatchExpression(node: ASTNode): void {
			this.analyze(node.children[0]); // matched expression
			for (const matchCase of node.children.slice(1)) {
					this.analyze(matchCase);
			}
	}

	private analyzeMatchCase(node: ASTNode): void {
			this.analyze(node.children[0]); // pattern
			this.analyze(node.children[1]); // result expression
	}

	private analyzeComparisonExpression(node: ASTNode): void {
			this.analyze(node.children[0]);
			this.analyze(node.children[1]);
	}

	private analyzeArithmeticExpression(node: ASTNode): void {
			this.analyze(node.children[0]);
			this.analyze(node.children[1]);
	}

	private analyzeIdentifier(node: ASTNode): void {
			// Identifier analysis logic
	}

	private analyzeNumberLiteral(node: ASTNode): void {
			// Number literal analysis logic
	}

	private analyzeStringLiteral(node: ASTNode): void {
			// String literal analysis logic
	}

	private analyzeBlock(node: ASTNode): void {
			for (const child of node.children) {
					this.analyze(child);
			}
	}

	private analyzeReturnStatement(node: ASTNode): void {
			this.analyze(node.children[0]);
	}

	private analyzeFunctionDeclaration(node: ASTNode): void {
			this.analyze(node.children[0]); // parameters
			this.analyze(node.children[1]); // body
	}

	private analyzeLambdaExpression(node: ASTNode): void {
			this.analyze(node.children[0]);
	}

	private analyzeParameters(node: ASTNode): void {
			for (const param of node.children) {
					this.analyze(param);
			}
	}
}

