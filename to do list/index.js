let countdown;
const timerDisplay = document.querySelector('.display-time-left');
const taskName = document.querySelector('.task-name');

function deleteListener(){
  document.getElementById('task-list').addEventListener("click", (e)=> {
  if(e.target.matches(".delete-task")){
    e.target.parentNode.remove()
    setActive();
  }
});
}
deleteListener();

//form handling
document.taskForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  const task = this.task.value;
  addTask(mins * 60, task);
  this.reset();
});

//add task
function addTask(seconds, task) {
  if (task !== '' && seconds !== '') {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const taskDiv = document.createElement('div');
    taskDiv.setAttribute('class', 'task');
    taskDiv.innerHTML = `
      <input class='delete-task' type="button" value="X"/>
      <span class = seconds style="display:none">${seconds}</span>
      <p>
      <span>${task}</span>
      <span class = 'display-time-left'>${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}</span>
      <span class = 'end-time'></span>
      </p>
    `;
    document.getElementById('task-list').appendChild(taskDiv);
  }
  removeDirections()
  setActive();
}

//remove directions
function removeDirections() {
  document.getElementById('directions').setAttribute('class', 'done')
}


//find top task and begin countdown on it
function setActive() {
  if (document.querySelectorAll('.task').length > 0){
    const active = document.querySelectorAll('.task')[0];
    active.setAttribute('id', 'active');
    timer();
  }
}

function timer() {
	const activeTask = document.getElementById('active');
	const seconds = activeTask.getElementsByClassName('seconds')[0].innerText;
  clearInterval(countdown);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  // to add: displayEndTime(then);
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    //delete task when countdown runs countdown ends
      if (secondsLeft < 0) {
        activeTask.parentNode.removeChild(activeTask);
        clearInterval(countdown);
        setActive()
        return;
    }
    displayTimeLeft(secondsLeft);
    displayEndTime(then)
  }, 1000);
}

//display changing countdown
function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  document.title = display;
  document.getElementById("active").querySelector('.seconds').innerHTML = seconds;
  document.getElementById("active").querySelector('.display-time-left').innerHTML = display;
}

//display end time
function displayEndTime(timestamp) {
	const end = new Date(timestamp);
	const hour = end.getHours();
	const minutes = end.getMinutes();
  document.getElementById("active").querySelector('.end-time').innerHTML = `Continue until: ${hour > 12 ? hour - 12 : hour}:${minutes < 10 ? '0' : ''}${minutes}`

}
