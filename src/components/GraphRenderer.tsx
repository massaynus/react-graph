import { Background, Edge, Node, NodeMouseHandler, ReactFlow } from '@xyflow/react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { graphActions, graphSelectors } from '../redux/graph/slice';
import { useEffect } from 'react';
import { NodeAllowedChildrenTypes } from '../lib/nodes/NodeConfig';
import { NodeType } from '../lib/nodes/NodeTypes';
import { GraphNode } from '../lib/nodes/GraphNode';

const NODE_WIDTH = 200;
const NODE_HEIGHT = 100;

const GraphRenderer: React.FC = () => {
    const dispatch = useAppDispatch()
    const rawNodes = useAppSelector(graphSelectors.selectNodes);
    const rawEdges = useAppSelector(graphSelectors.selectEdges);

    const nodesPerLevel = rawNodes.reduce((acc, curr) => {
        const { idx, depth } = curr
        return depth in acc && acc[depth] > idx ? acc : { ...acc, [depth]: idx + 1 }

    }, {} as Record<number, number>)

    const maxNodesPerLevel = Math.max(...Object.values(nodesPerLevel))

    const nodes: Node[] = rawNodes.map((node) => ({
        id: node.nodeId,
        position: { x: Math.floor(maxNodesPerLevel * NODE_WIDTH / (nodesPerLevel[node.depth] ?? 1) * (node.idx) * 2), y: node.depth * NODE_HEIGHT },
        data: { label: `${node.nodeType} - ${node.data}` },
        type: node.nodeType
    }));

    const edges: Edge[] = rawEdges.map((edge) => ({
        id: `e${edge.source}-${edge.target}`,
        animated: true,
        source: edge.source,
        target: edge.target,
    }));

    useEffect(() => {
        console.table({ maxNodesPerLevel })
        console.table(nodesPerLevel)
        console.table(nodes.map(n => n.position))
        console.table(edges)
    }, [rawNodes, rawEdges]);

    const onNodeClick: NodeMouseHandler<Node> = (_, node) => {
        const targetNode = rawNodes.find(n => n.nodeId === node.id)
        if (typeof targetNode === 'undefined') return;

        const nodeType = node.type
        if (typeof nodeType === 'undefined') return;

        const allowedChildren = NodeAllowedChildrenTypes[nodeType as keyof typeof NodeType]
        if (typeof allowedChildren === 'undefined') return;

        const nodes = allowedChildren
            .map((chidType) => new GraphNode(
                Math.floor(Math.random() * 100).toString(), chidType, "N/A"))

        nodes.forEach(node => dispatch(graphActions.addNode({
            parent: targetNode,
            child: node.serialize()
        })))
    }

    return (
        <div style={{ width: '80vw', height: '80vh' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                fitView
                minZoom={0.1}
                onNodeClick={onNodeClick}>
                <Background />
            </ReactFlow>
        </div>
    );
};

export default GraphRenderer;
