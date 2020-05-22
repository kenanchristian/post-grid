<script>
  let images = []
  let showGap = true


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
        const imageItem = document.getElementById(`image-${index}`)
        imageItem.style.backgroundImage = `url('${event.target.result}')`
        imageItem.classList.remove('empty')
      }

      fileReader.readAsDataURL(file)
    }
  }

  function openFileLoader(event, index) {
    document.getElementById(`loader-${index}`).click()
  }

  function resetGrid(){
    images.forEach((item, index) => {

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

</script>

<svelte:window on:dragover|preventDefault="" on:drop|preventDefault=""></svelte:window>

<div class="app-wrapper">
  <div class="title-wrapper">
    <h2>INSTAGRAM LAYOUT</h2>
    <label>
      <input type="checkbox" bind:checked={showGap}/> Show Post Gap?
    </label>
  </div>
  {#if images.length >= 3}
  <div class="action-wrapper">
    <button class="add-button" on:click|preventDefault="{(event) => { addRow(event, 'top') }}">+ Add Row</button>
  </div>
  {/if}
  <div class="content-grid" class:with-gap="{showGap}">
    {#each images as image, i}
      <div class="content-item-wrapper">
        <input class="content-file-loader" id="{`loader-${i}`}" type="file" on:change="{(event) => {onFileDrop(event, i)}}">
        <div id="{`image-${i}`}" class="content-item empty"
          on:dragenter|preventDefault="{(event) => {onDragEnter(event, i)}}"
          on:dragleave|preventDefault="{(event) => {onDragEnd(event, i)}}"
          on:dragover|preventDefault="{(event) => {onDragOver(event, i)}}"
          on:drop|preventDefault="{(event) => {onFileDrop(event, i)}}"
          on:click|preventDefault="{(event) => {openFileLoader(event, i)}}"
        >
          <div class="placholder">
            <h4>add Picture</h4>
          </div>
        </div>
      </div>
    {/each}
  </div>
  <div class="action-wrapper">
    <button class="add-button" on:click|preventDefault="{(event) => { addRow(event, 'bottom') }}">+ Add Row</button>
  </div>
</div>

<style>
  .app-wrapper {
    height: 100vh;
    width: 100%;
    text-align: center;
    padding: 10px 20px;
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
    grid-gap: 20px;
  }

  .content-file-loader {
    display: none;
  }

  .content-item{
    display: block;
    padding-top: 100%;
    position: relative;
    background: #dedede;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }

  .content-item.empty .placholder {
    opacity: 1;
  }

  .placholder {
    position: absolute;
    top:  50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
  }

  .placholder h4 {
    font-size: 1.5rem;
    color: #222;
    text-transform: uppercase;
  }

  .content-item:hover, .content-item.file-over{
    background-color: rgb(51.5%, 71.8%, 100%);
    color: white;
  }

  .action-wrapper .add-button {
    background-color: black;
    color: white;
    box-shadow: none;
    border-radius: 5px;
    border: none;
    padding: 15px 20px;
    font-size: 1.5rem;
  }
</style>