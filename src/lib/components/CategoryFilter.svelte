<script lang="ts">
  export let filters: string[] = [];
  export let currentFilter: string;
  export let setFilter: (filter: string) => void;
</script>

<div>
  <label for="category-filter">Filter by category: </label>
  {#each filters as filter}
    <button
      on:click={() => setFilter(filter)}
      class:selected={filter === currentFilter}
    >{filter}</button>
  {/each}
</div>

<style>
  button {
    margin: 0.5rem;
    padding: 0.5rem 1rem;
    border: none;
    background-color: #ccc;
    cursor: pointer;
  }
  .selected {
    background-color: #6200ea;
    color: white;
  }
</style>