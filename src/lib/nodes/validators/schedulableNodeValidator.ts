import BaseNode from "../BaseNode";
import { SchedulableNodeData } from "../types/Common";

export function scheduledNodeValidator(node: BaseNode<unknown>): boolean {
    const parent: BaseNode<SchedulableNodeData> | undefined = <BaseNode<SchedulableNodeData>>node.getParent
    if (typeof parent === 'undefined') return true

    const isScheduledAtPresent = 'scheduled_at' in parent.data && 'scheduled_at' in <SchedulableNodeData>node.data

    if (!isScheduledAtPresent) return false;

    const { scheduled_at: parent_scheduled_at } = parent.data
    const { scheduled_at: node_scheduled_at } = node.data as SchedulableNodeData

    if (typeof node_scheduled_at == 'undefined') return true;
    if (typeof parent_scheduled_at == 'undefined') return true;

    return false;
}