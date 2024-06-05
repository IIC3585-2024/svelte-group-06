<script lang="ts">
  import TaskItem from './TaskItem.svelte';
  import type { Task } from '../store';

  export let tasks: Task[] = [];
</script>

<ul>
  {#each tasks as task (task.id)}
    <TaskItem {task} />
  {/each}
</ul>
