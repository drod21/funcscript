export enum ASTNodeType {
  Program,
  VariableDeclaration,
  Assignment,
  IfStatement,
  MatchExpression,
  IfExpression,
  ArithmeticExpression,
  ComparisonExpression,
  Identifier,
  NumberLiteral,
  StringLiteral,
  Block,
  ReturnStatement,
}

export class ASTNode {
  constructor(
    public type: ASTNodeType,
    public value: any,
    public children: ASTNode[] = []
  ) {}
}
