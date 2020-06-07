<script>
  import Action from './Action.svelte'
  import GridItem from './GridItem.svelte'
  import Header from './Header.svelte'
  import ImageCropper from './ImageCropper.svelte'
  import InstagramConnect from './InstagramConnect.svelte'
  import { imagesStore } from '../store/images'

  let showGap = true

  let swapMode = false
  let swapOrigin = null
  let selectedImageId = null
  let image = null

  $: {
    if(swapOrigin !== null){
      swapMode = true
    }else{
      swapMode = false
    }
  }

  function clearSwap(payload) {
    swapOrigin = null
  }

  function swapImage(payload) {
    const { detail: { id } } = payload
    selectedImageId = null

    if(swapOrigin === null) {
      swapOrigin = id
    } else if(swapOrigin === id) {
      swapOrigin = null
    } else {
      imagesStore.swapImage(swapOrigin, id)
      clearSwap()
    }
  }

  function selectImage(payload) {
     const { detail : { id }} = payload
     if (selectedImageId === id) {
       selectedImageId = null
     }else{
       selectedImageId = id
     }
  }

  function addImage(event) {
    const { detail }= event
    image = detail
  }

  function dismissCrop(event) {
    image = null
  }

  function completeCrop(event) {
    const { detail: { image } } = event
    imagesStore.storeImage({
      ...image
    })
    dismissCrop()
  }

</script>

<Header {swapMode} />

<div class="grid-option-wrapper">
  <label>
    <input type="checkbox" bind:checked={showGap}/> Show Post Gap?
  </label>
</div>

{#if image}
  <ImageCropper {image} on:dismiss-crop={dismissCrop} on:complete-crop={completeCrop} />
{/if}

<Action on:add-row={imagesStore.addRow} {swapMode} showSwapToggle={true} on:cancel-swap={(event) => clearSwap(event) } rowDirection={'top'}></Action>

<div class="content-grid" class:with-gap="{showGap}">
  {#each $imagesStore as image (image.id)}
    <GridItem
      {image}
      {swapMode}
      on:add-image={addImage}
      on:swap-image={swapImage}
      on:select-image={selectImage}
      highlighted={swapOrigin === image.id}
      selected={selectedImageId === image.id}
      ></GridItem>
  {/each}
</div>

{#if $imagesStore.length >= 3}
  <Action on:add-row={imagesStore.addRow} {swapMode} rowDirection={'bottom'}></Action>
{/if}

<!-- <InstagramConnect /> -->

<style lang="scss">
  .grid-option-wrapper {
    margin-bottom: 10px;
  }
  .content-grid {
    display: grid;
    grid-template-columns: repeat(3,1fr);
    margin: 20px auto 20px auto;
    max-width: 600px;

    &.with-gap {
     grid-gap: 3px;
    }
  }
</style>