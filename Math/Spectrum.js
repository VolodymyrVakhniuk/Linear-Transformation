
function Spectrum(linearTransformationData) {
    this._basisVec1 = linearTransformationData.BasisVec1;
    this._basisVec2 = linearTransformationData.BasisVec2;
    this._transformMatrix = linearTransformationData.Matrix;
}

// Returns a list of independent unit eigenvectors;
Spectrum.prototype.getUnitEigenVectors = function() {
    let [eigenvec1, eigenvec2] = math.eigs(this._transformMatrix).vectors;
    
    let eigenvec1Len = math.norm(eigenvec1);
    let eigenvec2Len = math.norm(eigenvec2);
    let unitEigenvec1 = [eigenvec1[0] / eigenvec1Len, eigenvec1[1] / eigenvec1Len];
    let unitEigenvec2 = [eigenvec2[0] / eigenvec2Len, eigenvec2[1] / eigenvec2Len];

    return [unitEigenvec1, unitEigenvec2];
}

// Returns a list of eigenvalues;
Spectrum.prototype.getEigenValues = function() {
    return math.eigs(this._transformMatrix).values;
}
