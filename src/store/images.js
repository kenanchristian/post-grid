import { writable } from 'svelte/store';
import nanoid from 'nanoid-esm';


function createImagesStore() {
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
    },
    storeImage: (imageData) => {
      update(images => {
        const targetImageIdx = images.findIndex(image => image.id === imageData.id)
        images[targetImageIdx] = {
          ...imageData
        }

        return images
      })
    },
		reset: () => { set([...generateNewRow()])}
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

export const imagesStore = createImagesStore();