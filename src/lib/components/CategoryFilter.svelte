<script lang="ts">
  export let filters: string[] = [];
  export let currentFilter: string;
  export let setFilter: (filter: string) => void;
</script>

<div class="filter-container">
  <label for="category-filter">Filtrar por categoria: </label>
  {#each filters as filter}
    <button
      on:click={() => setFilter(filter)}
      class:selected={filter === currentFilter}
    >{filter}</button>
  {/each}
</div>

<style>
  .filter-container {
    display: flex;
    flex-direction: row;
    margin-top: 1rem;
    margin-bottom: 1rem;
    align-self: center;
    align-items: center;
  }

  button {
    margin: 4px 8px;
    padding: 8px 16px;
    border: none;
    background-color: #ccc;
    cursor: pointer;
    border-radius: 10px;
  }
  .selected {
    background-color: #6200ea;
    color: white;
  }
</style>