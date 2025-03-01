document.addEventListener("DOMContentLoaded", () => {
  (function () {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let completedTasks =
      JSON.parse(localStorage.getItem("completedTasks")) || [];
    let showCompletedOnly = false;
    let isPriorityDescending = true; // Başlangıçta yüksekten düşüğe sıralama

    const renderTasks = () => {
      try {
        const taskList = document.getElementById("taskList");
        taskList.innerHTML = "";

        const filteredTasks = showCompletedOnly ? [...completedTasks] : tasks;

        const priorityOrder = { high: 1, medium: 2, low: 3 };

        filteredTasks.sort((a, b) => {
          const comparison =
            priorityOrder[a.priority] - priorityOrder[b.priority];
          return isPriorityDescending ? -comparison : comparison; // Toggle sıralama
        });

        const tasksHTML = filteredTasks
          .map(({ title, description, priority, completed }, index) => {
            return `
              <div class="task-item ${priority.toLowerCase()} ${
              completed ? "completed" : ""
            }">
                <div>
                  <h3>${title}</h3>
                  <strong>Detaylar:</strong>
                  <p>${description}</p>
                  <strong>Öncelik:</strong>
                  <p>${priority}</p>
                </div>
                <div>
                  ${
                    completed
                      ? ""
                      : `<button class="complete-btn" data-index="${index}">${
                          completed ? "Geri Al" : "Tamamla"
                        }</button>`
                  }
                  <button class="delete-btn" data-index="${index}">Sil</button>
                </div>
              </div>
            `;
          })
          .join("");

        taskList.innerHTML = tasksHTML;
      } catch (error) {
        console.error("Hata oluştu: ", error);
      }
    };

    document.getElementById("taskForm").addEventListener("submit", (e) => {
      e.preventDefault();
      try {
        const title = document.getElementById("taskTitle").value.trim();
        const description = document
          .getElementById("taskDescription")
          .value.trim();
        const priority = [...document.getElementsByName("priority")].find(
          (input) => input.checked
        )?.value;

        if (!title || !priority) {
          alert("Başlık ve öncelik seçilmesi zorunludur!");
          return;
        }

        const newTask = { title, description, priority, completed: false };
        tasks.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(tasks));

        document.getElementById("taskForm").reset();
        renderTasks();
      } catch (error) {
        console.error("Hata oluştu: ", error);
      }
    });

    document.getElementById("taskList").addEventListener("click", (e) => {
      try {
        const index = e.target.getAttribute("data-index");
        if (e.target.classList.contains("complete-btn")) {
          e.stopPropagation();
          tasks[index].completed = !tasks[index].completed;
          if (tasks[index].completed) {
            completedTasks.push(tasks[index]);
            tasks.splice(index, 1);
          } else {
            tasks.push(completedTasks.splice(index, 1)[0]);
          }
          localStorage.setItem("tasks", JSON.stringify(tasks));
          localStorage.setItem(
            "completedTasks",
            JSON.stringify(completedTasks)
          );
          renderTasks();
        }

        if (e.target.classList.contains("delete-btn")) {
          e.stopPropagation();
          if (tasks[index]) {
            tasks.splice(index, 1);
          } else {
            completedTasks.splice(index, 1);
          }
          localStorage.setItem("tasks", JSON.stringify(tasks));
          localStorage.setItem(
            "completedTasks",
            JSON.stringify(completedTasks)
          );
          renderTasks();
        }
      } catch (error) {
        console.error("Hata oluştu: ", error);
      }
    });

    document.getElementById("filterCompleted").addEventListener("click", () => {
      try {
        showCompletedOnly = !showCompletedOnly;
        document.getElementById("filterCompleted").textContent =
          showCompletedOnly
            ? "Tüm Görevleri Göster"
            : "Sadece Tamamlananları Göster";
        renderTasks();
      } catch (error) {
        console.error("Hata oluştu: ", error);
      }
    });

    document.getElementById("priorityToggle").addEventListener("click", () => {
      isPriorityDescending = !isPriorityDescending;
      document.getElementById("priorityToggle").textContent =
        isPriorityDescending
          ? "Öncelik Sırası: Artan"
          : "Öncelik Sırası: Azalan";
      renderTasks();
    });

    renderTasks();
  })();
});
