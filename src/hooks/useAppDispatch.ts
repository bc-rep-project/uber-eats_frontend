import { useDispatch } from 'react-redux';
import type { ThunkDispatch } from 'redux-thunk';
import type { AnyAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Use throughout your app instead of plain `useDispatch`
export const useAppDispatch = () => useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>(); 