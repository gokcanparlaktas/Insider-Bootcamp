let num;
do {
  num = parseInt(prompt("Bir sayı girin (1.000.000'dan küçük olmalı):"));
  if (isNaN(num) || num <= 0 || num >= 1000000) {
    alert("Lütfen 1.000.000'dan küçük ve geçerli bir pozitif sayı girin.");
  }
} while (isNaN(num) || num <= 0 || num >= 1000000);
let startTime = performance.now();
let steps = 0;
let originalNum = num;
let results = [];

while (num !== 1) {
  results.push(num);
  num = num % 2 === 0 ? num / 2 : 3 * num + 1;
  steps++;
}
results.push(1);
steps++;

let endTime = performance.now();
let calculationTime = Math.max((endTime - startTime).toFixed(4), 0.0001);

console.log(`Hesaplama süresi: ${calculationTime} ms`);

document.getElementById(
  "totalSteps"
).innerText = `Toplam Adım Sayısı: ${steps}`;
document.getElementById(
  "calculationTime"
).innerText = `Hesaplama Süresi: ${calculationTime} ms`;

(function renderSteps() {
  let timelineDiv = document.getElementById("timeline");
  timelineDiv.innerHTML = "";
  results.forEach((value, index) => {
    let step = document.createElement("div");
    step.className = "step";
    step.innerText = value;
    timelineDiv.appendChild(step);

    setTimeout(() => {
      step.classList.add("visible");
    }, index * 50);
  });
})();

function showLongestResult() {
  alert("837799 En uzun sonucu verir");
}
