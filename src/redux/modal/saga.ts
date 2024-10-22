import { call, delay, Effect, fork, put, spawn, takeEvery, type ForkEffect } from 'redux-saga/effects';
import { modalActions, ModalTypes } from './slice';
import { PayloadAction } from '@reduxjs/toolkit';
import { UIGraphNode } from '../graph/slice';

export function* dismissModal(): Generator<Effect, void> {
  yield put(modalActions.setIsPortalOpen(false))
  yield put(modalActions.setChosenModal(undefined))
  yield put(modalActions.setBag(undefined))
}

export function* openNodeActionModal(action: PayloadAction<UIGraphNode>): Generator<Effect, void> {
  // yield call(openModal, ModalTypes.NodeActionModal, { 'node': action.payload })
  yield put(modalActions.setBag({ 'node': action.payload }))
  yield put(modalActions.setChosenModal(ModalTypes.NodeActionModal))
  yield put(modalActions.setIsPortalOpen(true))
}

export function* openAddNodeModal(action: PayloadAction<UIGraphNode>): Generator<Effect, void> {
  // yield call(openModal, ModalTypes.AddNodeModal, { 'node': action.payload })
  yield put(modalActions.setBag({ 'node': action.payload }))
  yield put(modalActions.setChosenModal(ModalTypes.AddNodeModal))
  yield put(modalActions.setIsPortalOpen(true))
}

function* openModal(type: ModalTypes, bag: Record<string, any>): Generator<Effect, void> {
  yield put(modalActions.setBag(bag))
  yield put(modalActions.setChosenModal(type))
  yield put(modalActions.setIsPortalOpen(true))
}

export function* watchModalSagas(): Generator<ForkEffect, void> {
  yield takeEvery(modalActions.dismissModal, dismissModal);
  yield takeEvery(modalActions.openNodeActionModal, openNodeActionModal);
  yield takeEvery(modalActions.openAddNodeModal, openAddNodeModal);
}

const modalSagas = watchModalSagas;

export default modalSagas;
