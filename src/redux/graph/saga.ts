import { type Effect, type ForkEffect, put, select, takeEvery } from 'redux-saga/effects';

import { type PayloadAction } from '@reduxjs/toolkit';

import { GraphNode } from "../../lib/nodes/GraphNode";

import { AddNodePayload, graphActions, graphSelectors } from './slice';
import { UIGraphNode } from '../../lib/nodes/UINode';

export function* addNode(action: PayloadAction<AddNodePayload>): Generator<Effect, void> {
  const { parent: serializedParent, child: serializedChild } = action.payload
  const rootSerializedNode = yield select(graphSelectors.selectRootNode)

  const child = GraphNode.deserialize(serializedChild)
  const rootNode = GraphNode.deserialize(rootSerializedNode)

  if (!!rootNode.find(child.nodeId))
    throw new Error(`Not commiting change, duplicate detected! node with id: ${child.nodeId} already in the graph`)

  const parent = rootNode.find(serializedParent.nodeId)

  if (parent === undefined) {
    console.error("IMPOSSIBLE", { serializedParent, serializedChild, rootSerializedNode }, { child, parent, rootNode })
    throw new Error(`Parent with id {${serializedParent.nodeId}} not found!`)
  }

  parent.addChild(child)
  const nodeAndEdges = GraphNode.buildNodesAndEdges(rootNode)

  yield put(graphActions.setRootNode(GraphNode.serialize(rootNode)))

  yield put(graphActions.setNodes(nodeAndEdges.nodes.map(node => GraphNode.serialize<typeof node.data>(node) as UIGraphNode)))
  yield put(graphActions.setEdges(nodeAndEdges.edges))
}

export function* watchGraphSagas(): Generator<ForkEffect, void> {
  yield takeEvery(graphActions.addNode, addNode);
}

const graphSagas = watchGraphSagas;

export default graphSagas;
