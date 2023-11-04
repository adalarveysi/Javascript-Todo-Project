//All select elements
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearTodos = document.querySelector("#clear-todos");

// Önce eventListeners fonksiyonunu çağırın
eventListeners();

function eventListeners() {
  form.addEventListener("submit", addTodo);
  document.addEventListener("DOMContentLoaded", getAllTodosUI);
  secondCardBody.addEventListener("click", deleteTodo);
  filter.addEventListener("keyup", filterTodo);
  clearTodos.addEventListener("click", clearAllTodos);
}
function clearAllTodos(e) {
  if (confirm("Tümünü silmek istediğinize eminmisiniz?")) {
    while (todoList.firstElementChild != null) {
      todoList.removeChild(todoList.firstElementChild);
    }
    localStorage.clear();
  }
}
function filterTodo(e) {
  const filterValue = e.target.value.toLowerCase();
  const listItems = document.querySelectorAll(".list-group-item");
  listItems.forEach(function (list) {
    const text = list.textContent.toLowerCase();
    if (text.indexOf(filterValue) === -1) {
      list.setAttribute("style", "display : none !important");
    } else {
      list.setAttribute("style", "display : block");
    }
  });
}
function deleteTodo(e) {
  if (e.target.className === "fa fa-remove") {
    const todoText =
      e.target.parentElement.parentElement.firstChild.textContent; // İlk child elementin metnini al

    showAlert("success", `${todoText} adlı todo başarıyla silindi.`);

    e.target.parentElement.parentElement.remove();
    deleteFromStorage(todoText);
  }
}
function deleteFromStorage(todoText) {
  let todos = getTodoStorage();
  todos.forEach(function (todo, index) {
    if (todo === todoText) {
      todos.splice(index, 1); // Arrayden değeri sileriz
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}
function getAllTodosUI() {
  let todos = getTodoStorage();
  todos.forEach(function (todo) {
    addTodoUI(todo);
  });
}
function addTodo(event) {
  const newTodo = todoInput.value.trim();
  if (newTodo === "") {
    showAlert("danger", "Please add an new todo");
  } else {
    showAlert("success", `${newTodo} başarılı bir şekilde oluşturuldu`);
    addTodoUI(newTodo);
    addTodoStorage(newTodo);
  }
  event.preventDefault();
}
function getTodoStorage() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos; // Verileri döndür
}
function addTodoStorage(newTodo) {
  let todos = getTodoStorage();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function showAlert(type, message) {
  const alert = document.createElement("div");
  alert.className = `alert alert-${type} `;
  alert.textContent = message;
  firstCardBody.appendChild(alert);
  setTimeout(() => {
    alert.remove();
  }, 1000);
}
function addTodoUI(newTodo) {
  const newList = document.createElement("li");
  const newLink = document.createElement("a");

  newList.className = "list-group-item d-flex justify-content-between"; // Class ayarı
  newLink.className = "delete-item"; // Class ayarı
  newLink.href = "#"; // Href ayarı
  newLink.innerHTML = '<i class="fa fa-remove"></i>';

  newList.appendChild(document.createTextNode(newTodo));
  newList.appendChild(newLink);
  todoList.appendChild(newList);
}
