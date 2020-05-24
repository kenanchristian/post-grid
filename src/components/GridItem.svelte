<script>
  import { createEventDispatcher } from 'svelte'
  import { slide } from 'svelte/transition'

  export let imageUrl
  export let index
  export let highlighted
  export let swapMode

  let fileLoader
  const dispatch = createEventDispatcher()

  function swapImage(event, i) {
    dispatch('swap-image', {
      index: i
    })
  }

  function onDragEnter(event) {
    event.currentTarget.classList.add("file-over")
  }

  function onDragOver(event) {
    event.currentTarget.classList.add("file-over")
  }

  function onDragEnd(event) {
    event.currentTarget.classList.remove("file-over")
  }

  function onFileDrop(event, index) {
    if(event.dataTransfer) {
      event.currentTarget.classList.remove("file-over")
    }
    const file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0]
    if(file){
      const fileReader = new FileReader()
      fileReader.onload= (event) => {
        dispatch('add-image', {
          url: event.target.result,
          index
        })
      }

      fileReader.readAsDataURL(file)
    }
  }

  function openFileLoader(event, index) {
    if(!swapMode) {
      fileLoader.click()
    }
  }
</script>

<div transition:slide|local class="content-item-wrapper">
  <input bind:this={fileLoader} class="content-file-loader" type="file" on:change="{(event) => {onFileDrop(event, index)}}">
{#if imageUrl === null}
  <div class="content-placeholder empty"
    on:dragenter|preventDefault="{(event) => {onDragEnter(event, index)}}"
    on:dragleave|preventDefault="{(event) => {onDragEnd(event, index)}}"
    on:dragover|preventDefault="{(event) => {onDragOver(event, index)}}"
    on:drop|preventDefault="{(event) => {onFileDrop(event, index)}}"
    on:click|preventDefault="{(event) => {openFileLoader(event, index)}}"
  >
    <div class="placeholder-text">
      <h4>add Picture</h4>
    </div>
  </div>
{:else}
  <div class="content-image-wrapper" class:swap-item={highlighted} >
    <img src={imageUrl} class="content-image" alt={index} on:click|preventDefault="{(event) => { swapMode ? swapImage(event, index) : openFileLoader(event, index) }}"/>
    <div class="swap-overlay">
      ✔️
    </div>
  </div>
{/if}
</div>

<style>
  .content-file-loader {
    display: none;
  }

  .content-image {
    display: block;
    width: 100%;
    position: relative;
  }

  .content-image-wrapper .swap-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: none;
    align-items: center;
    justify-content: center;
    background-color: rgba(255,255,255,.6);
    pointer-events: none;
  }

  .content-image-wrapper.swap-item .swap-overlay {
    display: flex
  }

  .content-image-wrapper {
    position: relative
  }

  .content-placeholder {
    display: block;
    padding-top: 100%;
    position: relative;
    background: #dedede;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }

  .content-placeholder .placeholder-text {
    opacity: 1;
  }

  .placeholder-text {
    position: absolute;
    top:  50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
  }

  .placeholder-text h4 {
    font-size: 1.5rem;
    color: #222;
    text-transform: uppercase;
  }
</style>