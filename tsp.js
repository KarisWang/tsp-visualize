let x_list = []
let y_list = []

export function addNewCoord(x, y) {
    x_list.push(x)
    y_list.push(y)
}

export function showCoords() {
    console.log(x_list)
    console.log(y_list)
}