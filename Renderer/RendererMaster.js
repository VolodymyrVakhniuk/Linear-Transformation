// Make a setup and draw functions of MainCanvas;
// Includes VectorRenderer, GridRenderer, etc

// var basis1 = [130, 50];
// var basis2 = [-50, 100];

import {
    LinearTransformation,
    Spectrum,
    LinearTransformationData,
    ConfigurationsData,
    AnimationData,
    GridRender,
    MainCanvas,
    OriginRenderer,
    Vector2DRenderer,
    SpectrumRenderer,
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
    mc.spectrumRenderer = new SpectrumRenderer;

    mc.vectorRenderer.attachBasis(LinearTransformationData.BasisVec1, LinearTransformationData.BasisVec2);
    mc.gridRenderer.attachBasis(LinearTransformationData.BasisVec1, LinearTransformationData.BasisVec2);

    mc.spectrumRenderer.attachBasis(LinearTransformationData.BasisVec1, LinearTransformationData.BasisVec2);

    let spectrum = new Spectrum(LinearTransformationData);
    mc.spectrumRenderer.attachEigenVectors(spectrum.getUnitEigenVectors());
    // console.log("Matrix is: " + LinearTransformationData.Matrix);
    // console.log("Eigenvectors are: " + spectrum.getUnitEigenVectors());

    // mc.vectorRenderer.attachVector(vector);

    if(ConfigurationsData.displayEigenVectors === true) {
        mc.prevMatrix = LinearTransformationData.Matrix.map(function(arr) {
            return arr.slice();
        });
    }

    mc.timer = new Timer();
}

MainCanvas.draw = function() {
    let mc = MainCanvas; // alias

    // Measuring time elapsed since previous iteration;
    let dt = mc.timer.getElapsedTime();
    mc.timer.restart();
    
    if(ConfigurationsData.displayEigenVectors === true) {
        if(!(mc.prevMatrix[0][0] === LinearTransformationData.Matrix[0][0] &&
             mc.prevMatrix[0][1] === LinearTransformationData.Matrix[0][1] && 
             mc.prevMatrix[1][0] === LinearTransformationData.Matrix[1][0] &&
             mc.prevMatrix[1][1] === LinearTransformationData.Matrix[1][1])) {

                mc.spectrumRenderer.removeEigenVectors();
                let spectrum = new Spectrum(LinearTransformationData);
                
                let eigenvectors = spectrum.getUnitEigenVectors();

                if(eigenvectors != null) {
                    mc.spectrumRenderer.attachEigenVectors(spectrum.getUnitEigenVectors());
                }
                
                mc.prevMatrix = LinearTransformationData.Matrix.map(function(arr) {
                    return arr.slice();
                });
        }
    }

    if(AnimationData.IsPlaying === true) {
        let [updatedBasisVec1, updatedBasisVec2] = ltAnimation.getUpdatedBasis(dt);

        mc.vectorRenderer.updateBasis(updatedBasisVec1, updatedBasisVec2);
        mc.gridRenderer.updateBasis(updatedBasisVec1, updatedBasisVec2);

        // If eigenvalues need to be rendered;
        if(ConfigurationsData.displayEigenVectors === true) {
            mc.spectrumRenderer.updateBasis(updatedBasisVec1, updatedBasisVec2);
        }
    }
    else
    {
        let [updatedBasisVec1, updatedBasisVec2] = ltAnimation.getUpdatedBasis(0);

        mc.vectorRenderer.updateBasis(updatedBasisVec1, updatedBasisVec2);
        mc.gridRenderer.updateBasis(updatedBasisVec1, updatedBasisVec2);

        // If eigenvalues need to be rendered;
        if(ConfigurationsData.displayEigenVectors === true) {
            mc.spectrumRenderer.updateBasis(updatedBasisVec1, updatedBasisVec2);
        }
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
    mc.spectrumRenderer.renderEigenVectors(mc);
}



