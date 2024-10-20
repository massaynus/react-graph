import { Edge, UIGraphNode } from '../../redux/graph/slice';
import BaseNode from './BaseNode';
import { SerializableNode } from './SerializableNode';
import { SerializedNode } from './SerializedNode';

export class GraphNode<TNodeData = unknown> extends SerializableNode<TNodeData> {
  public static buildNodesAndEdges(unserializedParent: GraphNode | SerializedNode): {
    nodes: UIGraphNode[];
    edges: Edge[];
  } {
    const parent: SerializedNode =
      unserializedParent instanceof BaseNode ? GraphNode.serialize(unserializedParent) : unserializedParent;

    if (parent.children.length === 0) return { nodes: [parent], edges: [] };

    const nodesAndEdges = parent.children
      .map((child) => this.buildNodesAndEdges(child))
      .reduce((acc, curr) => ({
        nodes: [...acc.nodes, ...curr.nodes],
        edges: [...acc.edges, ...curr.edges],
      }));

    return {
      nodes: [parent, ...nodesAndEdges.nodes],
      edges: [
        ...nodesAndEdges.edges,
        ...parent.children.map((child) => ({
          id: `edge:${parent.nodeId}-${child.nodeId}`,
          source: parent.nodeId,
          target: child.nodeId,
        })),
      ],
    };
  }

  public static containsNode(root: GraphNode): boolean {
    const { nodes } = this.buildNodesAndEdges(root);
    const uniqueNodes = new Set<string>(nodes.map((node) => node.nodeId));

    return uniqueNodes.has(root.nodeId)
  }
}
