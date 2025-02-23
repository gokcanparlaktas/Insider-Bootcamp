document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger-menu");
  const menuList = document.querySelector(".menu-list");

  hamburger.addEventListener("click", () => {
    menuList.classList.toggle("active");
  });

  const favBtn = document.getElementById("fav-btn");
  favBtn.addEventListener("click", () => {
    favBtn.classList.toggle("clicked");
    if (favBtn.classList.contains("clicked")) {
      favBtn.innerHTML = `<i class="fas fa-star"></i> Added to Favorites`;
    } else {
      favBtn.innerHTML = `<i class="far fa-star"></i> Add to Favorites`;
    }
  });
});
