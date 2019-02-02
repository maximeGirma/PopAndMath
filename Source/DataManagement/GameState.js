import {CONFIG} from "../Configuration/Configuration";

export class GameState {
    static currentLevel = CONFIG.DEFAULT_LEVEL
    static maxPoppersNumber = CONFIG.DEFAULT_POPPERS_NUMBER


    static getCurrentLevel() {
        return this.currentLevel
    }

    static incrementLevel() {
        this.currentLevel++
    }

    static getMaxPoppersNumber(){
        return this.maxPoppersNumber
    }
}