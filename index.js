let countdown;
const timerDisplay = document.querySelector('.display-time-left');
const endTime = document.querySelector('.display-time-end');
const buttons = document.querySelectorAll('[data-time]');
const taskName = document.querySelector('.task-name');

function addTask(e){
	e.preventDefault();

}

function timer(seconds, task) {
  clearInterval(countdown);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);
  displayTask(task);
  countdown = setInterval(()=> {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
	  if(secondsLeft < 0){
	    clearInterval(countdown);
		return;
	}
	displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds){
  const minutes = Math.floor(seconds/60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;

}

function displayTask(task){
	taskName.textContent = task;
}

function displayEndTime(timestamp) {
	const end = new Date(timestamp);
	const hour = end.getHours();
	const minutes = end.getMinutes();
	endTime.textContent = `Keep going until ${hour > 12 ? hour - 12 : hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
	const seconds = parseInt(this.dataset.time);
	timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));

document.customForm.addEventListener('submit', function(e){
	e.preventDefault();
	const mins = this.minutes.value;
	const task = this.task.value;
	timer(mins * 60, task);
	console.log(task);
	this.reset();
	});
