export class PopperData{

    key: number
    value: number
    coordinates: any
    operation: string

    constructor(key: number){
        this.key = key

    }

    setValue(value){
        this.value = value

    }

    initOperation():string{
        let rightValue = (Math.random() * (98 - 4) + 4).toFixed()
        let leftValue = this.value - rightValue

        console.log(leftValue + " + " + rightValue + " = " + this.value)
        this.operation = leftValue + " + " + rightValue
    }

    getValue(){
        return this.value
    }

    setCoordinates(coordinates){
        this.coordinates = {
            topPosition : coordinates.topPosition,
            leftPosition: coordinates.leftPosition
        }
    }

    getLeftPosition(){
        return this.coordinates.leftPosition
    }

    getTopPosition(){
        return this.coordinates.topPosition
    }

    getOperation(){
        return this.operation
    }

}