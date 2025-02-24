let user = {
  name: prompt("Adınız nedir?"),
  age: prompt("Yaşınız kaç?"),
  job: prompt("Mesleğiniz nedir?"),
};

document.getElementById("user-info").innerHTML = `
    <h2>Müşteri Bilgileri 👨🏻‍👩🏻‍👧🏻‍👦🏻</h2>
    <p><strong>Ad:</strong> ${user.name}</p>
    <p><strong>Yaş:</strong> ${user.age}</p>
    <p><strong>Meslek:</strong> ${user.job}</p>`;

console.log(
  `Müşteri Bilgileri: { name: '${user.name}', age: ${user.age}, job: '${user.job}' }`
);

let cart = [];

while (true) {
  let productName = prompt(
    "Sepete eklemek istediğiniz ürünü yazın (Çıkmak için ESC veya 'q' tuşuna basın):"
  );

  if (productName === null || productName.toLowerCase() === "q") break;

  let productPrice = prompt("Ürünün fiyatı:");

  if (
    productPrice === null ||
    isNaN(productPrice) ||
    productPrice.trim() === "" ||
    productPrice < 0
  ) {
    alert("Geçersiz fiyat! Lütfen bir sayı girin.");
    continue;
  }

  let price = parseFloat(productPrice);

  cart.push({ product: productName, price: price });
  console.log(`${productName} ürünü sepete eklendi. Fiyat: ${price} TL`);
}

document.getElementById("cart-info").innerHTML = `
    <h2>Sepetiniz 🛒</h2>
    <ul>
        ${cart
          .map((item) => `<li>${item.product} - ${item.price} TL</li>`)
          .join("")}
    </ul>
    <p><strong>Toplam Fiyat:</strong> 
    ${cart.reduce((sum, item) => sum + item.price, 0)} TL</p>
`;

console.log(`Sepetiniz: ${JSON.stringify(cart, null, 2)}`);
console.log(
  `Toplam Fiyat: ${cart.reduce((sum, item) => sum + item.price, 0)} TL`
);
