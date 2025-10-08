const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const addTaskButton = document.getElementById('addTaskButton');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
tasks.forEach(task => addTaskToDOM(task.text, task.completed));

addTaskButton.addEventListener('click', () => {
    const taskValue = taskInput.value.trim();
    if (taskValue === '') {
        alert('Please enter a task!');
        return;
    }
    addTaskToDOM(taskValue);
    tasks.push({ text: taskValue, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskInput.value = ''; // Clear the input
});

function addTaskToDOM(taskText, completed = false) {
    const listItem = document.createElement('li');
    listItem.textContent = taskText;
    if (completed) {
        listItem.classList.add('completed');
    }

    // Create a complete button
    const completeButton = document.createElement('button');
    completeButton.textContent = completed ? 'Undo' : 'Complete';
    completeButton.onclick = () => {
        listItem.classList.toggle('completed');
        completeButton.textContent = listItem.classList.contains('completed') ? 'Undo' : 'Complete';
        updateTaskStatus(taskText);
    };

    // Create an edit button
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-button');
    editButton.onclick = () => editTask(taskText, listItem);

    // Create a delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => {
        taskList.removeChild(listItem);
        tasks = tasks.filter(task => task.text !== taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    listItem.appendChild(completeButton);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);
}

function updateTaskStatus(taskText) {
    const taskIndex = tasks.findIndex(task => task.text === taskText);
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function editTask(taskText, listItem) {
    const newTaskText = prompt('Edit task:', taskText);
    if (newTaskText) {
        const taskIndex = tasks.findIndex(task => task.text === taskText);
        tasks[taskIndex].text = newTaskText;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        listItem.childNodes[0].nodeValue = newTaskText; // Update the list item text
    }
}