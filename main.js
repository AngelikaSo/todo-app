let addNew = document.getElementById("addNew");
let inputText = document.getElementById("input-text");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let editId;
let isEditedTask = false;
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
  let userTask = inputText.value.trim();
  if (!isEditedTask) {
    data.push({
      text: inputText.value,
      status: "pending",
    });
  } else {
    isEditedTask = false;
    data[editId].text = userTask;
  }
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
  <div>
    <label for="${y}">
     <input onclick="updateStatus(this)" type="checkbox" id="${y}" ${isCompleted}>
     <p class="${isCompleted}">${x.text}</p>
    </label>
    <span class="options">
     <i onClick="editTask(${y}, ${x.text})" class="fa-solid fa-pen-to-square"></i>
     <i onClick="deleteTask(${y});createTask()" class="fa-solid fa-trash"></i>
    </span>
  </div>`);
    });
  }
  inputText.value = "";
};

// delete task // set to local storage
let deleteTask = (e) => {
  data.splice(e, 1);
  localStorage.setItem("data", JSON.stringify(data));
  createTask();
};

// edit task // and delete the original one
let editTask = (taskId, taskName) => {
  editId = taskId;
  isEditedTask = true;
  inputText.value = taskName;
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

// get item from local storage
(() => {
  data = JSON.parse(localStorage.getItem("data")) || [];
  createTask();
})();

// Dark mode toggle

// get dark mode from localStorage
function isDark() {
  return localStorage.getItem("dark-mode");
}

// toggle dark-theme
function toggleRootClass() {
  document.querySelector(":root").classList.toggle("dark-theme");
}

// set dark-theme in localStorage
function toggleLocalStorageItem() {
  if (isDark()) {
    localStorage.removeItem("dark-mode");
  } else {
    localStorage.setItem("dark-mode", "set");
  }
}

if (isDark()) {
  toggleRootClass();
}
// event listener CLICK event
document.querySelector(".theme-icon").addEventListener("click", () => {
  toggleLocalStorageItem();
  toggleRootClass();
});

// ADDITIONAL TASKS TO IMPROVE THE APP:
// save "checked" task to local storage - done
// read dark mode from local storage - done
// move checked task to the end of the list
