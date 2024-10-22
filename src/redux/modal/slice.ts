import { createSlice } from '@reduxjs/toolkit';


export interface IModalSlice {
}

const initialState: IModalSlice = {
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
  },
});

export const modalReducer = modalSlice.reducer;
export const modalActions = {
  ...modalSlice.actions,

};

export const modalSelectors = {
};
