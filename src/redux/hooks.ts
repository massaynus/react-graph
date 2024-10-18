import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { type AppDispatch, type AppRootState } from './store';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;
