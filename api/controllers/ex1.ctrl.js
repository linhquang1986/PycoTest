/**
 * Transpose a 2D matrix
 */
transpose = (matrix) => {
    // For NxN matrix
    let n = matrix[0].length;
    let temp;

    // Walk through columns
    for (let i = 0, j = 0; i < n; i++) {
        j = i;
        // Walk through rows
        while (j < n) {
            if (i !== j) {
                temp = matrix[i][j];
                matrix[i][j] = matrix[j][i];
                matrix[j][i] = temp;
            }
            j++;
        }
    }
}
/**
 * Swap each colum with it's n-i corresponding element
 */
reverseRows = (matrix) => {
    for (i in matrix) {
        matrix[i] = matrix[i].reverse();
    }
}

viewToMatrix = (matrix) => {
    let viewMatrix=[];
    matrix.map(item => {
        viewMatrix.push(`[ ${item} ]`);
    })
    return viewMatrix
}
exports.rotatioMatrix = (req, res, next) => {
    try {
        const numberOfRotation = req.params.K;
        let matrix = [
            [0, 16, 255],
            [8, 128, 32],
            [0, 0, 0]
        ];
        for (let i = 0; i < numberOfRotation; i++) {
            transpose(matrix);
            reverseRows(matrix);
        }
        const data  = {
            "Data after rotation" : matrix,
            "View": viewToMatrix(matrix)
        }
        res.send(data);
    } catch (e) {
        next(e);
    }
}