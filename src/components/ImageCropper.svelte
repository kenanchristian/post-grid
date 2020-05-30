<script>
  import { createEventDispatcher } from 'svelte'
  import Cropper from 'svelte-easy-crop'

  const dispatch = createEventDispatcher();

  export let image

  let crop = { x: 0, y: 0 };
  let zoom = 1;
  let aspect = 1;

  let cropResult = {
    height: 0,
    width: 0,
    x:0,
    y:0
  }

  function onCropComplete(cropCoordinate) {
    console.log(cropCoordinate)
  }

  function processCrop() {
    // draw canvas
    // return cropped image from crop result
    // dispatch('crop-complete',{
    //   url: ''
    // })
  }
</script>

<div class="cropper-modal-backdrop">
  <div class="cropper-modal">
    <div class="cropper-wrapper">
        <Cropper
          image={image}
          bind:crop
          bind:zoom
          bind:aspect
          on:cropcomplete={(event) => { onCropComplete(event.detail) }}
        />
    </div>
    <div class="cropper-action">
      <button class="crop-button" on:click={processCrop}>Crop Image</button>
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

        .crop-button {
          background-color: #3A74E0FF;
          color: white;
          border: none;
          border-radius: 5px;
          padding: 5px 10px;
        }
      }
    }
  }
</style>