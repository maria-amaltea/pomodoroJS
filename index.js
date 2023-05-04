const DEFAULT_BREAK_LENGTH = 5;
const DEFAULT_SESSION_LENGTH = 25;

var secondsLeft = 1500;
let intervalId = null;

//const DEFAULT_SECONDS = 1500;
//const MINUTES = Math.floor(DEFAULT_SECONDS / 60); // 25 minutes = 1500 seconds = "25 MIN"
//const SECONDS = DEFAULT_SECONDS % 60;
//const DEFAULT_TIME_LEFT = `${MINUTES.toString().padStart(2, "0")}:${SECONDS.toString().padStart(2, "0")}`;

var breakLength = DEFAULT_BREAK_LENGTH;
var sessionLength = DEFAULT_SESSION_LENGTH;

var timeLeftDiv = document.getElementById("time-left");
var breakLengthDiv = document.getElementById("break-length");
var sessionLengthDiv = document.getElementById("session-length");

var breakDecrementDiv = document.getElementById("break-decrement");
var breakIncrementDiv = document.getElementById("break-increment");
var sessionDecrementDiv = document.getElementById("session-decrement");
var sessionIncrementDiv = document.getElementById("session-increment");

var resetDiv = document.getElementById("reset");
var startStopDiv = document.getElementById("start_stop");
var playing = false;

var alarm = document.getElementById("beep");

function getTime(timeInSeconds) {
  let newMinutes = Math.floor(timeInSeconds / 60);
  let newSeconds =  timeInSeconds % 60;

  return `${newMinutes.toString().padStart(2, "0")}:${newSeconds.toString().padStart(2, "0")}`;
}

timeLeftDiv.innerHTML = getTime(secondsLeft);
breakLengthDiv.innerHTML = breakLength;
sessionLengthDiv.innerHTML = sessionLength;






//handle increment/decrement
breakDecrementDiv.addEventListener("click", () => {
  if (breakLength > 1 && !playing) {
    breakLength = breakLength - 1;
    breakLengthDiv.innerHTML = breakLength;
  }
});

breakIncrementDiv.addEventListener("click", () => {
 
  if (breakLength < 60 && !playing ) {
    breakLength = breakLength + 1;
    breakLengthDiv.innerHTML = breakLength;
  }
});

sessionDecrementDiv.addEventListener("click", () => {
  if (sessionLength > 1 && !playing) {
    sessionLength = sessionLength - 1;
    sessionLengthDiv.innerHTML = sessionLength;
    secondsLeft = sessionLength * 60;
    timeLeftDiv.innerHTML = getTime(secondsLeft);
  }
});

sessionIncrementDiv.addEventListener("click", () => {
  if (sessionLength < 60 && !playing ) {
    sessionLength = sessionLength + 1;
    sessionLengthDiv.innerHTML = sessionLength;
    secondsLeft = sessionLength * 60;
    timeLeftDiv.innerHTML = getTime(secondsLeft);
  }
});

//handle reset button

resetDiv.addEventListener("click", () => {
  
    sessionLength = DEFAULT_SESSION_LENGTH;
    sessionLengthDiv.innerHTML = sessionLength;
    breakLength = DEFAULT_BREAK_LENGTH;
    breakLengthDiv.innerHTML = breakLength;
    secondsLeft = 1500;
    timeLeftDiv.innerHTML = getTime(secondsLeft);
    
    clearInterval(intervalId);
    alarm.pause();
    alarm.currentTime = 0;
    timeLeftDiv.innerHTML = getTime(1500);

  }
);


startStopDiv.addEventListener("click", () => {

  playing = !playing;


  if ( playing===true && secondsLeft > 0) {

    intervalId = setInterval(()=> {
      secondsLeft = secondsLeft - 1;
      if (secondsLeft == 0) {
        timeLeftDiv.innerHTML = getTime(secondsLeft);
        clearInterval(intervalId);
        alarm.play()
        playing = false;
        return;
      } 
      
      timeLeftDiv.innerHTML = getTime(secondsLeft);
    },1000)

  } else {
    clearInterval(intervalId);
  }

}
);