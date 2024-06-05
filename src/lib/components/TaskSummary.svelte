<script lang="ts">
  import { derived } from 'svelte/store';
  import { completedTasks } from '../store';
	import TaskDetail from './TaskDetail.svelte';
  // import type { Task } from '../store';

  const dailySummary = derived(completedTasks, $completedTasks => {
    const today = new Date().toISOString().split('T')[0];
    return $completedTasks.filter(task => task.endTime && task.endTime.toISOString().split('T')[0] === today);
  });

  $: totalTime = $dailySummary.reduce((acc, task) => acc + (task.endTime!.getTime() - task.startTime!.getTime()) / 1000, 0);
</script>

<div class="resume-container">
  <h2 class="title-resume">Tareas completadas hoy</h2>
  {#if totalTime > 3600}
    <h3 class="title-resume">Total time spent: {(Math.floor(totalTime / 3600))} hours {(Math.floor((totalTime % 3600) / 60))} minutes</h3>
  {:else}
    <h3 class="title-resume">Total time spent: {(totalTime / 60).toFixed(2)} minutes</h3>
  {/if}
  <div class="resume-info">
    {#each $dailySummary as task}
      <div class="detail-card"> 
        <TaskDetail {task} />
      </div>
    {/each}
  </div>
  
</div>

<style>
  .resume-container {
    display: flex;
    flex-direction: column;
  }

  .resume-info {
    align-items: stretch;
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    padding: 1rem;
  }
  
  .detail-card {
    padding: 1rem;
    border: 2px solid #a2a1a1;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .title-resume {
    margin: 0;
    margin-bottom: 1rem;
    align-self: center;
  }
</style>
