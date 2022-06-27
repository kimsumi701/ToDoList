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
addButton.addEventListener('click', addTask);
function addTask() {
    let taskContent = taskInput.value;
    taskList.push(taskContent);    
    render();
}
function render() {
    let resultHTML = '';
    for (let i = 0; i < taskList.length; i++) {
        resultHTML += 
        `<div class="task">
        <div>${taskList[i]}</div>
        <div>
            <button>Check</button>
            <button>Delete</button>
        </div>
        </div>`
    }
    document.getElementById('task-board').innerHTML = resultHTML;
}
/* 
    innerHTMLrhk textContent의 차이점
    innerHTML: Element의 HTML, XML을 읽어오거나, 설정할 수 있다. 태그 안에 있는 HTML 전체 내용을 들고온다.
    textContent: 해상 노드가 가지고 있는 텍스트 값을 그대로 가지고 온다. 
*/

