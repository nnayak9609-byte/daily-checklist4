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

    // TEXT
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

    // BUTTON CONTAINER
    let btnDiv = document.createElement("div");
    btnDiv.style.float = "right";

    // EDIT BUTTON
    let editBtn = document.createElement("button");
    editBtn.innerText = "✏️";
    editBtn.style.marginLeft = "10px";

    editBtn.onclick = () => {
      let newText = prompt("Edit task:", task.text);
      if (newText && newText.trim() !== "") {
        tasks[index].text = newText.trim();
        saveTasks();
        renderTasks();
      }
    };

    // DELETE BUTTON
    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "❌";
    deleteBtn.style.marginLeft = "5px";

    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    btnDiv.appendChild(editBtn);
    btnDiv.appendChild(deleteBtn);

    li.appendChild(textSpan);
    li.appendChild(btnDiv);

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
