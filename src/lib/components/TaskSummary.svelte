<script lang="ts">
  import { derived } from 'svelte/store';
  import { completedTasks } from '../store';
  // import type { Task } from '../store';

  const dailySummary = derived(completedTasks, $completedTasks => {
    const today = new Date().toISOString().split('T')[0];
    return $completedTasks.filter(task => task.endTime && task.endTime.toISOString().split('T')[0] === today);
  });

  $: totalTime = $dailySummary.reduce((acc, task) => acc + (task.endTime!.getTime() - task.startTime!.getTime()) / 1000, 0);
</script>

<h2>Daily Summary</h2>
<ul>
  {#each $dailySummary as task}
    <li>
      {task.name} - 
      {task.endTime && task.startTime ? ((task.endTime.getTime() - task.startTime.getTime()) / 1000).toFixed(2) : 'N/A'} seconds
    </li>
  {/each}
</ul>
<p>Total time spent: {totalTime.toFixed(2)} seconds</p>
