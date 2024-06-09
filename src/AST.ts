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
  LogicalExpression,
  Identifier,
  NumberLiteral,
  StringLiteral,
  Block,
  ReturnStatement,
  FunctionDeclaration,
  LambdaExpression,
  Parameters,
}

export class ASTNode {
  constructor(
    public type: ASTNodeType,
    public value: any,
    public children: ASTNode[] = []
  ) {}
}

// Add node types for logical operations
export interface LogicalExpressionNode extends ASTNode {
  type: ASTNodeType.LogicalExpression;
  operator: string;
  left: ASTNode;
  right: ASTNode;
}
