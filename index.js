const dayDiv = document.querySelector("#day");

const getDay = () => {
  let today = new Date();
  let month = today.getUTCMonth() + 1;
  let day = today.getDate();
  let year = today.getUTCFullYear();
  dayDiv.innerHTML = `${year}년 ${month}월 ${day}일`;
  return { month, day };
};

const toDoForm = document.querySelector("#todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.querySelector("#todo-list");
const toDoSuccessList = document.querySelector("#todo_success-list");
const plan = document.querySelector(".plan");
const finishPlan = document.querySelector(".finish-plan");

let toDos = [];

function saveToDo() {
  localStorage.setItem("todos", JSON.stringify(toDos));
}

function deleteToDo(e) {
  const li = e.target.parentElement;
  li.remove();

  const removeArr = toDos.filter((todo) => {
    return li.id !== todo.id;
  });
  toDos = removeArr;
  saveToDo();
}

function successToDo(e) {
  const li = e.target.parentElement;
  li.remove();

  const successArr = toDos.map((todo) => {
    if (li.id === todo.id) {
      // const getDayResult = getDay();
      // const successMonth = getDayResult.month;
      // const successDay = getDayResult.day;
      const { month: successMonth, day: successDay } = getDay();
      todo = { ...todo, issuccess: true, successMonth, successDay };
      paintTodo(todo);
    }
    return todo;
  });
  toDos = successArr;
  saveToDo();
}

const cancleToDo = (e) => {
  const li = e.target.parentElement;
  li.remove();

  const cancleArr = toDos.map((todo) => {
    if (todo.id === li.id) {
      todo = {
        ...todo,
        issuccess: false,
        successMonth: null,
        successDay: null,
      };
      paintTodo(todo);
    }
    return todo;
  });
  toDos = cancleArr;
  saveToDo();
};

const editToDo = (e) => {
  const div = e.target.parentElement;

  const { 할일, id } = toDos.find((todo) => todo.id === div.id);
  toDoInput.value = 할일;
  const button = document.createElement("button");
  button.innerHTML = "수정";

  button.addEventListener("click", (e) => {
    e.preventDefault();
    button.remove();
    updateToDo(id);
  });
  toDoForm.append(button);
};

const updateToDo = (id) => {
  const 할일 = toDoInput.value;
  if (!할일) {
    return alert("할일을 적어주세요");
  }

  const data = {
    할일,
    id,
  };
  localEditToDo(data);
  alert("수정되었습니다.");
  toDoList.innerHTML = "";
  toDos.forEach((todo) => {
    paintTodo(todo);
  });
  toDoInput.value = "";
};

const localEditToDo = ({ 할일, id }) => {
  const updatetoDos = toDos.map((todo) => {
    if (todo.id === id) {
      todo = { ...todo, 할일 };
    }
    return todo;
  });
  toDos = updatetoDos;
  localStorage.setItem("todos", JSON.stringify(toDos));
};

function paintTodo(todo) {
  const li = document.createElement("li");
  li.id = todo.id;
  const span = document.createElement("span");
  span.classList.add("plan-content");
  span.innerHTML = todo.할일;
  const xbutton = document.createElement("button");
  xbutton.innerHTML = "❌";
  xbutton.classList.add("emoji");
  xbutton.addEventListener("click", deleteToDo);
  li.appendChild(span);

  if (todo.issuccess) {
    const cancleBtn = document.createElement("button");
    li.appendChild(cancleBtn);
    cancleBtn.innerHTML = "⛔️";
    cancleBtn.classList.add("emoji");
    cancleBtn.addEventListener("click", cancleToDo);
    toDoSuccessList.appendChild(li);
  }
  if (!todo.issuccess) {
    const obutton = document.createElement("button");
    obutton.addEventListener("click", successToDo);
    li.appendChild(obutton);
    obutton.innerHTML = "🙆";
    obutton.classList.add("emoji");
    toDoList.appendChild(li);
    const editBtn = document.createElement("button");
    editBtn.addEventListener("click", editToDo);
    li.appendChild(editBtn);
    editBtn.innerText = "🔨";
    editBtn.classList.add("emoji");
  }

  li.appendChild(xbutton);

  const dayWrap = document.createElement("span");
  dayWrap.innerHTML = `${todo.createMonth}월${todo.createDay}일`;
  li.appendChild(dayWrap);

  if (todo.successMonth && todo.successDay) {
    const successDayWrap = document.createElement("div");
    successDayWrap.classList.add("successDayWrap");
    successDayWrap.innerHTML = `완료 날짜: ${todo.successMonth}월${todo.successDay}일`;
    li.appendChild(successDayWrap);
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

const init = () => {
  getDay();
  toDoForm.addEventListener("submit", handleToDoSubmit);
};

init();

const savedToDo = localStorage.getItem("todos");

if (savedToDo !== null) {
  const parseToDo = JSON.parse(savedToDo);
  toDos = parseToDo;
  parseToDo.forEach(paintTodo);
}
