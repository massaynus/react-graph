import { NodeAllowedChildrenTypes } from './NodeConfig';
import { NodeType } from './NodeTypes';

export default abstract class BaseNode<TNodeData = unknown> {
  readonly nodeId: string;
  readonly nodeType: NodeType;
  readonly data: TNodeData;
  readonly children: BaseNode[];

  protected allowedChildrenTypes: NodeType[];

  constructor(nodeId: string, type: NodeType, data: TNodeData) {
    this.nodeId = nodeId;
    this.nodeType = type;
    this.data = data;
    this.children = [];
    this.allowedChildrenTypes = NodeAllowedChildrenTypes[type];
  }

  public static getClassName(): string {
    return this.prototype.constructor.name;
  }

  public find(nodeId: string): BaseNode | undefined {
    if (this.nodeId === nodeId) return this;

    for (const child of this.children) {
      const foundNode = child.find(nodeId);
      if (typeof foundNode !== 'undefined') return foundNode;
    }

    return undefined;
  }

  public addChild(child: BaseNode): void {
    const childType = child.nodeType;

    if (!this.allowedChildrenTypes.includes(childType)) {
      throw new Error(`cannot add node of unsupported type ${childType} to ${this.nodeType}`);
    }

    this.children.push(child);
  }

  public get getChildren(): BaseNode[] {
    return [...this.children];
  }

  public get getAllowedChildren(): NodeType[] {
    return [...this.allowedChildrenTypes];
  }

  public toString(): string {
    return JSON.stringify(this, null, 2);
  }
}
