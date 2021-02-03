import { Action, createReducer, on } from "@ngrx/store"
import * as actions from "../actions/dashboardAction"

export interface CounterState {
    counter: number
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

export function createCounterReducer(state: CounterState, action: Action){
    return counterReducer(state, action)
}