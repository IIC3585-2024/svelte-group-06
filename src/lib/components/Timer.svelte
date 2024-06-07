<script lang="ts">
  import { time, timer, currentTask, notifications, type Task, tasks, completedTasks } from '../store.js';

  let intervalId: NodeJS.Timeout | undefined;

  let number_time: number;

  time.subscribe(value => {
    number_time = value;
  });

  const startTimer = (duration: number) => {
    time.set(duration);
    intervalId = setInterval(tick, 1000);
  };

  const stopTimer = () => {
    clearInterval(intervalId);
    time.set(0);
  };

  timer.set({ startTimer, stopTimer });

  let task: Task = {} as Task;
  currentTask.subscribe(value => {
    if (task) {
      task = value;
    }
  });

  const tick = () => {
    time.update(currentTime => {
      if (currentTime > 0) {
        return currentTime - 1;
      } else {
        stopTimer();
        task.endTime = new Date();
        task.isCompleted = true;
        tasks.update(tasks => tasks.filter(t => t.id !== task.id));
        completedTasks.update(tasks => [...tasks, task]);
        notify();
        return 0;
      }
    });
  };

  const notify = () => {
    let durationInMinutes = (task.endTime!.getTime() - task.startTime!.getTime()) / 1000 / 60;
    let durationInHours = durationInMinutes / 60;
    notifications.set(`Task "${task.name}" completed in ${durationInMinutes.toFixed(2)} minutes (${durationInHours.toFixed(2)} hours).`);
  };

  const pad = (num: number) => num.toString().padStart(2, '0');
</script>

<div class="clock">
  <span>{pad(Math.floor(number_time / 3600))}</span>:<span>{pad(Math.floor((number_time % 3600) / 60))}</span>:<span>{pad(number_time % 60)}</span>
</div>

<style>
  .clock {
    font-size: 3rem;
    font-weight: bolder;
    font-family: 'Courier New', Courier, monospace;
    color: #6200ea;
    background-color: #ccc;
    padding: 1rem;
    border-radius: 10px;
    width: 40%;
    text-align: center;
    align-self: center;
  }
</style>