function Color(r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;

    this.a = a;
}

const ColorPalette = {
    backgroundColor :   new Color(253, 245, 228),

    mainAxisColor   :   new Color(58, 76, 90),
    lineColor       :   new Color(213, 202, 188),

    originColor     :   new Color(213, 202, 188),

    vectorColor     :   new Color(223, 0, 0),
    basisV1Color    :   new Color(138, 211, 191),
    basisV2Color    :   new Color(223, 125, 110) 
};

export {
    ColorPalette
};