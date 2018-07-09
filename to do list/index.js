let countdown;
const timerDisplay = document.querySelector('.display-time-left');
// const endTime = document.querySelector('.display-time-end');
// const buttons = document.querySelectorAll('[data-time]');
const taskName = document.querySelector('.task-name');

//form handling
document.taskForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  const task = this.task.value;
  addTask(mins * 60, task);
  this.reset();
});

function addTask(seconds, task) {
  if (task !== '' && seconds !== '') {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const taskDiv = document.createElement('div');
    taskDiv.setAttribute('class', 'container');
    taskDiv.innerHTML = `
      <span class = seconds style="display:none">${seconds}</span>
      <p><span>${task}</span></p>
      <p><span class = 'display-time-left'>${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}</span></p>
    `;
    document.getElementById('main').appendChild(taskDiv);
    const active = document.querySelectorAll('.container')[0];
    active.setAttribute('id', 'active');
  }
  timer();
}

function timer() {
	if (document.querySelectorAll('.container').length > 0){
	const activeTask = document.getElementById('active');
  console.log(activeTask);
	const seconds = activeTask.getElementsByClassName('seconds')[0].innerText;
  clearInterval(countdown);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  // displayEndTime(then);
  // displayTask(task);
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      activeTask.parentNode.removeChild(activeTask);
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft, secondsLeft);
  }, 1000);
}
}

function displayTimeLeft(seconds, newSeconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  document.title = display;
  // timerDisplay.textContent = display;
  document.getElementById("active").querySelector('.seconds').innerHTML = newSeconds;
  document.getElementById("active").querySelector('.display-time-left').innerHTML = display;

}
