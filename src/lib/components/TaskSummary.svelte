<script lang="ts">
  import { derived } from 'svelte/store';
  import { completedTasks } from '../store';
	import TaskDetail from './TaskDetail.svelte';
  // import type { Task } from '../store';

  const dailySummary = derived(completedTasks, $completedTasks => {
    const today = new Date().toISOString().split('T')[0];
    return $completedTasks.filter(task => task.endTime && new Date(task.endTime).toISOString().split('T')[0] === today);
  });

  $: totalTime = $dailySummary.reduce((acc, task) => acc + (new Date(task.endTime!).getTime() - new Date(task.startTime!).getTime()) / 1000 + task.spentTime, 0);
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
    align-items: center;
    padding: 2rem;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    max-width: 800px;
    margin: 2rem auto;
  }

  .title-resume {
    font-size: 1.8rem;
    color: #333;
    margin-bottom: 1rem;
    text-align: center;
  }

  .resume-info {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    width: 100%;
  }
  
  .detail-card {
    padding: 1rem;
    border: 2px solid #6200ea;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;
  }

  .detail-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
</style>