import { type Effect, type ForkEffect, put, select, takeEvery } from 'redux-saga/effects';

import { type PayloadAction } from '@reduxjs/toolkit';

import BaseNode, { SerializableNode } from '../../lib/nodes/BaseNode';

import { AddNodePayload, graphActions, graphSelectors } from './slice';
import { SerializedNode } from '../../lib/nodes/SerializedNode';

export function* addNode(action: PayloadAction<AddNodePayload>): Generator<Effect, void> {
  const { parent: serializedParent, child: serializedChild } = action.payload
  const child = SerializableNode.deserialize(serializedChild)

  const rootSerializedNode = yield select(graphSelectors.selectRootNode)
  const rootNode = SerializableNode.deserialize(rootSerializedNode as SerializedNode<unknown>)
  const parent = rootNode.find(serializedParent.nodeId)

  if (parent !== undefined)
    parent.addChild(child)
  else console.error("IMPOSSIBLE", { serializedParent, serializedChild, rootSerializedNode }, { child, parent, rootNode })

  if (!BaseNode.isAcyclic(rootNode))
    throw new Error(`Not commiting change, cycle detected! node with id: ${child.nodeId} already in the graph`)

  const nodeAndEdges = BaseNode.buildNodesAndEdges(rootNode)

  yield put(graphActions.setRootNode(SerializableNode.serialize(rootNode)))
  yield put(graphActions.setNodes(nodeAndEdges.nodes.map(node => SerializableNode.serialize(node))))
  yield put(graphActions.setEdges(nodeAndEdges.edges))
}

export function* watchCounterSagas(): Generator<ForkEffect, void> {
  yield takeEvery(graphActions.addNode, addNode);
}

const counterSagas = watchCounterSagas;

export default counterSagas;
