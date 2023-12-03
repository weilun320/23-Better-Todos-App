const todoListContainer = document.getElementById("todo-list-container");
const todoLists = todoListContainer.children[0];

async function getTodosData() {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos`);
  const data = await response.json();

  return data;
}

function formatTodosData(todosData) {
  const formattedTodosData = [];

  for (const todo of todosData) {
    formattedTodosData.push(`
      <li class="list-group-item">
        <input class="form-check-input me-1" type="checkbox" value="" id="${todo.id}" ${todo.completed ? "checked" : ""}>
        <label class="form-check-label" for="${todo.id}">${todo.userId}: ${todo.title}</label>
      </li>
    `);
  }

  return formattedTodosData.join("");
}

function displayTodos() {
  getTodosData()
  .then((todosData) => {
    data = todosData;
    const formattedTodosData = formatTodosData(todosData);

    todoLists.innerHTML = formattedTodosData;
  })
  .catch((error) => {
    todoListContainer.innerHTML = `Error fetching todo data`;
  });
}

displayTodos();
