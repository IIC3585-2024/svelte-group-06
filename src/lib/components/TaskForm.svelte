<script lang="ts">
  import { tasks, Task } from '../store';

  let taskName = '';
  let category: string = 'Work';

  function addTask() {
    if (taskName.trim()) {
      const newTask: Task = {
        id: Date.now(),
        name: taskName,
        category,
        startTime: null,
        endTime: null,
        isCompleted: false
      };
      tasks.update(tasks => [...tasks, newTask]);
      taskName = '';
    }
  }
</script>

<form on:submit|preventDefault={addTask}>
  <input type="text" bind:value={taskName} placeholder="Task name" required />
  <select bind:value={category}>
    <option value="Work">Work</option>
    <option value="Personal">Personal</option>
    <option value="Other">Other</option>
  </select>
  <button type="submit">Add Task</button>
</form>
