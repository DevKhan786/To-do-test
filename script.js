const priority = document.getElementById("todo-priority");
const button = document.getElementById("todo-button");
const todoList = document.getElementById("todo-list");

let taskList = [];

const loadTask = () => {
  taskList = JSON.parse(localStorage.getItem("tasks")) || [];
};

const saveTask = () => {
  localStorage.setItem("tasks", JSON.stringify(taskList));
};

button.addEventListener("click", () => {
  const input = document.getElementById("todo-input");
  if (input.value !== "") {
    const task = {
      input: input.value,
      priority: priority.value,
      completed: false,
    };

    loadTask();
    taskList.push(task);
    saveTask();
    updateTask();

    input.value = "";
    priority.value = "low";
  } else {
    alert("Please enter a task!");
  }
});

function updateTask() {
  todoList.innerHTML = "";
  loadTask();

  taskList.forEach((task, index) => {
    const item = document.createElement("li");
    item.className = task.completed ? "completed" : "";
    item.classList.add(task.priority);
    item.innerHTML = `
    <span>${task.input}</span>
    <div class="task-action">
    <button class="complete-btn">${task.completed ? "Undo" : "Complete"}
    </button>
    <button class="delete-btn">Delete</button>
    </div>
    `;

    todoList.appendChild(item);
    

    item.querySelector(".complete-btn").addEventListener("click", () => {
      taskList[index].completed = !taskList[index].completed;
      saveTask();
      updateTask();
    });

    item.querySelector(".delete-btn").addEventListener("click", () => {
      taskList.splice(index, 1);
      saveTask();
      updateTask();
    });

    item.querySelector("span").addEventListener("dblclick", () => {
      const span = item.querySelector("span");
      const input = document.createElement("input");
      input.type = "text";
      input.value = span.textContent;
      item.insertBefore(input, span);
      item.removeChild(span);

      input.addEventListener("blur", () => {
        taskList[index].input = input.value;
        saveTask();
        updateTask();
      });

      input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          taskList[index].input = input.value;
          saveTask();
          updateTask();
        }
      });

      input.focus();

    });
  });
}

loadTask();
updateTask();
