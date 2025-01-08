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
let tasks: task[];
addTaskBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addTaskToDB(taskInput.value);
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

function updateUiTasks() {
  taskListUl.innerHTML = "";
  tasks.forEach((task) => {
    const taskLi = `<li data-id="${task.id}"
        class="flex items-center justify-between rounded bg-gray-50 p-3 shadow-sm"
      >
        <span>${task.title}</span>
        <button class="remove-task-btn text-red-500 hover:text-red-700">
          Delete
        </button>
      </li>`;
    taskListUl.insertAdjacentHTML("beforeend", taskLi);
    const liElement = document.querySelector(
      `[data-id='${task.id}']`,
    ) as HTMLLIElement;
    const btnElement = liElement.querySelector("button") as HTMLButtonElement;
    btnElement.addEventListener("click", () => removeTaskFromDB(task.id));
  });
}
function removeTaskFromDB(taskId: string) {
  tasks = tasks.filter((task) => task.id !== taskId);
  saveDB();
  updateUiTasks();
}
function getDB() {
  tasks = JSON.parse(localStorage.getItem("tasks") as string) || [];
}
function saveDB() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
document.addEventListener("DOMContentLoaded", () => {
  getDB();
  updateUiTasks();
});
