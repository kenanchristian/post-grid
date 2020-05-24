<script>
  import Header from './components/Header.svelte'
  import ContentGrid from './components/ContentGrid.svelte'
  let showGap = true
</script>

<svelte:window on:dragover|preventDefault="" on:drop|preventDefault=""></svelte:window>

<Header/>

<div class="app-wrapper">
  <div class="title-wrapper">
    <h2>INSTAGRAM LAYOUT</h2>
    <label>
      <input type="checkbox" bind:checked={showGap}/> Show Post Gap?
    </label>
  </div>
  <ContentGrid {showGap}></ContentGrid>
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
</style>