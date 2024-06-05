<script lang="ts">
  import TaskForm from '$lib/components/TaskForm.svelte';
  import TaskList from '$lib/components/TaskList.svelte';
  import CategoryFilter from '$lib/components/CategoryFilter.svelte';
  import Notification from '$lib/components/Notification.svelte';
  import TaskSummary from '$lib/components/TaskSummary.svelte';
  import Timer from '$lib/components/Timer.svelte';
  import { tasks } from '$lib/store';
  import type { Task } from '$lib/store';

  let currentFilter: string = 'All';
  const filters: string[] = ['All', 'Trabajo', 'Habitos', 'Deportes', 'Ocio', 'Estudios', 'Otro'];

  function setFilter(filter: string) {
    currentFilter = filter;
  }

  let display: 'tasks' | 'resume' = 'tasks';

  function setDisplay(value: 'tasks' | 'resume') {
    display = value;
  }

  let filteredTasks: Task[] = [];
  $: filteredTasks = $tasks.filter((task: Task) => currentFilter === 'All' || task.category === currentFilter);
</script>

<main>
  <div class="main-container">
    <div class="tasks-container">
      <div class="button-container">
        <button class="toggle-button" class:selected={display === 'tasks'} on:click={() => setDisplay('tasks')}>Tareas</button>
        <button class="toggle-button" class:selected={display === 'resume'} on:click={() => setDisplay('resume')}>Resumen del día</button>
      </div>
      {#if display === 'resume'}
        <TaskSummary />
      {:else}
        <Timer />
        <CategoryFilter {filters} {currentFilter} {setFilter} />
        <TaskList tasks={filteredTasks} />
        <Notification />
      {/if}
    </div>
  </div>
</main>

<style>
  body {
    margin: 0;
    font-family: 'Roboto', sans-serif;
    background-color: #f4f4f9;
    color: #333;
  }

  .main-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    padding: 1rem;
    box-sizing: border-box;
    margin-top: 1rem;
  }

  .button-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .toggle-button {
    cursor: pointer;
    color: #a2a1a1;
    font-size: 1.5rem;
    text-align: center;
    font-weight: bolder;
    margin-bottom: 1rem;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    outline: inherit;
  }

  .toggle-button.selected {
    color: #6200ea;
  }

  .tasks-container {
    display: flex;
    flex-direction: column;
    width: 60%;
    font-family: 'Roboto', sans-serif;
  }
</style>