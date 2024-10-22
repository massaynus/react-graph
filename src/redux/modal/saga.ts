import { Effect, put, takeEvery, type ForkEffect } from 'redux-saga/effects';
import { modalActions, ModalTypes } from './slice';
import { PayloadAction } from '@reduxjs/toolkit';
import { UIGraphNode } from '../graph/slice';

export function* dismissModal(): Generator<Effect, void> {
  yield put(modalActions.setIsPortalOpen(false))
  yield put(modalActions.setChosenModal(undefined))
  yield put(modalActions.setBag(undefined))
}

export function* openNodeActionModal(action: PayloadAction<UIGraphNode>): Generator<Effect, void> {
  yield put(modalActions.setIsPortalOpen(true))
  yield put(modalActions.setChosenModal(ModalTypes.NodeActionModal))
  yield put(modalActions.setBag({ 'node': action.payload }))
}

export function* watchModalSagas(): Generator<ForkEffect, void> {
  yield takeEvery(modalActions.dismissModal, dismissModal);
  yield takeEvery(modalActions.openNodeActionModal, openNodeActionModal);
}

const modalSagas = watchModalSagas;

export default modalSagas;
