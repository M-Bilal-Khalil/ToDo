// Check if a user is logged in
function checkLoginStatus() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  
    if (!currentUser) {
      window.location.href = "./login/login.html";
    } else {
      document.getElementById("userName").textContent = currentUser.fullName;
      document.getElementById("userEmail").textContent = currentUser.email;
      loadTodos(currentUser.email); // Load todos for the logged-in user
    }
  }
  
  // Load To-Do List from Local Storage
  function loadTodos(userEmail) {
    const todos = JSON.parse(localStorage.getItem(`todos_${userEmail}`)) || [];
    const todoList = document.getElementById("todoList");
    todoList.innerHTML = ""; // Clear existing items
  
    todos.forEach(({ id, text }) => {
      const li = createTodoElement(id, text);
      todoList.appendChild(li);
    });
  }
  
  // Create a To-Do List Item Element
  function createTodoElement(id, text) {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.dataset.id = id;
  
    const span = document.createElement("span");
    span.textContent = text;
  
    const btnGroup = document.createElement("div");
  
    const editBtn = document.createElement("button");
    editBtn.className = "btn btn-sm me-2";
    editBtn.textContent = "Edit";
    editBtn.style.backgroundColor = "green"; 
    editBtn.style.color = "white";
    editBtn.onclick = () => editTodo(id);
  
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-danger btn-sm";
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => deleteTodo(id);
  
    btnGroup.appendChild(editBtn);
    btnGroup.appendChild(deleteBtn);
  
    li.appendChild(span);
    li.appendChild(btnGroup);
  
    return li;
  }
  
  // Add a New To-Do Item
  function addTodo() {
    const todoInput = document.getElementById("todoInput");
    const todoText = todoInput.value.trim();
  
    if (todoText === "") {
      alert("Please enter a task.");
      return false;
    }
  
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const userEmail = currentUser.email;
  
    const todos = JSON.parse(localStorage.getItem(`todos_${userEmail}`)) || [];
    const newTodo = { id: Date.now(), text: todoText }; // Unique ID for each todo
    todos.push(newTodo);
    localStorage.setItem(`todos_${userEmail}`, JSON.stringify(todos));
  
    const todoList = document.getElementById("todoList");
    const li = createTodoElement(newTodo.id, newTodo.text);
    todoList.appendChild(li);
  
    todoInput.value = ""; // Clear input field
    return false; // Prevent form submission
  }
  
  // Edit a To-Do Item
  function editTodo(id) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const userEmail = currentUser.email;
  
    const todos = JSON.parse(localStorage.getItem(`todos_${userEmail}`)) || [];
    const todo = todos.find(todo => todo.id === id);
  
    const newText = prompt("Edit your task:", todo.text);
    if (newText !== null && newText.trim() !== "") {
      todo.text = newText.trim();
      localStorage.setItem(`todos_${userEmail}`, JSON.stringify(todos));
      loadTodos(userEmail); // Refresh the list
    }
  }
  
  // Delete a To-Do Item
  function deleteTodo(id) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const userEmail = currentUser.email;
  
    let todos = JSON.parse(localStorage.getItem(`todos_${userEmail}`)) || [];
    todos = todos.filter(todo => todo.id !== id); // Remove the item with the given ID
    localStorage.setItem(`todos_${userEmail}`, JSON.stringify(todos));
  
    loadTodos(userEmail); // Refresh the list
  }
  
  // Logout Functionality
  function logoutUser() {
    localStorage.removeItem("currentUser");
    window.location.href = "./login/login.html";
  }
  
  // Initialize the page
  document.addEventListener("DOMContentLoaded", checkLoginStatus);