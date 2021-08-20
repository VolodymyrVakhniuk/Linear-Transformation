import {
    Constants,
    ColorPalette
} from "../export.js";

const gridRenderData = {
    axisThickness : 3,
    lineThinkness : 3,
    linesNum : 20 // number of affine lines in one direction;
};

function GridRender() {
    this.__basisVectors = { // basis is specified in terms of Carthesian Coords (pixels);
        vb1 : null,
        vb2 : null
    };
}

GridRender.prototype.__checkVectorType = function(v) {
    return Array.isArray(v) && v.length == 2 && typeof v[0] == 'number' && typeof v[1] == 'number';
}

GridRender.prototype.__checkp5CanvasType = function(p5Canvas) {
    return p5Canvas instanceof p5;
}

// Attaches or changes basis vectors;
GridRender.prototype.attachBasis = function(basisVector1, basisVector2) {
     // Check if already attached;
     if(!(this.__basisVectors.vb1 === null && this.__basisVectors.vb2 === null)) {
        return;
    }

    this.__basisVectors.vb1 = basisVector1;
    this.__basisVectors.vb2 = basisVector2;
}

GridRender.prototype.updateBasis = function(newBasisVector1, newBasisVector2) {
    if(this.__checkVectorType(newBasisVector1) == false || this.__checkVectorType(newBasisVector2) == false) {
        console.error("Type mismatch; provide a list of 2 numbers in GridRender.updateBasis");
        return;
    }

    // Copying new basis vectors to vb1 and vb2 without distorting the reference;
    this.__basisVectors.vb1 = newBasisVector1.map(function(x) { return x; });
    this.__basisVectors.vb2 = newBasisVector2.map(function(x) { return x; });
}

// mc must be a p5 canvas; BEWARE weird math;
GridRender.prototype.renderGrid = function(c) {

    if(this.__checkp5CanvasType(c) == false) {
        console.error("Type mismatch; provide a valid p5 context in GridRender.renderGrid");
        return;
    }

    let basisVec1Render = this.__basisVectors.vb1.map(function(x) { return x * Constants.UNIT_LENGTH; });
    let basisVec2Render = this.__basisVectors.vb2.map(function(x) { return x * Constants.UNIT_LENGTH; });

    let {axisThickness : ath, lineThinkness : lth, linesNum : ln} = gridRenderData;

    // Calculating the angle "theta" between basis vectors;
    let v1len = math.sqrt(basisVec1Render[0] * basisVec1Render[0] + basisVec1Render[1] * basisVec1Render[1]);
    let v2len = math.sqrt(basisVec2Render[0] * basisVec2Render[0] + basisVec2Render[1] * basisVec2Render[1]);
    let v1dotv2 = basisVec1Render[0] * basisVec2Render[0] + basisVec1Render[1] * basisVec2Render[1];
    let theta = math.acos(v1dotv2 / (v1len * v2len));

    // line spacing in one direction "vertical";
    let sp1 = v1len * math.sin(theta);
    // line spacing in second direction "horizontal";
    let sp2 = v2len * math.sin(theta);

    // Calculation the orientation of basis vectors;
    let v1crossv2 = basisVec1Render[0] * basisVec2Render[1] - basisVec1Render[1] * basisVec2Render[0];
    const orientation_ = v1crossv2 / math.abs(v1crossv2);

    // 1) render affine lines;
    c.push();

    c.fill(
        ColorPalette.lineColor.r,
        ColorPalette.lineColor.g,
        ColorPalette.lineColor.b,
    );
    c.noStroke();
    
    // lines in the direction of the first basis vector;
    c.push();
    c.rotate(Math.atan2(basisVec1Render[0], basisVec1Render[1]) - c.HALF_PI);

    for(let i = -ln; i <= ln; i++) {
        if(i == 0) continue;

        let dx = -ln * v1len;
        let dy = -lth / 2 + i * sp2;
        let dxAlignmentFactor = math.tan(c.HALF_PI - theta) * dy;
        // grid lines;
        c.rect(dx - orientation_ * dxAlignmentFactor, dy, 2 * ln * v1len, lth);
    }
    c.pop();

    // lines in the direction of the second basis vector;
    c.push();
    c.rotate(Math.atan2(basisVec2Render[0], basisVec2Render[1]) - c.HALF_PI);

    for(let i = -ln; i <= ln; i++) {
        if(i == 0) continue;

        let dx = -ln * v2len;
        let dy = -lth / 2 + i * sp1;
        let dxAlignmentFactor = math.tan(c.HALF_PI - theta) * dy;
        // grid lines;
        c.rect(dx + orientation_ * dxAlignmentFactor, dy, 2 * ln * v2len, lth); 
    }
    c.pop();
    c.pop();

    // 2) render main axis;
    c.push();

    c.fill(
        ColorPalette.mainAxisColor.r,
        ColorPalette.mainAxisColor.g,
        ColorPalette.mainAxisColor.b
    );
    c.noStroke();
    
    // main axis 1;
    c.push();
    c.rotate(Math.atan2(basisVec1Render[0], basisVec1Render[1]) - c.HALF_PI);
    c.rect(-ln * v1len, -ath / 2, 2 * ln * v1len, ath);
    c.pop();

    // main axis 2;
    c.push();
    c.rotate(Math.atan2(basisVec2Render[0], basisVec2Render[1]) - c.HALF_PI);
    c.rect(-ln * v2len, -ath / 2, 2 * ln * v2len, ath);
    c.pop();

    c.pop();
}

export {
    GridRender
}
