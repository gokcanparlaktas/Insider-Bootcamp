document.addEventListener("DOMContentLoaded", () => {
  // Hamburger menü toggle
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  // Favorilere Ekle butonu renk değişimi
  const favBtn = document.getElementById("fav-btn");
  favBtn.addEventListener("click", () => {
    favBtn.classList.toggle("clicked");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger-menu");
  const menuList = document.querySelector(".menu-list");

  hamburger.addEventListener("click", () => {
    menuList.classList.toggle("active");
  });
});
