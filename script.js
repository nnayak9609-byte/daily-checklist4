function getTodayKey() {
  const today = new Date().toISOString().split('T')[0];
  return "tasks_" + today;
}

function loadTasks() {
  return JSON.parse(localStorage.getItem(getTodayKey())) || [];
}

function saveTasks() {
  localStorage.setItem(getTodayKey(), JSON.stringify(tasks));
}

let tasks = loadTasks();

function renderTasks() {
  let list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    let li = document.createElement("li");

    let textSpan = document.createElement("span");
    textSpan.textContent = task.text;

    if (task.done) {
      textSpan.classList.add("completed");
    }

    textSpan.onclick = () => {
      tasks[index].done = !tasks[index].done;
      saveTasks();
      renderTasks();
    };

    // EDIT
    let editBtn = document.createElement("button");
    editBtn.innerText = "✏️";
    editBtn.onclick = () => {
      let newText = prompt("Edit task:", task.text);
      if (newText && newText.trim() !== "") {
        tasks[index].text = newText.trim();
        saveTasks();
        renderTasks();
      }
    };

    // DELETE
    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "❌";
    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    li.appendChild(textSpan);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    list.appendChild(li);
  });
}

function addTask() {
  let input = document.getElementById("taskInput");
  let text = input.value.trim();

  if (text === "") return;

  tasks.push({ text: text, done: false });
  input.value = "";

  saveTasks();
  renderTasks();
}

renderTasks();