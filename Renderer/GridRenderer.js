const gridRenderData = {
    axisThickness : 5,
    lineThinkness : 3,
    linesNum : 20 // number of affine lines in one direction;
};

function GridRender() {

}

GridRender.prototype.__checkVectorType = function(v) {
    return Array.isArray(v) && v.length == 2 && typeof v[0] == 'number' && typeof v[1] == 'number';
}

GridRender.prototype.__checkp5CanvasType = function(p5Canvas) {
    return p5Canvas instanceof p5;
}

GridRender.prototype.attachBasis = function(basisVector1, basisVector2) {
    if(this.__checkVectorType(basisVector1) == false && this.__checkVectorType(basisVector2) == false) {
        console.error("Type mismatch; provide a list of 2 numbers in GridRender.attachBasis");
        return;
    }

    this.basisv1 = basisVector1;
    this.basisv2 = basisVector2;
}

// mc must be a p5 canvas; BEWARE weird math;
GridRender.prototype.renderGrid = function(c) {

    if(this.__checkp5CanvasType(c) == false) {
        console.error("Type mismatch; provide a valid p5 context in GridRender.renderGrid");
        return;
    }

    let {axisThickness : ath, lineThinkness : lth, linesNum : ln} = gridRenderData;

    // Calculating the angle "theta" between basis vectors;
    let v1len = math.sqrt(this.basisv1[0] * this.basisv1[0] + this.basisv1[1] * this.basisv1[1]);
    let v2len = math.sqrt(this.basisv2[0] * this.basisv2[0] + this.basisv2[1] * this.basisv2[1]);
    let v1dotv2 = this.basisv1[0] * this.basisv2[0] + this.basisv1[1] * this.basisv2[1];
    let theta = math.acos(v1dotv2 / (v1len * v2len));

    // line spacing in one direction "vertical";
    let sp1 = v1len * math.sin(theta);
    // line spacing in second direction "horizontal";
    let sp2 = v2len * math.sin(theta);

    // Calculation the orientation of basis vectors;
    let v1crossv2 = this.basisv1[0] * this.basisv2[1] - this.basisv1[1] * this.basisv2[0];
    orientation_ = v1crossv2 / math.abs(v1crossv2);

    // 1) render affine lines;
    c.push();

    c.fill(
        colorPalette.lineColor.r,
        colorPalette.lineColor.g,
        colorPalette.lineColor.b,
    );
    c.noStroke();
    
    // lines in the direction of the first basis vector;
    c.push();
    c.rotate(Math.atan2(this.basisv1[0], this.basisv1[1]) - c.HALF_PI);

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
    c.rotate(Math.atan2(this.basisv2[0], this.basisv2[1]) - c.HALF_PI);

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
        colorPalette.mainAxisColor.r,
        colorPalette.mainAxisColor.g,
        colorPalette.mainAxisColor.b
    );
    c.noStroke();
    
    // main axis 1;
    c.push();
    c.rotate(Math.atan2(this.basisv1[0], this.basisv1[1]) - c.HALF_PI);
    c.rect(-ln * v1len, -ath / 2, 2 * ln * v1len, ath);
    c.pop();

    // main axis 2;
    c.push();
    c.rotate(Math.atan2(this.basisv2[0], this.basisv2[1]) - c.HALF_PI);
    c.rect(-ln * v2len, -ath / 2, 2 * ln * v2len, ath);
    c.pop();

    c.pop();
}

