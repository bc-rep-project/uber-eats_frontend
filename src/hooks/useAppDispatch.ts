import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';

export const useAppDispatch = () => useDispatch<ThunkDispatch<AppDispatch, unknown, AnyAction>>(); 