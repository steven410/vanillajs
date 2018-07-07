let countdown;
const timerDisplay = document.querySelector('.display-time-left');
// const endTime = document.querySelector('.display-time-end');
// const buttons = document.querySelectorAll('[data-time]');
const taskName = document.querySelector('.task-name');


document.taskForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  const task = this.task.value;
  addTask(mins * 60, task);
  this.reset();
});

function addTask(seconds, task) {
  if (task !== '' && seconds !== '') {
    //create main div
    const div = document.createElement("div");
    div.setAttribute("class", "container");
    //create task name span
    const taskName = document.createElement("div");
    taskName.setAttribute("class", "task-name");
    //show task name
    const taskDisplay = document.createTextNode(task);
    //create time span
    const taskTime = document.createElement("div");
    taskTime.setAttribute("class", "display-time-left");
    //show task time
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    const timeDisplay = document.createTextNode(display);
    //combine above elements
    taskName.appendChild(taskDisplay);
    // taskTime.appendChild(timeDisplay);
    div.appendChild(taskName);
    div.appendChild(taskTime);
    document.getElementById("main").appendChild(div);
    //check for previously added task
    const active = document.querySelectorAll('.container')[0];
    active.setAttribute('id', 'active');
  }
  timer(seconds, task);
}

function timer(seconds, task) {
  clearInterval(countdown);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  // displayEndTime(then);
  // displayTask(task);
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countdown);

      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  document.title = display;
  // timerDisplay.textContent = display;
  document.getElementById("active").querySelector('.display-time-left').innerHTML = display;

}
