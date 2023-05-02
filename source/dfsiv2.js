import { apply_opperators, check_end, box_in_corner } from "/source/aux_functions.js";
import { repaint_matrix, repaint_the_map, paint_new_state } from "/source/paint_world.js";

export async function dfsi(canvas, matrix, initial_state) {
    var stack = [{ node: initial_state, path: [], deep: 0 }]
    var visited_nodes = new Set();
    var depthLimit = 10;
    
    while (true) {
        var result = false;

        if (result === true) {
            return ; // Se encontró el objetivo
        }
        if(result == false && stack != []){
            result, visited_nodes, stack = await dfs(canvas, matrix, stack.reverse(), visited_nodes, depthLimit);
            console.log(result, visited_nodes, stack)
            depthLimit++
        }
        else{
            break
        }
        console.log(result, visited_nodes, stack)
        // Si el resultado no es ni verdadero ni falso, aumentamos el límite de profundidad
    }
    return null
}

async function dfs(canvas, matrix, stack, visited_nodes, depthLimit) {
    var next_stack = []
    while (stack.length > 0) {
        const { node, path, deep } = stack.pop()

        if (!visited_nodes.has(JSON.stringify(node))) {
            visited_nodes.add(JSON.stringify(node))

            console.log("\n\n")
            console.log("Set of visited_nodes nodes: ", visited_nodes)

            repaint_the_map(canvas, matrix.length);// llamar esta funcion desde el dfs
            repaint_matrix(canvas, matrix);// llamar esta funcion desde el dfs
            paint_new_state(canvas, matrix, [node.state.boxes_position, [node.state.agent_position.row, node.state.agent_position.column]]);

            //Sleep for 3 seconds
            await new Promise((r) => setTimeout(r, 0));

            if (check_end(matrix, node)) {
                console.log("Path found: ", ...path, " ending on node: ", node)
                //crear funcion que imprime el camino en path
                console.log("oasngvaouinvgoadn")
                var dfsi_output_html = document.getElementById('dfsi-output')
                dfsi_output_html.innerHTML = "oasngvaouinvgoadn"
                stack = []
                return true, visited_nodes, [];
            }

            if (box_in_corner(matrix, node)) {
                continue;
            }

            const neighbors = apply_opperators(matrix, node)
            console.log("negihbors of node : ", node, " are ", neighbors)


            //crear una funcion push_orderly, y que meta en path la primera letra de la operacion
            await push_orderly(stack, next_stack, neighbors, path, deep, depthLimit)

        }
    }
    return false, visited_nodes, next_stack;
}


async function push_orderly(stack, next_stack, neighbors, path, deep, depthLimit) {

    for (let node of neighbors) {
        if (node.operator == 'RIGHT') {
            if (deep == depthLimit + 1) {
                next_stack.push({
                    node: node,
                    path: [...path, 'R'],
                    deep: deep + 1
                })
            } else {
                stack.push({
                    node: node,
                    path: [...path, 'R'],
                    deep: deep + 1
                })
            }

        }
    }

    for (let node of neighbors) {
        if (node.operator == 'LEFT') {
            if (deep == depthLimit + 1) {
                next_stack.push({
                    node: node,
                    path: [...path, 'L'],
                    deep: deep + 1
                })
            } else {
                stack.push({
                    node: node,
                    path: [...path, 'L'],
                    deep: deep + 1
                })
            }
        }
    }

    for (let node of neighbors) {
        if (node.operator == 'DOWN') {
            if (deep == depthLimit + 1) {
                next_stack.push({
                    node: node,
                    path: [...path, 'D'],
                    deep: deep + 1
                })
            } else {
                stack.push({
                    node: node,
                    path: [...path, 'D'],
                    deep: deep + 1
                })
            }
        }
    }

    for (let node of neighbors) {
        if (node.operator == 'UP') {
            if (deep == depthLimit + 1) {
                next_stack.push({
                    node: node,
                    path: [...path, 'U'],
                    deep: deep + 1
                })
            } else {
                stack.push({
                    node: node,
                    path: [...path, 'U'],
                    deep: deep + 1
                })
            }
        }
    }
}