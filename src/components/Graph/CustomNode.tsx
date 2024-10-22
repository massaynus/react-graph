import { Handle, NodeProps, Position } from '@xyflow/react';

const CostumNode: React.FC<NodeProps> = ({
  id,
  data,
  targetPosition,
  isConnectable,
}: NodeProps) => {
  return (
    <>
      <Handle
        type="target"
        id={id}
        position={targetPosition ?? Position.Top}
        isConnectable={isConnectable}
      />
      {data?.label}
      <Handle
        type="source"
        id={id}
        position={targetPosition ?? Position.Bottom}
        isConnectable={isConnectable}
      />
    </>
  );
};

export default CostumNode;
