let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
const controlTimerButton = document.querySelector(".control_timer__button");
let secondsLeft = 0;
const audio = new Audio('camel2.mp3');

// A function, which purpose in life is to count down
function timer(seconds){
    // clear any existing timers
    clearInterval(countdown);

    const now = Date.now();             // Static date function
    const then = now + seconds * 1000;  // millisecs
    displayTimeLeft(seconds);           // siplay the first second
    displayEndTime(then);

    countdown = setInterval(() => {
        secondsLeft = Math.round((then - Date.now()) / 1000);
        if (secondsLeft < 0){
            clearInterval(countdown);
            audio.play();
            return;
        } 
        // display it
        displayTimeLeft(secondsLeft);
    }, 1000);

    
}

// A function, which purpose in life is to display the minutes and seconds left
function displayTimeLeft(seconds){
    const minutes = Math.floor(seconds / 60);
    if(minutes > 60){
        console.log("time to add an hour");
        const hours = Math.floor(minutes / 60);
        const remainingSeconds = seconds % 60;
        const display = `${hours < 10 ? '0' : ''}${hours}:${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
        timerDisplay.textContent = display;
    } else {
        const remainingSeconds = seconds % 60;
        const display = `00:${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
        document.title = display;
        timerDisplay.textContent = display;
    }
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `Be back at ${hour}:${minutes < 10 ? '0' : ''}${minutes}`
}

function startTimer() {
    console.log('click')
    const seconds = parseInt(this.dataset.time);
    timer(seconds);

    // show buttons
    // changing the visibility attribute/property seem like a way better solution that using display 
    controlTimerButton.style.visibility = 'visible';
}

buttons.forEach(button => button.addEventListener('click', startTimer))
controlTimerButton.addEventListener('click', startPauseTimer)
// stopButton.addEventListener('click', stopTimer)

document.customForm.addEventListener('submit', function(e){
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins * 60)
    this.reset();
})


// TODOS -> wrap hours/days/weeks/etc
// UI/UX look nad feel bro

function startPauseTimer(){
    if(controlTimerButton.textContent == "PAUSE"){
        controlTimerButton.innerHTML = "START"
        clearInterval(countdown);
    } else {
        controlTimerButton.innerHTML = "PAUSE"
        timer(secondsLeft);
    }
}