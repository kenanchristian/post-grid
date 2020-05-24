<script>
  import { createEventDispatcher } from 'svelte'
  export let swapMode
  export let rowDirection
  export let showSwapToggle = false
  const dispatch = createEventDispatcher()

  function addRow(event, direction) {
    dispatch('add-row', {
      direction
    })
  }

  function toggleSwapMode(event) {
    dispatch('toggle-swap')
  }
</script>

<div class="action-wrapper">
  {#if !swapMode}
    <button class="action-button add-button" on:click|preventDefault="{(event) => { addRow(event, rowDirection) }}"><slot></slot></button>
  {/if}
  {#if showSwapToggle}
    <button class="action-button swap-button" on:click|preventDefault="{(event) => { toggleSwapMode(event) }}">{swapMode ? 'Cancel Swap' : 'Swap Image'}</button>
  {/if}
</div>

<style>
  .action-wrapper .action-button {
    background-color: black;
    color: white;
    box-shadow: none;
    border-radius: 5px;
    border: none;
    padding: 10px 20px;
    font-size: 1.5rem;
  }

  .action-button.add-button {
    background-color: black;
    color: white;
  }

  .action-button.swap-button {
    background-color: #F89727FF;
    color: white;
  }
</style>