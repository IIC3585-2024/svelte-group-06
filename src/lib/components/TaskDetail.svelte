<script lang="ts">
  import type { Task } from '../store';

  export let task: Task;
</script>

{#if task}
  <div class="task-detail">
    <h2>{task.name}</h2>
    <p>Category: {task.category}</p>
    {#if task.startTime}
      <p>Started at: {task.startTime.toLocaleString()}</p>
    {/if}
    {#if task.endTime}
      <p>Ended at: {task.endTime.toLocaleString()}</p>
      <p>
        {#if task.startTime && task.endTime}
          Duration: {((task.endTime.getTime() - task.startTime.getTime()) / 1000).toFixed(2)} seconds
        {/if}
      </p>
    {/if}
  </div>
{/if}

<style>
  .task-detail {
    border: 1px solid #ccc;
    padding: 1rem;
    margin: 1rem 0;
  }
</style>
