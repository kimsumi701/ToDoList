let taskInput = document.getElementById('task-input');
let addButton = document.getElementById('add-button');
let taskList = [];
let filterList = [];
let tabs = document.querySelectorAll('.task-tabs div');
let mode = 'all';
addButton.addEventListener('click', addTask);
taskInput.addEventListener('focusin', function () {
    taskInput.value = '';
});
taskInput.addEventListener('keypress', function (event) {
    if (taskInput.value != '') {
        if (event.key === 'Enter') {
            addButton.click();
        }
    }
});

for (let i = 1; i < tabs.length; i++) {
    tabs[i].addEventListener('click', function (event) {
        filter(event);
    });
}
function addTask() {
    if (taskInput.value === '') {
        exit;
    }
    let taskValue = taskInput.value;
    taskInput.value = '';
    let task = {
        id: randomIDGenerate(),
        taskContent: taskValue,
        isComplete: false,
    };
    taskList.push(task);
    render();
}
function render() {
    let resultHTML = '';
    let list = [];
    if (mode === 'all') {
        list = taskList;
    } else {
        list = filterList;
    }

    for (let i = 0; i < list.length; i++) {
        if (list[i].isComplete) {
            resultHTML += `<div class="task task-done" id="${list[i].id}">
                    <span>${list[i].taskContent}</span>
                    <div class="button-box">
                        <button onclick="toggoleComplete('${list[i].id}')"><i class="fa-solid fa-rotate-left"></i></button>
                        <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-delete-left"></i></button>
                    </div>
                </div>`;
        } else {
            resultHTML += `<div class="task" id="${list[i].id}">
                    <span>${list[i].taskContent}</span>
                    <div class="button-box">
                        <button onclick="toggoleComplete('${list[i].id}')"><i class="fa-solid fa-circle-check"></i></button>
                        <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-delete-left"></i></button>
                    </div>
                </div>`;
        }
    }
    document.getElementById('task-board').innerHTML = resultHTML;
}
function toggoleComplete(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id === id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    filter();
}
function deleteTask(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id === id) {
            taskList.splice(i, 1);
            break;
        }
    }
    filter();
}
function filter(event) {
    if (event) {
        let underLine = document.getElementById('under-line');
        mode = event.target.id;
        underLine.style.widows = event.target.offsetWidth + 'px';
        underLine.style.top = '52px';
        underLine.style.left = event.target.offsetLeft + 'px';
    }

    filterList = [];
    if (mode === 'ongoing') {
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete == false) {
                filterList.push(taskList[i]);
            }
        }
    } else if (mode === 'done') {
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete == true) {
                filterList.push(taskList[i]);
            }
        }
    }
    render();
}
function randomIDGenerate() {
    return Math.random().toString(36).substr(2, 16);
}
