let x_list = []
let y_list = []

export function addNewCoord(x, y) {
    var found = false
    x_list.forEach(function (value, i) {
        if (value == x && y_list[i] == y) {
            x_list.splice(i, 1)
            y_list.splice(i, 1)
            found = true
        }
    });
    if (found) {
        return true
    }
    x_list.push(x)
    y_list.push(y)
    return false
}

export function showCoords() {
    console.log(x_list)
    console.log(y_list)
}