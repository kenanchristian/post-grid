<script>
  import Icon from 'fa-svelte'
  import { faInstagram } from '@fortawesome/free-brands-svg-icons/faInstagram'

</script>

<div class="content-wrapper">
  <p class="instructions">
    You can see your recent instagram post by connecting your Instagram account.
  </p>
  <button class="connect-button">
    <Icon class="icon" icon={faInstagram}></Icon>
    Connect to Instagram
  </button>
</div>

<style lang="scss">
  .content-wrapper {
    margin: 20px 40px 0px 40px;
    border-top: 1px solid #dedede;
    padding: 10px;

    .instructions {
      text-align: center;
      color: #333;
      padding: 0 5px;
    }

    .connect-button {
      color: black;
      background-color: white;
      border: 1px solid black;
      border-radius: 5px;
      padding: 5px 10px;
      transition: all .2 ease;

      &:hover {
        color: white;
        background-color: black;
      }
    }
  }
</style>