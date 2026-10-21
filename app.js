// Todo List - Bước 1: Thêm công việc
const STORAGE_KEY = "todo-list-items";

let todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const emptyState = document.getElementById("empty-state");

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function render() {
  list.innerHTML = "";
  emptyState.style.display = todos.length ? "none" : "block";
  todos.forEach((todo) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.className = "text";
    span.textContent = todo.text;
    li.appendChild(span);
    list.appendChild(li);
  });
}

// Thêm công việc mới
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  todos.push({ id: Date.now(), text });
  input.value = "";
  save();
  render();
});

render();
