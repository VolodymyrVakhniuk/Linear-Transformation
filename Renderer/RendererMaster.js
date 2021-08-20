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

    // Measuring time elapsed since previous iteration;
    let dt = mc.timer.getElapsedTime();
    mc.timer.restart();

    if(AnimationData.IsPlaying === true) {
        let [updatedBasisVec1, updatedBasisVec2] = ltAnimation.getUpdatedBasis(dt);

        mc.vectorRenderer.updateBasis(updatedBasisVec1, updatedBasisVec2);
        mc.gridRenderer.updateBasis(updatedBasisVec1, updatedBasisVec2);
    }
    else
    {
        let [updatedBasisVec1, updatedBasisVec2] = ltAnimation.getUpdatedBasis(0);

        mc.vectorRenderer.updateBasis(updatedBasisVec1, updatedBasisVec2);
        mc.gridRenderer.updateBasis(updatedBasisVec1, updatedBasisVec2);
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



