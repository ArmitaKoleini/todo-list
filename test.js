const todoTitle = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todolist");
const filterOption = document.querySelector(".filter-todos");
todoButton.addEventListener("click", addTodo);
filterOption.addEventListener("change", filterTodos);

document.addEventListener("DOMContentLoaded", () => {
  const todos = getAllTodos();
  createTodos(todos);
});

// let todos = [];

function addTodo(e) {
  e.preventDefault();

  if (!todoTitle.value) return null;

  const newTodo = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    title: todoTitle.value,
    isCompleted: false,
  };

  //* todos.push(newTodo);
  const todos = saveTodo(newTodo);
  createTodos(todos);
  // let result = "";
  // todos.forEach((todo) => {
  //   result += `
  //   <li class="todo">
  //   <p class="todo__title">${todo.title}</p>
  //   <span class="todo__createdAt">${new Date(todo.createdAt).toLocaleDateString(
  //     "fa-IR"
  //   )}</span>
  //   <button><i class="todo__check far fa-check-square"></i></button>
  //   <button><i class="todo__remove far fa-trash-alt"></i></button>
  // </li>`;
  // });
  // todoList.innerHTML = result;
  // todoTitle.value = "";
}

function filterTodos(e) {
  console.log(e.target.value);
  const filter = e.target.value;
  const todos = getAllTodos();
  // let filteredTodos = [];
  switch (filter) {
    case "all": {
      createTodos(todos);
      break;
    }
    case "completed": {
      createTodos(todos.filter((t) => t.isCompleted));
      break;
    }
    case "uncompleted": {
      createTodos(todos.filter((t) => !t.isCompleted));
      break;
    }
    default:
      return todos;
  }
}

function createTodos(todos) {
  let result = "";
  todos.forEach((todo) => {
    result += `
    <li class="todo">
    <p class="todo__title">${todo.title}</p>
    <span class="todo__createdAt">${new Date(todo.createdAt).toLocaleDateString(
      "fa-IR"
    )}</span>
    <button data-todo-id=${
      todo.id
    }><i class="todo__check far fa-check-square"></i></button>
    <button class="todo__remove" data-todo-id=${
      todo.id
    }><i class="far fa-trash-alt"></i></button>
  </li>`;
  });

  todoList.innerHTML = result;
  todoTitle.value = "";

  const deleteBtns = [...document.querySelectorAll(".todo__remove")];
  deleteBtns.forEach((item) => {
    item.addEventListener("click", removeTodo);
  });
}

function removeTodo(e) {
  // console.log(e.target.dataset.todoId);
  const todoId = Number(e.target.dataset.todoId);
  const todos = getAllTodos();
  const filteredTodos = todos.filter((t) => t.id !== todoId);
  localStorage.setItem("todos", JSON.stringify(filteredTodos));
  //? todos = filteredTodos;

  createTodos(filteredTodos);
}

function saveTodo(todo) {
  // localStorage.getItem('todos')
  // localStorage.setItem('todos',JSON.stringify(todos))

  let savedTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  savedTodos.push(todo);
  localStorage.setItem("todos", JSON.stringify(savedTodos));
  return savedTodos;
}

function getAllTodos() {
  const savedTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  return savedTodos;
}
