<script>
  import { slide } from 'svelte/transition'
  let images = []
  let showGap = true
  let swapMode = false
  let swapOrigin = null
  let swapTarget = null


  function addRow(event, direction) {
    if(direction === "top") {
      images = [null, null, null, ...images]
    } else {
      images = [...images, null, null, null]
    }
  }

  function onFileDrop(event, index) {
    if(event.dataTransfer) {
      event.currentTarget.classList.remove("file-over")
    }
    const file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0]
    if(file){
      const fileReader = new FileReader()
      fileReader.onload= (event) => {
        images[index] = event.target.result
      }

      fileReader.readAsDataURL(file)
    }
  }

  function openFileLoader(event, index) {
    if(!swapMode) {
      document.getElementById(`loader-${index}`).click()
    }
  }

  function resetGrid() {
    images = new Array(images.length).fill(null)
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

  function toggleSwapMode(event) {
    swapMode = !swapMode

    if(!swapMode) {
      swapOrigin = null
      swapTarget = null
    }
  }

  function swapImage(event, i) {
    if(swapOrigin === null) {
      swapOrigin = i
    } else if(swapOrigin === i) {
      swapOrigin = null
    } else {
      let tempImage = images[swapOrigin]
      images[swapOrigin] = images[i]
      images[i] = tempImage
      swapMode = false
      swapOrigin = null
      swapTarget = null
    }
  }
</script>

<svelte:window on:dragover|preventDefault="" on:drop|preventDefault=""></svelte:window>

{#if swapMode}
  <div transition:slide|local class="notice-wrapper">
    <div  class="message-wrapper">
      🔄 You are in <strong>Swap Mode!</strong>
      <br/>
      Please select 2 images to swap it.
    </div>
  </div>
{/if}

<div class="app-wrapper">
  <div class="title-wrapper">
    <h2>INSTAGRAM LAYOUT</h2>
    <label>
      <input type="checkbox" bind:checked={showGap}/> Show Post Gap?
    </label>
  </div>
  {#if images.length >= 3}
  <div class="action-wrapper">
    {#if !swapMode}
      <button class="action-button add-button" on:click|preventDefault="{(event) => { addRow(event, 'top') }}">+ Add Row Above</button>
    {/if}
    <button class="action-button swap-button" on:click|preventDefault="{(event) => { toggleSwapMode(event) }}">{swapMode ? 'Cancel Swap' : 'Swap Image'}</button>
  </div>
  {/if}
  <div class="content-grid" class:with-gap="{showGap}">
    {#each images as image, i}
      <div transition:slide|local class="content-item-wrapper">
        <input class="content-file-loader" id="{`loader-${i}`}" type="file" on:change="{(event) => {onFileDrop(event, i)}}">
      {#if image === null}
        <div class="content-placeholder empty"
          on:dragenter|preventDefault="{(event) => {onDragEnter(event, i)}}"
          on:dragleave|preventDefault="{(event) => {onDragEnd(event, i)}}"
          on:dragover|preventDefault="{(event) => {onDragOver(event, i)}}"
          on:drop|preventDefault="{(event) => {onFileDrop(event, i)}}"
          on:click|preventDefault="{(event) => {openFileLoader(event, i)}}"
        >
          <div class="placeholder-text">
            <h4>add Picture</h4>
          </div>
        </div>
      {:else}
        <div class="content-image-wrapper" class:swap-item={swapOrigin === i || swapTarget === i} >
          <img src={image} class="content-image" alt={i} on:click|preventDefault="{(event) => { swapMode ? swapImage(event, i) : openFileLoader(event, i) }}"/>
          <div class="swap-overlay">
            ✔️
          </div>
        </div>
      {/if}
      </div>
    {/each}
  </div>
  <div class="action-wrapper">
    {#if !swapMode}
      <button class="action-button add-button" on:click|preventDefault="{(event) => { addRow(event, 'bottom') }}">+ Add Row Below</button>
    {/if}
  </div>
</div>

<style>
  .app-wrapper {
    height: 100vh;
    width: 100%;
    text-align: center;
    padding: 10px 20px;
  }

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

  .title-wrapper {
    margin-bottom: 20px;
  }

  .content-grid {
    display: grid;
    grid-template-columns: repeat(3,1fr);
    margin: 20px auto;
    max-width: 600px;
  }

  .content-grid.with-gap {
    grid-gap: 10px;
  }

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