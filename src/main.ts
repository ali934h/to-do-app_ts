import "./assets/css/output.css";
const taskInput = document.querySelector(".task-input") as HTMLInputElement;
const addTaskBtn = document.querySelector(".add-task-btn") as HTMLButtonElement;
const taskListUl = document.querySelector(".task-list-ul") as HTMLUListElement;

const removeAllTasksBtn = document.querySelector(
  ".remove-all-tasks-btn",
) as HTMLButtonElement;
interface task {
  id: string;
  title: string;
}
let tasks: task[] = [];
addTaskBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (taskInput.value) {
    addTaskToDB(taskInput.value);
    taskInput.value = "";
    taskInput.focus();
  }
});
removeAllTasksBtn.addEventListener("click", () => {
  tasks = [];
  saveDB();
  updateUiTasks();
});
function addTaskToDB(inputTask: string): void {
  tasks.push({ id: crypto.randomUUID(), title: inputTask });
  saveDB();
  updateUiTasks();
}

function updateUiTasks(): void {
  taskListUl.innerHTML = "";
  tasks.forEach((task) => {
    const taskLi: string = `<li data-taskid="${task.id}"
        class="flex items-center justify-between rounded bg-gray-50 p-3 shadow-sm"
      >
        <span>${task.title}</span>
        <button class="remove-task-btn text-red-500 hover:text-red-700">
          Delete
        </button>
      </li>`;
    taskListUl.insertAdjacentHTML("beforeend", taskLi);
  });
  const liElements = document.querySelectorAll(
    "[data-taskid]",
  ) as NodeListOf<HTMLLIElement>;
  liElements.forEach((liElement) => {
    const taskId = liElement.dataset.taskid as string;
    const btnElement = liElement.querySelector("button") as HTMLButtonElement;
    btnElement.addEventListener("click", () => removeTaskFromDB(taskId));
  });
}
function removeTaskFromDB(taskId: string): void {
  tasks = tasks.filter((task) => task.id !== taskId);
  saveDB();
  updateUiTasks();
}
function getDB(): void {
  tasks = JSON.parse(localStorage.getItem("tasks") as string) || [];
}
function saveDB(): void {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
document.addEventListener("DOMContentLoaded", () => {
  getDB();
  updateUiTasks();
});
