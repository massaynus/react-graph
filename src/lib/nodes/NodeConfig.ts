import { NodeType } from './NodeTypes';
import { NodeValidator } from './types/Common';
import { defaultValidator } from './validators/defaultValidator';
import { scheduledNodeValidator } from './validators/schedulableNodeValidator';

export const NodeAllowedChildrenTypes: Record<NodeType, NodeType[]> = {
  [NodeType.CommunicationNode]: [],
  [NodeType.CouponAssignmentNode]: [],
  [NodeType.PurchaseNode]: [NodeType.CommunicationNode, NodeType.CouponAssignmentNode],
  [NodeType.NoPurchaseNode]: [NodeType.CommunicationNode, NodeType.CouponAssignmentNode],
  [NodeType.TargetGroupNode]: [NodeType.PurchaseNode, NodeType.NoPurchaseNode],
  [NodeType.RootNode]: [NodeType.TargetGroupNode],
};

export const NodeKinds: Record<string, NodeType[]> = {
  system: [NodeType.CommunicationNode, NodeType.CouponAssignmentNode],
  user: [NodeType.PurchaseNode, NodeType.NoPurchaseNode]
}

export const NodeValidators: Record<NodeType, NodeValidator | NodeValidator[]> = {
  [NodeType.CommunicationNode]: [defaultValidator, scheduledNodeValidator],
  [NodeType.CouponAssignmentNode]: defaultValidator,
  [NodeType.PurchaseNode]: defaultValidator,
  [NodeType.NoPurchaseNode]: defaultValidator,
  [NodeType.TargetGroupNode]: defaultValidator,
  [NodeType.RootNode]: defaultValidator,
};