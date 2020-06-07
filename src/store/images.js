import { writable } from 'svelte/store';
import nanoid from 'nanoid-esm';
import { history } from './history'


function createImages() {
	const { subscribe, set, update } = writable([...generateNewRow()]);

	return {
    subscribe,
    addRow: (event) => {
      const { detail: { direction } } = event
      if(direction === 'top') {
        update(n => [...generateNewRow(), ...n])
      }else{
        update(n => [...n, ...generateNewRow()])
      }

      history.addState()
    },
    swapImage: (originId, targetId) => {
      update(images => {
        const originIndex = images.findIndex(image => image.id === originId)
        const targetIndex = images.findIndex(image => image.id === targetId)
        const temp = images[targetIndex];
        images[targetIndex] = images[originIndex];
        images[originIndex] = temp;

        return images
      })
      history.addState()
    },
    storeImage: (imageData) => {
      update(images => {
        const targetImageIdx = images.findIndex(image => image.id === imageData.id)
        images[targetImageIdx] = {
          ...imageData
        }

        return images
      })
      history.addState()
    },
		reset: () => {
      set([...generateNewRow()])
      history.addState()
    },
    setState: (newState) => {
      set(newState)
    }
	};
}

function generateNewRow() {
  return Array.from({ length: 3 }, () => new Object({
    id: nanoid(),
    type: null,
    data: null,
    modifiedData: null,
    file: null
  }))
}

export const images = createImages();