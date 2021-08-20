import {
    Constants,
    ColorPalette
} from "../export.js";

const eigenVectorRenderData = {
    triangleSideLen : 20,
    rectheight : 6.5,
    bias : 1
};

function SpectrumRenderer() {
    this.__eigenvectors = []; // vectors specified in terms of basis;
    this.__basisVectors = {  // basis is specified in terms of Carthesian Coords (pixels);
        vb1 : null,
        vb2 : null
    };
}

SpectrumRenderer.prototype.__checkVectorType = function(v) {
    return Array.isArray(v) && v.length == 2 && typeof v[0] == 'number' && typeof v[1] == 'number';
}

SpectrumRenderer.prototype.__checkp5CanvasType = function(p5Canvas) {
    return p5Canvas instanceof p5;
}

// eigenvectors is a list of eigenvectors;
SpectrumRenderer.prototype.attachEigenVectors = function(eigenvectors) {
    if(this.__checkVectorType(vector) == false) {
        console.error("Type mismatch; provide a list of 2 numbers in SpectrumRenderer.prototype.attachEigenVectors");
        return;
    }

    this.__vectors.push(vector);
    console.log("here");
}
 
SpectrumRenderer.prototype.attachBasis = function(basisVector1, basisVector2) {
    if(this.__checkVectorType(basisVector1) == false || this.__checkVectorType(basisVector1) == false) {
        console.error("Type mismatch; provide a list of 2 numbers in Vector2DRenderer.attachBasis");
        return;
    }

    // Check if already attached;
    if(!(this.__basisVectors.vb1 === null && this.__basisVectors.vb2 === null)) {
        console.error("Basis already attached");
        return;
    }

    this.__basisVectors.vb1 = basisVector1;
    this.__basisVectors.vb2 = basisVector2;
}

SpectrumRenderer.prototype.updateBasis = function(newBasisVector1, newBasisVector2) {
    if(this.__checkVectorType(newBasisVector1) == false || this.__checkVectorType(newBasisVector2) == false) {
        console.error("Type mismatch; provide a list of 2 numbers in Vector2DRenderer.updateBasis");
        return;
    }

    // Copying new basis vectors to vb1 and vb2 without distorting the reference;
    this.__basisVectors.vb1 = newBasisVector1.map(function(x) { return x; });
    this.__basisVectors.vb2 = newBasisVector2.map(function(x) { return x; });
}

// c must be a p5 canvas;
SpectrumRenderer.prototype.renderVectors = function(c) {

    if(this.__checkp5CanvasType(c) == false) {
        console.error("Type mismatch; provide a valid p5 context in Vector2DRenderer.renderVectors");
        return;
    }

    // Render basis vectors;
    let basisVec1Render = this.__basisVectors.vb1.map(function(x) { return x * Constants.UNIT_LENGTH; });
    let basisVec2Render = this.__basisVectors.vb2.map(function(x) { return x * Constants.UNIT_LENGTH; });

    this._renderBasisVector(c, basisVec1Render, ColorPalette.basisV1Color);
    this._renderBasisVector(c, basisVec2Render, ColorPalette.basisV2Color);

    // Render regular vectors;
    for(let index = 0; index < this.__vectors.length; index++) {
        // vector is in terms of basis, while ccvector is in terms of pixels (ready to render);
        let ccvector = [ 
            basisVec1Render[0] * this.__vectors[index][0] + basisVec2Render[0] * this.__vectors[index][1],
            basisVec1Render[1] * this.__vectors[index][0] + basisVec2Render[1] * this.__vectors[index][1]
        ];
        this._renderVector(c, ccvector);
    }
}

Vector2DRenderer.prototype._renderBasisVector = function(c, vector, color) {
    const xtail = vector[0];
    const ytail = vector[1];

    if(xtail === 0 && ytail === 0) {
        return;
    }

    c.push();

    c.fill(
        color.r,
        color.g,
        color.b
    );
    c.noStroke();

    let {triangleSideLen : tsl, rectheight : rh, bias : b} = vectorRenderData;
    let vl = Math.sqrt(xtail * xtail + ytail * ytail);
    let th = tsl * 2 / Math.sqrt(3);
    let rw = Math.max(vl - th, 0) + rh / 2;
    
    c.rotate(Math.atan2(xtail, ytail) - c.HALF_PI);
    c.rect(-rh/2, -rh/2, rw + b, rh);
    c.triangle(vl, 0, vl - th, tsl / 2, vl - th, -tsl / 2);

    c.pop();
}

// p must be a p5 canvas;
Vector2DRenderer.prototype._renderVector = function(c, vector) {
    const xtail = vector[0];
    const ytail = vector[1];

    if(xtail === 0 && ytail === 0) {
        return;
    }

    c.push();

    // Regular vector;
   
    c.fill(
        ColorPalette.vectorColor.r,
        ColorPalette.vectorColor.g,
        ColorPalette.vectorColor.b
    );
    c.noStroke();

    let {triangleSideLen : tsl, rectheight : rh, bias : b} = vectorRenderData;
    let vl = Math.sqrt(xtail * xtail + ytail * ytail);
    let th = tsl * 2 / Math.sqrt(3);
    let rw = Math.max(vl - th, 0) + rh / 2;
    
    c.rotate(Math.atan2(xtail, ytail) - c.HALF_PI);
    c.rect(-rh/2, -rh/2, rw + b, rh);
    c.triangle(vl, 0, vl - th, tsl / 2, vl - th, -tsl / 2);

    c.pop();
}

export {
    Vector2DRenderer
}




