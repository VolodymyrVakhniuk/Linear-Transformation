
function Spectrum(linearTransformationData) {
    this._transformMatrix = linearTransformationData.Matrix;
}

// Returns a list of independent unit eigenvectors;
Spectrum.prototype.getUnitEigenVectors = function() {

    this._transformMatrix[0][0] += 0.0001;
    let evs = numeric.eig(this._transformMatrix);

    // Only show real eigenvectors
    if (evs.E.y == undefined) {
        let eigenvec1 = [evs.lambda.x[0] * evs.E.x[0][0], evs.lambda.x[0] * evs.E.x[1][0]];
        let eigenvec2 = [evs.lambda.x[1] * evs.E.x[0][1], evs.lambda.x[1] * evs.E.x[1][1]];

        let eigenvec1Len = math.norm(eigenvec1);
        let eigenvec2Len = math.norm(eigenvec2);
        let unitEigenvec1 = [eigenvec1[0] / eigenvec1Len, eigenvec1[1] / eigenvec1Len];
        let unitEigenvec2 = [eigenvec2[0] / eigenvec2Len, eigenvec2[1] / eigenvec2Len];
        console.log(unitEigenvec1);
        console.log(unitEigenvec2);
        return [unitEigenvec1, unitEigenvec2];
    }
    return null;
}

// Returns a list of eigenvalues;
Spectrum.prototype.getEigenValues = function() {
    return math.eigs(this._transformMatrix).values;
}

export {
    Spectrum
};
