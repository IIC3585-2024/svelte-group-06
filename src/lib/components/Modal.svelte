<script lang="ts">
  export let task;
  import TaskDetail from "./TaskDetail.svelte";
  import { modal } from "$lib/store";

  let isOpen: boolean;
  modal.subscribe(value => {
    isOpen = value;
  });

  function closeModal() {
    return modal.set(false);
  }
</script>

{#if isOpen}
  <div class="modal">
    <div class="modal-content">
      <TaskDetail task={task}/>
    </div>
    <button class="modal-overlay" on:click={closeModal} aria-label="Close modal"></button>
  </div>
{/if}

<style>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
  }

  .modal-content {
    background-color: #fff;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    z-index: 10000;
    width: 30%;
    height: auto;
    border: 2px solid #6200ea;
    border-radius: 10px;
  }

  .modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  }
</style>