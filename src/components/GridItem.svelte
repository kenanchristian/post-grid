<script>
  import { createEventDispatcher } from 'svelte'
  import { slide } from 'svelte/transition'
  import Icon from 'fa-svelte'
  import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'
  import { faSync } from '@fortawesome/free-solid-svg-icons/faSync'
  import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus'

  export let imageUrl
  export let index
  export let highlighted
  export let selected
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
    const file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0]
    if (file) {
      const fileReader = new FileReader()
      fileReader.onload= (event) => {
        dispatch('add-image', {
          url: event.target.result,
          index,
          type: file.type
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

  function selectImage(event, index) {
    dispatch('select-image', {
      index: index
    })
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
  <div class="content-image-wrapper" class:swap-item={highlighted} class:selected={selected} >
    <img src={imageUrl} class="content-image" alt={index} on:click|preventDefault="{(event) => { swapMode ? swapImage(event, index) : selectImage(event, index) }}"/>
    <div class="overlay">
      <div class="swap-overlay">
        <Icon icon={faCheck}/>
      </div>
      <div class="action-overlay" on:click|preventDefault="{(event) => { selectImage(event, index) }}">
        <div class="action-button" on:click|preventDefault|stopPropagation="{(event) => openFileLoader(event, index)}">
          <Icon class="action-button-icon" icon={faPlus}/>
        </div>
        <div class="action-button" on:click|preventDefault|stopPropagation="{(event) => swapImage(event, index)}">
          <Icon class="action-button-icon" icon={faSync}/>
        </div>
      </div>
    </div>
  </div>
{/if}
</div>

<style lang="scss">
  .content-file-loader {
    display: none;
  }

  .content-image {
    display: block;
    width: 100%;
    position: relative;
  }

  .content-image-wrapper {
    position: relative;

    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      align-items: center;
      justify-content: center;
      display: none;

      .action-overlay, .swap-overlay {
        height: 100%;
        display: none;
        font-size: 2rem;
        align-items: center;
        justify-content: space-evenly;
      }

      .action-overlay {
        background-color:#3577CE8C;

        .action-button {
          :global(.action-button-icon) {
            color: white;
          }
        }
      }

      .swap-overlay {
        background-color: rgba(255,255,255,.6);
      }
    }

    &.selected {
      .overlay {
        display: unset;
        .action-overlay {
          display: flex;
        }

        .swap-overlay {
          display: none
        }
      }
    }


    &.swap-item {
      .overlay {
        display: unset;

        .swap-overlay {
          display: flex
        }

        .action-overlay {
          display: none
        }
      }
    }

  }

  .content-placeholder {
    display: block;
    padding-top: 100%;
    position: relative;
    background: #dedede;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;

    .placeholder-text {
      position: absolute;
      top:  50%;
      left: 50%;
      transform: translate(-50%, -50%);

      h4 {
        font-size: 1.5rem;
        color: #222;
        text-transform: uppercase;
      }
    }
  }

</style>