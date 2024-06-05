<script lang="ts">
  import TaskItem from './TaskItem.svelte';
  import type { Task } from '../store';

  export let tasks: Task[] = [];
</script>

<div class="tasks-list">
  {#each tasks as task (task.id)}
    <TaskItem {task} />
  {/each}
</div>

<style>
  .tasks-list {
    align-items: stretch;
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    padding: 1rem;

  }
</style>
