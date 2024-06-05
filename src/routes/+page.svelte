<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import TaskForm from '$lib/components/TaskForm.svelte';
  import TaskList from '$lib/components/TaskList.svelte';
  import CategoryFilter from '$lib/components/CategoryFilter.svelte';
  import Notification from '$lib/components/Notification.svelte';
  import TaskSummary from '$lib/components/TaskSummary.svelte';
  import { tasks } from '$lib/store';
  import type { Task } from '$lib/store';

  let currentFilter: string = 'All';
  const filters: string[] = ['All', 'Work', 'Personal', 'Other'];

  function setFilter(filter: string) {
    currentFilter = filter;
  }

  let filteredTasks: Task[] = [];
  $: filteredTasks = $tasks.filter((task: Task) => currentFilter === 'All' || task.category === currentFilter);
</script>

<Header title="Task Timer" />

<main>
  <TaskForm />
  <CategoryFilter {filters} {currentFilter} {setFilter} />
  <TaskList tasks={filteredTasks} />
  <Notification />
  <TaskSummary />
</main>