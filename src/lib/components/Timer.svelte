<script lang="ts">
  import { timer } from '../store.js';

  let time = 0;
  let intervalId: number | undefined;

  const startTimer = (duration: number) => {
    time = duration;
    intervalId = setInterval(tick, 1000);
  };

  const stopTimer = () => {
    clearInterval(intervalId);
    time = 0;
  };

  timer.set({ startTimer, stopTimer });

  const tick = () => {
    if (time > 0) {
      time--;
    } else {
      stopTimer();
      notify();
    }
  };

  const notify = () => {
    console.log('Time is up!'); 
  };

  const pad = (num: number) => num.toString().padStart(2, '0');
</script>

<div class="clock">
  <span>{pad(Math.floor(time / 3600))}</span>:<span>{pad(Math.floor((time % 3600) / 60))}</span>:<span>{pad(time % 60)}</span>
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