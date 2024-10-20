import { NodeType } from './NodeTypes';

export const NodeAllowedChildrenTypes: Record<NodeType, NodeType[]> = {
  [NodeType.CommunicationNode]: [],
  [NodeType.CouponAssignmentNode]: [],
  [NodeType.PurchaseNode]: [NodeType.CommunicationNode, NodeType.CouponAssignmentNode],
  [NodeType.NoPurchaseNode]: [NodeType.CommunicationNode, NodeType.CouponAssignmentNode],
  [NodeType.TargetGroupNode]: [NodeType.PurchaseNode, NodeType.NoPurchaseNode],
  [NodeType.RootNode]: [NodeType.TargetGroupNode]
};
