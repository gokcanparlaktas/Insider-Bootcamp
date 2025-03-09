function init() {
  buildHtml();
  buildCss();
  setEvents();
}

if (typeof jQuery === "undefined") {
  var script = document.createElement("script");
  script.src =
    "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js";
  script.onload = init;
  document.head.appendChild(script);
} else {
  init();
}

function buildHtml() {
  const htmlContent = `
        <div class="overlay"></div>
        <div class="popup"></div>
    `;
  $("body").append(htmlContent);
}

function buildCss() {
  $("<style>")
    .text(
      `
        body { font-family: Arial, sans-serif; background-color: #e0e7ff; display: flex; flex-wrap: wrap; justify-content: center; padding: 20px; }
        .product { border: 1px solid #f5a623; border-radius: 12px; margin: 10px; padding: 15px; background-color: #ffe8cc; width: 220px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); text-align: center; min-height: 420px; display: flex; flex-direction: column; justify-content: space-between; transition: transform 0.3s, box-shadow 0.3s, background-color 0.3s; }
        .product img { max-width: 100%; height: 150px; object-fit: cover; border-radius: 8px; margin-bottom: 10px; }
        .popup { display: none; position: fixed; top: 20%; left: 50%; transform: translate(-50%, -20%); background-color: #ffffff; padding: 20px; border-radius: 12px; box-shadow: 0 0 20px rgba(0,0,0,0.3); z-index: 1000; max-width: 400px; text-align: left; }
        .popup h3 { margin: 0 0 10px; color: #d35400; font-weight: bold; }
        .popup p { margin: 5px 0; color: #6e2c00; line-height: 1.6; }
        .overlay { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.5); z-index: 999; }
        .close-btn, .details-btn { background-color: #e67e22; color: #fff; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; margin-top: 10px; transition: background-color 0.3s; }
        .detail-img {max-width: 100%; border-radius: 8px; margin-bottom: 10px;}
        `
    )
    .appendTo("head");
}

function setEvents() {
  $.ajax({
    url: "products.json",
    method: "GET",
    dataType: "json",
    success: function (data) {
      $.each(data, function (index, product) {
        const { name, price, image, description, link, details } = product;

        const productHtml = `
                    <div class="product">
                        <img src="${image}">
                        <h3>${name}</h3>
                        <p>Fiyat: ${price} TL</p>
                        <button class="details-btn">Detayları Göster</button>
                    </div>
                `;
        $("body").append(productHtml);
      });

      $(".details-btn").on("click", function () {
        const index = $(this).closest(".product").index(".product");

        if (!data[index]) {
          return;
        }

        const { name, price, image, description, link, details } = data[index];

        const detailsHtml = `
                    <h3>${name}</h3>
                    <img class="detail-img" src="${image}">
                    <p><strong>Açıklama:</strong> ${description}</p>
                    <p><strong>Fiyat:</strong> ${price} TL</p>
                    <p><strong>Renk:</strong> ${details.color}</p>
                    <p><strong>Ağırlık:</strong> ${details.weight}</p>
                    <p><strong>Garanti:</strong> ${details.warranty}</p>
                    <a href="${link}" target="_blank">Ürüne Git</a><br><br>
                    <button class="close-btn">Kapat</button>
                `;
        $(".popup").html(detailsHtml).fadeIn();
        $(".overlay").fadeIn();
      });
    },
    error: function () {
      alert("Sayfa yüklenemedi!");
    },
  });

  $(document).on("click", ".overlay, .close-btn", function () {
    $(".overlay, .popup").fadeOut();
  });

  $(document)
    .on("mouseover", ".details-btn, .close-btn", function () {
      $(this).css("background-color", "#d35400");
    })
    .on("mouseout", ".details-btn, .close-btn", function () {
      $(this).css("background-color", "#e67e22");
    });

  $(document)
    .on("mouseover", ".product", function () {
      $(this).css({
        "background-color": "#ffd9b3",
        transform: "scale(1.05)",
        "box-shadow": "0 6px 15px rgba(0,0,0,0.2)",
      });
    })
    .on("mouseout", ".product", function () {
      $(this).css({
        "background-color": "#ffe8cc",
        transform: "scale(1)",
        "box-shadow": "0 4px 12px rgba(0,0,0,0.15)",
      });
    });
}
