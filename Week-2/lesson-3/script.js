let countdown;
let time;

document.querySelector("#startButton").addEventListener("click", function () {
  clearInterval(countdown);
  time = parseInt(document.querySelector("#timeInput").value);

  if (isNaN(time) || time <= 0) {
    document.querySelector("#countdown").innerText = "--";
    return;
  }

  let countdownElement = document.querySelector("#countdown");
  countdownElement.classList.remove("time-up");
  countdownElement.classList.add("gradient");
  countdownElement.innerText = time;

  countdown = setInterval(function () {
    time--;
    countdownElement.innerText = time < 10 ? "0" + time : time;
    if (time <= 0) {
      clearInterval(countdown);
      countdownElement.innerText = "Süre doldu!";
      countdownElement.classList.add("time-up");
      countdownElement.classList.remove("gradient");
    }
  }, 1000);
});

document.querySelector("#resetButton").addEventListener("click", function () {
  clearInterval(countdown);
  let countdownElement = document.querySelector("#countdown");
  countdownElement.innerText = "00";
  countdownElement.classList.remove("time-up", "gradient");
  document.querySelector("#timeInput").value = "";
});
