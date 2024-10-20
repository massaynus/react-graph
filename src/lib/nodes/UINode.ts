import { SerializedNode } from "./SerializedNode";


export type UIGraphNode<TData = unknown> = Omit<SerializedNode<TData>, "children">;
