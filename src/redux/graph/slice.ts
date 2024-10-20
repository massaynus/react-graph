import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SerializedNode } from '../../lib/nodes/SerializedNode';
import { AppRootState } from '../store';
import { NodeType } from '../../lib/nodes/NodeTypes';
import { GraphNode } from '../../lib/nodes/GraphNode';

export interface AddNodePayload {
  parent: SerializedNode;
  child: SerializedNode;
}

export type UIGraphNode<TData = unknown> = Omit<SerializedNode<TData>, 'children'>;

export interface Edge {
  source: string;
  target: string;
}

export interface IGraphSlice {
  root: SerializedNode;
  nodes: UIGraphNode[];
  edges: Edge[];
}

const initialState: IGraphSlice = {
  root: GraphNode.serialize(new GraphNode('root', NodeType.RootNode, 'NO DATA')),
  nodes: [],
  edges: [],
};

export const graphSlice = createSlice({
  name: 'graph',
  initialState,
  reducers: {
    setRootNode: (state, action: PayloadAction<SerializedNode>) => {
      state.root = action.payload;
    },
    setNodes: (state, action: PayloadAction<UIGraphNode[]>) => {
      state.nodes = action.payload;
    },
    setEdges: (state, action: PayloadAction<Edge[]>) => {
      state.edges = action.payload;
    },
  },
});

export const graphReducer = graphSlice.reducer;
export const graphActions = {
  ...graphSlice.actions,
  addNode: createAction<AddNodePayload>('graph/addNode'),
};

export const graphSelectors = {
  selectRootNode: (state: AppRootState): SerializedNode<unknown> => state.graph.root,
  selectEdges: (state: AppRootState): Edge[] => state.graph.edges,
  selectNodes: (state: AppRootState): UIGraphNode[] => state.graph.nodes,
};
