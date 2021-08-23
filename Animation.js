import {
    AnimationData,
    ControlBtnAnimationController
} from "./export.js";

// Animation of Linear Transformation;
function LTAnimation(linearTransformation, duration) {
    this._T = duration;
    this._linearTransformation = linearTransformation;

    this._p = 0;
    this._t = 0;
    this._V = 0;

    this.prevSliderVal = AnimationData.Val;
}

LTAnimation.prototype.getUpdatedBasis = function(dt) {
    
    if(AnimationData.Val == -1) {
        this._t = 0;
        AnimationData.Val = 0;
        this.prevSliderVal = AnimationData.Val;
    }

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
        
        ControlBtnAnimationController.stopBtnHandler();
        document.getElementById("Range").value = 100;
    }
    else {
        document.getElementById("Range").value = this._t / this._T * 100;
    }

    // console.log(this._p);
    return this._linearTransformation.getInterpolatedResult(this._p);
}

export {
    LTAnimation
}
