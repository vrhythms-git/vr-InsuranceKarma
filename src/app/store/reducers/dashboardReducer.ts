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
        loggedInUser :"Create Account",
        cards: [
            {
                key: 'life',
                name: 'Term',
                isEnabled: true,
                premium: 3200,
                coverage: 250000,
                percentOutOfTotPremium: parseInt(((3200 / 5744) * 100).toString()),
                // color: '#37BC9B',
                color: '#33aaff',
                oldCoverage: 250000,
                oldPremium: 3200,
                oldNewPremChangeInPercent: parseInt((((3200 - 3200) / 3200) * 100).toString()),
                oldNewPremChangeInValue: 3200 - 3200,
                defaultPremium:3200,
                risk:undefined,
                insight:undefined,
                showRiskModel:true
            },
            {
                key: 'home',
                name: 'Home',
                zipCode : 63005,
                isEnabled: true,
                premium: 1133,
                coverage: 100000,
                percentOutOfTotPremium: parseInt(((1100 / 5744) * 100).toString()),
                // color: '#4A89DC',
                color:'#99d5ff',
                oldCoverage: 100000,
                oldPremium: 1133,
                oldNewPremChangeInPercent: parseInt((((1133 - 1133) / 1133) * 100).toString()),
                oldNewPremChangeInValue: 1133 - 1133,
                defaultPremium:1133,
                risk:undefined,
                insight:undefined,
                showRiskModel:true
            },
            {
                key: 'auto',
                name: 'Auto',
                isEnabled: true,
                premium: 1411,
                coverage: 50000,
                percentOutOfTotPremium: parseInt(((1411 / 5744) * 100).toString()),
                // color: '#967ADC',
                color:'#66bfff',
                oldCoverage: 50000,
                oldPremium: 1411,
                oldNewPremChangeInPercent: parseInt((((1411 - 1411) / 1411) * 100).toString()),
                oldNewPremChangeInValue: 1411 - 1411,
                defaultPremium:1411,
                risk:undefined,
                insight:undefined,
                showRiskModel:true
                
            },
            {
                key: 'pet',
                name: 'Pet',
                isEnabled: false,
                premium: 130,
                coverage: 5000,
                color: '#bababa',
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
                color: '#bababa',
                oldCoverage: 50000,
                oldPremium: 1300,
            },
            {
                key: 'renters',
                name: 'Renters',
                isEnabled: false,
                premium: 1300,
                coverage: 50000,
                color: '#bababa',
                oldCoverage: 50000,
                oldPremium: 1300,
            }
        ],
        selectedAgeBracket: [
            {
                "_id": "6018fc2a57065f3c046d015f",
                "product": "life",
                "Age ": "35 - 45",
                "Death Benefit": 250000,
                "Premium": 3200
            },
            {
                "_id": "6018fc2a57065f3c046d0161",
                "product": "life",
                "Age ": "35 - 45",
                "Death Benefit": 500000,
                "Premium": 6300
            },
            {
                "_id": "6018fc2a57065f3c046d0163",
                "product": "life",
                "Age ": "35 - 45",
                "Death Benefit": 1000000,
                "Premium": 12500
            }
          ],
        totalPremium: 5744,
        oldTotalPremium: 5744,
        oldNewTotalPremChangeInPercent:0,
        oldNewTotalPremChangeInValue: 0
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