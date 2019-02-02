export const popperDataStore = {
    gameState: {
        currentLevel: 0,
        maxPoppersNumber: 3,
        currentPopperNumber: 3,
        popCounter:0,
        popOrder: [],
        nextPopperToPop: 1,
        poppersShouldReRender : false,
        gameOverReason : null,
        gameOver: false,
    },
    popperData:
        [{
            position: {
                left: '20%',
                top: '20%',
            },
            number: 12,
            numberLabel : '4 + 8',
            hasPopped : false
        }, {
            position: {
                left: '60%',
                top: '30%',
            },
            number: 61,
            hasPopped :false,
        }, {
            position: {
                left: '10%',
                top: '70%',
            },
            number: 71,
            hasPopped :false,
        },
        ]

}
