import { useDispatch } from 'react-redux';
import { AnyAction } from '@reduxjs/toolkit';
import { ThunkDispatch } from 'redux-thunk';
import type { RootState } from '../store';

// Use throughout your app instead of plain `useDispatch`
export const useAppDispatch = () => useDispatch<ThunkDispatch<RootState, undefined, AnyAction>>(); 