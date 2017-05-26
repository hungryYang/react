import * as ActionTypes from './ActionType.js'

export default (state,action)=>{
    const {counterCaption} = action
    console.log(counterCaption)
    switch (action.type) {
        case ActionTypes.INCREMENT:
            return {...state, [counterCaption]: state[counterCaption] + 1};
        case ActionTypes.DECREMENT:
            return {...state, [counterCaption]: state[counterCaption] - 1};
        default:
            return state
    }
}