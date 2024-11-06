import { Token } from './lexer';

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
  BinaryOperation,
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

export class BinaryOperationNode extends ASTNode {
  constructor(
    public left: ASTNode,
    public operator: Token,
    public right: ASTNode
  ) {
    super(ASTNodeType.BinaryOperation, operator.value, [left, right]);
  }
}
