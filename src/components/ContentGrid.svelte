<script>
  import Action from './Action.svelte'
  import GridItem from './GridItem.svelte'
  import Header from './Header.svelte'
  import ImageCropper from './ImageCropper.svelte'

  export let showGap

  let images = []
  let swapMode = false
  let swapOrigin = null
  let swapTarget = null
  let image = null


  function addRow(event) {
    const { detail: {direction}} = event
    if(direction === "top") {
      images = [null, null, null, ...images]
    } else {
      images = [...images, null, null, null]
    }
  }

  function resetGrid() {
    images = new Array(images.length).fill(null)
  }

  function toggleSwapMode(event) {
    swapMode = !swapMode

    if(!swapMode) {
      swapOrigin = null
      swapTarget = null
    }
  }

  function swapImage(payload) {
    const { detail: { index } } = payload
    if(swapOrigin === null) {
      swapOrigin = index
    } else if(swapOrigin === index) {
      swapOrigin = null
    } else {
      let tempImage = images[swapOrigin]
      images[swapOrigin] = images[index]
      images[index] = tempImage
      swapMode = false
      swapOrigin = null
      swapTarget = null
    }
  }

  function addImage(event) {
    const { detail: { url, index } }= event
    images[index] = url
    // image = url
  }
</script>

<Header {swapMode} />

{#if image}
  <ImageCropper {image} />
{/if}

{#if images.length >= 3}
  <Action on:add-row={addRow} on:toggle-swap={toggleSwapMode} {swapMode} showSwapToggle={true} rowDirection={'top'}>+ Add Row Above</Action>
{/if}

<div class="content-grid" class:with-gap="{showGap}">
  {#each images as imageUrl, index}
    <GridItem
      {swapMode}
      {imageUrl}
      {index}
      on:add-image={addImage}
      on:swap-image={swapImage}
      highlighted={swapTarget === index || swapOrigin === index}
      ></GridItem>
  {/each}
</div>

<Action on:add-row={addRow} {swapMode} rowDirection={'bottom'}>+ Add Arrow Below</Action>

<style lang="scss">
  .content-grid {
    display: grid;
    grid-template-columns: repeat(3,1fr);
    margin: 20px auto;
    max-width: 600px;

    &.with-gap {
     grid-gap: 3px;
    }
  }
</style>