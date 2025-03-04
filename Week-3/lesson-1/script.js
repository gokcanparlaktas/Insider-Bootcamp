$(document).ready(function () {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let showCompletedOnly = false;

  const renderTasks = () => {
    const $taskList = $("#taskList");
    $taskList.empty();

    const filteredTasks = showCompletedOnly
      ? tasks.filter((task) => task.completed)
      : tasks;

    filteredTasks.forEach((task, index) => {
      const taskHTML = `
        <li class="task-item ${
          task.completed ? "completed" : ""
        }" data-index="${index}">
          <span class="task-text">${task.title}</span>
          <button class="complete-btn">Tamamla</button>
          <button class="delete-btn">Sil</button>
        </li>
      `;
      $taskList.append(taskHTML);
    });
  };

  $("#taskForm").on("submit", function (e) {
    e.preventDefault();
    const title = $("#taskTitle").val().trim();

    if (!title) {
      alert("Görev metni boş olamaz!");
      return;
    }

    const newTask = { title, completed: false };
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    $("#taskForm")[0].reset();
    renderTasks();
  });

  $("#taskList").on("click", ".complete-btn", function () {
    const $taskItem = $(this).closest(".task-item");
    const index = $taskItem.data("index");

    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));

    $taskItem.toggleClass("completed");
  });

  $("#taskList").on("click", ".delete-btn", function () {
    const $taskItem = $(this).closest(".task-item");
    const index = $taskItem.data("index");

    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    $taskItem.remove();
  });

  $("#filterCompleted").on("click", function () {
    showCompletedOnly = !showCompletedOnly;
    $(this).text(
      showCompletedOnly
        ? "Tüm Görevleri Göster"
        : "Sadece Tamamlananları Göster"
    );
    renderTasks();
  });

  renderTasks();
});
