import {popperStore} from "./PopperReducer";

const SET_POPPERS_DATA = 'SET_POPPERS_DATA'
const SET_POP_ORDER = 'SET_POP_ORDER'
const POPPER_HAS_POP = 'POPPER_HAS_POP'
const SET_POPPER_RENDER_TO_FALSE = 'SET_POPPER_RENDER_TO_FALSE'
const SET_POPPER_RENDER_TO_TRUE = 'SET_POPPER_RENDER_TO_TRUE'
const RESET_POP_COUNTER = 'RESET_POP_COUNTER'

export const setPoppersData = (poppersData) => {
    return {
        type: SET_POPPERS_DATA,
        popperData: poppersData,
    }
}

export const setPopOrder = (popOrder)=>{
    return{
        type: SET_POP_ORDER,
        popOrder:popOrder
    }
}


export const popperHasPopped = (popIndex) => {

    let popOrder = popperStore.getState().gameState.popOrder

    if (popOrder.indexOf(popIndex) === popOrder.length -1 ) {
        console.log('over!')
        return {
            type: SET_POPPER_RENDER_TO_TRUE,
        }
    }else{
        console.log('ca part au reducer')

        console.log(popOrder)
        let currentIndex = popOrder.indexOf(popIndex)
        let nextPopperToPop = popOrder[currentIndex+1]
        return {
            type: POPPER_HAS_POP,
            nextPopperToPop: nextPopperToPop,
            popIndex : popIndex
        }
    }
}



export const poppersHasReRendered = () => {
    return {
        type: SET_POPPER_RENDER_TO_FALSE,

    }
}

export const resetPopCounter= (reason) =>{
    return {
        type : RESET_POP_COUNTER,
        reason : reason
    }
}
