const input = document.getElementById("taskInput");

const button = document.getElementById("addButton");

const taskList = document.getElementById("taskList");


function addTask() {

    const taskText = input.value;

    const li = document.createElement("li");

    li.textContent = taskText;

    taskList.appendChild(li);

    input.value = "";

}


button.addEventListener("click", function () {

    addTask();

});


input.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        addTask();

    }

});