const input = document.querySelector(".todoInput");
const button = document.querySelector(".addTodo");
const todoInput = document.querySelector(".todoListInput");
const todoList = document.querySelector(".todoList");
const doneTodo = document.querySelector(".doneTodo");
const faCheck = document.querySelector('.fa-check');

let click = false;

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
    e.target.classList.toggle('doneKey');
    if (e.target.classList.contains('doneKey')) {
      e.target.parentElement.parentElement.classList.add('doneTodoShow');
      e.target.parentElement.parentElement.classList.remove('doneTodoBack');
    } else if (!(e.target.classList.contains('doneKey'))) {
      e.target.parentElement.parentElement.classList.remove('doneTodoShow');
      e.target.parentElement.parentElement.classList.add('doneTodoBack');
    }
    
    

  } else if (e.target.classList.contains('fa-trash-can')) {
    e.target.parentElement.parentNode.classList.add('deleteTodoShow');
    setTimeout(() => {e.target.parentElement.parentElement.remove()}, 400)
  }
});
