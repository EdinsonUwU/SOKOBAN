import { apply_opperators } from "/source/aux_functions.js";
export async function dfs(canvas, matrix, state) {
    //console.log(apply_opperators(matrix,state))
    var new_states = apply_opperators(matrix,state)
    console.log(new_states)



    console.log("aa")
    //Sleep for 3 seconds
    await new Promise((r) => setTimeout(r, 1000));
    //console.log("a")
    dfs(canvas, matrix, state)
    return matrix;
}
