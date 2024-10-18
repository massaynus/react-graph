import { SerializedNode } from "./SerializedNode"

export default abstract class BaseNode<TNodeData = unknown> {
    readonly nodeId: string
    readonly nodeType: string

    protected allowedChildrenTypes: string[]

    protected readonly data: TNodeData
    protected readonly children: BaseNode[]

    constructor(nodeId: string, data: TNodeData) {
        this.nodeId = nodeId
        this.nodeType = this.constructor.name
        this.data = data
        this.children = []
        this.allowedChildrenTypes = [BaseNode.prototype.constructor.name]
    }

    public static getClassName(): string {
        return this.prototype.constructor.name
    }

    public find(nodeId: string): BaseNode | undefined {
        if (this.nodeId === nodeId) return this
        else return this.children.find(child => child.find(nodeId))

    }

    public addChild(child: BaseNode): void {
        const childClassName = child.constructor.name

        if (!this.allowedChildrenTypes.includes(childClassName)) {
            throw new Error(`cannot add node of unsupported type ${childClassName} to ${this.constructor.name}`)
        }

        this.children.push(child)
    }

    public getChildren(): BaseNode[] {
        return [...this.children]
    }

    public toString(): string {
        return JSON.stringify(BaseNode.serialize(this), null, 2)
    }

    public static buildNodesAndEdges(parent: BaseNode): { nodes: BaseNode[], edges: { from: string, to: string }[] } {
        if (parent.children.length === 0)
            return { nodes: [], edges: [] }

        const nodesAndEdges = parent.children
            .map(child => this.buildNodesAndEdges(child))
            .reduce((acc, curr) => ({
                nodes: [...acc.nodes, ...curr.nodes],
                edges: [...acc.edges, ...curr.edges]
            }))

        return {
            nodes: [...nodesAndEdges.nodes, ...parent.children],
            edges: [...nodesAndEdges.edges, ...parent.children.map(child => ({ from: parent.nodeId, to: child.nodeId }))]
        }
    }

    public static isAcyclic(root: BaseNode): boolean {
        const { nodes } = this.buildNodesAndEdges(root)
        const uniqueNodes = new Set<string>(nodes.map(node => node.nodeId))

        return nodes.length === uniqueNodes.size
    }

    public static serialize<TData>(root: BaseNode<TData>): SerializedNode<TData> {
        return {
            nodeId: root.nodeId,
            nodeType: root.nodeType,
            allowedChildrenTypes: root.allowedChildrenTypes,
            data: root.data,
            children: root.children.map(child => this.serialize(child))
        }
    }

    public static deserialize(root: SerializedNode): BaseNode {
        const Type = typeMap[root.nodeType]
        const node = new Type(root.nodeId, root.data as any as never)
        root.children.forEach(child => node.addChild(this.deserialize(child)))

        return node
    }
}

export class CouponAssignmentNode extends BaseNode<string> {
    constructor(nodeId: string, offerId: string) {
        super(nodeId, offerId);
        this.allowedChildrenTypes = [];
    }
}

export class CommunicationNode extends BaseNode<string> {
    constructor(nodeId: string, email: string) {
        super(nodeId, email);
        this.allowedChildrenTypes = [];
    }
}

export class NoPurchaseNode extends BaseNode<undefined> {
    constructor(nodeId: string) {
        super(nodeId, undefined);
    }
}

export class PurchaseNode extends BaseNode<number> {
    constructor(nodeId: string, price: number) {
        super(nodeId, price);

        this.allowedChildrenTypes = [CommunicationNode.getClassName(), CouponAssignmentNode.getClassName()];
    }
}

export const typeMap = {
    [CommunicationNode.getClassName()]: CommunicationNode,
    [CouponAssignmentNode.getClassName()]: CouponAssignmentNode,
    [NoPurchaseNode.getClassName()]: NoPurchaseNode,
    [PurchaseNode.getClassName()]: PurchaseNode
};


