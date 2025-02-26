(function self() {
  let num;
  do {
    num = parseInt(prompt("Bir sayı girin (1.000.000'dan küçük olmalı):"));
    if (isNaN(num) || num <= 0 || num >= 1000000) {
      console.log(
        "Lütfen 1.000.000'dan küçük ve geçerli bir pozitif sayı girin."
      );
    }
  } while (isNaN(num) || num <= 0 || num >= 1000000);

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

  let startTime = performance.now();
  let endTime = performance.now();
  let calculationTime = (endTime - startTime).toFixed(8);

  console.log(`Başlangıç Sayısı: ${originalNum}`);
  console.log(`Toplam Adım Sayısı: ${steps}`);
  console.log(`Hesaplama Süresi: ${calculationTime} ms`);
  console.log(`Zincir: ${results.join(" -> ")}`);

  if (originalNum === 837799) {
    console.log("Tebrikler! En uzun seriyi yakaladınız!");
  }
})();
