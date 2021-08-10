import { colorPalette } from "./Color.js";

const vectorRenderData = {
    triangleSideLen : 20,
    rectheight : 6.5,
    bias : 1
};

function Vector2DRenderer() {
    // Empty list of vectors
    this.__vectors = []; // vectors specified in terms of basis;
    this.__basisVectors = { // basis is specified in terms of Carthesian Coords (pixels);
        vb1 : null,
        vb2 : null
    };
}

Vector2DRenderer.prototype.__checkVectorType = function(v) {
    return Array.isArray(v) && v.length == 2 && typeof v[0] == 'number' && typeof v[1] == 'number';
}

Vector2DRenderer.prototype.__checkp5CanvasType = function(p5Canvas) {
    return p5Canvas instanceof p5;
}

Vector2DRenderer.prototype.attachVector = function(vector) {
    if(this.__checkVectorType(vector) == false) {
        console.error("Type mismatch; provide a list of 2 numbers in Vector2DRenderer.attachVector");
        return;
    }

    // convert vector that is in terms of basis to Carthesian Coords (pixels) for rendering;
    let ccvector = [ 
        this.__basisVectors.vb1[0] * vector[0] + this.__basisVectors.vb2[0] * vector[1],
        this.__basisVectors.vb1[1] * vector[0] + this.__basisVectors.vb2[1] * vector[1]
    ];

    // console.log(this.__basisVectors.vb1);
    // console.log(this.__basisVectors.vb2);

    // console.log(vector);
    // console.log(ccvector);

    this.__vectors.push(ccvector);
}

Vector2DRenderer.prototype.update = function() {
    for(let i = 0; i < this.__vectors.length; i++) {
        let ccvector = [ 
            this.__basisVectors.vb1[0] * this.__vectors[i][0] + this.__basisVectors.vb2[0] * this.__vectors[i][1],
            this.__basisVectors.vb1[1] * this.__vectors[i][0] + this.__basisVectors.vb2[1] * this.__vectors[i][1]
        ];

        this.__vectors[i] = ccvector;
    }
}

// Order - first/second;
Vector2DRenderer.prototype.attachBasisVector = function(basisVector, order) {
    if(this.__checkVectorType(basisVector) == false) {
        console.error("Type mismatch; provide a list of 2 numbers in Vector2DRenderer.attachBasisVector");
        return;
    }

    if(order == 1) this.__basisVectors.vb1 = basisVector;
    if(order == 2) this.__basisVectors.vb2 = basisVector;
}

Vector2DRenderer.prototype.dettachVector = function() {

}

// c must be a p5 canvas;
Vector2DRenderer.prototype.renderVectors = function(c) {

    if(this.__checkp5CanvasType(c) == false) {
        console.error("Type mismatch; provide a valid p5 context in Vector2DRenderer.renderVectors");
        return;
    }

    // Render basis vectors;
    this._renderVector(c, this.__basisVectors.vb1, colorPalette.basisV1Color);
    this._renderVector(c, this.__basisVectors.vb2, colorPalette.basisV2Color);

    // Render regular vectors;
    for(let index = 0; index < this.__vectors.length; index++) {
        this._renderVector(c, this.__vectors[index]);
    }
}

// p must be a p5 canvas;
// color is fixed for regular vectors and eigen vector but varies for basis vectors;
Vector2DRenderer.prototype._renderVector = function(c, vector, color = null) {

    const xtail = vector[0];
    const ytail = vector[1];

    c.push();

    // Regular vector;
    if(color === null) {
        c.fill(
            colorPalette.vectorColor.r,
            colorPalette.vectorColor.g,
            colorPalette.vectorColor.b
        );
    }
    else {
        c.fill(
            color.r,
            color.g,
            color.b
        );
    }

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





