import { Background, Controls, MiniMap, ReactFlow, useEdgesState, useNodesState } from '@xyflow/react';
import { useAppSelector } from '../redux/hooks';
import { graphSelectors } from '../redux/graph/slice';
import { useEffect } from 'react';

const NODE_WIDTH = 300;
const NODE_HEIGHT = 300;

const GraphRenderer: React.FC = () => {
    const rawNodes = useAppSelector(graphSelectors.selectNodes);
    const rawEdges = useAppSelector(graphSelectors.selectEdges);

    const nodes = rawNodes.map((node) => ({
        id: node.nodeId,
        position: { x: node.idx * NODE_WIDTH, y: node.depth * NODE_HEIGHT },
        data: { label: `${node.nodeType} - ${node.data}` },
    }));

    const edges = rawEdges.map((edge) => ({
        id: `e${edge.source}-${edge.target}`,
        source: edge.source,
        target: edge.target,
    }));

    const [stateNodes] = useNodesState(nodes)
    const [stateEdges] = useEdgesState(edges)

    useEffect(() => {
        console.log(rawNodes, rawEdges);
        console.log(nodes, edges);
    }, [rawNodes, rawEdges]);

    return (
        <div style={{ width: '80vw', height: '80vh' }}>
            <ReactFlow nodes={stateNodes} edges={stateEdges} fitView minZoom={0.1}>
                <MiniMap />
                <Controls />
                <Background />
            </ReactFlow>
        </div>
    );
};

export default GraphRenderer;
