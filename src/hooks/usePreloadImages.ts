import { onMounted, ref } from "vue"

function preloadImage (src: string) {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = function() {
        resolve(img)
      }
      img.onerror = img.onabort = function() {
        reject(src)
      }
      img.src = src
    })
  }
  
  export default function useImagePreloader(imageList: string[]) {
    const imagesPreloaded = ref<boolean>(false)

    onMounted(()=> {

        const promises = imageList.map(preloadImage)
        Promise.all(promises).then(() => {
            imagesPreloaded.value = true
        })
    })
  
  
    return { imagesPreloaded }
  }