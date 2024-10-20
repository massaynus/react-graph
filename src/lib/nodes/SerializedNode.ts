export interface SerializedNode<TData = unknown> {
  nodeId: string;
  nodeType: string;

  allowedChildrenTypes: string[];

  data: TData;
  children: SerializedNode[];

  depth: number;
  idx: number;
}
