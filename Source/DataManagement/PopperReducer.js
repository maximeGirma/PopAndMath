

import {popperDataStore} from "./PopperDataStore";
import {createStore} from "redux";

const reducer = (state = popperDataStore, action) => {
    switch (action.type) {
        case 'SET_POPPERS_DATA':
            state.popperData = action.popperData
            return state
        case 'SET_POP_ORDER':
            state.gameState.popOrder = action.popOrder
            state.gameState.nextPopperToPop = action.popOrder[0]
            return state
        case 'POPPER_HAS_POP':
            console.log('dans le reducer' + action.nextPopperToPop)
            state.gameState.nextPopperToPop = action.nextPopperToPop
            state.popperData[action.popIndex].hasPopped = true
            state.gameState.popCounter +=1
            return state
        case 'SET_POPPER_RENDER_TO_TRUE':
            state.gameState.currentLevel += 1
            state.gameState.popCounter +=1
            state.gameState.poppersShouldReRender = true
            return state
        case 'SET_POPPER_RENDER_TO_FALSE':
            state.gameState.poppersShouldReRender = false
            state.gameState.gameOver = false
            state.gameState.gameOverReason = null
            return state
        case 'RESET_POP_COUNTER':
            state.gameState.popCounter = 0
            state.gameState.currentLevel = 0
            state.gameState.poppersShouldReRender = true
            state.gameState.gameOverReason = action.reason
            state.gameState.gameOver = true
            return state
        default:
            return state
    }
}

export const popperStore = createStore(reducer)
