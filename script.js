const input = document.querySelector(".todoInput");
const button = document.querySelector(".addTodo");
const todoInput = document.querySelector(".todoListInput");
const todoList = document.querySelector(".todoList");
const doneTodo = document.querySelector(".doneTodo");
const faCheck = document.querySelector(".fa-check");

let click = false;

function todoHandler() {
  let inputValue = input.value;
  if (inputValue !== "") {
    addTodo(inputValue);
    saveLocal(input.value);
    input.value = "";
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
    removeLocal(e.target.parentElement.parentNode.childNodes[1]);
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
  todos.splice(todos.indexOf(todo), 1);
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

  // if (e.target.classList.contains("fa-check")) {
  //   function saveChangeLocal() {
  //     let todo = e.target.parentElement.parentElement.childNodes;
  //     let input = todo[1].value;
  //     let todos = JSON.parse(localStorage.getItem("todos"));
  //     todos.splice(todos.indexOf(input), 1);
  //     localStorage.setItem("todos", JSON.stringify(todos));
  //   }
  // }
});
// document.onreadystatechange = function (e) {
//   if (document.readyState === "complete") {

//   }
// };

  
  