import {
  ASTNode,
  ASTNodeType,
  LogicalExpressionNode,
  BinaryOperationNode,
} from './AST';
import { Token, TokenType } from './lexer';

export class CodeGenerator {
  public generate(node: ASTNode): string {
    switch (node.type) {
      case ASTNodeType.Program:
        return this.generateProgram(node);
      case ASTNodeType.LogicalExpression:
        return this.generateLogicalExpression(node as LogicalExpressionNode);
      case ASTNodeType.VariableDeclaration:
        return this.generateVariableDeclaration(node);
      case ASTNodeType.Assignment:
        return this.generateAssignment(node);
      case ASTNodeType.IfStatement:
        return this.generateIfStatement(node);
      case ASTNodeType.IfExpression:
        return this.generateIfExpression(node);
      case ASTNodeType.MatchExpression:
        return this.generateMatchExpression(node);
      case ASTNodeType.MatchCase:
        return this.generateMatchCase(node);
      case ASTNodeType.ComparisonExpression:
        return this.generateComparisonExpression(node);
      case ASTNodeType.ArithmeticExpression:
        return this.generateArithmeticExpression(node);
      case ASTNodeType.Identifier:
        return this.generateIdentifier(node);
      case ASTNodeType.NumberLiteral:
        return this.generateNumberLiteral(node);
      case ASTNodeType.StringLiteral:
        return this.generateStringLiteral(node);
      case ASTNodeType.Block:
        return this.generateBlock(node);
      case ASTNodeType.ReturnStatement:
        return this.generateReturnStatement(node);
      case ASTNodeType.BinaryOperation:
        return this.visitBinaryOperationNode(node as BinaryOperationNode);
      default:
        throw new Error(`Unknown AST node type: ${node.type}`);
    }
  }

  private generateProgram(node: ASTNode): string {
    return node.children.map((child) => this.generate(child)).join('\n');
  }

  private generateVariableDeclaration(node: ASTNode): string {
    const identifier = node.value;
    const expression = this.generate(node.children[0]);
    return `let ${identifier} = ${expression};`;
  }

  private generateAssignment(node: ASTNode): string {
    const identifier = node.value;
    const expression = this.generate(node.children[0]);
    return `${identifier} = ${expression};`;
  }

  private generateIfStatement(node: ASTNode): string {
    const condition = this.generate(node.children[0]);
    const consequent = this.generate(node.children[1]);
    const alternate = node.children[2] ? this.generate(node.children[2]) : null;
    return `if (${condition}) ${consequent}${alternate ? ` else ${alternate}` : ''}`;
  }

  private generateIfExpression(node: ASTNode): string {
    const condition = this.generate(node.children[0]);
    const consequent = this.generate(node.children[1]);
    const alternate = node.children[2] ? this.generate(node.children[2]) : null;
    return `(${condition}) ? ${consequent} : ${alternate}`;
  }

  private generateMatchExpression(node: ASTNode): string {
    const value = node.value;
    const cases = node.children.map((child) => this.generate(child)).join('\n');
    return `(function(value) {
      ${cases}
    })(${value})`;
  }

  private generateMatchCase(node: ASTNode): string {
    const pattern = this.generate(node.children[0]);
    const expression = this.generate(node.children[1]);
    if (pattern === '_') {
      return `  return ${expression};`;
    }
    return `  if (value === ${pattern}) return ${expression};`;
  }

  private generateComparisonExpression(node: ASTNode): string {
    const left = this.generate(node.children[0]);
    const right = this.generate(node.children[1]);
    return `${left} ${node.value} ${right}`;
  }

  private generateArithmeticExpression(node: ASTNode): string {
    if (node instanceof BinaryOperationNode) {
      return this.visitBinaryOperationNode(node);
    }
    const left = this.generate(node.children[0]);
    const right = this.generate(node.children[1]);
    return `${left} ${node.value} ${right}`;
  }

  private generateIdentifier(node: ASTNode): string {
    return node.value;
  }

  private generateNumberLiteral(node: ASTNode): string {
    return node.value;
  }

  private generateStringLiteral(node: ASTNode): string {
    return `"${node.value}"`;
  }

  private generateLogicalExpression(node: LogicalExpressionNode): string {
    const left = this.generate(node.left);
    const right = this.generate(node.right);
    return `(${left} ${node.operator} ${right})`;
  }

  private generateBlock(node: ASTNode): string {
    const statements = node.children
      .map((child) => this.generate(child))
      .join('\n  ');
    return `{\n  ${statements}\n}`;
  }

  private generateReturnStatement(node: ASTNode): string {
    const expression = this.generate(node.children[0]);
    return `return ${expression};`;
  }

  private visitBinaryOperationNode(node: BinaryOperationNode): string {
    const left = this.generate(node.left);
    const right = this.generate(node.right);

    switch (node.operator.type) {
      case TokenType.AND:
        return `(${left} && ${right})`;
      case TokenType.OR:
        return `(${left} || ${right})`;
      case TokenType.Operator:
        return `(${left} ${node.operator.value} ${right})`;
      default:
        return `(${left} ${node.operator.value} ${right})`;
    }
  }
}
