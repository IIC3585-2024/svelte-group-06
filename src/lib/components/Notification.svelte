<script lang="ts">
  import { notifications } from '../store';
  import { onMount } from 'svelte';

  let message: string = '';

  onMount(() => {
    notifications.subscribe(value => {
      message = value;
      if (value) {
        setTimeout(() => notifications.set(''), 5000);
      }
    });
  });
</script>

{#if message}
  <div class="notification">
    {message}
  </div>
{/if}

<style>
  .notification {
    background-color: #28a745;
    color: white;
    padding: 1rem;
    margin-top: 1rem;
    border-radius: 4px;
  }
</style>
