var MainSketch = function(mc) {
    // TODO Mobie view on small pixels
    // create boundary
    mc.cwidth = window.innerWidth * 65.2 / 100;
    mc.cheight = window.innerHeight - (100);

    mc.origin = {
        x : mc.cwidth / 2,
        y : mc.cheight / 2
    };
}

var MainCanvas = new p5(MainSketch, "p5Container");

export {
    MainCanvas
}