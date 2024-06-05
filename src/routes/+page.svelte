<script lang="ts">
  import Header from '$lib/components/Header.svelte';
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

<Header title="Task Timer" />

<main>
  <div class="main-container">
    <div class="form-container">
      <TaskForm />
    </div>
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
  .main-container {
    display: flex;
    flex-direction: row;
    gap: 5rem;
    padding: 1rem;
  }

  .button-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    gap: 5rem;
  }

  .toggle-button {
    cursor: pointer;
    color: #a2a1a1;
    margin: 0;
    font-size: 1.5rem;
    font-family: 'Times New Roman', sans-serif;
    align-items: center;
    text-align: center;
    font-weight: bolder;
    margin-bottom: 1rem;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    outline: inherit;
  }.selected {
    color: #6200ea;
  }

  .form-container {
    width: 30%;
  }

  .tasks-container {
    display: flex;
    flex-direction: column;
    width: 60%;
  }
</style>