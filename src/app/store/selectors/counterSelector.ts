import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CounterState } from '../reducers/dashboardReducer';
import {UserData} from '../reducers/dashboardReducer';

export const selectCounterState = createFeatureSelector('counterState');
export const selectCounter = createSelector(selectCounterState, (counterState: CounterState) => counterState.counter);


export const selectUserDataState = createFeatureSelector('userDataState');
export const selectUserData = createSelector(selectUserDataState, (userDataState: UserData) => userDataState.stateUserData);
