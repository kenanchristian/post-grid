<script>
  import { slide } from 'svelte/transition'
  export let swapMode
</script>

{#if swapMode}
  <div transition:slide|local class="notice-wrapper">
    <div  class="message-wrapper">
      🔄 You are in <strong>Swap Mode!</strong>
      <br/>
      Please select 2 images to swap it.
    </div>
  </div>
{/if}

<style>
  .notice-wrapper {
    width: 100%;
    background-color: #F89727FF;
    color: white;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }

  .notice-wrapper .message-wrapper {
    padding: 5px 0;
    text-align: center;
  }
</style>