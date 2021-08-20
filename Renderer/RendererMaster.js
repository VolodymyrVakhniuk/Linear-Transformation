// Make a setup and draw functions of MainCanvas;
// Includes VectorRenderer, GridRenderer, etc

// var basis1 = [130, 50];
// var basis2 = [-50, 100];

import {
    LinearTransformation,
    LinearTransformationData,
    AnimationData,
    GridRender,
    MainCanvas,
    OriginRenderer,
    Vector2DRenderer,
    LTAnimation,
    ColorPalette,
    Timer
} from "../export.js";

console.log(LinearTransformationData);

var vector = [3, 4];

var linearTransformation = new LinearTransformation(LinearTransformationData);
var ltAnimation = new LTAnimation(linearTransformation, 4000);


MainCanvas.setup = function() {
    let mc = MainCanvas;

    mc.createCanvas(mc.cwidth, mc.cheight);

    mc.originRenderer = new OriginRenderer;
    mc.vectorRenderer = new Vector2DRenderer;
    mc.gridRenderer = new GridRender;

    mc.vectorRenderer.attachBasis(LinearTransformationData.BasisVec1, LinearTransformationData.BasisVec2);
    mc.gridRenderer.attachBasis(LinearTransformationData.BasisVec1, LinearTransformationData.BasisVec2);
    // mc.vectorRenderer.attachVector(vector);

    mc.timer = new Timer();
}

MainCanvas.draw = function() {
    let mc = MainCanvas; // alias

    // console.log(LinearTransformationData.Matrix[0][0]);
    // console.log(LinearTransformationData.Matrix[0][1]);
    // console.log(LinearTransformationData.Matrix[1][0]);
    // console.log(LinearTransformationData.Matrix[0][0]);
    
    // let transformedBasis = linearTransformation.getInterpolatedResult(0.9);
    // let transformedBasis = linearTransformation.getTransformedBasis();
    // ltAnimation.play(mc);

    // Measuring time elapsed since previous iteration;
    let dt = mc.timer.getElapsedTime();
    mc.timer.restart();

    if(AnimationData.IsPlaying === true) {
        // ltAnimation.play(mc);
        console.log("Animating");
        let [updatedBasisVec1, updatedBasisVec2] = ltAnimation.getUpdatedBasis(dt);
        console.log(updatedBasisVec1);
        console.log(updatedBasisVec2);
        console.log("dasda");
        mc.vectorRenderer.updateBasis(updatedBasisVec1, updatedBasisVec2);
        mc.gridRenderer.updateBasis(updatedBasisVec1, updatedBasisVec2);
        // mc.vectorRenderer.attachBasis(updatedBasisVec1, updatedBasisVec2);
        // mc.gridRenderer.attachBasis(updatedBasisVec1, updatedBasisVec2);
    }

    // Everything is rendered from the origin coords
    mc.translate(mc.origin.x, mc.origin.y);

    mc.background(
        ColorPalette.backgroundColor.r,
        ColorPalette.backgroundColor.g,
        ColorPalette.backgroundColor.b
    );

    mc.gridRenderer.renderGrid(mc);
    mc.vectorRenderer.renderVectors(mc);
    mc.originRenderer.renderOrigin(mc);
}



