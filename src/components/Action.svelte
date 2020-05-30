<script>
  import { createEventDispatcher } from 'svelte'
  import Icon from 'fa-svelte'
  import { faPlusCircle } from '@fortawesome/free-solid-svg-icons/faPlusCircle'


  export let swapMode
  export let rowDirection
  export let showSwapToggle = false


  const dispatch = createEventDispatcher()

  function addRow(event, direction) {
    dispatch('add-row', {
      direction
    })
  }

  function cancelSwap(event) {
    dispatch('cancel-swap')
  }
</script>

<div class="action-wrapper">
  {#if !swapMode}
    <button class="action-button clear-button" on:click|preventDefault="{(event) => { addRow(event, rowDirection) }}">
      <Icon class="button-icon" icon={faPlusCircle}/>
    </button>
  {/if}
  {#if showSwapToggle && swapMode}
    <button class="action-button swap-button" on:click|preventDefault="{(event) => { cancelSwap(event) }}">Cancel Swap</button>
  {/if}
</div>

<style lang="scss">
  .action-wrapper {
    .action-button {
      box-shadow: none;
      border-radius: 5px;
      border: none;
      padding: 10px 20px;
      font-size: 1.5rem;

      &.swap-button {
        background-color: #F89727FF;
        color: white;
      }

      &.clear-button {
        background-color: transparent;

        :global(.button-icon) {
          color:#666;
          font-size: 3rem;
        }
      }
    }
  }
</style>