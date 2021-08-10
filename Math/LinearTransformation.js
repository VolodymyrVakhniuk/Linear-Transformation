function LinearTransformation(basisVector1, basisVector2, transformMatrix) {
    this._basisVec1 = basisVector1;
    this._basisVec2 = basisVector2;
    this._transformMatrix = transformMatrix;

    this._vectors = [];
}

// Attach a vector to be transformed; 
// Vector's components are assumed to be with respect to the provided basis;
LinearTransformation.prototype.attachVector = function(vector) {
    this._vectors.push(vector);
}

LinearTransformation.prototype.getTransformedBasis = function() {
    let transformedBasisVec1 = math.multiply(this._transformMatrix, this._basisVec1);
    let transformedBasisVec2 = math.multiply(this._transformMatrix, this._basisVec2);
    return [transformedBasisVec1, transformedBasisVec2];
}

// p - interpolation proportion: 0 <= p <= 1; 
LinearTransformation.prototype.getInterpolatedResult = function(p) {

    // Compute trajectories;
    let trajectory1 = math.subtract(this.getTransformedBasis()[0], this._basisVec1);
    let trajectory2 = math.subtract(this.getTransformedBasis()[1], this._basisVec2);

    // Calculate interpolated basis based on proportion given - p;
    let interpBasisVec1 = math.add( math.multiply(trajectory1, p), this._basisVec1 );
    let interpBasisVec2 = math.add( math.multiply(trajectory2, p), this._basisVec2 );

    return [interpBasisVec1, interpBasisVec2];
}

export {
    LinearTransformation
}

