<template lang="pug">
  div.nk-three-image
    .nk-tree-image__row.row
      b-image.nk-three-image__image.col(v-for='(image, index) in images' v-bind='image' :key='index')
</template>

<script>
import Image from './Image'

export default {
  name: 'b-three-image',
  builderName: 'Three Images',
  props: {
    source0: {
      type: String,
      default: 'https://via.placeholder.com/350x350'
    },
    source1: {
      type: String,
      default: 'https://via.placeholder.com/350x350'
    },
    source2: {
      type: String,
      default: 'https://via.placeholder.com/350x350'
    },
  },

  components: {
    'b-image': Image
  },

  computed: {
    images () {
      return Array(3).fill(0).map((_, index)  => [
        {
          source: this[`source${index}`]
        }
      ])
    }
  }
}
</script>
