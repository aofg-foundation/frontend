<template lang="pug">
  div.container
    .nk-gap-4
    no-ssr
      viewer(:images="images" :options='viewerOptions')
        //- no-ssr
        //-   lazy-image.preview-img-item(
        //-     :source="image.base"
        //-     :width='200'
        //-     :height='200'
        //-     style='width: 200px'
        //-     @click="$photoswipe.open(index, images)"
        //-   )
        img(v-for='({ base, msrc }, index) in images' :key='base' :data-source='base' :src='msrc')
</template>

<script>
import Vue from 'vue'
import LazyImage from '@/components/LazyImage'
export default {
  components: {
    LazyImage
  },
  data: () => ({
    viewerOptions: {
      url: 'data-source',
      rotatable: false,
      toolbar: {
        zoomIn: 4,
        zoomOut: 4,
        oneToOne: 3,
        reset: 3,
        prev: {
          size: 'large',
          show: 2
        },
        play: 0,
        next: {
          size: 'large',
          show: 2
        },
        rotateLeft: 0,
        rotateRight: 0,
        flipHorizontal: 0,
        flipVertical: 0,
      }
    },
    images: [
      'aqueos_by_wildweasel339-d4p3180.jpg',
      'Environments-05-Ishtar-1.png',
      'Environments-06-Ishtar-2.png'
    ].map(base => ({
      // http://localhost:3000/api/images/uploads/aqueos_by_wildweasel339-d4p3180.jpg?width=1920&height=1080',
      base: `http://localhost:3000/api/images/uploads/${base}`,
      src: `http://localhost:3000/api/images/uploads/${base}?width=1920&height=1080`,
      msrc: `http://localhost:3000/api/images/uploads/${base}?width=192&height=108&quality=30`,
      w: 1920,
      h: 1080
    }))
  })
}
</script>
