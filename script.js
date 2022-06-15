const input = document.querySelector('.todoInput');
const button = document.querySelector('.addTodo');
const todoInput = document.querySelector('.todoListInput');
const todoList = document.querySelector('.todoList');

button.addEventListener('click', () => {
  let inputValue = input.value;
  const todo = document.createElement('div');
  todo.classList.add('todo');
  const markup = `
  <div class="doneTodo">
    <i class="fa-solid fa-check"></i>
  </div>
  <input type="text" class="todoListInput">
  <button class="deleteTodo">
    <i class="fa-solid fa-trash-can"></i>
  </button>
  `
  todo.innerHTML  = markup;
  todoList.appendChild(todo)
})
