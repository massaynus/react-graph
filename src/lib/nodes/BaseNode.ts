import { NodeAllowedChildrenTypes, NodeKinds, NodeValidators } from './NodeConfig';
import { NodeType } from './NodeTypes';

export default abstract class BaseNode<TNodeData = unknown> {
  readonly nodeId: string;
  readonly nodeType: NodeType;
  readonly data: TNodeData;
  readonly children: BaseNode[];

  protected allowedChildrenTypes: NodeType[];
  protected parent: BaseNode | undefined

  constructor(nodeId: string, type: NodeType, data: TNodeData, parent: BaseNode | undefined = undefined) {
    this.nodeId = nodeId;
    this.nodeType = type;
    this.data = data;
    this.parent = parent
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
    child.parent = this

    const childType = child.nodeType;
    const validators = NodeValidators[childType]
    const isValid = Array.isArray(validators)
      ? validators.every(validator => validator(child))
      : validators(child)

    if (!this.allowedChildrenTypes.includes(childType)) {
      throw new Error(`cannot add node of unsupported type ${childType} to ${this.nodeType}`);
    }

    if (!isValid)
      throw new Error(`Invalid node`)

    this.children.push(child);
  }

  public get getParent(): BaseNode | undefined {
    return this.parent
  }

  public get actionType(): keyof typeof NodeKinds {
    const actionType = Object.keys(NodeKinds).find(key => NodeKinds[key].includes(this.nodeType))
    if (typeof actionType === 'undefined') throw new Error('UNSUPPORTED ACTION NODE')
    return actionType
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
