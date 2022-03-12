import { ControlBtnAnimationController } from "./ControlBtnAnimationController.js";

// Global object to store all necessary data about LT;
const LinearTransformationData = {
    BasisVec1:  new Array(2).fill(0),
    BasisVec2:  new Array(2).fill(0),
    Matrix:     new Array(2).fill().map(() => Array(2).fill(0)),
};

// Default values for a basis vectors; Cartesian Basis;
LinearTransformationData.BasisVec1[0] = 1;
LinearTransformationData.BasisVec1[1] = 0;

LinearTransformationData.BasisVec2[0] = 0;
LinearTransformationData.BasisVec2[1] = 1;

// Default values for a matrix; aka identity;
LinearTransformationData.Matrix[0][0] = 1;
LinearTransformationData.Matrix[0][1] = 0;
LinearTransformationData.Matrix[1][0] = 0;
LinearTransformationData.Matrix[1][1] = 1;

const AnimationData = {
    IsPlaying : false,
    Val : 0.0 // [0 -> 1];
};

const ConfigurationsData = {
    displayEigenVectors : false,

    displayInOutVector : false,
    InOutVector : new Array(2).fill(0)
};


// Handle Basis Vectors;
const vectorValHandlers = {
    vec1val1: (val) => {
        // assign to obj
        console.log(`Value from first vector first val is : ${val}`);

        let valu = parseFloat(val);
        if(Number.isNaN(valu)) valu = 1;
        LinearTransformationData.BasisVec1[0] = valu;
    },

    vec1val2: (val) => {
        // assign to obj
        console.log(`Value from first vector second val is : ${val}`);

        let valu = parseFloat(val);
        if(Number.isNaN(valu)) valu = 0;
        LinearTransformationData.BasisVec1[1] = valu;
    },

    vec2val1: (val) => {
        // assign to obj
        console.log(`Value from second vector first val is : ${val}`);

        let valu = parseFloat(val);
        if(Number.isNaN(valu)) valu = 0;
        LinearTransformationData.BasisVec2[0] = valu;
    },

    vec2val2: (val) => {
        // assign to obj
        console.log(`Value from second vector second val is : ${val}`);

        let valu = parseFloat(val);
        if(Number.isNaN(valu)) valu = 1;
        LinearTransformationData.BasisVec2[1] = valu;
    }
}


// Handle Matrix;
const matrixValHandlers = {
    row1col1: (val) => {
        // assign to obj
        console.log(`Matrix value from row 1 col 1  : ${val}`);

        let valu = parseFloat(val);
        if(Number.isNaN(valu)) valu = 1;
        LinearTransformationData.Matrix[0][0] = valu;
    },
    
    row1col2: (val) => {
        // assign to obj

        let valu = parseFloat(val);
        if(Number.isNaN(valu)) valu = 0;
        LinearTransformationData.Matrix[0][1] = valu;

        console.log(`Matrix value from row 1 col 2 : ${val}`);
    },
    
    row2col1: (val) => {
        // assign to obj
        console.log(`Matrix value from row 2 col 1 : ${val}`);

        let valu = parseFloat(val);
        if(Number.isNaN(valu)) valu = 0;
        LinearTransformationData.Matrix[1][0] = valu;
    },
    
    row2col2: (val) => {
        // assign to obj
        console.log(`Matrix value from row 2 col 2 : ${val}`);

        let valu = parseFloat(val);
        if(Number.isNaN(valu)) valu = 1;
        LinearTransformationData.Matrix[1][1] = valu;
    }
}

const trVectorValHandlers = {
    vec1val1: (val) => {
        // assign to obj
        console.log(`Value from first tr vector first val is : ${val}`);

        let valu = parseFloat(val);
        if(Number.isNaN(valu)) valu = 0;
        ConfigurationsData.InOutVector[0] = valu;
        // LinearTransformationData.BasisVec1[0] = parseInt(val);
    },

    vec1val2: (val) => {
        // assign to obj
        console.log(`Value from first tr vector second val is : ${val}`);

        let valu = parseFloat(val);
        if(Number.isNaN(valu)) valu = 0;
        ConfigurationsData.InOutVector[1] = valu;
        // LinearTransformationData.BasisVec1[1] = parseInt(val);
    },
};


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

document.getElementsByClassName("trVector-input").forEach(domElement => {
    domElement.addEventListener("input", (e) => {
        trVectorValHandlers[e.target.getAttribute("data-identifier")](e.target.value);
    });
});

document.getElementById("Range").addEventListener("input", (e) => {

    AnimationData.Val = e.target.value / 100;
    AnimationData.IsPlaying = false;
    ControlBtnAnimationController.stopBtnHandler();
});

document.getElementById("playBtn").addEventListener("click", (e) => {
    // trigger start func
    ControlBtnAnimationController.playBtnHandler();

    if(document.getElementById("Range").value == 100) {
        AnimationData.Val = -1;
        document.getElementById("Range").value = 0;
    }

    AnimationData.IsPlaying = true;
})

document.getElementById("stopBtn").addEventListener("click", (e) => {
    // trigger stop func
    ControlBtnAnimationController.stopBtnHandler();

    AnimationData.IsPlaying = false;
});

document.getElementById("CheckBox1").addEventListener('change', function() {
    if (this.checked) {
        ConfigurationsData.displayEigenVectors = true;
    } else {
        ConfigurationsData.displayEigenVectors = false;
    }
});

document.getElementById("CheckBox3").addEventListener('change', function() {
    if (this.checked) {
        ConfigurationsData.displayInOutVector = true;
    } else {
        ConfigurationsData.displayInOutVector = false;
    }
});

// document.getElementById

export { 
    LinearTransformationData,
    AnimationData,
    ConfigurationsData
};





