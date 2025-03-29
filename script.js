let timer;
let isRunning = false;
let startTime = 0;
let elapsedTime = 0;

function updateDisplay() {
    let totalMilliseconds = Date.now() - startTime + elapsedTime;
    let totalSeconds = Math.floor(totalMilliseconds / 1000);
    let minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    let seconds = (totalSeconds % 60).toString().padStart(2, '0');
    let milliseconds = Math.floor((totalMilliseconds % 1000) / 10).toString().padStart(2, '0');
    document.querySelector('.stopwatch').innerText = `${minutes}:${seconds}:${milliseconds}`;
}

function startStopwatch() {
    if (!isRunning) {
        startTime = Date.now();
        timer = setInterval(updateDisplay, 10);
        isRunning = true;
    }
}

function pauseStopwatch() {
    if (isRunning) {
        clearInterval(timer);
        elapsedTime += Date.now() - startTime;
        isRunning = false;
    }
}

function resetStopwatch() {
    clearInterval(timer);
    isRunning = false;
    startTime = 0;
    elapsedTime = 0;
    document.querySelector('.stopwatch').innerText = '00:00:00';
    document.querySelector('.laps').innerHTML = '';
}

function lapTime() {
    if (isRunning) {
        let lapsContainer = document.querySelector('.laps');
        let lapItem = document.createElement('li');
        lapItem.classList.add('lap-item');
        lapItem.innerText = document.querySelector('.stopwatch').innerText;
        lapsContainer.appendChild(lapItem);

        // Limit to 5 laps
        if (lapsContainer.children.length > 1000) {
            lapsContainer.removeChild(lapsContainer.firstChild);
        }
    }
}
