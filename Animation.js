import {
    LinearTransformation,
    LinearTransformationData,
    GridRender,
    MainCanvas,
    OriginRenderer,
    Vector2DRenderer,
    ColorPalette,
    AnimationData,
} from "../export.js";

// Animation of Linear Transformation;
function LTAnimation(linearTransformation, duration) {
    this._T = duration;
    this._linearTransformation = linearTransformation;

    this._p = 0;
    this._t = 0;
    this._V = 0;

    this.prevSliderVal = AnimationData.Val;
}

LTAnimation.prototype.__prepareForStart = function() {
    this._p = 0;
    this._t = 0;
    this._V = 0;

    this.firstIteration = false;
}

LTAnimation.prototype.__prepareForRestart = function() {
    this.firstIteration = true;
}


LTAnimation.prototype.getUpdatedBasis = function(dt) {
    
    if(this.prevSliderVal != AnimationData.Val) {  
        this._t = AnimationData.Val * this._T;
        this.prevSliderVal = AnimationData.Val;
    }

    // Constantly accelerating;
    if(this._t < this._T / 2) {
        this._p = 2 * this._t * this._t / (this._T * this._T);
    }
    // Constantly deccelerating;
    else {
        let maxV = 2/this._T;               // Max speed is at the point when the acceleration stops;
        let S0 = 0.5;                       // Distance travelled while accelerating;
        let t = this._t - this._T / 2;      // Time elapsed since decceleration started;
        this._p = S0 + maxV * t - 2 * t * t / (this._T * this._T);
    }

    this._t += dt;

    if(this._t > this._T) {
        this._p = 1.0;

        // AnimationData.IsPlaying = false;
        document.getElementById("Range").value = 100;
        console.log("Setting range attribute to: " + 100);
    }
    else {
        document.getElementById("Range").value = this._t / this._T * 100;
        console.log("Setting range attribute to: " + this._t / this._T * 100);
    }

    // console.log(this._p);
    return this._linearTransformation.getInterpolatedResult(this._p);
}

// dt = 0 if it is the first iteration;
// dt - time in milliseconds elapsed since previous iteration;
LTAnimation.prototype.play = function(p5Canvas) {
    
    let c = p5Canvas; // alias

    if(this.firstIteration === true) {
        this.__prepareForStart();
    }
    
    let dt = this._timer.getElapsedTime();
    this._timer.restart();

    // Update proportion;
    this._p += this._V * dt;
    // console.log(this._p);
    
    this._t += dt;

    // Constant acceleration approach;
    if(this._t < this._T / 2) {
        this._V = 4 * this._t / (this._T * this._T);
        this._maxV = this._V;
    }
    else {
        this._V = this._maxV - 4 * (this._t - this._T / 2) / (this._T * this._T);
    }

    if(this._t > this._T) {

        this._p = 1.0;
    }

    // Update renderer's information;
    console.log(this._p);
    let transformedBasis = this._linearTransformation.getInterpolatedResult(this._p);

    c.vectorRenderer.attachBasisVector(transformedBasis[0], 1);
    c.vectorRenderer.attachBasisVector(transformedBasis[1], 2);

    c.gridRenderer.attachBasis(transformedBasis[0], transformedBasis[1]);

    // Everything is rendered from the origin coords
    c.translate(c.origin.x, c.origin.y);

    c.background(
        ColorPalette.backgroundColor.r,
        ColorPalette.backgroundColor.g,
        ColorPalette.backgroundColor.b
    );

    c.gridRenderer.renderGrid(c);
    c.vectorRenderer.renderVectors(c);
    c.originRenderer.renderOrigin(c);
   

    p5Canvas.draw = p5Canvas.draw.bind(this);
}

export {
    LTAnimation
}
