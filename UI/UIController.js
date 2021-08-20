
// Global object to store all necessary data about LT;
const LinearTransformationData = {
    BasisVec1:  new Array(2).fill(0),
    BasisVec2:  new Array(2).fill(0),
    Matrix:     new Array(2).fill().map(() => Array(2).fill(0)),
};

// Default values for a matrix; aka identity;
LinearTransformationData.Matrix[0][0] = 1;
LinearTransformationData.Matrix[1][1] = 1;

const AnimationData = {
    IsPlaying : false,
    Val : 0.0 // [0 -> 1];
};

const ConfigurationsData = {
    displayEigenVectors : true
};


// Handle Basis Vectors;
const vectorValHandlers = {
    vec1val1: (val) => {
        // assign to obj
        console.log(`Value from first vector first val is : ${val}`);
        LinearTransformationData.BasisVec1[0] = parseInt(val);
    },

    vec1val2: (val) => {
        // assign to obj
        console.log(`Value from first vector second val is : ${val}`);
        LinearTransformationData.BasisVec1[1] = parseInt(val);
    },

    vec2val1: (val) => {
        // assign to obj
        console.log(`Value from second vector first val is : ${val}`);
        LinearTransformationData.BasisVec2[0] = parseInt(val);
    },

    vec2val2: (val) => {
        // assign to obj
        console.log(`Value from second vector second val is : ${val}`);
        LinearTransformationData.BasisVec2[1] = parseInt(val);
    }
}


// Handle Matrix;
const matrixValHandlers = {
    row1col1: (val) => {
        // assign to obj
        console.log(`Matrix value from row 1 col 1  : ${val}`);

        let valu = parseInt(val);
        if(valu === NaN) valu = 1;
        LinearTransformationData.Matrix[0][0] = valu;
    },
    
    row1col2: (val) => {
        // assign to obj
        console.log(`Matrix value from row 1 col 2 : ${val}`);

        let valu = parseInt(val);
        if(valu === NaN) val = 0;
        LinearTransformationData.Matrix[0][1] = valu;
    },
    
    row2col1: (val) => {
        // assign to obj
        console.log(`Matrix value from row 2 col 1 : ${val}`);

        let valu = parseInt(val);
        if(valu === NaN) valu = 0;
        LinearTransformationData.Matrix[1][0] = valu;
    },
    
    row2col2: (val) => {
        // assign to obj
        console.log(`Matrix value from row 2 col 2 : ${val}`);

        let valu = parseInt(val);
        if(Number.isNaN(valu)) valu = 1;
        LinearTransformationData.Matrix[1][1] = valu;
    }
}


// Listeners
document.getElementsByClassName("matrix-input").forEach(domElement => {
    domElement.addEventListener("input", (e) => {
        matrixValHandlers[e.target.getAttribute("data-identifier")](e.target.value);
    });
});

document.getElementsByClassName("vector-input").forEach(domElement => {
    domElement.addEventListener("input", (e) => {
        vectorValHandlers[e.target.getAttribute("data-identifier")](e.target.value);
    });
});

document.getElementById("Range").addEventListener("input", (e) => {
    // playAnimation(e.target.value / 100);
    AnimationData.Val = e.target.value / 100;
    AnimationData.IsPlaying = false;
});

document.getElementById("PlayBtn").addEventListener("click", (e) => {
    // trigger start func

    AnimationData.IsPlaying = true;
})
document.getElementById("StopBtn").addEventListener("click", (e) => {
    // trigger stop func

    AnimationData.IsPlaying = false;
})      

export { 
    LinearTransformationData,
    AnimationData,
    ConfigurationsData
};
