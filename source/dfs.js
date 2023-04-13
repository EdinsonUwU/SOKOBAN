export function dfs(numberOfCells, matrix) {
    var agentX = currentAgentCoordinates[0];
    var agentY = currentAgentCoordinates[1];
    console.log("actual:")
    console.log(agentX, agentY)


    //SENSORS AGAINST WALLS
    var LEFT_SENSOR = "left";
    var UP_SENSOR = "up";
    var RIGHT_SENSOR = "right";
    var DOWN_SENSOR = "down";

    var POSSIBLE_MOVEMENTS = new Array(4);
    if (agentX > 0)
        if (matrix[agentX - 1][agentY] != 2)
            POSSIBLE_MOVEMENTS.push(LEFT_SENSOR);
    if (agentY > 0)
        if (matrix[agentX][agentY - 1] != 2)
            POSSIBLE_MOVEMENTS.push(UP_SENSOR);
    if (agentX + 1 < numberOfCells)
        if (matrix[agentX + 1][agentY] != 2)
            POSSIBLE_MOVEMENTS.push(RIGHT_SENSOR);
    if (agentY + 1 < numberOfCells)
        if (matrix[agentX][agentY + 1] != 2)
            POSSIBLE_MOVEMENTS.push(DOWN_SENSOR);

    return matrix;
}