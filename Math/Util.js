
function Timer() {
    this.previuosTime = 0;
    this.currentTime = 0;
}

Timer.prototype.start = function() {
    this.previuosTime = Date.now();
}

Timer.prototype.wasStarted = function() {
    return !(this.previuosTime === 0);
}

Timer.prototype.restart = function() {
    this.start();
}

Timer.prototype.getElapsedTime = function() {

    if(this.wasStarted() == false) {
        return 0;
    }

    this.currentTime = Date.now() - this.previuosTime;
    return this.currentTime;
}

export {
    Timer
}


