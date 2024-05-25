export enum ASTNodeType {
	Program,
	VariableDeclaration,
	Assignment,
	IfStatement,
	IfExpression,
	MatchExpression,
	MatchCase,
	ComparisonExpression,
	ArithmeticExpression,
	Identifier,
	NumberLiteral,
	StringLiteral,
	Block,
	ReturnStatement,
	FunctionDeclaration,
	LambdaExpression,
	Parameters
}

export class ASTNode {
  constructor(
    public type: ASTNodeType,
    public value: any,
    public children: ASTNode[] = []
  ) {}
}
