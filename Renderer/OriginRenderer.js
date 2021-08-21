import { ColorPalette } from "../Color.js";

const originRenderData = {
    x : 0,
    y : 0,
    rad : 13
};

function OriginRenderer() {

}

// p must be a p5 canvas;
OriginRenderer.prototype.renderOrigin = function(p) {
    
    p.push();
    // p.noStroke();
    p.fill(ColorPalette.originColor.r, ColorPalette.originColor.g, ColorPalette.originColor.b);
    p.ellipse(originRenderData.x, originRenderData.y, originRenderData.rad, originRenderData.rad);
    p.pop();
}

export {
    OriginRenderer
}