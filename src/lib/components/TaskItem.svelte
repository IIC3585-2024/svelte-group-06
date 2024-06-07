<script lang="ts">
  import { tasks, completedTasks, notifications, timer, currentTask, time, modal } from '../store';
  import Modal from './Modal.svelte';
  import type { Task } from '../store';
  export let task: Task;

  let actualTask: Task = {} as Task;

  let startTimer: (duration: number) => void;
  let stopTimer: () => Promise<void>;

  timer.subscribe(value => {
    if (value) {
      startTimer = value.startTimer;
      stopTimer = value.stopTimer;
    }
  });

  currentTask.subscribe(value => {
    if (value) {
      actualTask = value;
    }
  });

  async function startTask() {
    await stopTimer();
    if (actualTask.selected) {
      actualTask.selected = false;
      const timeSpent = Math.round((new Date().getTime() - actualTask.startTime!.getTime()) / 1000);
      actualTask.estimatedTime = actualTask.estimatedTime - timeSpent;
      actualTask.spentTime += timeSpent;
      tasks.update(tasks => tasks.map(t => t.id === actualTask.id ? actualTask : t));
    }
    currentTask.set(task);
    task.startTime = new Date();
    let duration = task.estimatedTime;
    startTimer(duration);
    task.selected = true;
  }

  async function stopTask() {
    await stopTimer();
    currentTask.set({} as Task);
    task.endTime = new Date();
    task.isCompleted = true;
    task.selected = false;
    

    tasks.update(tasks => tasks.filter(t => t.id !== task.id));
    completedTasks.update(tasks => [...tasks, task]);
    let durationInMinutes = (((task.endTime!.getTime() - task.startTime!.getTime()) / 1000) + task.spentTime) / 60;
    let durationInHours = durationInMinutes / 60;
    notifications.set(`Task "${task.name}" completed in ${durationInMinutes.toFixed(2)} minutes (${durationInHours.toFixed(2)} hours).`);
  }

  async function deleteTask() {
    await stopTimer();
    currentTask.set({} as Task);
    tasks.update(tasks => tasks.filter(t => t.id !== task.id));
  }

  function openModal() {
    modal.set(true);
  }
</script>

<div class="card" class:selected={task.selected}>
  <h2 class="card__name">{task.name}</h2>
  <div class="buttons-container">
    {#if task.selected}
      <button class="button-stop" on:click={stopTask}>Completar</button>
    {:else}
      <button class="button-start" on:click={startTask}>Comenzar</button>
    {/if}
    <button class="button-detail" on:click={() => openModal()}>Detalles</button>
    <button class="button-delete" on:click={deleteTask}>Eliminar</button>
  </div>
</div>

<Modal {task} />

<style>
  .button-start,
  .button-stop,
  .button-delete, 
  .button-detail {
    background-color: #6200ea;
    border: none;
    color: white;
    padding: 4px 8px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 12px;
    margin: 2px 2px;
    cursor: pointer;
    border-radius: 4px;
  }

  .buttons-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .card {
    border: 2px solid #a2a1a1;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    margin-bottom: 1rem;
    width: auto;
    height: auto;
    text-align: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
  }.selected {
    border-color: #6200ea;
  }

  .card__name {
    font-size: 1.115rem;
    font-weight: bold;
    margin: 0;
    margin-bottom: 0.5rem;
  }

</style>
