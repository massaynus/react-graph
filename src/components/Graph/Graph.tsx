import { Background, Edge, Node, NodeMouseHandler, ReactFlow } from '@xyflow/react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { graphActions, graphSelectors, UIGraphNode } from '../../redux/graph/slice';
import { useEffect } from 'react';
import { NodeAllowedChildrenTypes } from '../../lib/nodes/NodeConfig';
import { NodeType } from '../../lib/nodes/NodeTypes';
import { GraphNode } from '../../lib/nodes/GraphNode';

const NODE_WIDTH = 150;
const NODE_HEIGHT = 100;

const Graph: React.FC = () => {
    const dispatch = useAppDispatch()
    const rawNodes = useAppSelector(graphSelectors.selectNodes);
    const rawEdges = useAppSelector(graphSelectors.selectEdges);

    const nodesPerLevel = rawNodes.reduce((acc, curr) => {
        const { depth } = curr
        return depth in acc ? { ...acc, [depth]: acc[depth].concat(curr) } : { ...acc, [depth]: [curr] }

    }, {} as Record<number, UIGraphNode[]>)

    const nodes: Node[] = Object.values(nodesPerLevel).flatMap(lvlNodes => {
        return lvlNodes.map((node, idx) => ({
            id: node.nodeId,
            position: { x: NODE_WIDTH * idx, y: node.depth * NODE_HEIGHT },
            data: { label: `{${node.nodeId}} ${node.nodeType} - ${node.data}`, type: node.nodeType },
        }))
    })

    const edges: Edge[] = rawEdges.map((edge) => ({
        id: `e${edge.source}-${edge.target}`,
        animated: true,
        source: edge.source,
        target: edge.target,
    }));

    useEffect(() => {
        console.table(nodesPerLevel)
        console.table(nodes.map(n => n.position))
        console.table(edges)
    }, [rawNodes, rawEdges]);

    const onNodeClick: NodeMouseHandler<Node> = (_, node) => {
        const targetNode = rawNodes.find(n => n.nodeId === node.id)
        if (typeof targetNode === 'undefined') return;

        const nodeType = node.data.type
        if (typeof nodeType === 'undefined') return;

        const allowedChildren = NodeAllowedChildrenTypes[nodeType as keyof typeof NodeType]
        if (typeof allowedChildren === 'undefined') return;

        const nodes = allowedChildren
            .map((chidType) => new GraphNode(
                Math.floor(Math.random() * 100000).toString(), chidType, "N/A"))

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

export default Graph;
