<script lang="ts">
  import { tasks, completedTasks, notifications, timer } from '../store';
  import Modal from './Modal.svelte';
  import type { Task } from '../store';
  export let task: Task;

  let isOpen = false;
  let selected = false;

  let startTimer: (duration: number) => void;
  let stopTimer: () => void;

  timer.subscribe(value => {
    if (value) {
      startTimer = value.startTimer;
      stopTimer = value.stopTimer;
    }
  });

  function startTask() {
    task.startTime = new Date();
    let duration = task.estimatedTime;
    if (task.timeUnit === 'minutos') {
      duration *= 60;
    } else if (task.timeUnit === 'horas') {
      duration *= 3600;
    } else if (task.timeUnit === 'dias') {
      duration *= 3600 * 24;
    }
    startTimer(duration);
    selected = true;
  }

  function stopTask() {
    task.endTime = new Date();
    task.isCompleted = true;
    selected = false;
    stopTimer();

    tasks.update(tasks => tasks.filter(t => t.id !== task.id));
    completedTasks.update(tasks => [...tasks, task]);
    let durationInMinutes = (task.endTime!.getTime() - task.startTime!.getTime()) / 1000 / 60;
    let durationInHours = durationInMinutes / 60;
    notifications.set(`Task "${task.name}" completed in ${durationInMinutes.toFixed(2)} minutes (${durationInHours.toFixed(2)} hours).`);
  }

  function deleteTask() {
    tasks.update(tasks => tasks.filter(t => t.id !== task.id));
  }

  function openModal(task: Task) {
    isOpen = true;
  }
</script>

<div class="card" class:selected={selected}>
  <h2 class="card__name">{task.name}</h2>
  <div class="buttons-container">
    {#if task.startTime}
    <button class="button-stop" on:click={stopTask}>Completar</button>
    {:else}
      <button class="button-start" on:click={startTask}>Comenzar</button>
    {/if}
    <button class="button-detail" on:click={() => openModal(task)}>Detalles</button>
    <button class="button-delete" on:click={deleteTask}>Eliminar</button>
  </div>
</div>

<Modal {isOpen} {task} />

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
