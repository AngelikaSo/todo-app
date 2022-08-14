let addNew = document.getElementById("addNew");
let inputText = document.getElementById("input-text");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");

// addEventListener to the ADD button in order to submit task
addNew.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("button clicked");
  formValidation();
});

// formValidation check if the input field is filled out or not
let formValidation = () => {
  if (inputText.value === "") {
    msg.innerHTML = "Add Task!";
    console.log("failure");
  } else {
    console.log("success");
    msg.innerHTML = "";
    acceptData();
  }
};

// Empyt object for input data
let data = [];
// function to accept the data into input field and save to local storage
let acceptData = () => {
  data.push({
    text: inputText.value,
  });
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
  createTask();
};

// function to create new task // clear the input field after
let createTask = () => {
  tasks.innerHTML = "";
  if (data) {
    data.map((x, y) => {
      let isCompleted = x.status == "completed" ? "checked" : "";
      return (tasks.innerHTML += `
  <div class="done">
    <label for="${y}">
     <input onclick="updateStatus(this)" type="checkbox" id="${y}" ${isCompleted}>
     <p class="${isCompleted}">${x.text}</p>
    </label>
    <span class="options">
     <i onClick="editTask(this)" class="fa-solid fa-pen-to-square"></i>
     <i onClick="deleteTask(this);createTask()" class="fa-solid fa-trash"></i>
    </span>
  </div>`);
    });
  }
  inputText.value = "";
};

function updateStatus(selectedTask) {
  let taskName = selectedTask.parentElement.lastElementChild;
  if (selectedTask.checked) {
    taskName.classList.add("checked");
    data[selectedTask.id].status = "completed";
  } else {
    taskName.classList.remove("checked");
    data[selectedTask.id].status = "pending";
  }
  localStorage.setItem("data", JSON.stringify(data));
}

// delete task // set to local storage
let deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
};

// edit task // and delete the original one
let editTask = (e) => {
  let selectedTask = e.parentElement.previousElementSibling;
  // inputText.value = selectedTask.children[0].innerHTML;
  inputText.value = selectedTask.children[1].innerHTML;
  deleteTask(e);
};

// get item from local storage
(() => {
  data = JSON.parse(localStorage.getItem("data")) || [];
  createTask();
})();

// Dark mode toggle
let icon = document.getElementById("toggle-dark");

// enacle dark mode
const enableDarkMode = () => {
  localStorage.setItem("darkMode", "true");
  icon.classList.remove("bi-moon-fill");
  icon.innerHTML = `<i class="bi bi-brightness-high-fill"></i>`;
};

// disable dark mode
const disableDarkMode = () => {
  localStorage.setItem("darkMode", "false");
  icon.classList.remove("bi-brightness-high-fill");
  icon.innerHTML = `<i class="bi bi-moon-fill" id="toggle-dark"></i>`;
};

// event - click on the icon to change the light/dark mode
icon.onclick = () => {
  document.body.classList.toggle("dark-theme");
  localStorage.setItem("darkMode", "true)");

  if (document.body.classList.contains("dark-theme")) {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
};

// ADDITIONAL TASKS TO IMPROVE THE APP:
// save "checked" task to local storage

// move checked task to the end of the list
// read dark mode from local storage
