<script lang="ts">
  import { tasks, completedTasks, notifications, type Task } from '../store';

  export let task: Task;

  function startTask() {
    task.startTime = new Date();
  }

  function stopTask() {
    task.endTime = new Date();
    const duration = (task.endTime!.getTime() - task.startTime!.getTime()) / 1000;
    task.isCompleted = true;

    tasks.update(tasks => tasks.filter(t => t.id !== task.id));
    completedTasks.update(tasks => [...tasks, task]);
    notifications.set(`Task "${task.name}" completed in ${duration.toFixed(2)} seconds.`);
  }

  function deleteTask() {
    tasks.update(tasks => tasks.filter(t => t.id !== task.id));
  }
</script>

<li>
  <strong>{task.name}</strong> ({task.category})
  {#if task.startTime}
    <button on:click={stopTask}>Stop</button>
  {:else}
    <button on:click={startTask}>Start</button>
  {/if}
  <button on:click={deleteTask}>Delete</button>
</li>
