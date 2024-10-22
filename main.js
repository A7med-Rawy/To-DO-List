let input = document.querySelector(".input");
let add = document.querySelector(".add");
let taskdiv = document.querySelector(".tasks");
let arrayOfTasks = [];

if (localStorage.getItem("Task")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("Task"))
}

getdata();

add.onclick = function (e) {
    e.preventDefault();
    if (input.value !== "") {
        addTask(input.value);
        input.value = "";
    }
};
taskdiv.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn")) {
        deleteTaskWith(e.target.parentElement.getAttribute("date-id"));
        e.target.parentElement.remove();
    }
    if (e.target.classList.contains("task")) {
        toggle(e.target.getAttribute("date-id"))
        e.target.classList.toggle("done")
    }
})

function addTask(tas) {
    const tasks = {
        id: Date.now(),
        title: tas,
        completed: false,
    };
    arrayOfTasks.push(tasks);
    addElement(arrayOfTasks);
    addlocal(arrayOfTasks);
    console.log(arrayOfTasks)
};

function addElement(arrayOfTasks) {
    taskdiv.innerHTML = "";
    arrayOfTasks.forEach(tas => {
        let div = document.createElement("div");
        div.className = "task";
        div.setAttribute("date-id", tas.id);
        if (tas.completed == true) {
            div.className = "task done"
        }
        div.appendChild(document.createTextNode(tas.title));
        let span = document.createElement("span");
        span.className = "btn";
        span.innerHTML = "Remove"
        div.appendChild(span);
        taskdiv.appendChild(div);
    });
}


function getdata() {
    let data = localStorage.getItem("Task");
    if (data) {
        let elem = JSON.parse(data);
        addElement(elem);
    }
}
function deleteTaskWith(taskId) {
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
    addlocal(arrayOfTasks);
}

function toggle(togg) {
    for (let i = 0; i < arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].id == togg) {
            arrayOfTasks[i].completed == false ? arrayOfTasks[i].completed = true : arrayOfTasks[i].completed = false;

        }
    }
    addlocal(arrayOfTasks);
}
function addlocal(arrayOfTasks) {
    window.localStorage.setItem("Task", JSON.stringify(arrayOfTasks));
};

