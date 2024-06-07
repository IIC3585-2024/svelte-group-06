<script lang="ts">
  import type { Task } from '../store';

  export let task: Task;

  function getTimeUnit() {
    if (task.estimatedTime + task.spentTime >= 3600) {
      return ((task.estimatedTime + task.spentTime) / 3600) + ' horas';
    } else if (task.estimatedTime + task.spentTime >= 86400) {
      return ((task.estimatedTime + task.spentTime) / 86400) + ' days';
    } else if (task.estimatedTime + task.spentTime >= 60) {
      return  ((task.estimatedTime + task.spentTime) / 60) + ' minutos';
    } else {
      return 'segundos';
    }
  }
</script>

{#if task}
  <div class="task-detail">
    <h2 class="item-name">{task.name}</h2>
    <div class="item">Tiempo estimado: {getTimeUnit()}</div>
    <p class="item">Categoria: {task.category}</p>
    {#if task.description}
      <p class="item">Descripción: {task.description}</p>
    {/if}
    {#if task.startTime}
      <p class="item">Last start at: {task.startTime}</p>
    {/if}
    {#if task.endTime}
      <p class="item">Ended at: {task.endTime}</p>
      <p class="item">
        {#if task.startTime && task.endTime}
            Total duration: {((((new Date(task.endTime).getTime() - new Date(task.startTime).getTime()) / 1000) + task.spentTime) / 60).toFixed(2)} minutes
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
