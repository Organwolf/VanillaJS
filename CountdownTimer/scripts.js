let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');

// A function which purpose in life is to count down
function timer(seconds){
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

// A function which purpose in life is to display the minutes and seconds left
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

//at 15:16