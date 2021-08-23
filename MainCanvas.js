var MainSketch = function(mc) {
    // TODO Mobie view on small pixels
    // create boundary
    mc.cwidth = window.innerWidth > 1100 ? window.innerWidth * 57 / 100 : window.innerWidth;
    mc.cheight = window.innerWidth > 1100 ? window.innerHeight - (100) : window.innerHeight - window.innerHeight/2;

    mc.origin = {
        x : mc.cwidth / 2,
        y : mc.cheight / 2
    };
}

var MainCanvas = new p5(MainSketch, "p5Container");

export {
    MainCanvas
}