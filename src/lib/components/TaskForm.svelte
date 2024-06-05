<script lang="ts">
  import { tasks } from '$lib/store';
  import { goto } from '$app/navigation';

  let taskName = '';
  let category = 'Trabajo';
  let estimatedTime = 1;
  let description = '';
  let timeUnit = 'minutos';

  function convertToMinutes() {
    switch (timeUnit) {
      case 'horas':
        return estimatedTime * 60;
      case 'dias':
        return estimatedTime * 60 * 24;
      default:
        return estimatedTime;
    }
  }

  function addTask() {
    if (taskName && category && estimatedTime) {
      const newTask = {
        id: Math.floor(Math.random() * 10000),
        name: taskName,
        category: category,
        estimatedTime: estimatedTime,
        timeUnit: timeUnit,
        description: description || null,
        startTime: null,
        endTime: null,
        isCompleted: false
      };
      tasks.update(tasks => [...tasks, newTask]);
      taskName = '';
      category = 'Trabajo';
      estimatedTime = 1;
      description = '';
      goto('/')
    }
  }
</script>

<form on:submit|preventDefault={addTask}>
  <h2 class="titulo-form">Nueva tarea</h2>
  <label>
    Nombre de la tarea:
    <input type="text" bind:value={taskName} placeholder="Completar..." required />
  </label>
  <div class="mid-info">
    <label>
      Categoria:
      <select bind:value={category}>
        <option value="Trabajo">Trabajo</option>
        <option value="Personal">Habitos</option>
        <option value="Deportes">Deportes</option>
        <option value="Ocio">Ocio</option>
        <option value="Estudios">Estudios</option>
        <option value="Otro">Otro</option>
      </select>
    </label>
    <label>
      Tiempo estimado:
      <div class="time-select">
        <input class="number-input" type="number" bind:value={estimatedTime} min="1" required />
        <select bind:value={timeUnit}>
          <option value="minutos">Minutos</option>
          <option value="horas">Horas</option>
          <option value="dias">Dias</option>
        </select>
    </label>
  </div>
  <label>
    Descripción:
    <textarea bind:value={description} placeholder="Completar..."></textarea>
  </label>
  <button class="button-input" type="submit">Añadir tarea</button>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }

  .number-input {
    width: 60%;
  }

  .titulo-form {
    color: #6200ea;
    margin: 0;
    align-items: center;
    text-align: center;
  }

  .button-input {
    background-color: #6200ea;
    border: none;
    color: white;
    padding: 8px 16px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    cursor: pointer;
    border: 1px solid;
    border-radius: 5px;
  }

  .mid-info {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }

  .time-select {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  input,
  select,
  textarea {
    padding: 0.5rem;
    border-radius: 4px;
    border: 0.5px solid #35017d;
  }

  button {
    background-color: #6200ea;
    border: none;
    color: white;
    padding: 8px 16px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    cursor: pointer;
  }
</style>
