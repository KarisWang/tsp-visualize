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

export function two_opt() {
    let distance_matrix = []
    for(let i = 0; i < x_list.length; i++) {
        distance_matrix[i] = []
        for(let j = 0; j < x_list.length; j++) {
            distance_matrix[i][j] = Math.sqrt(Math.pow(x_list[i]-x_list[j], 2) + Math.pow(y_list[i]-y_list[j], 2))
        }
    }
    console.log(distance_matrix)
    let current_path = []
    for(let i = 0; i < x_list.length; i++) {
        current_path.push(i)
    }
    console.log(current_path)
    let no_swap = 0
    let i = 0
    while (no_swap < x_list.length) {
        console.log(current_path)
        let previous_length = distance_matrix[current_path[i]][current_path[(i+1)%current_path.length]] + 
                                distance_matrix[current_path[(i+1)%current_path.length]][current_path[(i+2)%current_path.length]] + 
                                distance_matrix[current_path[(i+2)%current_path.length]][current_path[(i+3)%current_path.length]]
        let swap_length = distance_matrix[current_path[i]][current_path[(i+2)%current_path.length]] + 
                            distance_matrix[current_path[(i+2)%current_path.length]][current_path[(i+1)%current_path.length]] + 
                            distance_matrix[current_path[(i+1)%current_path.length]][current_path[(i+3)%current_path.length]]
        console.log(previous_length)
        console.log(swap_length)
        if (swap_length < previous_length) {
            let temp = current_path[(i+1)%current_path.length]
            current_path[(i+1)%current_path.length] = current_path[(i+2)%current_path.length]
            current_path[(i+2)%current_path.length] = temp
            no_swap = 0
        } else {
            no_swap++
        }
        i++
        if (i >= current_path.length) {
            i = 0;
        }
        console.log(current_path)
    }
    console.log(current_path)
}