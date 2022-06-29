const dayDiv = document.querySelector("#day");
const form = document.querySelector("form");
const input = document.querySelector("#todoInput");
const submitBtn = document.querySelector("#send");
const list = document.querySelector("#todoList");

const getDay = () => {
  let today = new Date();
  let month = today.getUTCMonth() + 1;
  let day = today.getDate();
  let year = today.getUTCFullYear();
  dayDiv.innerHTML = `${year}년 ${month}월 ${day}일`;
};

getDay();

let toDos = JSON.parse(localStorage.getItem("Todo")) || [];

function saveToDo(todo) {
  toDos.push(todo);
  localStorage.setItem("Todo", JSON.stringify(toDos));
}

const stringifyToDos = localStorage.getItem("Todo");

const paintTodo = (value) => {
  const todoContainer = document.createElement("div");
  const todo = document.createElement("span");
  const deleteBtn = document.createElement("button");
  const sucessBtn = document.createElement("button");
  todo.innerHTML = value;
  deleteBtn.innerHTML = "❌";
  sucessBtn.innerHTML = "✅";
  todoContainer.append(todo);
  todoContainer.append(sucessBtn);
  todoContainer.append(deleteBtn);
  list.append(todoContainer);
};

const handleSubmit = (e) => {
  e.preventDefault();
  paintTodo(input.value);
  saveToDo(input.value);
  input.value = "";
};

const firstPaintTodos = () => {
  for (let i = 0; i < toDos.length; i++) {
    paintTodo(toDos[i]);
  }
  toDos.forEach((todo) => {
    paintTodo(todo);
  });
};

const todoInit = () => {
  form.addEventListener("submit", handleSubmit);
  firstPaintTodos();
};

todoInit();
