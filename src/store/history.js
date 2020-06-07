import { writable, get } from 'svelte/store';
import { images } from './images'

function createHistoryStore() {
	const { subscribe, set, update } = writable({ currentIndex: -1, states: [] });

	return {
    subscribe,
    addState: () => {
      update((history) => {
        // Add new state
        const currentImageState = get(images)
        // Check if currentIndex is the latest state, if not cut the array
        if (history.currentIndex !== history.states.length -1) {
          history.states.length = history.currentIndex + 2
          history.states[history.currentIndex+1] = currentImageState
        } else {
          history.states.push(JSON.stringify(currentImageState))
        }

        history.currentIndex += 1
        return history
      })
    },
    undo: () => {
      update((history) => {
        // Implement Undo
        history.currentIndex -= 1
        if (history.currentIndex === -1) {
          images.reset()
        } else {
          images.setState(JSON.parse(history.states[history.currentIndex]))
        }
        return history
      })
    },
    redo: () => {
      update((history) => {
        // Implement Redo
        history.currentIndex += 1
        if (history.currentIndex !== history.states.length) {
          images.setState(JSON.parse(history.states[history.currentIndex]))
        }
        return history
      })
    },
		reset: () => { set([]) }
	};
}

export const history = createHistoryStore();