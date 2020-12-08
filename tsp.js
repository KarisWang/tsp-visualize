const delay = ms => new Promise(res => setTimeout(res, ms))

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

    console.log(x_list);
    console.log(y_list);
    return false
}

export const two_opt = async () => {

    // Goes in every tsp method
    var canvas = document.querySelector('canvas'),
    context = canvas.getContext('2d');
    var imageData = context.getImageData(0,0,canvas.width,canvas.height);

    let distance_matrix = calculate_distance_matrix()

    let current_path = []
    for(let i = 0; i < x_list.length; i++) {
        current_path.push(i)
    }

    console.log(current_path)
    console.log(calculate_path_length(distance_matrix, current_path))
    context.putImageData(imageData, 0, 0);
    draw_path(current_path)

    let no_change = true
    while (no_change) {
        no_change = false
        for (let i = 0; i < current_path.length; i++) {
            for (let j = i + 1; j < current_path.length; j++) {
                let swap_length = distance_matrix[current_path[i]][current_path[(i+1)%current_path.length]] + 
                                    distance_matrix[current_path[j]][current_path[(j+1)%current_path.length]]
                let previous_length = distance_matrix[current_path[i]][current_path[j]] + 
                                        distance_matrix[current_path[(j+1)%current_path.length]][current_path[(i+1)%current_path.length]]
                if (swap_length > previous_length) {
                    no_change = true
                    await delay(200)

                    current_path = [
                        ...current_path.slice(0, i + 1), 
                        ...current_path.slice(i + 1, j + 1).reverse(), 
                        ...current_path.slice(j + 1)
                    ]

                    console.log(current_path)
                    console.log(calculate_path_length(distance_matrix, current_path))
                    context.putImageData(imageData, 0, 0);
                    draw_path(current_path)
                }
            }
        }
    }
}

export const nearest_neighbor = async () => {
    // Goes in every tsp method
    var canvas = document.querySelector('canvas'),
    context = canvas.getContext('2d');
    var imageData = context.getImageData(0,0,canvas.width,canvas.height);

    let distance_matrix = calculate_distance_matrix()
    let current_path = [0]
    let remaining_nodes = []
    for (let i = 1; i < x_list.length; i++) {
        remaining_nodes.push(i)
    }

    for (let i = 0; i < x_list.length; i++) {
        let min_distance_node = 0
        let min_distance = distance_matrix[current_path[current_path.length-1]][remaining_nodes[min_distance_node]]
        for (let j = 0; j < remaining_nodes.length; j++) {
            if (distance_matrix[current_path[current_path.length-1]][remaining_nodes[min_distance_node]] > 
                distance_matrix[current_path[current_path.length-1]][remaining_nodes[j]]) {
                    min_distance = distance_matrix[current_path[current_path.length-1]][remaining_nodes[j]]
                    min_distance_node = j
            }
        }
        await delay(200)
        current_path.push(remaining_nodes[min_distance_node])
        remaining_nodes.splice(min_distance_node, 1)
        context.putImageData(imageData, 0, 0);
        draw_path(current_path)
        if (remaining_nodes.length == 0) {
            break
        }
    }
    console.log(current_path)
    console.log(calculate_path_length(distance_matrix, current_path))
}

function calculate_distance_matrix() {
    let distance_matrix = []
    for(let i = 0; i < x_list.length; i++) {
        distance_matrix[i] = []
        for(let j = 0; j < x_list.length; j++) {
            distance_matrix[i][j] = Math.sqrt(Math.pow(x_list[i]-x_list[j], 2) + 
                                        Math.pow(y_list[i]-y_list[j], 2))
        }
    }
    return distance_matrix
}

function calculate_path_length(distance_matrix, current_path) {
    let total_sum = 0
    for (let i = 0; i < current_path.length; i++) {
        total_sum += distance_matrix[current_path[i]][current_path[(i+1)%current_path.length]]
    }
    return total_sum
}

function draw_path(current_path) {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    for (let i = 0; i < current_path.length; i++) {
        let point = current_path[i]
        let nextPoint = current_path[(i+1)%current_path.length]

        let xPoint = x_list[point]
        let yPoint = y_list[point]

        let xNext = x_list[nextPoint]
        let yNext = y_list[nextPoint]

        ctx.beginPath();
        ctx.moveTo(xPoint*20+10, yPoint*20+10);
        ctx.lineTo(xNext*20+10, yNext*20+10)
        ctx.strokeStyle = "red"
        ctx.stroke();
    }

}