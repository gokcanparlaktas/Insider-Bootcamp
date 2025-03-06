let allProducts = [];
let isAllVisible = false;

$(document).ready(function () {
  $.ajax({
    url: "products.json",
    method: "GET",
    dataType: "json",
    success: function (data) {
      allProducts = data;
      showLimitedProducts();
    },
    error: function () {
      alert("Ürünler yüklenemedi!");
    },
  });

  $("#toggleButton").click(function () {
    isAllVisible = !isAllVisible;
    if (isAllVisible) {
      showAllProducts();
      $(this).text("Ürünleri Gizle");
    } else {
      showLimitedProducts();
      $(this).text("Tümünü Gör");
    }
  });
});

function showLimitedProducts() {
  var productContainer = $("#productContainer");
  productContainer.find(".card").remove();
  allProducts.slice(0, 3).forEach(function (product) {
    var card = createCard(product);
    productContainer.append(card);
  });
}

function showAllProducts() {
  var productContainer = $("#productContainer");
  productContainer.find(".card").remove();
  allProducts.forEach(function (product) {
    var card = createCard(product);
    productContainer.append(card);
  });
}

function createCard(product) {
  return `<div class='card'>
          <img src='${product.image}' alt='${product.name}' />
          <div class='content'>
            <div class='text-container'>
              <h3>${product.name}</h3>
              <p>${product.description}</p>
              <p>Fiyat: $${product.price}</p>
            </div>
          </div>
          <div class='button-container'>
            <a href='${product.link}' target='_blank'>
              <button class='button'>
                <span class='front'>Sepete Ekle</span>
                <span class='back'><i>🛒</i></span>
              </button>
            </a>
          </div>
        </div>`;
}
