
const ControlBtnAnimationController = (function() {

    const ControlButtons = {
        playBtn: document.getElementById("playBtn"),
        stopBtn: document.getElementById("stopBtn")
    }


    function playBtnHandler() {
        setTimeout(() => {
            // add displayNone class
            ControlButtons.playBtn.classList.add("displayNone");
            ControlButtons.stopBtn.classList.remove("displayNone")
        }, 300);
        ControlButtons.playBtn.classList.add("opacity0", "rotate180")
        ControlButtons.stopBtn.classList.remove("opacity0", "rotate180")
    }

    function stopBtnHandler() {
        setTimeout(() => {
            // add displayNone class
            ControlButtons.stopBtn.classList.add("displayNone");
            ControlButtons.playBtn.classList.remove("displayNone")
        }, 300);
        ControlButtons.stopBtn.classList.add("opacity0", "rotate180")
        ControlButtons.playBtn.classList.remove("opacity0", "rotate180")
    }

    return {
        playBtnHandler,
        stopBtnHandler
    }
})();

export { ControlBtnAnimationController };