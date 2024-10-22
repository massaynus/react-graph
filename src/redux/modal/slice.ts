import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppRootState } from '../store';
import { UIGraphNode } from '../graph/slice';

export enum ModalTypes {
  NodeActionModal,
}

export interface IModalSlice {
  isPortalOpen: boolean
  chosenModal?: ModalTypes
  bag?: Record<string, any>
}

const initialState: IModalSlice = {
  isPortalOpen: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setIsPortalOpen(state, action: PayloadAction<boolean>) {
      state.isPortalOpen = action.payload
    },
    setChosenModal(state, action: PayloadAction<ModalTypes | undefined>) {
      state.chosenModal = action.payload
    },
    setBag(state, action: PayloadAction<Record<string, any> | undefined>) {
      state.bag = action.payload
    }
  },
});

export const modalReducer = modalSlice.reducer;
export const modalActions = {
  ...modalSlice.actions,
  dismissModal: createAction('modals/dismissModal'),
  openNodeActionModal: createAction<UIGraphNode>('modals/openNodeActionModal'),

};

export const modalSelectors = {
  selectIsPortalOpen: (state: AppRootState) => state.modal.isPortalOpen,
  selectChosenModal: (state: AppRootState) => state.modal.chosenModal,
  selectBag: (state: AppRootState) => state.modal.bag,
};
