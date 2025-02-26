let user = {
  name: prompt("Adınız nedir?"),
  age: prompt("Yaşınız kaç?"),
  job: prompt("Mesleğiniz nedir?"),
};

let cart = [];

console.log(
  `Kullanıcı Bilgileri: { name: '${user.name}', age: ${user.age}, job: '${user.job}' }`
);

document.getElementById("user-info").innerHTML = `
    <h2>Müşteri Bilgileri</h2>
    <p><strong>Ad:</strong> ${user.name}</p>
    <p><strong>Yaş:</strong> ${user.age}</p>
    <p><strong>Meslek:</strong> ${user.job}</p>
`;

while (true) {
  let productName = prompt(
    "Sepete eklemek istediğiniz ürünü yazın (Sepetiniz tamamlandı ise q tuşuna basınız.):"
  );

  if (productName === null || productName.toLowerCase() === "q") break;

  let productPrice = prompt("Ürünün fiyatı:");

  if (
    productPrice === null ||
    isNaN(productPrice) ||
    productPrice.trim() === "" ||
    productPrice <= 0
  ) {
    alert("Geçersiz fiyat! Lütfen bir sayı girin.");
    continue;
  }

  let price = parseFloat(productPrice);

  cart.push({ product: productName.toLowerCase(), price: price });
  console.log(`${productName} ürünü sepete eklendi. Fiyat: ${price} TL`);
}

function updateCartDisplay() {
  document.getElementById("cart-info").innerHTML = `
    <h2>Sepetiniz</h2>
    <ul>
        ${cart
          .map((item) => `<li>${item.product} - ${item.price} TL</li>`)
          .join("")}
    </ul>
    <p><strong>Toplam Fiyat:</strong> 
    ${cart.reduce((sum, item) => sum + item.price, 0)} TL</p>
  `;
}

function removeFromCart(productName) {
  const index = cart.findIndex(
    (item) => item.product === productName.toLowerCase()
  );

  if (index === -1) {
    console.log(`"${productName}" adlı ürün sepetinizde bulunamadı.`);
    return;
  }

  let removedItem = cart[index];
  cart = [...cart.slice(0, index), ...cart.slice(index + 1)];

  console.log(
    `\n"${removedItem.product}" ürünü sepetten çıkarıldı. Fiyat: ${removedItem.price} TL`
  );
}

function removeProductsFromCart() {
  while (cart.length > 0) {
    let removeProduct = prompt(
      "Sepetten çıkarmak istediğiniz ürünün adını girin (Tamamlandı ise lütfen q tuşuna basınız.):"
    );

    if (removeProduct === null || removeProduct.toLowerCase() === "q") break;

    removeFromCart(removeProduct);
  }
  updateCartDisplay();
}

while (true) {
  let choice = prompt(
    "Alışverişi tamamlamak için q tuşuna, tamamlamadan önce ürün çıkarmak için x tuşuna basın:"
  );

  if (choice === null || choice.toLowerCase() === "q") {
    updateCartDisplay();
    console.log("\nSepetiniz:");
    cart.forEach((item, index) =>
      console.log(`${index + 1}. ${item.product} - ${item.price} TL`)
    );
    console.log(
      `Toplam Fiyat: ${cart.reduce((sum, item) => sum + item.price, 0)} TL`
    );
    console.log("İşlem tamamlandı!");
    break;
  }

  if (choice.toLowerCase() === "x") {
    removeProductsFromCart();
  }
}
