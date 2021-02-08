import { createAction, props } from "@ngrx/store";

export const incrementAct = createAction('[dashboard component] increment counter')
export const decrementAct = createAction('[dashboard component] decrement counter')

export const updateUserDataAct = createAction('[dashboard component] user data modified action', props<{data:any}>())

export const newPremiumDataAct = createAction('[dashboard component] new premium data modified action', props<{newPremiumData:any}>())