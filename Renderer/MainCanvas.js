var MainSketch = function(mc) {
    mc.cwidth = 1000;
    mc.cheight = 800;

    mc.origin = {
        x : mc.cwidth / 2,
        y : mc.cheight / 2
    };
}

var MainCanvas = new p5(MainSketch);