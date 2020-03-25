let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

// A function, which purpose in life is to count down
function timer(seconds){
    // clear any existing timers
    clearInterval(countdown);

    const now = Date.now();             // Static date function
    const then = now + seconds * 1000;  // millisecs
    displayTimeLeft(seconds);           // siplay the first second
    displayEndTime(then);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if (secondsLeft < 0){
            clearInterval(countdown);
            return;
        } 
        // display it
        displayTimeLeft(secondsLeft);
    }, 1000);
}

// A function, which purpose in life is to display the minutes and seconds left
function displayTimeLeft(seconds){
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const display = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    document.title = display;
    timerDisplay.textContent = display;
    console.log({minutes, remainingSeconds})
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `Be back at ${hour}:${minutes < 10 ? '0' : ''}${minutes}`
}

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

// get value
// parseInt
// multiply by 60
// pass to timer

buttons.forEach(button => button.addEventListener('click', startTimer))

document.customForm.addEventListener('submit', function(e){
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins * 60)
    this.reset();
})


// TODOS -> wrap hours/days/weeks/etc
// pause and start stop button
// UI/UX look nad feel bro