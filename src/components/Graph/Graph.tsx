import { Background, Edge, Node, NodeMouseHandler, ReactFlow } from '@xyflow/react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { graphSelectors, UIGraphNode } from '../../redux/graph/slice';
import { modalActions } from '../../redux/modal/slice';

const NODE_WIDTH = 150;
const NODE_HEIGHT = 100;

const Graph: React.FC = () => {
  const dispatch = useAppDispatch();
  const rawNodes = useAppSelector(graphSelectors.selectNodes);
  const rawEdges = useAppSelector(graphSelectors.selectEdges);

  const nodesPerLevel = rawNodes.reduce(
    (acc, curr) => {
      const { depth } = curr;
      return depth in acc
        ? { ...acc, [depth]: acc[depth].concat(curr) }
        : { ...acc, [depth]: [curr] };
    },
    {} as Record<number, UIGraphNode[]>,
  );

  const nodes: Node[] = Object.values(nodesPerLevel).flatMap((lvlNodes) => {
    return lvlNodes.map((node, idx) => ({
      id: node.nodeId,
      position: { x: NODE_WIDTH * idx, y: node.depth * NODE_HEIGHT },
      data: { label: `{${node.nodeId}} ${node.nodeType} - ${node.data}`, type: node.nodeType },
    }));
  });

  const edges: Edge[] = rawEdges.map((edge) => ({
    id: `e${edge.source}-${edge.target}`,
    animated: true,
    source: edge.source,
    target: edge.target,
  }));

  const onNodeClick: NodeMouseHandler<Node> = (_, _node) => {
    const node = rawNodes.find((n) => n.nodeId === _node.id);
    if (node !== undefined) dispatch(modalActions.openNodeActionModal(node));
  };

  return (
    <div style={{ width: '80vw', height: '80vh' }}>
      <ReactFlow nodes={nodes} edges={edges} fitView minZoom={0.1} onNodeClick={onNodeClick}>
        <Background />
      </ReactFlow>
    </div>
  );
};

export default Graph;
