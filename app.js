// Todo List - Thêm + Sửa + Xóa công việc
// Fix: Sửa trực tiếp trên dòng (không dùng prompt() - bị chặn trong
// các khung preview/iframe) và Xóa xác nhận 2 bước trên dòng
// (không dùng confirm()).
const STORAGE_KEY = "todo-list-items";

let todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
let editingId = null;
let confirmingDeleteId = null;

const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const emptyState = document.getElementById("empty-state");

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function makeButton(className, label, onClick) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = className;
  btn.textContent = label;
  btn.addEventListener("click", onClick);
  return btn;
}

function render() {
  list.innerHTML = "";
  emptyState.style.display = todos.length ? "none" : "block";
  todos.forEach((todo) => {
    const li = document.createElement("li");

    if (todo.id === editingId) {
      // Đang sửa: hiện ô nhập ngay trên dòng
      const editInput = document.createElement("input");
      editInput.type = "text";
      editInput.className = "edit-input";
      editInput.value = todo.text;
      editInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") saveEdit(todo.id, editInput.value);
        if (e.key === "Escape") { editingId = null; render(); }
      });
      li.appendChild(editInput);
      li.appendChild(makeButton("save-btn", "Lưu", () => saveEdit(todo.id, editInput.value)));
      li.appendChild(makeButton("cancel-btn", "Hủy", () => { editingId = null; render(); }));
      list.appendChild(li);
      editInput.focus();
      editInput.select();
      return;
    }

    const span = document.createElement("span");
    span.className = "text";
    span.textContent = todo.text;
    li.appendChild(span);

    if (todo.id === confirmingDeleteId) {
      // Đang chờ xác nhận xóa: hỏi ngay trên dòng
      li.appendChild(makeButton("delete-btn", "Xóa thật?", () => deleteTodo(todo.id)));
      li.appendChild(makeButton("cancel-btn", "Hủy", () => { confirmingDeleteId = null; render(); }));
    } else {
      li.appendChild(makeButton("edit-btn", "Sửa", () => { editingId = todo.id; confirmingDeleteId = null; render(); }));
      li.appendChild(makeButton("delete-btn", "Xóa", () => { confirmingDeleteId = todo.id; editingId = null; render(); }));
    }

    list.appendChild(li);
  });
}

// Sửa công việc: lưu nội dung mới từ ô nhập trên dòng
function saveEdit(id, newText) {
  const todo = todos.find((t) => t.id === id);
  if (!todo) { editingId = null; render(); return; }
  const trimmed = (newText || "").trim();
  if (!trimmed) return;
  todo.text = trimmed;
  editingId = null;
  save();
  render();
}

// Xóa công việc (đã xác nhận ở bước "Xóa thật?" trên dòng)
function deleteTodo(id) {
  todos = todos.filter((t) => t.id !== id);
  confirmingDeleteId = null;
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
