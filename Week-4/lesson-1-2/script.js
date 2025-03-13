document.addEventListener("DOMContentLoaded", () => {
  init();
});

function init() {
  buildCss();
  buildHtml();
  fetchData();
}

function buildCss() {
  const style = document.createElement("style");
  style.textContent = `

      *{
  transition: all 0.5s ease-in-out}
      body { font-family: Arial, sans-serif; background-color: #161c33; display: flex; flex-wrap: wrap; justify-content: center; padding: 20px; }

      .ins-api-users { display: flex; width: 80vw; flex-wrap: wrap; }

      .user-card { border: 1px solid #f5a623; border-radius: 12px; margin: 10px;background: linear-gradient(135deg,rgba(0, 0, 0, 1) 0%,rgba(69, 0, 93, 1) 24%,rgb(85, 249, 255) 100%);width: 20%; box-shadow: 0 4px 12px rgba(0,0,0,0.15);  min-height: 420px; display: flex; flex-direction: column; padding:20px; justify-content: space-between;color:white }

      .avatar-img { width: 100px; height: 100px; border-radius: 50%; margin-bottom: 10px; }

      .popup { display: none; position: fixed; top: 20%; left: 50%; transform: translate(-50%, -20%); background-color: #ffffff; padding: 20px; border-radius: 12px; box-shadow: 0 0 20px rgba(0,0,0,0.3); z-index: 1000; max-width: 400px; text-align: left; }

      .overlay { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.5); z-index: 999; }

      .close-btn, .details-btn { background-color:rgb(28 84 107); font-weight:bold; color: #fff; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; margin-top: 10px; }

      .delete-btn { background-color: red; color: #fff; font-weight:bold; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; margin-top: 10px;  }
     
      .notification {position: fixed; top: 10px; right: 10px; padding: 15px 20px; border-radius: 5px; font-weight: bold; color: white; display: none; opacity: 1;transition: opacity 0.5s ease-in-out;}
      .success { background-color: green; }
      .error { background-color: red;}

      @media (max-width:768px) {.user-card { width:80%}}

      @media (min-width:768.1px) and (max-width: 1223px) {.user-card { width: 40%;}} 

      @media (min-width:1223.1px) and (max-width:1440px) {.user-card { width:27%}}`;

  document.head.appendChild(style);
}

function buildHtml() {
  const overlay = document.createElement("div");
  overlay.className = "overlay";
  document.body.appendChild(overlay);

  const popup = document.createElement("div");
  popup.className = "popup";
  document.body.appendChild(popup);

  const notification = document.createElement("div");
  notification.className = "notification";
  notification.style.display = "none";
  document.body.appendChild(notification);
}

function showNotification(message, type) {
  const notification = document.querySelector(".notification");
  if (!notification) return;

  notification.textContent = message;
  notification.className = `notification ${type}`;
  notification.style.display = "block";
  notification.style.opacity = "1";

  setTimeout(() => {
    notification.style.opacity = "0";
    setTimeout(() => {
      notification.style.display = "none";
    }, 500);
  }, 5000);
}
function fetchData() {
  const storedData = localStorage.getItem("users");
  const expiryTime = localStorage.getItem("expiryTime");
  const now = new Date().getTime();

  if (storedData && expiryTime && now < expiryTime) {
    displayUsers(JSON.parse(storedData));
  } else {
    fetchUsers()
      .then((data) => {
        localStorage.setItem("users", JSON.stringify(data));
        localStorage.setItem("expiryTime", now + 24 * 60 * 60 * 1000);
        displayUsers(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

function fetchUsers() {
  return new Promise((resolve, reject) => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        showNotification("Data fetched successfully.", "success");
        if (!response.ok) {
          reject(new Error(`API hatası: ${response.status}`));
          showNotification("Failed to fetch data!", "error");
        }
        return response.json();
      })
      .then((data) => {
        if (!Array.isArray(data) || data.length === 0) {
          reject(new Error("API is empty!."));
          showNotification("API is empty!", "error");
        }
        resolve(data);
      })
      .catch((error) =>
        reject(new Error(`Connection Error: ${error.message}`))
      );
  });
}

function displayUsers(users) {
  const container = document.querySelector(".ins-api-users");
  if (!container) {
    console.error("ins-api-users div bulunamadı!");
    return;
  }
  container.innerHTML = "";

  users.forEach((user) => {
    const userDiv = document.createElement("div");
    userDiv.className = "user-card";
    userDiv.innerHTML = `
          <img src="https://i.pravatar.cc/150?u=${user.id}" alt="Avatar" class="avatar-img">
          <h3>${user.username}</h3>
          <p><span style='font-weight: bold;'>E-mail:</span></br> ${user.email}</p>
          <p><span style='font-weight: bold;'>Address:</span></br> ${user.address.street}, ${user.address.city}</p>
          <div class="button-container"><button class="details-btn">Show Details</button>
          <button class="delete-btn">Delete</button></div>`;

    userDiv
      .querySelector(".details-btn")
      .addEventListener("click", function () {
        showPopup(user);
      });

    userDiv.querySelector(".delete-btn").addEventListener("click", function () {
      deleteUser(user.id);
    });

    container.appendChild(userDiv);
  });
}
function deleteUser(userId) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  users = users.filter((user) => user.id !== userId);
  localStorage.setItem("users", JSON.stringify(users));

  if (users.length === 0) {
    fetchUsers()
      .then((data) => {
        localStorage.setItem("users", JSON.stringify(data));
        localStorage.setItem(
          "expiryTime",
          new Date().getTime() + 24 * 60 * 60 * 1000
        );
        displayUsers(data);
      })
      .catch((error) => {
        console.error(error);
        showNotification("Failed to fetch data!", "error");
      });
  } else {
    displayUsers(users);
  }
}

function showPopup(user) {
  const popup = document.querySelector(".popup");
  const overlay = document.querySelector(".overlay");
  popup.innerHTML = `
      <img src="https://i.pravatar.cc/150?u=${user.id}" alt="Avatar" class="avatar-img">
      <h3>${user.username}</h3>
      <p><strong>Name Surname:</strong> ${user.name}</p>
      <p><strong>Website:</strong> <a href='http://${user.website}' target='_blank'>${user.website}</a></p>
      <p><strong>E-mail:</strong> ${user.email}</p>
      <p><strong>Phone:</strong> ${user.phone}</p>
      <p><strong>Company:</strong> ${user.company.name}</p>
      <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
      <div class="button-container"><button class="close-btn">Close</button></div>`;
  popup.style.display = "block";
  overlay.style.display = "block";

  document.querySelector(".close-btn").addEventListener("click", () => {
    popup.style.display = "none";
    overlay.style.display = "none";
  });
}
