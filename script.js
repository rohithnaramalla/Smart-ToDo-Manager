
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const input = document.getElementById("taskInput");
    const text = input.value.trim();

    if (text === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        id: Date.now(),
        text: text,
        completed: false
    });

    input.value = "";
    saveTasks();
    displayTasks();
}

function toggleTask(id) {
    tasks = tasks.map(task =>
        task.id === id
            ? { ...task, completed: !task.completed }
            : task
    );

    saveTasks();
    displayTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    displayTasks();
}

function editTask(id) {
    const task = tasks.find(task => task.id === id);
    const updatedText = prompt("Edit your task:", task.text);

    if (updatedText !== null && updatedText.trim() !== "") {
        task.text = updatedText.trim();
        saveTasks();
        displayTasks();
    }
}

function displayTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => toggleTask(task.id));

        const span = document.createElement("span");
        span.className = "task-text" + (task.completed ? " done" : "");
        span.textContent = task.text;

        const actions = document.createElement("div");
        actions.className = "actions";

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.addEventListener("click", () => editTask(task.id));

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete";
        deleteBtn.addEventListener("click", () => deleteTask(task.id));

        actions.append(editBtn, deleteBtn);
        li.append(checkbox, span, actions);
        list.appendChild(li);
    });

    const completedCount = tasks.filter(task => task.completed).length;

    document.getElementById("total").textContent = tasks.length;
    document.getElementById("completed").textContent = completedCount;
    document.getElementById("pending").textContent = tasks.length - completedCount;

    document.getElementById("emptyMessage").style.display =
        tasks.length === 0 ? "block" : "none";
}

document.getElementById("taskInput").addEventListener("keydown", event => {
    if (event.key === "Enter") addTask();
});

displayTasks();
