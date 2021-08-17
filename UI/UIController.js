function playAnimation(val) {
    console.log("Animation is play9ng :" + val);
}



// Global object to store all necessary data about LT;
const LinearTransformationData = {
    BasisVec1:  new Array(2).fill(0),
    BasisVec2:  new Array(2).fill(0),
    Matrix:     new Array(2).fill(new Array(2).fill(0))
}


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
        LinearTransformationData.Matrix[0][0] = parseInt(val);
    },
    
    row1col2: (val) => {
        // assign to obj
        console.log(`Matrix value from row 1 col 2 : ${val}`);
        LinearTransformationData.Matrix[0][1] = parseInt(val);
    },
    
    row2col1: (val) => {
        // assign to obj
        console.log(`Matrix value from row 2 col 1 : ${val}`);
        LinearTransformationData.Matrix[1][0] = parseInt(val);
    },
    
    row2col2: (val) => {
        // assign to obj
        console.log(`Matrix value from row 2 col 2 : ${val}`);
        LinearTransformationData.Matrix[1][1] = parseInt(val);
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
    playAnimation(e.target.value/100);
})

document.getElementById("PlayBtn").addEventListener("click", (e) => {
    // trigger play func
})
document.getElementById("StopBtn").addEventListener("click", (e) => {
    // trigger stop func
})      

export { LinearTransformationData };
