import { all, type AllEffect, fork, type ForkEffect } from 'redux-saga/effects';

import graphSagas from './graph/saga';

export default function* rootSaga(): Generator<AllEffect<ForkEffect<void>>, void, unknown> {
  yield all([fork(graphSagas)]);
}
