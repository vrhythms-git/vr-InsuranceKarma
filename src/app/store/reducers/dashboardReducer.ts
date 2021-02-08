import { Action, createReducer, on } from "@ngrx/store"
import * as actions from "../actions/dashboardAction"

export interface CounterState {
    counter: number
}

export interface UserData {
    stateUserData: any;
}

export interface CalculatedPremium {
    newPremiumData: any;
}

export const userDataInitialState: UserData = {
    stateUserData: {}
}

export const CalculatedPremiumInitialState: CalculatedPremium = {
    newPremiumData: 0
}

export const initialState: CounterState = {
    counter: 0
}

const counterReducer = createReducer(initialState, on(actions.incrementAct, state => ({
    ...state,
    counter: state.counter + 1
})),
    on(actions.decrementAct, state => ({
        ...state,
        counter: state.counter - 1
    })
    ))

const updateUserDataReducer = createReducer(userDataInitialState,
    on(actions.updateUserDataAct, (state,  {data} ) => temp(state, data)),
)

function temp(state, data){

    console.log("state is :" + JSON.stringify(data))
    return ({
        stateUserData: data
    })
}

const updateNewPremiumDataReducer = createReducer(CalculatedPremiumInitialState,
    on(actions.newPremiumDataAct, (state, { newPremiumData }) => ({
        // ...state,
        newPremiumData: newPremiumData
    }))
    )

export function createCounterReducer(state: CounterState, action: Action) {
    return counterReducer(state, action)
}

export function createUserDataStateReducer(state: UserData, action: Action) {
    return updateUserDataReducer(state, action);
}

export function createNewPremiumDataStateReducer(state: CalculatedPremium, action: Action) {
    return updateNewPremiumDataReducer(state, action);
}