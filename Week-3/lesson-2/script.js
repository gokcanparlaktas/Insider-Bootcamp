let allProducts = [];
let isAllVisible = false;

$(document).ready(function () {
  $.ajax({
    url: "products.json",
    method: "GET",
    dataType: "json",
    success: function (response) {
      allProducts = response;
      showLimitedProducts();
    },
    error: function (xhr, status, error) {
      console.log("Hata:", error);
      alert("Ürünler yüklenemedi! Tekrar deneyin.");
    },
  });

  $("#toggleButton").on("click", function () {
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
$("#toggleButton")
  .on("mouseenter", function () {
    $(this).css({ "background-color": "#28a745", transform: "scale(1.05)" });
  })
  .on("mouseleave", function () {
    $(this).css({ "background-color": "#007bff", transform: "scale(1)" });
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
