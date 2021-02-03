import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CounterState } from '../reducers/dashboardReducer';

export const selectCounterState = createFeatureSelector('counterState');
export const selectCounter = createSelector(selectCounterState, (counterState: CounterState) => counterState.counter);
