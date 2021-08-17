// Make a setup and draw functions of MainCanvas;
// Includes VectorRenderer, GridRenderer, etc

// var basis1 = [130, 50];
// var basis2 = [-50, 100];

import {
    LinearTransformation,
    LinearTransformationData,
    GridRender,
    MainCanvas,
    OriginRenderer,
    Vector2DRenderer,
    LTAnimation,
    colorPalette
} from "../export.js";

console.log(LinearTransformationData);


var vector = [3, 4];

var basis1 = LinearTransformationData.BasisVec1;
var basis2 = LinearTransformationData.BasisVec2;

var linearTransformation = new LinearTransformation(basis1, basis2, LinearTransformationData.Matrix);
var ltAnimation = new LTAnimation(linearTransformation, 4000);

// var basis1 = [100, 40];
// var basis2 = [40, 100];

// var basis1 = [0, 100];
// var basis2 = [100, 0];

MainCanvas.setup = function() {
    let mc = MainCanvas;

    mc.createCanvas(mc.cwidth, mc.cheight);

    mc.originRenderer = new OriginRenderer;
    mc.vectorRenderer = new Vector2DRenderer;
    mc.gridRenderer = new GridRender;

    mc.vectorRenderer.attachBasisVector(basis1, 1);
    mc.vectorRenderer.attachBasisVector(basis2, 2);
    // mc.vectorRenderer.attachVector(vector);

    mc.gridRenderer.attachBasis(basis1, basis2);
}

// Request Animation Frame;

MainCanvas.draw = function() {
    let mc = MainCanvas; // alias

    // let transformedBasis = linearTransformation.getInterpolatedResult(0.9);
    // let transformedBasis = linearTransformation.getTransformedBasis();
    // ltAnimation.play(mc);
    
    // Everything is rendered from the origin coords
    mc.translate(mc.origin.x, mc.origin.y);

    mc.background(
        colorPalette.backgroundColor.r,
        colorPalette.backgroundColor.g,
        colorPalette.backgroundColor.b
    );

    mc.gridRenderer.renderGrid(mc);
    mc.vectorRenderer.renderVectors(mc);
    mc.originRenderer.renderOrigin(mc);

    // basis1[0] += 1;
    // basis1[1] += 1;
    // basis2[0] += 1;
    // basis2[1] += 1;
}



