/* 
로직 정리
    1. 유저가 값을 인풋에 입력
    2. 그리고 버튼, + 버튼을 클릭하면 아이템이 추가된다, 할일이 추가된다
    3. 유저가 딜리트 버튼을 누르면 할일이 삭제된다
    4. 체크버튼을 누르면 할일이 끝나면서, 줄이 그어진다.
    5. 진행중 끝남 탭을 누르면 언더바가 이동한다.
    6. 끝남탭은 끝난 아이템만, 진행중탭은 진행중인 아이템만 보여주게 된다.
    7. 전체탭을 누르면 전체 아이템을 보여준다.
*/
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
    let taskValue = taskInput.value;
    let task = {
        id: randomIDGenerate(),
        taskContent: taskValue,
        isComplete: false,
    }
    taskList.push(task);
    taskInput.value = '';    
    // let taskContent = taskInput.value;
    // taskList.push(taskContent);   90 
    render();
}

function render() {
    let resultHTML = '';
    let list = [];
    if (mode == 'all') {
        list = taskList;
    } else {
        list = filterList;
    }

    for (let i = 0; i < list.length; i++) {
        if (list[i].isComplete) {
            resultHTML += 
            `<div class="task task-done" id="${list[i].id}">
            <span>${list[i].taskContent}</span>
            <div class="button-box">
                <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-rotate-left"></i></button>
                <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
            </div>
            </div>`
        } else {
            resultHTML += 
            `<div class="task" id=""${list[i].id}">
            <span>${list[i].taskContent}</span>
            <div class="button-box">
                <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
                <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
            </div>
            </div>`
        }
        /* 
            클릭이벤트를 주는 방법 두가지
            1. addEventListener
            2. 해당 태그에 onclick 속성 주기 -> onclick = "함수이름()"
        */
    }
    document.getElementById('task-board').innerHTML = resultHTML;
}
/* 
    innerHTMLrhk textContent의 차이점
    innerHTML: Element의 HTML, XML을 읽어오거나, 설정할 수 있다. 태그 안에 있는 HTML 전체 내용을 들고온다.
    textContent: 해상 노드가 가지고 있는 텍스트 값을 그대로 가지고 온다. 
*/
function toggleComplete(id) {
    for (let i = 0; i < taskList.length; i ++) {
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
        }
    };   
    filter();        
}
function filter(event) {
    if (event) {
        mode = event.target.id;
        document.getElementById('under-line').style.width = event.target.offsetWidth + 'px';
        document.getElementById('under-line').style.top = '52px';
        document.getElementById('under-line').style.left = event.target.offsetLeft + 'px';
    }    
    // console.log('체크', event.target)
    // 클릭한 타겟의 너비, 레프트
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

