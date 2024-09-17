// Select elements
const taskInput = document.getElementById('new-task');
const addTaskBtn = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Render tasks on page load
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const taskItem = document.createElement('li');
    taskItem.className = task.completed ? 'completed' : '';

    // Create checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => toggleComplete(index));

    // Create task text (editable input)
    const taskText = document.createElement('input');
    taskText.type = 'text';
    taskText.value = task.text;
    taskText.readOnly = true;
    taskText.classList.add('task-text');

    // Create save button (initially hidden)
    const saveBtn = document.createElement('button');
    saveBtn.className = 'save';
    saveBtn.innerText = 'Save';
    saveBtn.style.display = 'none'; // Hidden until edit is clicked
    saveBtn.addEventListener('click', () => saveTask(index, taskText));

    // Create edit button
    const editBtn = document.createElement('button');
    editBtn.className = 'edit';
    editBtn.innerText = 'Edit';
    editBtn.addEventListener('click', () => editTask(taskText, saveBtn));

    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete';
    deleteBtn.innerText = 'Delete';
    deleteBtn.addEventListener('click', () => confirmDelete(index));

    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskText);
    taskItem.appendChild(editBtn);
    taskItem.appendChild(saveBtn);
    taskItem.appendChild(deleteBtn);
    taskList.appendChild(taskItem);
  });
}

// Add a new task
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') {
    alert('Task cannot be empty');
    return;
  }
  tasks.push({ text: taskText, completed: false });
  taskInput.value = '';
  saveTasks();
  renderTasks();
}

// Delete a task with confirmation
function confirmDelete(index) {
  const confirmDelete = confirm('Are you sure you want to delete this task?');
  if (confirmDelete) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }
}

// Save edited task
function saveTask(index, taskText) {
  tasks[index].text = taskText.value;
  taskText.readOnly = true;
  saveTasks();
  renderTasks();
}

// Edit a task (show input for editing)
function editTask(taskText, saveBtn) {
  taskText.readOnly = false;
  taskText.focus();
  saveBtn.style.display = 'inline'; // Show save button
}

// Toggle task completion
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Event listener for adding a task
addTaskBtn.addEventListener('click', addTask);

// Initial rendering of tasks
renderTasks();
