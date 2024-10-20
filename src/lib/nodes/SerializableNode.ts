import BaseNode from "./BaseNode";
import { NodeType } from "./NodeTypes";
import { SerializedNode } from "./SerializedNode";


export class SerializableNode<TNodeData = unknown> extends BaseNode<TNodeData> {
    public static serialize<TData = unknown>(root: SerializableNode<TData>): SerializedNode<TData> {
        return {
            nodeId: root.nodeId,
            nodeType: root.nodeType.toString(),
            allowedChildrenTypes: root.getAllowedChildren,
            data: root.data,
            children: root.children.map(child => this.serialize(child))
        };
    }

    public static deserialize<TData = unknown>(root: SerializedNode): SerializableNode<TData> {
        const nodeType: NodeType = NodeType[root.nodeType as keyof typeof NodeType];
        if (nodeType === undefined) throw new Error("Unsupported node type detected!");

        const node = new SerializableNode<TData>(root.nodeId, nodeType, root.data as any as never);
        root.children.forEach(child => node.addChild(this.deserialize<typeof child.data>(child)));

        return node;
    }
}
