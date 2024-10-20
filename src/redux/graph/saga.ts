import { type Effect, type ForkEffect, put, select, takeEvery } from 'redux-saga/effects';
import { type PayloadAction } from '@reduxjs/toolkit';
import { GraphNode } from '../../lib/nodes/GraphNode';
import { AddNodePayload, graphActions, graphSelectors } from './slice';

export function* addNode(action: PayloadAction<AddNodePayload>): Generator<Effect, void> {
  const { parent: serializedParent, child: serializedChild } = action.payload;

  const rootSerializedNode = yield select(graphSelectors.selectRootNode);

  const child = GraphNode.deserialize(serializedChild);
  const rootNode = GraphNode.deserialize(rootSerializedNode);

  // if (!!rootNode.find(child.nodeId))
  //   throw new Error(
  //     `Not commiting change, duplicate detected! node with id: ${child.nodeId} already in the graph`,
  //   );

  const parent = rootNode.find(serializedParent.nodeId);

  if (parent === undefined) {
    console.error(
      'IMPOSSIBLE',
      { serializedParent, serializedChild, rootSerializedNode },
      { child, parent, rootNode },
    );
    throw new Error(`Parent with id {${serializedParent.nodeId}} not found!`);
  }

  console.log("Saga", `Adding ${child.nodeId} to ${parent.nodeId}`, serializedParent.nodeId, serializedChild.nodeId)
  parent.addChild(child);

  yield put(graphActions.setRootNode(GraphNode.serialize(rootNode)));

  const nodesAndEdges = GraphNode.buildNodesAndEdges(rootNode);
  console.log(nodesAndEdges)
  yield put(graphActions.setNodes(nodesAndEdges.nodes));
  yield put(graphActions.setEdges(nodesAndEdges.edges));
}

export function* watchGraphSagas(): Generator<ForkEffect, void> {
  yield takeEvery(graphActions.addNode, addNode);
}

const graphSagas = watchGraphSagas;

export default graphSagas;
