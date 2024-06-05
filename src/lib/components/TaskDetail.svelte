<script lang="ts">
  import type { Task } from '../store';

  export let task: Task;
</script>

{#if task}
  <div class="task-detail">
    <h2 class="item-name">{task.name}</h2>
    <div class="item">Tiempo estimado: {task.estimatedTime} {task.timeUnit}</div>
    <p class="item">Categoria: {task.category}</p>
    {#if task.description}
      <p class="item">Descripción: {task.description}</p>
    {/if}
    {#if task.startTime}
      <p class="item">Started at: {task.startTime.toLocaleString()}</p>
    {/if}
    {#if task.endTime}
      <p class="item">Ended at: {task.endTime.toLocaleString()}</p>
      <p class="item">
        {#if task.startTime && task.endTime}
          Duration: {((task.endTime.getTime() - task.startTime.getTime()) / 1000).toFixed(2)} seconds
        {/if}
      </p>
    {/if}
  </div>
{/if}

<style>
  .task-detail {
    display: flex;
    flex-direction: column;
  }

  .item {
    margin: 0;
    margin-bottom: 0.5rem;
    margin-left: 1rem;
  }
  
  .item-name {
    margin: 0;
    margin-bottom: 1rem;
  }
</style>
