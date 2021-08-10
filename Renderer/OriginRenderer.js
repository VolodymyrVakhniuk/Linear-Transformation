import { colorPalette } from "./Color.js";

const originRenderData = {
    x : 0,
    y : 0,
    rad : 13
};

function OriginRenderer() {

}

OriginRenderer.prototype.__checkp5CanvasType = function(p5Canvas) {
    return p5Canvas instanceof p5;
}

// p must be a p5 canvas;
OriginRenderer.prototype.renderOrigin = function(p) {

    if(this.__checkp5CanvasType(p) == false) {
        console.error("Type mismatch; provide a valid p5 context in OriginRenderer.renderOrigin");
        return;
    }

    p.push();
    // p.noStroke();
    p.fill(colorPalette.originColor.r, colorPalette.originColor.g, colorPalette.originColor.b);
    p.ellipse(originRenderData.x, originRenderData.y, originRenderData.rad, originRenderData.rad);
    p.pop();
}

export {
    OriginRenderer
}