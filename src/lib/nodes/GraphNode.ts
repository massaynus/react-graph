import { Edge } from '../../redux/graph/slice';
import { SerializableNode } from './SerializableNode';

export class GraphNode<TNodeData = unknown> extends SerializableNode<TNodeData> {
  public static buildNodesAndEdges(parent: GraphNode): {
    nodes: GraphNode[];
    edges: Edge[];
  } {
    if (parent.children.length === 0) return { nodes: [], edges: [] };

    const nodesAndEdges = parent.children
      .map((child) => this.buildNodesAndEdges(child))
      .reduce((acc, curr) => ({
        nodes: [...acc.nodes, ...curr.nodes],
        edges: [...acc.edges, ...curr.edges],
      }));

    return {
      nodes: [...nodesAndEdges.nodes, ...parent.children],
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

  public static isAcyclic(root: GraphNode): boolean {
    const { nodes } = this.buildNodesAndEdges(root);
    const uniqueNodes = new Set<string>(nodes.map((node) => node.nodeId));

    return nodes.length === uniqueNodes.size;
  }
}
