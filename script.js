/* Unique ID generator */
let taskId = 0;

/* Add Task Function */
function addTask(columnId) {
  const input = document.getElementById(`${columnId}-input`);
  const value = input.value.trim();

  if (!value) {
    alert("Please enter a task!");
    return;
  }

  const task = createTaskElement(value);
  document.getElementById(columnId).appendChild(task);

  input.value = "";
}

/* Create Task Element */
function createTaskElement(text) {
  const task = document.createElement("div");
  task.className = "task";
  task.draggable = true;
  task.id = `task-${taskId++}`;
  task.innerText = text;

  /* Drag Events */
  task.addEventListener("dragstart", dragStart);
  task.addEventListener("dragend", dragEnd);

  /* Double click to delete */
  task.addEventListener("dblclick", () => {
    if (confirm("Delete this task?")) {
      task.remove();
    }
  });

  return task;
}

/* Drag Start */
function dragStart(e) {
  e.dataTransfer.setData("text/plain", e.target.id);
  setTimeout(() => {
    e.target.style.display = "none";
  }, 0);
}

/* Drag End */
function dragEnd(e) {
  e.target.style.display = "block";
}

/* Allow Drop */
function allowDrop(e) {
  e.preventDefault();
}

/* Drop Function */
function drop(e) {
  e.preventDefault();

  const id = e.dataTransfer.getData("text/plain");
  const task = document.getElementById(id);

  let target = e.target;

  /* Find correct drop container */
  while (
    !target.classList.contains("task-list") &&
    !target.classList.contains("column")
  ) {
    target = target.parentElement;
  }

  if (target.classList.contains("column")) {
    target = target.querySelector(".task-list");
  }

  target.appendChild(task);
}

/* Highlight Drop Area */
const columns = document.querySelectorAll(".column");

columns.forEach((column) => {
  column.addEventListener("dragover", (e) => {
    e.preventDefault();
    column.classList.add("drag-over");
  });

  column.addEventListener("dragleave", () => {
    column.classList.remove("drag-over");
  });

  column.addEventListener("drop", (e) => {
    column.classList.remove("drag-over");
    drop(e);
  });
});
