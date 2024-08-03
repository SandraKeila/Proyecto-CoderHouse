
let todos = JSON.parse(localStorage.getItem("todos")) || [];

let contador = 1;
let addTodoButton = document.getElementById("btn-add"); 
let todosList = document.getElementById("todo-list"); 
let totalSumaElement = document.getElementById("total-suma");

let addTodo = () => {
  let todoText = prompt("Nombre del gasto");
  let todoprecio = Number(prompt("Cantidad de gasto"));
  let todo = { id: contador, text: todoText, number: todoprecio };
  todos.push(todo);

  contador++;

  pintarTarjetas();
  localStorage.setItem("todos", JSON.stringify(todos));
};

addTodoButton.addEventListener("click", addTodo);

const deleteTodo = (elemento) => {
  todos = todos.filter((todo) => todo.id !== elemento.id); 
  pintarTarjetas();
  localStorage.setItem("todos", JSON.stringify(todos));
};

const pintarTarjetas = () => {
  todosList.innerHTML = "";

  todos.forEach((elemento) => {
    let item = document.createElement("li");
    item.className = "card";
    item.innerHTML = `<span>${elemento.text}</span> 
      <span>${elemento.number}</span> 
      <button class="delete-button">Borrar</button>`;

    let deleteButton = item.querySelector(".delete-button");

    deleteButton.addEventListener("click", () => {
      deleteTodo(elemento);
    });

    todosList.appendChild(item);
  });

  let totalSuma = todos.reduce((sum, todo) => sum + todo.number, 0);
  totalSumaElement.textContent = totalSuma.toFixed(2);
};

pintarTarjetas();
