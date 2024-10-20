import { MiniMap, ReactFlow } from '@xyflow/react';
import { useAppSelector } from '../redux/hooks';
import { graphSelectors } from '../redux/graph/slice';

import '@xyflow/react/dist/style.css';

const NODE_WIDTH = 300;
const NODE_HEIGHT = 300;

const GraphRenderer: React.FC = () => {
    const nodes = useAppSelector(graphSelectors.selectNodes).map((node) => ({
        id: node.nodeId,
        position: { x: node.idx * NODE_WIDTH, y: node.depth * NODE_HEIGHT },
        data: { label: `${node.nodeType} - ${node.data}` },
    }));

    const edges = useAppSelector(graphSelectors.selectEdges).map((edge) => ({
        id: `${edge.source}-${edge.target}`,
        source: edge.source,
        target: edge.target,
    }));

    return (
        <div style={{ width: '80vw', height: '80vh', background: 'red' }}>
            <ReactFlow nodes={nodes} edges={edges} fitView>
                <MiniMap />
            </ReactFlow>
        </div>
    );
};

export default GraphRenderer;
