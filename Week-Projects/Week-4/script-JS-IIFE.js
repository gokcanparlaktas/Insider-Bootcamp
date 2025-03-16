(() => {
  const appendLocation = "";

  const buildHtml = () => {
    const container = document.querySelector(appendLocation);
    if (!container) return console.error(`${appendLocation} not found.`);

    container.innerHTML += `
          <div class="users-container"></div>
          <button class="refresh-btn">Verileri Yeniden Getir</button>
      `;

    const sessionData = JSON.parse(sessionStorage.getItem("sessionData")) || {};
    if (sessionData.refreshed) {
      const refreshBtn = document.querySelector(".refresh-btn");
      if (refreshBtn) refreshBtn.remove();
    }

    document.querySelector(".refresh-btn").addEventListener("click", () => {
      fetchUsers(true);
      sessionStorage.setItem(
        "sessionData",
        JSON.stringify({ ...sessionData, refreshed: true })
      );
      document.querySelector(".refresh-btn").remove();
    });
  };

  const buildCss = () => {
    const style = document.createElement("style");
    style.textContent = `
        * { transition: all 0.5s ease-in-out; box-sizing: border-box; margin: 0; padding: 0; }
        ${appendLocation} { display: flex; flex-direction: column; align-items: center; padding: 20px; }
        .users-container { display: flex; width: 80vw; flex-wrap: wrap; justify-content: center; }
        .user-card { 
          border: 1px solid #f5a623; border-radius: 12px; margin: 10px;
          background: linear-gradient(135deg,rgba(0, 0, 0, 1) 0%,rgba(69, 0, 93, 1) 24%,rgb(85, 249, 255) 100%);
          width: 20%; box-shadow: 0 4px 12px rgba(0,0,0,0.15); min-height: 420px;
          display: flex; flex-direction: column; padding:20px; justify-content: space-between; color:white;
        }
        .avatar-img { width: 100px; height: 100px; border-radius: 50%; margin-bottom: 10px; }
        .refresh-btn { 
          background-color:rgb(28 84 107); font-weight:bold; color: #fff; border: none;
          padding: 5px 10px; border-radius: 5px; cursor: pointer; margin-top: 10px; display: none;
        }
        .delete-btn { background-color: red; color: #fff; font-weight:bold; border: none; padding: 5px 10px;
          border-radius: 5px; cursor: pointer; margin-top: 10px;  }
        @media (max-width:768px) { .user-card { width:80% } }
        @media (min-width:768.1px) and (max-width: 1223px) { .user-card { width: 40%; } }
        @media (min-width:1223.1px) and (max-width:1440px) { .user-card { width: 27%; } }
      `;
    document.head.appendChild(style);
  };

  const fetchData = () => {
    const storedData = JSON.parse(localStorage.getItem("data")) || {
      users: [],
      expiryTime: 0,
    };
    Date.now() < storedData.expiryTime
      ? displayUsers(storedData.users)
      : fetchUsers();
  };

  const fetchUsers = (forceUpdate = false) => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        const now = Date.now();
        const dataToStore = {
          users: data,
          expiryTime: now + 24 * 60 * 60 * 1000,
        };

        localStorage.setItem("data", JSON.stringify(dataToStore));

        if (forceUpdate) {
          const sessionData =
            JSON.parse(sessionStorage.getItem("sessionData")) || {};
          sessionStorage.setItem(
            "sessionData",
            JSON.stringify({ ...sessionData, users: data })
          );
        }

        displayUsers(data);
      })
      .catch((error) => console.error("API Hatası:", error));
  };

  const displayUsers = (users) => {
    const usersContainer = document.querySelector(".users-container");
    usersContainer.innerHTML = users
      .map(
        ({ id, username, email, address }) => `
            <div class="user-card" id="user-${id}">
                <img src="https://i.pravatar.cc/150?u=${id}" alt="Avatar" class="avatar-img">
                <h3>${username}</h3>
                <p><strong>E-mail:</strong> ${email}</p>
                <p><strong>Address:</strong> ${address.street}, ${address.city}</p>
                <button class="delete-btn" data-id="${id}">Delete</button>
            </div>`
      )
      .join("");

    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => deleteUser(e.target.dataset.id));
    });
  };

  const deleteUser = (userId) => {
    let storedData = JSON.parse(localStorage.getItem("data")) || {
      users: [],
      expiryTime: 0,
    };
    storedData.users = storedData.users.filter(
      ({ id }) => id !== parseInt(userId)
    );
    localStorage.setItem("data", JSON.stringify(storedData));

    const userCard = document.getElementById(`user-${userId}`);
    if (userCard) userCard.remove();
  };

  const observeUsersContainer = () => {
    const observer = new MutationObserver(() => {
      const storedData = JSON.parse(localStorage.getItem("data")) || {
        users: [],
        expiryTime: 0,
      };
      const sessionData =
        JSON.parse(sessionStorage.getItem("sessionData")) || {};
      const userCount =
        document.querySelector(".users-container").children.length;

      const refreshBtn = document.querySelector(".refresh-btn");
      if (refreshBtn) {
        if (userCount === 0 && !sessionData.refreshed) {
          refreshBtn.style.display = "block";
        } else {
          refreshBtn.style.display = "none";
        }
      }
    });

    observer.observe(document.querySelector(".users-container"), {
      childList: true,
      subtree: true,
    });
  };

  const init = () => {
    buildHtml();
    buildCss();
    fetchData();
    observeUsersContainer();
  };

  init();
})();
