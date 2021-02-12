import { Action, createReducer, on } from "@ngrx/store"
import * as actions from "../actions/dashboardAction"

export interface CounterState {
    counter: number
}

export interface UserData {
    data: any;
}

export interface CalculatedPremium {
    newPremiumData: any;
}

export const userDataInitialState: UserData = {
    data: {
        cards : [
            {
                key : 'life',
                name : 'Life',
                isEnabled : true,
                premium: 3200,
                coverage: 250000
            },
            {
                key : 'home',
                name : 'Home',
                isEnabled : true,
                premium: 1100,
                coverage: 300000 
            },
            {
                key : 'auto',
                name : 'Auto',
                isEnabled : true,
                premium: 1100,
                coverage: 300000
            },
            {
                key : 'pet',
                name : 'Pet',
                isEnabled : false,
                premium: 130,
                coverage: 5000
            },
            {
                key : 'boat',
                name : 'Boat',
                isEnabled : false,
                premium: 1300,
                coverage: 50000
            },
            {
                key : 'renters',
                name : 'Life',
                isEnabled : false,
                premium: 1300,
                coverage: 50000
            }
        ],
        totalPremium : 5400
    }
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
    on(actions.updateUserDataAct, (state,  {data} ) => ({
        ...state,
        data: data
    })),
)

// function temp(state, data){

//     //console.log("state is :" + JSON.stringify(data))
   
// }

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