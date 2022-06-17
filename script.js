const input = document.querySelector(".todoInput");
const button = document.querySelector(".addTodo");
const todoInput = document.querySelector(".todoListInput");
const todoList = document.querySelector(".todoList");
const doneTodo = document.querySelector(".doneTodo");
const faCheck = document.querySelector(".fa-check");
const msg = document.querySelector(".msg");

let click = false;

function todoHandler() {
  let inputValue = input.value;
  if (inputValue !== "") {
    addTodo(inputValue);
    saveLocal(input.value);
    input.value = "";
  } else {
    msg.classList.add("msgShow");
    setTimeout(() => {
    msg.classList.remove("msgShow");
    }, 1300)
  }
}


function addTodo(inputValue) {
  const todo = document.createElement("div");
  todo.classList.add("todo");

  const doneTodoDiv = document.createElement("div");
  doneTodoDiv.classList.add("doneTodo");
  doneTodoDiv.innerHTML = '<i class="fa-solid fa-check"></i>';
  todo.appendChild(doneTodoDiv);

  const newInput = document.createElement("input");
  newInput.classList.add("todoListInput");
  newInput.value = inputValue;
  todo.appendChild(newInput);

  const trashDiv = document.createElement("button");
  trashDiv.classList.add("deleteTodo");
  trashDiv.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
  todo.appendChild(trashDiv);

  todoList.appendChild(todo);
}

button.addEventListener("click", (e) => {
  todoHandler();
  e.preventDefault();
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    todoHandler();
    e.preventDefault();
  }
});

todoList.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-check")) {
    // if (click === false) {
    //   e.target.classList.remove('doneKeyBack');
    //   e.target.classList.add('doneKey');
    //   e.target.parentElement.parentElement.classList.add('doneTodoShow');
    // } else if (click === true) {
    //   e.target.classList.remove('doneKey');
    //   e.target.classList.add('doneKeyBack');
    //   e.target.parentElement.parentElement.classList.remove('doneTodoShow');
    // }

    // click = !(click);
    e.target.classList.toggle("doneKey");
    const x = e.target.parentElement.parentElement.childNodes[1];

    if (e.target.classList.contains("doneKey")) {
      e.target.parentElement.parentElement.classList.add("doneTodoShow");
      e.target.parentElement.parentElement.classList.remove("doneTodoBack");
      x.style.textDecoration = "line-through";
    } else if (!e.target.classList.contains("doneKey")) {
      e.target.parentElement.parentElement.classList.remove("doneTodoShow");
      e.target.parentElement.parentElement.classList.add("doneTodoBack");
      x.style.textDecoration = "none";
    }
  } else if (e.target.classList.contains("fa-trash-can")) {
    let parent = e.target.parentElement.parentNode.childNodes[1];
    removeLocal(parent);
    removeComplete(parent);
    e.target.parentElement.parentNode.classList.add("deleteTodoShow");
    setTimeout(() => {
      e.target.parentElement.parentElement.remove();
    }, 200);
  }
});

function saveLocal(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocal(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  if (todos.indexOf(todo.value) !== -1) {
    todos.splice(todos.indexOf(todo.value), 1);
  }
  console.log(todo.value);
  localStorage.setItem("todos", JSON.stringify(todos));
}

window.addEventListener("load", () => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach((item) => {
    addTodo(item);
  });

  checkCompleteArr();
  addFromCompleteArr();
});

todoList.addEventListener("click", (e) => {
  if (e.target.className === "todoListInput") {
    let lastValue = e.target.value;
    document.addEventListener("mousemove", () => {
      saveChangeLocal(lastValue);
    });
    e.target.addEventListener("change", () => {
      saveChangeLocal(lastValue);
    });
  }

  function saveChangeLocal(lastValue) {
    let newValue = e.target.value;
    console.log(newValue);
    let todos = JSON.parse(localStorage.getItem("todos"));
    let indexTodo = todos.indexOf(lastValue);
    todos[indexTodo] = newValue;
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  if (e.target.classList.contains("fa-check")) {
    const doneButton = e.target;
    const parent = doneButton.parentElement.parentElement;
    completeLocalArr(doneButton, parent);
  }
});

function completeLocalArr(doneButton, parent) {
  console.log(doneButton, parent);
  checkCompleteArr();
  function addToCompleteArr() {
    let completeTodos;
    completeTodos = JSON.parse(localStorage.getItem("completeTodos"));
    const inputParent = parent.childNodes[1].value;
    completeTodos.push(inputParent);
    localStorage.setItem("completeTodos", JSON.stringify(completeTodos));
  }
  function removeFromTodos() {
    let todos;
    todos = JSON.parse(localStorage.getItem("todos"));
    const inputParent = parent.childNodes[1].value;
    todos.splice(todos.indexOf(inputParent), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  if (doneButton.classList.contains("doneKey")) {
    console.log("complete");
    addToCompleteArr();
    removeFromTodos();
  } else {
    console.log("uncomplete");
    removeFromComplete();
    addtoTodos();
  }

  function addtoTodos() {
    let todos;
    todos = JSON.parse(localStorage.getItem("todos"));
    const inputParent = parent.childNodes[1].value;
    todos.push(inputParent);
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  function removeFromComplete() {
    let completeTodos;
    completeTodos = JSON.parse(localStorage.getItem("completeTodos"));
    const inputParent = parent.childNodes[1].value;
    completeTodos.splice(completeTodos.indexOf(inputParent), 1);
    localStorage.setItem("completeTodos", JSON.stringify(completeTodos));
  }
}

function checkCompleteArr() {
  let completeTodos;
  if (localStorage.getItem("completeTodos") === null) {
    completeTodos = [];
    localStorage.setItem("completeTodos", JSON.stringify(completeTodos));
  }
}

function addFromCompleteArr() {
  let complete;
  complete = JSON.parse(localStorage.getItem("completeTodos"));
  complete.forEach((item) => {
    const todo = document.createElement("div");
    todo.classList.add("todo");
    todo.classList.add("doneTodoShow");

    const doneTodoDiv = document.createElement("div");
    doneTodoDiv.classList.add("doneTodo");
    doneTodoDiv.innerHTML = '<i class="fa-solid fa-check doneKey"></i>';
    todo.appendChild(doneTodoDiv);

    const newInput = document.createElement("input");
    newInput.classList.add("todoListInput");
    newInput.value = item;
    todo.appendChild(newInput);

    const trashDiv = document.createElement("button");
    trashDiv.classList.add("deleteTodo");
    trashDiv.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    todo.appendChild(trashDiv);

    todoList.appendChild(todo);
  });
}

function removeComplete(todo) {
  let completeTodos;
  completeTodos = JSON.parse(localStorage.getItem("completeTodos"));
  if (completeTodos.indexOf(todo.value) !== -1) {
    completeTodos.splice(completeTodos.indexOf(todo.value), 1);
  }
  localStorage.setItem("completeTodos", JSON.stringify(completeTodos));
}
