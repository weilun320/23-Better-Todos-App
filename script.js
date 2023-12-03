const todoListContainer = document.getElementById("todo-list-container");
const todoLists = todoListContainer.children[0];
const dropdownMenu = document.getElementById("dropdown-menu");

// Fetch todos data from API
async function getTodosData() {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos`);
  const data = await response.json();

  return data;
}

// Format todos data into HTML
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

// Format user IDs into HTML
function formatUserIds(todosData) {
  const userIds = [];
  const formattedUserIds = [];

  // Check for duplicate user IDs
  for (const todo of todosData) {
    if (!userIds.includes(todo.userId)) {
      userIds.push(todo.userId);
    }
  }

  for (const userId of userIds) {
    formattedUserIds.push(`
      <li><button class="dropdown-item" onclick="filterUserId(${userId})">User ID: ${userId}</button></li>
    `);
  }

  return formattedUserIds.join("");
}

// Display todos data on the page
function displayTodos() {
  getTodosData()
  .then((todosData) => {
    data = todosData;
    const formattedTodosData = formatTodosData(todosData);
    const formattedUserIds = formatUserIds(todosData);

    todoLists.innerHTML = formattedTodosData;
    dropdownMenu.innerHTML = formattedUserIds
  })
  .catch((error) => {
    todoListContainer.innerHTML = `Error fetching todo data`;
  });
}

displayTodos();
