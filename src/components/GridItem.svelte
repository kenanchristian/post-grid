<script>
  import { createEventDispatcher } from 'svelte'
  import { slide } from 'svelte/transition'
  import Icon from 'fa-svelte'
  import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'
  import { faSync } from '@fortawesome/free-solid-svg-icons/faSync'
  import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus'
  import { faDownload } from '@fortawesome/free-solid-svg-icons/faDownload'
  import { faShare } from '@fortawesome/free-solid-svg-icons/faShare'

  export let image
  export let highlighted
  export let selected
  export let swapMode

  let fileLoader
  const dispatch = createEventDispatcher()

  function swapImage(event, i) {
    dispatch('swap-image', {
      id: i
    })
  }

  function downloadImage(event) {
    const linkEl = document.createElement('a')
    linkEl.href = image.modifiedData
    const filename = image.modifiedData.match(/^data:image\/(.*);/)[1]
    linkEl.download = `image.${filename}`
    linkEl.click()
    return true
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

  function onFileDrop(event, id) {
    const file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0]
    if (file) {
      const fileReader = new FileReader()
      fileReader.onload= (event) => {
        dispatch('add-image', {
          id,
          data: event.target.result,
          type: file.type,
          file: file
        })
      }

      fileReader.readAsDataURL(file)
    }
  }

  function openFileLoader(event) {
    if(!swapMode) {
      fileLoader.click()
    }
  }

  function selectImage(event, id) {
    dispatch('select-image', {
      id
    })
  }


  function shareImage(event, id) {
    const filesArr = []
    if(navigator.canShare && navigator.canShare({ files: filesArr })) {
      navigator.share({
        files: filesArr
      })
    }
  }

</script>

<div transition:slide|local class="content-item-wrapper">
  <input bind:this={fileLoader} class="content-file-loader" type="file" on:change="{(event) => {onFileDrop(event, image.id)}}" accept="image/*">
{#if !image.modifiedData}
  <div class="content-placeholder empty"
    on:dragenter|preventDefault="{(event) => {onDragEnter(event, image.id)}}"
    on:dragleave|preventDefault="{(event) => {onDragEnd(event, image.id)}}"
    on:dragover|preventDefault="{(event) => {onDragOver(event, image.id)}}"
    on:drop|preventDefault="{(event) => {onFileDrop(event, image.id)}}"
    on:click|preventDefault="{(event) => {openFileLoader(event, image.id)}}"
  >
    <div class="placeholder-text">
      <h4>add Picture</h4>
    </div>
  </div>
{:else}
  <div class="content-image-wrapper" class:swap-item={highlighted} class:selected={selected} >
    <img src={image.modifiedData} class="content-image" alt={image.id} on:click|preventDefault="{(event) => { swapMode ? swapImage(event, image.id) : selectImage(event, image.id) }}"/>
    <div class="overlay">
      <div class="swap-overlay">
        <Icon icon={faCheck}/>
      </div>
      <div class="action-overlay" on:click|preventDefault="{(event) => { selectImage(event, image.id) }}">
        <div class="action-button" on:click|preventDefault|stopPropagation="{(event) => openFileLoader(event, image.id)}">
          <Icon class="action-button-icon" icon={faPlus}/>
        </div>
        <div class="action-button" on:click|preventDefault|stopPropagation="{(event) => swapImage(event, image.id)}">
          <Icon class="action-button-icon" icon={faSync}/>
        </div>
        <div class="action-button" on:click|preventDefault|stopPropagation="{(event) => downloadImage(event, image.id)}">
          <Icon class="action-button-icon" icon={faDownload}/>
        </div>
        {#if navigator.share}
          <div class="action-button" on:click|preventDefault|stopPropagation="{(event) => shareImage(event, image.id)}">
            <Icon class="action-button-icon" icon={faShare}/>
          </div>
        {/if}
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
            font-size: 1.2rem;
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
        color: #222;
        text-transform: uppercase;
      }
    }
  }

</style>