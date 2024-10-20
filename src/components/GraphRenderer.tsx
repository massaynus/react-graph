import { Background, Controls, Edge, MiniMap, Node, ReactFlow } from '@xyflow/react';
import { useAppSelector } from '../redux/hooks';
import { graphSelectors } from '../redux/graph/slice';
import { useEffect } from 'react';

const NODE_WIDTH = 200;
const NODE_HEIGHT = 100;

const GraphRenderer: React.FC = () => {
    const rawNodes = useAppSelector(graphSelectors.selectNodes);
    const rawEdges = useAppSelector(graphSelectors.selectEdges);

    const nodes: Node[] = rawNodes.map((node) => ({
        id: node.nodeId,
        position: { x: node.idx * NODE_WIDTH, y: node.depth * NODE_HEIGHT },
        data: { label: `${node.nodeType} - ${node.data}` },
    }));

    const edges: Edge[] = rawEdges.map((edge) => ({
        id: `e${edge.source}-${edge.target}`,
        animated: true,
        source: edge.source,
        target: edge.target,
    }));

    useEffect(() => {
        console.log("Render:", JSON.stringify({ nodes, edges }));
    }, [rawNodes, rawEdges]);

    return (
        <div style={{ width: '80vw', height: '80vh' }}>
            <ReactFlow nodes={nodes} edges={edges} fitView minZoom={0.1}>
                <MiniMap />
                <Controls />
                <Background />
            </ReactFlow>
        </div>
    );
};

export default GraphRenderer;
