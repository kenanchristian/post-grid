<script>
  import { createEventDispatcher } from 'svelte'
  import Cropper from 'svelte-easy-crop'

  const dispatch = createEventDispatcher();

  export let image = {
    url: null,
    index: null,
    type: null
  }

  let crop = { x: 0, y: 0 };
  let zoom = 1;
  let aspect = 1;

  let cropResult = {
    percent: {
      height: 0,
      width: 0,
      x:0,
      y:0
    },
    pixels: {
      height: 0,
      width: 0,
      x:0,
      y:0
    }
  }


  function dismissCrop(data) {
    dispatch('dismiss-crop')
  }

  function onCropComplete(result) {
    cropResult = result
  }

  function processCrop() {
    const { pixels: { width, height, x, y } } = cropResult
    const canvas = document.createElement("canvas")
    canvas.height = height
    canvas.width = width

    const context = canvas.getContext("2d")
    const imageEl = document.createElement("img")

    imageEl.setAttribute('src', image.url)
    context.drawImage(imageEl, x, y, width, height, 0, 0, width, height)
    const base64Source = canvas.toDataURL(image.type, 1)

    dispatch('complete-crop', {
      croppedImage: base64Source,
      index: image.index
    })
  }
</script>

<div class="cropper-modal-backdrop" on:click|preventDefault="{dismissCrop}">
  <div class="cropper-modal">
    <div class="cropper-wrapper">
        <Cropper
          image={image.url}
          bind:crop
          bind:zoom
          bind:aspect
          on:cropcomplete={(event) => { onCropComplete(event.detail) }}
        />
    </div>
    <div class="cropper-action">
      <button class="action-button cancel" on:click|preventDefault|stopPropagation="{dismissCrop}">Cancel</button>
      <button class="action-button crop" on:click|preventDefault|stopPropagation={processCrop}>Crop Image</button>
    </div>
  </div>
</div>

<style lang="scss">
  .cropper-modal-backdrop {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0,0,0,.4);
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;

    .cropper-modal {
      background: white;
      width: 90%;
      height: auto;

      .cropper-wrapper {
        position: relative;
        width: 100%;
        height: 250px;
        padding: 10px 10px;
      }

      .cropper-action {
        text-align: right;
        border-top: 1px solid #dedede;
        padding: 10px 10px;

        .action-button {
          color: white;
          border: none;
          border-radius: 5px;
          padding: 5px 10px;

          &.cancel {
            background-color: #E83C3CFF;
            color: white;
          }

          &.crop {
            background-color: #3A74E0FF;
            color: white;
          }
        }

      }
    }
  }
</style>