import BaseNode from '../BaseNode';

export type SchedulableNodeData = {
  scheduled_at?: Date;
};

export type NodeValidator = (node: BaseNode) => boolean;
