(() => {
  const appendLocation = "";

  const buildHtml = () => {
    const container = $(appendLocation);
    if (!container.length)
      return console.error(` ${appendLocation} not found.`);

    container.append(`
   
        <div class="users-container"></div>
        <button class="refresh-btn" style="display: none;">Verileri Yeniden Getir</button>
    `);

    $(".refresh-btn").on("click", () => {
      if (!sessionStorage.getItem("sessionData")) {
        fetchUsers(true);
      }
    });

    const sessionData = JSON.parse(sessionStorage.getItem("sessionData")) || {};
    if (sessionData.refreshed) $(".refresh-btn").remove();

    observeUserContainer();
  };

  const buildCss = () => {
    const style = $("<style>").text(`
      * { transition: all 0.5s ease-in-out; box-sizing: border-box; margin: 0; padding: 0; }
      ${appendLocation} { display: flex; flex-direction: column; align-items: center; padding: 20px; }
      .users-container { display: flex; width: 80vw; flex-wrap: wrap; justify-content: center; }
      .user-card { border: 1px solid #f5a623; border-radius: 12px; margin: 10px;background: linear-gradient(135deg,rgba(0, 0, 0, 1) 0%,rgba(69, 0, 93, 1) 24%,rgb(85, 249, 255) 100%);width: 20%; box-shadow: 0 4px 12px rgba(0,0,0,0.15);  min-height: 420px; display: flex; flex-direction: column; padding:20px; justify-content: space-between;color:white }
      .avatar-img { width: 100px; height: 100px; border-radius: 50%; margin-bottom: 10px; }
      .refresh-btn { background-color:rgb(28 84 107); font-weight:bold; color: #fff; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; margin-top: 10px; }
      .delete-btn { background-color: red; color: #fff; font-weight:bold; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; margin-top: 10px;  }
     .refresh-btn { display: none; margin: 20px auto; }

      @media (max-width:768px) {.user-card { width:80%}}

      @media (min-width:768.1px) and (max-width: 1223px) {.user-card { width: 40%;}} 

      @media (min-width:1223.1px) and (max-width:1440px) {.user-card { width:27%}}`);
    $("head").append(style);
  };

  const fetchData = () => {
    const storedData = JSON.parse(localStorage.getItem("data")) || {};
    const { users, expiryTime } = storedData;
    const now = Date.now();

    if (!users || users.length === 0 || now >= expiryTime) {
      fetchUsers();
    } else {
      displayUsers(users);
    }
  };

  const fetchUsers = (isRefresh = false) => {
    $.getJSON("https://jsonplaceholder.typicode.com/users")
      .done((data) => {
        if (!data || data.length === 0) return;
        const now = Date.now();
        const dataToStore = {
          users: data,
          expiryTime: now + 24 * 60 * 60 * 1000,
        };
        localStorage.setItem("data", JSON.stringify(dataToStore));

        if (isRefresh) {
          sessionStorage.setItem(
            "sessionData",
            JSON.stringify({ refreshed: true, users: data })
          );
          $(".refresh-btn").remove();
        }

        displayUsers(data);
      })
      .fail((err) => console.error("API Error:", err));
  };

  const deleteUser = (userId) => {
    let storedData = JSON.parse(localStorage.getItem("data")) || {};
    storedData.users = storedData.users.filter(
      ({ id }) => id !== parseInt(userId)
    );
    localStorage.setItem("data", JSON.stringify(storedData));
    $(`#user-${userId}`).remove();
  };

  const displayUsers = (users) => {
    $(".users-container").html(
      users
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
        .join("")
    );

    $(".delete-btn").on("click", (e) => deleteUser($(e.target).data("id")));
  };

  const observeUserContainer = () => {
    const targetNode = document.querySelector(
      `${appendLocation} .users-container`
    );
    if (!targetNode) return;

    const observer = new MutationObserver(() => {
      $(".refresh-btn").toggle($(".user-card").length === 0);
    });

    observer.observe(targetNode, { childList: true, subtree: true });
  };

  const init = () => {
    buildHtml();
    buildCss();
    fetchData();
  };

  if (typeof jQuery === "undefined") {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js";
    script.onload = init;
    document.head.appendChild(script);
  } else {
    init();
  }
})();
