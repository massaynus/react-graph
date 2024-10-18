import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SerializedNode } from "../../lib/nodes/SerializedNode";
import { AppRootState } from '../store';

export interface AddNodePayload {
  parent: SerializedNode,
  child: SerializedNode
}

export interface Edge { from: string, to: string }

export interface IGraphSlice {
  root: SerializedNode | undefined,
  nodes: SerializedNode[],
  edges: Edge[]
}

const initialState: IGraphSlice = {
  root: undefined,
  nodes: [],
  edges: []
};

export const graphSlice = createSlice({
  name: 'graph',
  initialState,
  reducers: {
    setRootNode: (state, action: PayloadAction<SerializedNode>) => {
      state.root = action.payload
    },
    setNodes: (state, action: PayloadAction<SerializedNode[]>) => {
      state.nodes = action.payload
    },
    setEdges: (state, action: PayloadAction<Edge[]>) => {
      state.edges = action.payload
    }

  },
});

export const graphReducer = graphSlice.reducer
export const graphActions = {
  ...graphSlice.actions,
  addNode: createAction<AddNodePayload>("graph/addNode")
}

export const graphSelectors = {
  selectRootNode: (state: AppRootState): SerializedNode<unknown> | undefined => state.graph.root,
  selectEdges: (state: AppRootState): Edge[] => state.graph.edges
}
