import { ASTNode, ASTNodeType } from './AST';
import { Lexer } from './lexer';
import { Parser } from './parser';

export class SemanticAnalyzer {
  private scope: Map<string, string>;

  constructor() {
    this.scope = new Map();
  }

  public analyze(node: ASTNode): void {
    this.visit(node);
  }

  private visit(node: ASTNode): void {
    switch (node.type) {
      case ASTNodeType.Program:
        this.visitProgram(node);
        break;
      case ASTNodeType.VariableDeclaration:
        this.visitVariableDeclaration(node);
        break;
      case ASTNodeType.Assignment:
        this.visitAssignment(node);
        break;
      case ASTNodeType.IfStatement:
        this.visitIfStatement(node);
        break;
      case ASTNodeType.IfExpression:
        this.visitIfExpression(node);
        break;
      case ASTNodeType.MatchExpression:
        this.visitMatchExpression(node);
        break;
      case ASTNodeType.ComparisonExpression:
        this.visitComparisonExpression(node);
        break;
      case ASTNodeType.ArithmeticExpression:
        this.visitArithmeticExpression(node);
        break;
      case ASTNodeType.Identifier:
        this.visitIdentifier(node);
        break;
      case ASTNodeType.NumberLiteral:
        this.visitNumberLiteral(node);
        break;
      case ASTNodeType.StringLiteral:
        this.visitStringLiteral(node);
        break;
      case ASTNodeType.Block:
        this.visitBlock(node);
        break;
      case ASTNodeType.ReturnStatement:
        this.visitReturnStatement(node);
        break;
      default:
        throw new Error(`Unknown AST node type: ${node.type}`);
    }
  }

  private visitProgram(node: ASTNode): void {
    for (const child of node.children) {
      this.visit(child);
    }
  }

  private visitVariableDeclaration(node: ASTNode): void {
    const identifier = node.value;
    if (this.scope.has(identifier)) {
      throw new Error(`Variable '${identifier}' is already declared.`);
    }
    this.scope.set(identifier, 'immutable');
    this.visit(node.children[0]); // Visit the initializer expression
  }

  private visitAssignment(node: ASTNode): void {
    const identifier = node.value;
    if (!this.scope.has(identifier)) {
      throw new Error(`Variable '${identifier}' is not declared.`);
    }
    if (this.scope.get(identifier) === 'immutable') {
      throw new Error(`Cannot reassign to immutable variable '${identifier}'.`);
    }
    this.visit(node.children[0]); // Visit the assigned expression
  }

  private visitIfStatement(node: ASTNode): void {
    this.visit(node.children[0]); // Visit the condition
    this.visit(node.children[1]); // Visit the consequent block
    if (node.children[2]) {
      this.visit(node.children[2]); // Visit the alternate block if it exists
    }
  }

  private visitIfExpression(node: ASTNode): void {
    this.visit(node.children[0]); // Visit the condition
    this.visit(node.children[1]); // Visit the consequent expression
    this.visit(node.children[2]); // Visit the alternate expression
  }

  private visitMatchExpression(node: ASTNode): void {
    this.visit(node.children[0]); // Visit the match expression
    for (const matchCase of node.children.slice(1)) {
      this.visit(matchCase); // Visit each case expression
    }
  }

  private visitComparisonExpression(node: ASTNode): void {
    this.visit(node.children[0]); // Visit the left-hand side
    this.visit(node.children[1]); // Visit the right-hand side
  }

  private visitArithmeticExpression(node: ASTNode): void {
    this.visit(node.children[0]); // Visit the left-hand side
    this.visit(node.children[1]); // Visit the right-hand side
  }

  private visitIdentifier(node: ASTNode): void {
    if (!this.scope.has(node.value)) {
      throw new Error(`Variable '${node.value}' is not declared.`);
    }
  }

  private visitNumberLiteral(node: ASTNode): void {
    // Nothing to check for number literals
  }

  private visitStringLiteral(node: ASTNode): void {
    // Nothing to check for string literals
  }

  private visitBlock(node: ASTNode): void {
    for (const child of node.children) {
      this.visit(child);
    }
  }

  private visitReturnStatement(node: ASTNode): void {
    this.visit(node.children[0]); // Visit the return expression
  }
}

// Example usage
const sourceCode = `
let x = 2;
let y = match x {
1 => 10,
2 => 20,
_ => 0
};
if y > x { return y; }
`;
