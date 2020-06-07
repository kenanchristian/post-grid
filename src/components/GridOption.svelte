<script>
  import { createEventDispatcher } from 'svelte'
  import Icon from 'fa-svelte'
  import { faRedo } from '@fortawesome/free-solid-svg-icons/faRedo'
  import { faUndo } from '@fortawesome/free-solid-svg-icons/faUndo'
  import { faBorderAll } from '@fortawesome/free-solid-svg-icons/faBorderAll'

  import { history } from '../store/history'

  export let showGap
  const dispatch = createEventDispatcher();

  function toggleShowGap() {
    dispatch('toggle-show-gap', {
      showGap: !showGap
    })
  }
</script>

<div class="grid-option-wrapper">
  <button class="grid-option-button" disabled={ $history.currentIndex < 0 } on:click="{ history.undo }"><Icon icon={faUndo}></Icon></button>
  <button class="grid-option-button" disabled={ $history.currentIndex === $history.states.length-1 } on:click="{ history.redo }"><Icon icon={faRedo}></Icon></button>
  <button class="grid-option-button" class:active={showGap} on:click="{ toggleShowGap }"><Icon icon={faBorderAll}></Icon></button>
</div>

<style lang="scss">
  .grid-option-wrapper {
    width: 60%;
    margin: 0px auto 10px auto;
    padding: 10px 0 5px 0;
    border-radius: 5px;
    -webkit-box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.1);
    box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    .grid-option-button {
      border: none;
      background: transparent;
      font-size: 1.3rem;

      &.active {
        color: #3577CEFF;
      }
    }
  }
</style>