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

MainCanvas.setup = function() {
    let mc = MainCanvas;

    mc.createCanvas(mc.cwidth, mc.cheight);

    mc.originRenderer = new OriginRenderer;
    mc.vectorRenderer = new Vector2DRenderer;
    mc.gridRenderer = new GridRender;
    mc.spectrumRenderer = new SpectrumRenderer;

    mc.vectorRenderer.attachBasis(LinearTransformationData.BasisVec1, LinearTransformationData.BasisVec2);
    mc.vectorRenderer.attachVector(ConfigurationsData.InOutVector);
    mc.gridRenderer.attachBasis(LinearTransformationData.BasisVec1, LinearTransformationData.BasisVec2);
    mc.spectrumRenderer.attachBasis(LinearTransformationData.BasisVec1, LinearTransformationData.BasisVec2);

    mc.spectrum = new Spectrum(LinearTransformationData.Matrix);
    let eigenvectors = mc.spectrum.getUnitEigenVectors();

    if(eigenvectors != null) {
        mc.spectrumRenderer.attachEigenVectors(eigenvectors);
    }

    let linearTransformation = new LinearTransformation(LinearTransformationData);
    mc.ltAnimation = new LTAnimation(linearTransformation, 4000);

    // Copying matrix;
    mc.prevMatrix = LinearTransformationData.Matrix.map(function(arr) {
        return arr.slice();
    });

    mc.timer = new Timer();
}

MainCanvas.draw = function() {
    let mc = MainCanvas; // alias

    // Measuring time elapsed since previous iteration;
    let dt = mc.timer.getElapsedTime();
    mc.timer.restart();
    
    // Computing eigenvectors if matrix changes;
    if(!(mc.prevMatrix[0][0] === LinearTransformationData.Matrix[0][0] &&
            mc.prevMatrix[0][1] === LinearTransformationData.Matrix[0][1] && 
            mc.prevMatrix[1][0] === LinearTransformationData.Matrix[1][0] &&
            mc.prevMatrix[1][1] === LinearTransformationData.Matrix[1][1])) {

            let eigenvectors = mc.spectrum.getUnitEigenVectors();

            if(eigenvectors != null) {
                mc.spectrumRenderer.replaceEigenVectors(eigenvectors);
            }
            
            mc.prevMatrix = LinearTransformationData.Matrix.map(function(arr) {
                return arr.slice();
            });
    }

    let [updatedBasisVec1, updatedBasisVec2] = (AnimationData.IsPlaying === true) ? 
        mc.ltAnimation.getUpdatedBasis(dt) :
        mc.ltAnimation.getUpdatedBasis(0);

    mc.vectorRenderer.updateBasis(updatedBasisVec1, updatedBasisVec2);
    mc.gridRenderer.updateBasis(updatedBasisVec1, updatedBasisVec2);
    mc.spectrumRenderer.updateBasis(updatedBasisVec1, updatedBasisVec2);

    // Everything is rendered from the origin coords
    mc.translate(mc.origin.x, mc.origin.y);

    mc.background(
        ColorPalette.backgroundColor.r,
        ColorPalette.backgroundColor.g,
        ColorPalette.backgroundColor.b
    );
    
    mc.gridRenderer.renderGrid(mc);

    // If eigenvalues need to be rendered;
    if(ConfigurationsData.displayEigenVectors === true) {
        mc.spectrumRenderer.renderEigenVectors(mc);
    }
   
    mc.vectorRenderer.renderBasisVectors(mc); 

    // If in/out vector needs to be rendered;
    if(ConfigurationsData.displayInOutVector === true) {
        mc.vectorRenderer.renderVectors(mc); 
    }

    mc.originRenderer.renderOrigin(mc);
}
