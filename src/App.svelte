<script>
  import Header from './components/Header.svelte'
  import ContentGrid from './components/ContentGrid.svelte'
</script>

<svelte:window on:dragover|preventDefault="" on:drop|preventDefault=""></svelte:window>
<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@500&display=swap" rel="stylesheet">
</svelte:head>

<div class="title-wrapper">
  <img src="./images/icons/icon-512x512.png" alt="App Icon">
  <h1>Post Grid</h1>
</div>
<div class="app-wrapper">
  <ContentGrid/>
</div>

<style lang="scss">
  .app-wrapper {
    height: 100vh;
    width: 100%;
    max-width: 736px;
    text-align: center;
    padding: 10px 20px;
  }

  .title-wrapper {
    margin-bottom: 20px;
    display: flex;
    justify-content: start;
    align-items: center;
    border-bottom: 1px solid #dedede;
    padding: 10px 20px;
    width: 100%;

    h1 {
      margin: 0 0 0 10px;
      font-size: 1em;
    }

    img {
      width: 24px;
      height: 24px;
    }
  }
</style>