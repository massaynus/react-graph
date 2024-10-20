import { NodeType } from "./NodeTypes"
import { SerializedNode } from "./SerializedNode"

export default abstract class BaseNode<TNodeData = unknown> {
    readonly nodeId: string
    readonly nodeType: NodeType
    readonly data: TNodeData
    readonly children: BaseNode[]

    protected allowedChildrenTypes: NodeType[]

    constructor(nodeId: string, data: TNodeData) {
        this.nodeId = nodeId
        this.nodeType = NodeType[this.constructor.name as keyof typeof NodeType]
        this.data = data
        this.children = []
        this.allowedChildrenTypes = []
    }

    public static getClassName(): string {
        return this.prototype.constructor.name
    }

    public find(nodeId: string): BaseNode | undefined {
        if (this.nodeId === nodeId) return this
        else return this.children.find(child => child.find(nodeId))

    }

    public addChild(child: BaseNode): void {
        const childClassName = child.nodeType

        if (!this.allowedChildrenTypes.includes(childClassName)) {
            throw new Error(`cannot add node of unsupported type ${childClassName} to ${this.constructor.name}`)
        }

        this.children.push(child)
    }

    public get getChildren(): BaseNode[] {
        return [...this.children]
    }

    public get getAllowedChildren(): NodeType[] {
        return [...this.allowedChildrenTypes]
    }

    public toString(): string {
        return JSON.stringify(this, null, 2)
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

}

export class SerializableNode<TNodeData = unknown> extends BaseNode<TNodeData> {
    public static serialize<TData>(root: BaseNode<TData>): SerializedNode<TData> {
        return {
            nodeId: root.nodeId,
            nodeType: root.nodeType.toString(),
            allowedChildrenTypes: root.getAllowedChildren,
            data: root.data,
            children: root.children.map(child => this.serialize(child))
        }
    }

    public static deserialize(root: SerializedNode): BaseNode {
        const nodeType: NodeType = NodeType[root.nodeType as keyof typeof NodeType]
        if (nodeType === undefined) throw new Error("Unsupported node type detected!")

        const Type = typeMap[nodeType]
        const node = new Type(root.nodeId, root.data as any as never)
        root.children.forEach(child => node.addChild(this.deserialize(child)))

        return node
    }
}

export class CouponAssignmentNode extends SerializableNode<string> {
}

export class CommunicationNode extends SerializableNode<string> {
}

export class NoPurchaseNode extends SerializableNode<undefined> {
}

export class PurchaseNode extends SerializableNode<number> {
    constructor(nodeId: string, price: number) {
        super(nodeId, price);

        this.allowedChildrenTypes.push(...[NodeType.CommunicationNode, NodeType.CouponAssignmentNode]);
    }
}

export const typeMap: Record<NodeType, typeof SerializableNode<unknown>> = {
    [NodeType.CommunicationNode]: CommunicationNode,
    [NodeType.CouponAssignmentNode]: CouponAssignmentNode,
    [NodeType.NoPurchaseNode]: NoPurchaseNode,
    [NodeType.PurchaseNode]: PurchaseNode
};


