const input = document.querySelector(".todoInput");
const button = document.querySelector(".addTodo");
const todoInput = document.querySelector(".todoListInput");
const todoList = document.querySelector(".todoList");
const doneTodo = document.querySelector(".doneTodo");
const faCheck = document.querySelector('.fa-check');


function todoHandler() {
  let inputValue = input.value;
  if (inputValue !== "") {
    const todo = document.createElement("div");
    todo.classList.add("todo");

    const doneTodoDiv = document.createElement('div');
    doneTodoDiv.classList.add('doneTodo');
    doneTodoDiv.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneTodoDiv);

    
    const newInput = document.createElement('input');
    newInput.classList.add('todoListInput');
    newInput.value = inputValue;
    todo.appendChild(newInput)
    
    const trashDiv = document.createElement('button');
    trashDiv.classList.add('deleteTodo')
    trashDiv.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    todo.appendChild(trashDiv);
    
    todoList.appendChild(todo);
    input.value = "";
  }
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
  console.log(e.target);
  if (e.target.classList.contains('fa-check')) {
    e.target.parentElement.parentElement.classList.toggle('doneTodoShow');
  } else if (e.target.classList.contains('fa-trash-can')) {
    e.target.parentElement.parentNode.classList.add('deleteTodoShow');
    setTimeout(() => {e.target.parentElement.parentElement.remove()}, 400)
  }
});
