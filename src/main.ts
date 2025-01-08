// Import the CSS file for styling
import "./assets/css/output.css";

// Select the DOM elements required for the application
const taskInput = document.querySelector(".task-input") as HTMLInputElement;
const addTaskBtn = document.querySelector(".add-task-btn") as HTMLButtonElement;
const taskListUl = document.querySelector(".task-list-ul") as HTMLUListElement;
const removeAllTasksBtn = document.querySelector(
  ".remove-all-tasks-btn",
) as HTMLButtonElement;

// Define a TypeScript interface for the task object
interface task {
  id: string; // Unique identifier for each task
  title: string; // Title of the task
}

// Initialize an empty array to hold tasks
let tasks: task[] = [];

// Event listener for the "Add Task" button click
addTaskBtn.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent the default form submission behavior
  if (taskInput.value) {
    // Check if the input field is not empty
    addTaskToDB(taskInput.value); // Add task to the database (array)
    taskInput.value = ""; // Clear the input field after adding the task
    taskInput.focus(); // Focus back on the input field
  }
});

// Event listener for the "Remove All Tasks" button click
removeAllTasksBtn.addEventListener("click", () => {
  tasks = []; // Clear the tasks array
  saveDB(); // Save the empty task list to localStorage
  updateUiTasks(); // Update the UI to reflect the empty task list
});

// Function to add a new task to the database (tasks array)
function addTaskToDB(inputTask: string): void {
  tasks.push({ id: crypto.randomUUID(), title: inputTask }); // Add task with a unique ID
  saveDB(); // Save the updated task list to localStorage
  updateUiTasks(); // Update the UI to reflect the new task list
}

// Function to update the UI with the current list of tasks
function updateUiTasks(): void {
  taskListUl.innerHTML = ""; // Clear the existing task list in the UI
  tasks.forEach((task) => {
    // Create a new list item for each task
    const taskLi: string = `<li data-taskid="${task.id}"
        class="flex items-center justify-between rounded bg-gray-50 p-3 shadow-sm"
      >
        <span>${task.title}</span>
        <button class="remove-task-btn text-red-500 hover:text-red-700">
          Delete
        </button>
      </li>`;
    taskListUl.insertAdjacentHTML("beforeend", taskLi); // Insert the new task item into the UI
  });

  // Select all the list items that have a task ID
  const liElements = document.querySelectorAll(
    "[data-taskid]",
  ) as NodeListOf<HTMLLIElement>;

  // Add a click event listener to each delete button in the task list
  liElements.forEach((liElement) => {
    const taskId = liElement.dataset.taskid as string; // Get the task ID from the data attribute
    const btnElement = liElement.querySelector("button") as HTMLButtonElement;

    // Add event listener to delete the task when the button is clicked
    btnElement.addEventListener("click", () => removeTaskFromDB(taskId));
  });
}

// Function to remove a task from the database (tasks array)
function removeTaskFromDB(taskId: string): void {
  tasks = tasks.filter((task) => task.id !== taskId); // Remove the task by its ID
  saveDB(); // Save the updated task list to localStorage
  updateUiTasks(); // Update the UI to reflect the removal
}

// Function to get tasks from localStorage and load them into the tasks array
function getDB(): void {
  tasks = JSON.parse(localStorage.getItem("tasks") as string) || []; // Retrieve tasks or set empty array if none exist
}

// Function to save tasks to localStorage
function saveDB(): void {
  localStorage.setItem("tasks", JSON.stringify(tasks)); // Save the tasks array as a JSON string in localStorage
}

// Event listener to initialize the app when the DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
  getDB(); // Load tasks from localStorage
  updateUiTasks(); // Update the UI to reflect the loaded tasks
});
