const DEFAULT_BREAK_LENGTH = 5;
const DEFAULT_SESSION_LENGTH = 25;

var secondsLeft = 1500;
let intervalSession = null;
let intervalBreak = null;

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

var timerLabelDiv = document.getElementById("timer-label");

var playing = false;
var type = "Session";
var alarm = document.getElementById("beep");

function getTime(timeInSeconds) {
  let newMinutes = Math.floor(timeInSeconds / 60);
  let newSeconds = timeInSeconds % 60;

  return `${newMinutes.toString().padStart(2, "0")}:${newSeconds.toString().padStart(2, "0")}`;
}

function startSession() {
  if (!intervalSession) {
    intervalSession = setInterval(() => {
      secondsLeft = secondsLeft - 1;
      if (secondsLeft == 0) {
        timeLeftDiv.innerHTML = getTime(secondsLeft);
        clearInterval(intervalSession);
        alarm.play();

        type = "Break";
        setTimeout(() => {
          secondsLeft = breakLength * 60;
          timerLabelDiv.innerHTML = type;
          startBreak();
        }, 1000);
      }

      timeLeftDiv.innerHTML = getTime(secondsLeft);
    }, 1000);
  }
}

function startBreak() {
  if (!intervalBreak) {
  intervalBreak = setInterval(() => {
    secondsLeft = secondsLeft - 1;
    if (secondsLeft == 0) {
      timeLeftDiv.innerHTML = getTime(secondsLeft);
      clearInterval(intervalBreak);
      alarm.play();
      secondsLeft = breakLength * 60;
      type = "Session";
      setTimeout(() => {
        secondsLeft = breakLength * 60;
        timerLabelDiv.innerHTML = type;
        startSession();
      }, 1000);
    }

    timeLeftDiv.innerHTML = getTime(secondsLeft);
  }, 1000);
}
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
  if (breakLength < 60 && !playing) {
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
  if (sessionLength < 60 && !playing) {
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

  if (playing) {
    type === "Session" ? clearInterval(intervalSession) : clearInterval(intervalBreak);
    playing = false
  }
  alarm.pause();
  alarm.currentTime = 0;
  timerLabelDiv.innerHTML = "Session";
  timeLeftDiv.innerHTML = getTime(1500);
});

startStopDiv.addEventListener("click", () => {
  playing = !playing;
  console.log(playing);

  if (playing === true && secondsLeft > 0) {
    startSession();
  } else {
    console.log("clearInterval", intervalSession);
    intervalBreak = clearInterval(intervalBreak);
    intervalSession = clearInterval(intervalSession);
    console.log("clearInterval after", intervalSession);
  }
});
