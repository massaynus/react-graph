import { type ForkEffect } from 'redux-saga/effects';


export function* watchModalSagas(): Generator<ForkEffect, void> {
  // yield takeEvery(graphActions.addNode, addNode);
}

const modalSagas = watchModalSagas;

export default modalSagas;
