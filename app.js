// Todo List - Bước 3: Thêm + Sửa + Xóa công việc
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

    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.textContent = "Sửa";
    editBtn.addEventListener("click", () => editTodo(todo.id));
    li.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Xóa";
    deleteBtn.addEventListener("click", () => deleteTodo(todo.id));
    li.appendChild(deleteBtn);

    list.appendChild(li);
  });
}

// Sửa công việc
function editTodo(id) {
  const todo = todos.find((t) => t.id === id);
  if (!todo) return;
  const newText = prompt("Sửa công việc:", todo.text);
  if (newText === null) return;
  const trimmed = newText.trim();
  if (!trimmed) return;
  todo.text = trimmed;
  save();
  render();
}

// Xóa công việc
function deleteTodo(id) {
  const todo = todos.find((t) => t.id === id);
  if (!todo) return;
  if (!confirm(`Xóa công việc "${todo.text}"?`)) return;
  todos = todos.filter((t) => t.id !== id);
  save();
  render();
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
