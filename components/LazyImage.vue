<template lang="pug">
  span(@click='(evt) => $emit("click", evt)')
    no-ssr
      component(
        :is='lazyComponentType'
        v-bind='lazyProps'  
      )
</template>

<script>
const DOMAIN = 'http://localhost'

function prepare(original, def) {
  return typeof original === 'undefined' ? def : original
}

function imageUrl(path, { quality, width, height, downscale, crop }) {
  width = prepare(width, 100)
  height = prepare(height, 100)
  downscale = prepare(downscale, 1)
  quality = prepare(quality, 80)

  width = Math.round(width / downscale) 
  height = Math.round(height / downscale)

  crop = prepare(crop, false)
  crop = crop ? '' : '/fit-in'
  let size = `/${width}x${height}`

  return `${path}?width=${width}&height=${height}&quality=${quality}`
}

export default {
  name: 'b-lazyimage',
  props: {
    source: {
      type: String,
      required: true
    },
    loading: {
      type: String,
      required: true
    },
    width: {
      type: Number,
      default: 1920
    },
    height: {
      type: Number,
      default: 1080
    },
    background: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    lazyComponentType () {
      return this.background ? 'progressive-background' : 'progressive-img'
    },
 
    lazyProps () {
      return {
        src: this.source,
        placeholder: this.loading,
        'aspect-ratio': this.height / this.width
      }
    }
  },

  methods: {
  }
}
</script>
