import { ParsedEvent } from "@angular/compiler"
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
        cards: [
            {
                key: 'life',
                name: 'Life',
                isEnabled: true,
                premium: 3200,
                coverage: 250000,
                percentOutOfTotPremium: parseInt(((3200 / 5400) * 100).toString()),
                color: '#298D74',
                oldCoverage: 250000,
                oldPremium: 3200,
                oldNewPremChangeInPercent: parseInt((((3200 - 3200) / 3200) * 100).toString()),
                oldNewPremChangeInValue: 3200 - 3200,
                defaultPremium:3200
            },
            {
                key: 'home',
                name: 'Home',
                isEnabled: true,
                premium: 1100,
                coverage: 300000,
                percentOutOfTotPremium: parseInt(((1100 / 5400) * 100).toString()),
                color: '#3867A5',
                oldCoverage: 300000,
                oldPremium: 1100,
                oldNewPremChangeInPercent: parseInt((((1100 - 1100) / 1100) * 100).toString()),
                oldNewPremChangeInValue: 1100 - 1100,
                defaultPremium:1100
            },
            {
                key: 'auto',
                name: 'Auto',
                isEnabled: true,
                premium: 1100,
                coverage: 300000,
                percentOutOfTotPremium: parseInt(((1100 / 5400) * 100).toString()),
                color: '#BD8C32',
                oldCoverage: 300000,
                oldPremium: 1100,
                oldNewPremChangeInPercent: parseInt((((1100 - 1100) / 1100) * 100).toString()),
                oldNewPremChangeInValue: 1100 - 1100,
                defaultPremium:1100
            },
            {
                key: 'pet',
                name: 'Pet',
                isEnabled: false,
                premium: 130,
                coverage: 5000,
                color: '#69913E',
                oldCoverage: 5000,
                oldPremium: 130,
                oldNewPremChangeInPercent: parseInt((((130 - 130) / 130) * 100).toString()),
                oldNewPremChangeInValue: 130 - 130,
                defaultPremium:130
            },
            {
                key: 'boat',
                name: 'Boat',
                isEnabled: false,
                premium: 1300,
                coverage: 50000,
                color: '#2C83A3',
                oldCoverage: 50000,
                oldPremium: 1300,
            },
            {
                key: 'renters',
                name: 'Life',
                isEnabled: false,
                premium: 1300,
                coverage: 50000,
                color: '#715CA5',
                oldCoverage: 50000,
                oldPremium: 1300,
            }
        ],
        selectedAgeBracket: [
            {
              "_id": "6018fc2a57065f3c046d0160",
              "product": "life",
              "Age ": "45 - 55",
              "Death Benefit": 250000,
              "Premium": 7000
            },
            {
              "_id": "6018fc2a57065f3c046d0162",
              "product": "life",
              "Age ": "45 - 55",
              "Death Benefit": 500000,
              "Premium": 14000
            },
            {
              "_id": "6018fc2a57065f3c046d0164",
              "product": "life",
              "Age ": "45 - 55",
              "Death Benefit": 1000000,
              "Premium": 27800
            }
          ],
        totalPremium: 5400
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
    on(actions.updateUserDataAct, (state, { data }) => ({
        data: data
    })),
)

// function temp(state, data){

//     //console.log("state is :" + JSON.stringify(data))

// }

const updateNewPremiumDataReducer = createReducer(CalculatedPremiumInitialState,
    on(actions.newPremiumDataAct, (state, { newPremiumData }) => ({
        ...state,
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