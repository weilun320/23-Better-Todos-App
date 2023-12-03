const todoListContainer = document.getElementById("todo-list-container");
const todoLists = todoListContainer.children[0];
const dropdownMenu = document.getElementById("dropdown-menu");
const completedCheckbox = document.getElementById("completed-checkbox");
let id;
let checked = false;

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
      <li><button class="dropdown-item" onclick="selectUserId(${userId})">User ID: ${userId}</button></li>
    `);
  }

  return formattedUserIds.join("");
}

// Display todos data on the page
function displayTodos() {
  getTodosData()
  .then((todosData) => {
    // Filter todos by user ID
    if (id) {
      todosData = todosData.filter((todo) => todo.userId === id);
    }

    // Filter todos by completed status
    if (completedCheckbox.checked) {
      todosData = todosData.filter((todo) => todo.completed);
    }
    else if (checked) {
      todosData = todosData.filter((todo) => !todo.completed);
    }
    
    const formattedTodosData = formatTodosData(todosData);

    todoLists.innerHTML = formattedTodosData;
  })
  .catch((error) => {
    todoListContainer.innerHTML = `Error fetching todo data`;
  });
}

// Display user IDs on dropdown list of the page
function displayUserIds() {
  getTodosData()
  .then((todosData) => {
    const formattedUserIds = formatUserIds(todosData);

    dropdownMenu.innerHTML = formattedUserIds;
  })
  .catch((error) => {
      dropdownMenu.innerHTML = `<li class="p-1">Error fetching user ID</li>`;
  });
}

displayUserIds();
displayTodos();

// Select todos data by user ID
function selectUserId(userId) {
  // Store user ID in global variable to filter todos data
  id = userId;
  displayTodos();
}

// Check if user has checked completed checkbox
function checkCompleted() {
  checked = true;
  displayTodos();
}

// Reset user ID and completed checkbox
function resetFilter() {
  id = null;
  checked = false;
  completedCheckbox.checked = false;
  
  displayTodos();
}