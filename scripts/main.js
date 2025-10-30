document.addEventListener("DOMContentLoaded", () => {
  const saved = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = saved;
  updateTasksList();
  updateStats();
});

let tasks = [];

const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const addTask = () => {
  const taskInput = document.getElementById("taskInput");
  const text = taskInput.value.trim();

  if (text) {
    tasks.push({ text: text, completed: false });
    updateTasksList();
    taskInput.value = "";
    updateStats();
    saveTasks();
  }
};

const updateStats = () => {
  const completeTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  const progress = totalTasks === 0 ? 0 : (completeTasks / totalTasks) * 100;
  const progressBar = document.getElementById("progress");

  progressBar.style.width = `${progress}%`;
  document.getElementById(
    "numbers"
  ).innerText = `${completeTasks} / ${totalTasks}`;
};

const updateTasksList = () => {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");

    listItem.innerHTML = `
      <div class="taskItem">
        <div class="task ${task.completed ? "completed" : ""}">
          <input 
            type="checkbox" 
            class="checkbox" 
            ${task.completed ? "checked" : ""} 
            onchange="toggleTaskComplete(${index})" 
          />
          <p>${task.text}</p>
        </div>
        <div class="icons">
          <img src="./images/edit.png" alt="Edit" onclick="editTask(${index})">
          <img src="./images/delete.png" alt="Delete" onclick="deleteTask(${index})">
        </div>
      </div>
    `;

    taskList.append(listItem);
  });

  updateStats();
  saveTasks();
};

const toggleTaskComplete = (index) => {
  tasks[index].completed = !tasks[index].completed;
  updateTasksList();
  updateStats();
  saveTasks();
};

const deleteTask = (index) => {
  tasks.splice(index, 1);
  updateTasksList();
  updateStats();
  saveTasks();
};

const editTask = (index) => {
  const newText = prompt("Edit your task:", tasks[index].text);
  if (newText !== null && newText.trim() !== "") {
    tasks[index].text = newText.trim();
    updateTasksList();
    updateStats();
    saveTasks();
  }
};

const button = document.getElementById("newTask");
button.addEventListener("click", function (e) {
  e.preventDefault();
  addTask();
});
