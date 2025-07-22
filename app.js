// Retrieve tasks/notes from localStorage or initialize empty array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskList = document.getElementById("task-list");
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const clearAllBtn = document.getElementById("clear-all");

// Render all tasks/notes
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, idx) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
      <span>${task.text}</span>
      <div>
        <button class="delete-btn" data-idx="${idx}">Delete</button>
        <button class="complete-btn" data-idx="${idx}">${task.completed ? "Undo" : "Done"}</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

// Save tasks/notes to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add new task/note
taskForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (text) {
    tasks.push({ text, completed: false });
    saveTasks();
    renderTasks();
    taskInput.value = "";
  }
});

// Handle delete and complete
taskList.addEventListener("click", function(e) {
  if (e.target.classList.contains("delete-btn")) {
    const idx = e.target.getAttribute("data-idx");
    tasks.splice(idx, 1);
    saveTasks();
    renderTasks();
  } else if (e.target.classList.contains("complete-btn")) {
    const idx = e.target.getAttribute("data-idx");
    tasks[idx].completed = !tasks[idx].completed;
    saveTasks();
    renderTasks();
  }
});

// Clear all tasks/notes
clearAllBtn.addEventListener("click", function() {
  if (confirm("Are you sure you want to clear all tasks/notes?")) {
    tasks = [];
    saveTasks();
    renderTasks();
  }
});

// Initial render
renderTasks();