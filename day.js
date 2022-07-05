const dayDiv = document.querySelector("#day");

const getDay = () => {
  let today = new Date();
  let month = today.getUTCMonth() + 1;
  let day = today.getDate();
  let year = today.getUTCFullYear();
  dayDiv.innerHTML = `${year}년 ${month}월 ${day}일`;
  return { month, day };
};

getDay();

const toDoForm = document.querySelector("#todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.querySelector("#todo-list");
const toDoSuccessList = document.querySelector("#todo_success-list");

let toDos = [];

function saveToDo() {
  localStorage.setItem("todos", JSON.stringify(toDos));
}

function deleteToDo(e) {
  const li = e.target.parentElement;
  li.remove();
  const removeArr = toDos.filter((todo) => {
    return todo.id !== li.id;
  });
  toDos = removeArr;
  saveToDo();
}

function successToDo(e) {
  const li = e.target.parentElement;
  li.remove();

  successArr = toDos.map((todo) => {
    if (li.id === todo.id) {
      const getDayResult = getDay();
      const successMonth = getDayResult.month;
      const successDay = getDayResult.day;
      todo = { ...todo, issuccess: true, successMonth, successDay };
      paintTodo(todo);
    }
    return todo;
  });
  toDos = successArr;
  saveToDo();
}

function paintTodo(todo) {
  const li = document.createElement("li");
  li.id = todo.id;
  const span = document.createElement("span");
  span.innerHTML = todo.할일;
  const xbutton = document.createElement("button");
  xbutton.innerHTML = "❌";
  xbutton.addEventListener("click", deleteToDo);
  const obutton = document.createElement("button");
  obutton.innerHTML = "🙆";
  obutton.addEventListener("click", successToDo);
  const dayWrap = document.createElement("span");
  dayWrap.innerHTML = `${todo.createMonth}월${todo.createDay}일`;
  li.appendChild(span);
  li.appendChild(xbutton);
  li.appendChild(obutton);
  li.appendChild(dayWrap);
  if (todo.successMonth && todo.successDay) {
    const successDayWrap = document.createElement("span");
    successDayWrap.innerHTML = `${todo.successMonth}월${todo.successDay}일`;
    li.appendChild(successDayWrap);
  }
  if (!todo.issuccess) {
    toDoList.appendChild(li);
  } else {
    toDoSuccessList.appendChild(li);
  }
}

function handleToDoSubmit(e) {
  e.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";
  // const getDayResult = getDay();
  // const createMonth = getDayResult.month;
  // const createDay = getDayResult.day;
  const { month: createMonth, day: createDay } = getDay(); //ES6

  const newTodoObj = {
    할일: newTodo,
    id: Date.now().toString(),
    issuccess: false,
    createMonth,
    createDay,
    successMonth: null,
    successDay: null,
  };
  toDos.push(newTodoObj);
  paintTodo(newTodoObj);
  saveToDo();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDo = localStorage.getItem("todos");

if (savedToDo !== null) {
  const parseToDo = JSON.parse(savedToDo);
  toDos = parseToDo;
  parseToDo.forEach(paintTodo);
}
