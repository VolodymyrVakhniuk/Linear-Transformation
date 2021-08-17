import {
    Timer
} from "./Math/Util.js"

// Animation of Linear Transformation;
function LTAnimation(linearTransformation, duration) {
    this._T = duration;
    this._linearTransformation = linearTransformation;

    this._timer = new Timer();
    this._timer.restart();
    this.firstIteration = true;
}

LTAnimation.prototype.__prepareForStart = function() {
    this._p = 0;
    this._t = 0;
    this._V = 0;

    this.firstIteration = false;
}

LTAnimation.prototype.__prepareForRestart == function() {
    this.firstIteration = true;
}

// dt = 0 if it is the first iteration;
// dt - time in milliseconds elapsed since previous iteration;
LTAnimation.prototype.play = function(p5Canvas) {
    
    if(this.firstIteration === true) {
        this.__prepareForStart();
    }

    let c = p5Canvas;
    
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
    let transformedBasis = this._linearTransformation.getInterpolatedResult(this._p)

    c.vectorRenderer.attachBasisVector(transformedBasis[0], 1);
    c.vectorRenderer.attachBasisVector(transformedBasis[1], 2);
    c.vectorRenderer.update();

    c.gridRenderer.attachBasis(transformedBasis[0], transformedBasis[1]);
}

export {
    LTAnimation
}