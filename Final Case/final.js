(() => {
  const self = {
    init: () => {
      if (!self.checkHomePage()) {
        return;
      }

      self.appendJquery();
    },

    checkHomePage: () => {
      const isHomePage = window.location.pathname === "/";

      if (!isHomePage) {
        console.log("wrong page");
      }

      return isHomePage;
    },

    appendJquery: () => {
      const script = document.createElement("script");
      script.src =
        "https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js";
      script.type = "text/javascript";
      script.onload = () => {
        self.fetchData();
      };
      document.head.appendChild(script);
    },

    appendCarousel: (data) => {
      self.buildCSS();
      self.buildHtml(data);
      self.setEvents();
    },

    buildHtml: (data) => {
      let productHtml = "";

      data.forEach((product) => {
        const { id, brand, name, url, img, price, original_price } = product;
        const original = parseFloat(original_price);
        const current = parseFloat(price);
        const discountRate = Math.floor(
          ((original - current) / original) * 100
        );
        const hasDiscountPrice = original_price !== price;
        const discountTagClass = hasDiscountPrice
          ? "discounted-tag"
          : "discounted-tag hidden";
        const priceClass = hasDiscountPrice ? "price green" : "price";

        productHtml += `
            <div class="product" data-id="${id}">
                <a href="${url}" target="_blank">
                    <div class="favorite">
                        <div class="fav">
                            <img class="default-favorite" src="/assets/svg/default-favorite.svg">
                            <img class="hovered-favorite" src="assets/svg/default-hover-favorite.svg">
                            <img class="added-favorite" src="/assets/svg/added-favorite.svg">
                        </div>
                    </div>
                    <img class="product-img" src="${img}" alt="${name}" />
                    <div class="product-info">
                        <p><strong>${brand}</strong> - ${name}</</p>
                        <p class="price">
                            <div class="${discountTagClass}">
                                <span class="discounted-price">${original_price} TL</span>
                                <p class="discount-rate">%${discountRate}</p>
                            </div>
                            <span class="${priceClass}">${price} TL</span>
                        </p>
                    </div>
                    <button id="addToCartBtn" type="submit" class="btn close-btn disable ng-star-inserted">Sepete Ekle</button>
                </a>
            </div>
        `;
      });

      const html = `
        <div class="product-container">
            <h2 class="carousel-header">Beğenebileceğini Düşündüklerimiz</h2>
            <div class="carousel-container">
            <div class="carousel-track" id="track">
                ${productHtml}
            </div>
            <button id="prevBtn" aria-label="Previous">
                <svg viewBox="0 0 24 24">
                    <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                </svg>
            </button>
            <button id="nextBtn" aria-label="Next">
                <svg viewBox="0 0 24 24">
                    <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z"/>
                </svg>
            </button>
        </div>
    `;
      $("eb-product-carousel").before(html);
    },

    buildCSS: () => {
      const css = `
            body {
                font-family: Poppins, sans-serif;
                padding: 20px;
            }

            .product-container {
                position: relative;
            }

            .carousel-container {
                width: 1296px;
                margin: auto;
                overflow-x: hidden;
            }

            .carousel-track {
                display: flex;
                transition: transform 0.4s ease;
                position: relative;
            }

            .carousel-header {
                font-family: Quicksand-Bold;
                font-size: 3rem;
                font-weight: 700;
                line-height: 1.11;
                color: #f28e00;
                margin: 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
                background-color: white;
                padding: 25px 67px;
                border-top-left-radius: 35px;
                border-top-right-radius: 35px;
            }

            .product {
                margin-right: 20px;
                position: relative;
                background: white;
                border-radius: 8px;
                padding: 20px;
                text-align: center;
                box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
            }

            .product:hover {
                color: #7d7d7d;
                cursor: pointer;
                z-index: 2;
                box-shadow: -10px 10px 100px 0 #00000030, inset 0 0 0 3px #f28e00;
            }

            .product-info {
                text-align: start;
                color: #7d7d7d;
                height: 123px;
            }

            .product-img {
                position: relative;
                width: auto;
                background-color: #fff;
                margin-bottom: 65px;
                height: 203px;
            }

            .discount-rate {
                color: #00a365;
                font-size: 18px;
                font-weight: 700;
                margin-bottom: 0;
            }

            .discounted-rate {
                display: flex;
            }

            .discounted-tag {
                display: flex;
                align-items: center;
                gap: 10px;
            }

            #prevBtn, #nextBtn {
                z-index: 10000;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                position: absolute;
                bottom: 50%;
                top: auto;
                background-color: #fef6eb;
                fill:orange;
            }

            #prevBtn {
                left: -65px;
                
            }

            #nextBtn {
            
                right: -65px;
            }

            .buttons button {
                background-color: rgba(0, 0, 0, 0.6);
                color: white;
                border: none;
                padding: 10px 15px;
                cursor: pointer;
                font-size: 24px;
                border-radius: 50%;
                pointer-events: auto;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .buttons button:hover {
                background-color: rgba(0, 0, 0, 0.8);
            }

            .buttons svg {
                width: 20px;
                height: 20px;
                fill: white;
            }

            .discounted-price {
                font-size: 1.4rem;
                font-weight: 500;
                text-decoration: line-through;
            }

            .hovered-favorite, .added-favorite {
                display: none;
            }

            .green {
                color: #00a365;
            }

            .favorite {
                z-index: 10;
                position: absolute;
                top: 15px;
                right: 10px;
            }

            .fav {
                box-shadow: 0 2px 4px 0 #00000024;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 50px;
                height: 50px;
                background-color: white;
                border-radius: 50%;
            }

            .price {
                display: flex;
                flex-direction: column;
                font-size: 2.2rem;
                font-weight: 600;
            }

            .hidden {
                visibility: hidden;
            }

            /* Media Queries */
            @media (max-width: 575.98px) {
                .product {
                    width: 245px;
                }

                .carousel-container {
                    max-width: 100vw;
                    padding-left: 15px;
                    padding-right: 15px;
                }
            }

            @media (min-width: 576px) and (max-width: 767.98px) {
                .product {
                    width: 335px;
                }

                .carousel-container {
                    max-width: 540px;
                }
            }

            @media (min-width: 768px) and (max-width: 991.98px) {
                .product {
                    width: 296.67px;
                }

                .carousel-container {
                    max-width: 720px;
                }
            }

            @media (min-width: 992px) and (max-width: 1279.98px) {
                .product {
                    width: 272.5px;
                }

                .carousel-container {
                    max-width: 960px;
                }
            }

            @media (min-width: 1280px) and (max-width: 1479.98px) {
                .product {
                    width: 242px;
                }

                .carousel-container {
                    max-width: 1280px;
                }
            }

            @media (min-width: 1480px) and (max-width: 1579.98px) {
                .carousel-container {
                    max-width: 1296px;
                }
            }

            @media (min-width: 1580px) {
                .carousel-container {
                    max-width: 1320px;
                }
            }
    `;
      $("<style>").addClass("carousel-style").html(css).appendTo("head");
    },

    setEvents: () => {
      (() => {
        const self = {
          init: () => {
            if (!self.checkHomePage()) {
              return;
            }
            self.appendJquery();
          },

          checkHomePage: () => {
            const isHomePage = window.location.pathname === "/";

            if (!isHomePage) {
              console.log("wrong page");
            }

            return isHomePage;
          },

          appendJquery: () => {
            const script = document.createElement("script");
            script.src =
              "https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js";
            script.type = "text/javascript";
            script.onload = () => {
              self.fetchData();
            };
            document.head.appendChild(script);
          },

          appendCarousel: (data) => {
            self.buildCSS();
            self.buildHtml(data);
            self.setEvents();
          },

          buildHtml: (data) => {
            let productHtml = "";

            data.forEach((product) => {
              const { id, brand, name, url, img, price, original_price } =
                product;
              const original = parseFloat(original_price);
              const current = parseFloat(price);
              const discountRate = Math.floor(
                ((original - current) / original) * 100
              );
              const hasDiscountPrice = original_price !== price;
              const discountTagClass = hasDiscountPrice
                ? "discounted-tag"
                : "discounted-tag hidden";
              const priceClass = hasDiscountPrice ? "price green" : "price";
              productHtml += `
                          <div class="product" data-id="${id}">
                       
                            <a href="${url}" target="_blank">
                      <div class="favorite">
            <div class="fav">
              <img class="default-favorite" src="/assets/svg/default-favorite.svg">
              <img class="hovered-favorite" src="assets/svg/default-hover-favorite.svg">
              <img class="added-favorite" src="/assets/svg/added-favorite.svg">
            </div>
          </div>
                              <img class="product-img" src="${img}" alt="${name}" />
                              <div class="product-info">
                                <p><strong>${brand}</strong> - ${name}</</p>
                            
                                <p class="price">
                                  <div class="${discountTagClass}">
                                      <span class="discounted-price">${original_price} TL</span>
                                      <p class="discount-rate">%${discountRate}</p>
                                  </div>
                                  <span class="${priceClass}">${price} TL</span>
                                </p>
                              </div>
                              <button id="addToCartBtn" type="submit" class="btn close-btn disable ng-star-inserted">Sepete Ekle</button>
                            </a>
                          </div>
                        `;
            });

            const html = `
                    <div class="product-container">
                      <h2 class="carousel-header">Beğenebileceğini Düşündüklerimiz</h2>
                      <div class="carousel-container">
                        <div class="carousel-track" id="track">
                           ${productHtml}
                        </div>
                        
                  
                     <button id="prevBtn" aria-label="Previous">
                            <svg viewBox="0 0 24 24">
                              <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                            </svg>
                          </button>
                          <button id="nextBtn" aria-label="Next">
                            <svg viewBox="0 0 24 24">
                              <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z"/>
                            </svg>
                          </button>
                    </div>
                  `;
            $("eb-product-carousel").before(html);
          },

          buildCSS: () => {
            const css = `
                  body {
                      font-family: Poppins, sans-serif;
                      padding: 20px;
                  }
          
                  .product-container {
                      position:relative;
                  }
                    
                  .carousel-container {
                      width: 1296px;
                      margin: auto;
                      overflow-x: hidden;
                  }
                    .carousel-track {
                      display: flex;
                      transition: transform 0.4s ease;
                          position: relative;
                   
                    }
          
          
                    .carousel-header{font-family: Quicksand-Bold;
              font-size: 3rem;
              font-weight: 700;
              line-height: 1.11;
              color: #f28e00;
              margin: 0;
              display: flex
          ;
              align-items: center;
              justify-content: space-between;
              background-color: white;
              padding: 25px 67px;
              border-top-left-radius: 35px;
              border-top-right-radius: 35px;
              font-family: Quicksand-Bold;
              font-weight: 700;}
                    .product {
                    margin-right: 20px;
              position: relative;
                      background: white;
                      border-radius: 8px;
                      padding: 20px;
                      text-align: center;
                      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
                      he
                    }
          
                  .product:hover{
                      color: #7d7d7d;
              cursor: pointer;
              z-index: 2;
              box-shadow: -10px 10px 100px 0 #00000030, inset 0 0 0 3px #f28e00;}
          
          
          
          
                      .product-info{
                         text-align:start;
                 color:#7D7D7D;
                 height:123px;
                 }
          
                    .product-img{
          position: relative;
            
              width: auto;
              background-color: #fff;
              margin-bottom: 65px;
              height: 203px;
              }
          
          .discount-rate{
              color: #00a365;
              font-size: 18px;
              font-weight: 700;color:#00a365
              ;margin-bottom:0}
          .discounted-rate{
          display:flex}
          .discounted-tag{
          display:flex;
          align-items:center;
          gap:10px}
          
                    #prevBtn, #nextBtn {
              z-index: 10000;
              width: 50px;
              height: 50px;
              border-radius: 50%;
              position: absolute;
              bottom: 50%;
              top: auto;
                    }
          
               #prevBtn{
                    left:-65px;}
              
                      #nextBtn{
                    right:-65px;}   
          
               
                    .buttons button {
                      background-color: rgba(0, 0, 0, 0.6);
                      color: white;
                      border: none;
                      padding: 10px 15px;
                      cursor: pointer;
                      font-size: 24px;
                      border-radius: 50%;
                      pointer-events: auto;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                    }
          
          
                    .buttons button:hover {
                      background-color: rgba(0, 0, 0, 0.8);
                    }
                    .buttons svg {
                      width: 20px;
                      height: 20px;
                      fill: white;
                    }
          
          
          
          
                  .discounted-price{
                      font-size: 1.4rem;
              font-weight: 500;
                  text-decoration:line-through;}
                  .hovered-favorite,.added-favorite{
                  display:none}
          
          .green{
          color:#00a365}
          
          
          
          .favorite{
          z-index:10;
              position: absolute;
              top: 15px;
              right: 10px;}
          
              .fav{
              box-shadow: 0 2px 4px 0 #00000024;
                      display: flex; justify-content: center; align-items:Center;
          width:50px; height:50px;background-color:white; border-radius:50%;}
          .price{
          display:flex;
          flex-direction: column;
          font-size: 2.2rem;
              font-weight: 600;}
                  @media (max-width: 575.98px) {
            .product {
              width: 245px;
            }
                .carousel-container{
                  max-width:100vw;
                  padding-left: 15px;
                  padding-right: 15px
              }
          }
          
          @media (min-width: 576px) and (max-width: 767.98px) {
            .product {
              width: 335px;
            }
               .carouse-container {
                  max-width:540px
              }
          }
          
          .hidden{
          visibility: hidden}
          
          
          @media (min-width: 768px) and (max-width: 991.98px) {
            .product {
              width: 296.67px;
            }
              .carousel-container {
                   max-width:720px
              
              }
          }
          
          @media (min-width: 992px) and (max-width: 1279.98px) {
            .product {
              width: 272.5px;
            }
              .carousel-container {
                   max-width:960px
              
              }
          }
          
          @media (min-width: 1280px) and (max-width:1479.98px) {
            .product {
              width: 242px;
            }
            .carousel-container {
                   max-width:1280px
              
              }  
          }
              @media (min-width: 1480px) and (max-width:1579.98px) {
              .carousel-container {
                  max-width:1296px
              }
          }
          
          @media (min-width: 1580px) {
              .carousel-container {
                  max-width:1320px
              }
          }
                  `;
            $("<style>").addClass("carousel-style").html(css).appendTo("head");
          },

          setEvents: () => {
            const $track = $("#track");
            const $prevBtn = $("#prevBtn");
            const $nextBtn = $("#nextBtn");

            let index = 0;
            const productWidth = $(".product").outerWidth(true);
            const totalProducts = $track.children().length;

            $nextBtn.on("click", () => {
              if (index < totalProducts - 1) index++;
              $track.css("transform", `translateX(-${index * productWidth}px)`);
            });

            $prevBtn.on("click", () => {
              if (index > 0) index--;
              $track.css("transform", `translateX(-${index * productWidth}px)`);
            });

            function getFavorites() {
              return JSON.parse(localStorage.getItem("favorites") || "[]");
            }

            function addFavorite(id) {
              const favorites = getFavorites();
              if (!favorites.includes(id)) {
                favorites.push(id);
                localStorage.setItem("favorites", JSON.stringify(favorites));
              }
            }

            function removeFavorite(id) {
              let favorites = getFavorites();
              favorites = favorites.filter((favId) => favId !== id);
              localStorage.setItem("favorites", JSON.stringify(favorites));
            }

            function isFavorite(id) {
              return getFavorites().includes(id);
            }

            $(".product").each(function () {
              const $product = $(this);
              const productId = $product.data("id");
              const $fav = $product.find(".favorite");
              const $default = $fav.find(".default-favorite");
              const $hovered = $fav.find(".hovered-favorite");
              const $added = $fav.find(".added-favorite");

              let isAdded = isFavorite(productId);

              if (isAdded) {
                $default.hide();
                $hovered.hide();
                $added.show();
              }

              $fav.on("mouseenter", function () {
                if (!isAdded) {
                  $default.hide();
                  $hovered.show();
                }
              });

              $fav.on("mouseleave", function () {
                if (!isAdded) {
                  $hovered.hide();
                  $default.show();
                }
              });

              $fav.on("click", function (e) {
                e.stopPropagation();
                e.preventDefault();

                isAdded = !isAdded;

                if (isAdded) {
                  addFavorite(productId);
                  $default.hide();
                  $hovered.hide();
                  $added.show();
                } else {
                  removeFavorite(productId);
                  $added.hide();
                  $default.show();
                }
              });
            });

            $(".btn.close-btn").on("click", function (e) {
              e.stopPropagation();
              e.preventDefault();
              const productName = $(this)
                .closest(".product")
                .find(".product-img")
                .attr("alt");
              console.log("Sepete eklendi:", productName);
            });
          },

          fetchData: () => {
            const products = JSON.parse(localStorage.getItem("products"));

            if (products?.length > 0) {
              self.appendCarousel(products);

              return;
            }

            $.ajax({
              url: "https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json",
              method: "GET",
              dataType: "json",
              success: function (data) {
                localStorage.setItem("products", JSON.stringify(data));

                self.appendCarousel(data);
              },

              error: function (xhr, status, error) {
                console.error("An error occurred:", error);
              },
            });
          },
        };

        self.init();
      })();

      function getFavorites() {
        return JSON.parse(localStorage.getItem("favorites") || "[]");
      }

      function addFavorite(id) {
        const favorites = getFavorites();
        if (!favorites.includes(id)) {
          favorites.push(id);
          localStorage.setItem("favorites", JSON.stringify(favorites));
        }
      }

      function removeFavorite(id) {
        let favorites = getFavorites();
        favorites = favorites.filter((favId) => favId !== id);
        localStorage.setItem("favorites", JSON.stringify(favorites));
      }

      function isFavorite(id) {
        return getFavorites().includes(id);
      }

      $(".product").each(function () {
        const $product = $(this);
        const productId = $product.data("id");
        const $fav = $product.find(".favorite");
        const $default = $fav.find(".default-favorite");
        const $hovered = $fav.find(".hovered-favorite");
        const $added = $fav.find(".added-favorite");

        let isAdded = isFavorite(productId);

        if (isAdded) {
          $default.hide();
          $hovered.hide();
          $added.show();
        }

        $fav.on("mouseenter", function () {
          if (!isAdded) {
            $default.hide();
            $hovered.show();
          }
        });

        $fav.on("mouseleave", function () {
          if (!isAdded) {
            $hovered.hide();
            $default.show();
          }
        });

        $fav.on("click", function (e) {
          e.stopPropagation();
          e.preventDefault();

          isAdded = !isAdded;

          if (isAdded) {
            addFavorite(productId);
            $default.hide();
            $hovered.hide();
            $added.show();
          } else {
            removeFavorite(productId);
            $added.hide();
            $default.show();
          }
        });
      });

      $(".btn.close-btn").on("click", function (e) {
        e.stopPropagation();
        e.preventDefault();
        const productName = $(this)
          .closest(".product")
          .find(".product-img")
          .attr("alt");
      });
    },

    fetchData: () => {
      const products = JSON.parse(localStorage.getItem("products"));

      if (products?.length > 0) {
        self.appendCarousel(products);

        return;
      }

      $.ajax({
        url: "https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json",
        method: "GET",
        dataType: "json",
        success: function (data) {
          localStorage.setItem("products", JSON.stringify(data));

          self.appendCarousel(data);
        },

        error: function (xhr, status, error) {
          console.error("An error occurred:", error);
        },
      });
    },
  };

  self.init();
})();
