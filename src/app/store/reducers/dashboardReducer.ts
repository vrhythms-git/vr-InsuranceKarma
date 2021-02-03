import { Action, createReducer, on } from "@ngrx/store"
import * as actions from "../actions/dashboardAction"

export interface CounterState {
    counter: number
}

export interface UserData{
    stateUserData: any;
}

export const userDataInitialState: UserData= {
    stateUserData: {}
}

export const initialState: CounterState= {
    counter: 0
}

const counterReducer = createReducer(initialState, on(actions.incrementAct, state => ({
    ...state,
    counter: state.counter + 1
})),
    on(actions.decrementAct, state => ({
        ...state,
        counter : state.counter - 1
    })
))

const updateUserDataReducer = createReducer(userDataInitialState, on(actions.updateUserDataAct, (state, {data}) =>({
    stateUserData : data
})))

export function createCounterReducer(state: CounterState, action: Action){
    return counterReducer(state, action)
}

export function createUserDataStateReducer(state: UserData, action: Action){
    return updateUserDataReducer(state, action);
}