<template lang="pug">
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

  return `${DOMAIN}/unsafe${crop}${size}/filters:quality(${quality})/${path}`
}

export default {
  name: 'b-lazyimage',
  props: {
    source: {
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
    heavy: {
      type: Boolean,
      default: true
    },
    background: {
      type: Boolean,
      default: false
    },
    crop: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    lazyComponentType () {
      return this.background ? 'progressive-background' : 'progressive-img'
    },

    lazyProps () {
      return {
        // TODO: thumbor url builder
        src: imageUrl(this.source, {
          width: this.width,
          height: this.height,
          crop: this.crop,
          quality: 85,
          downscale: 1
        }),
        placeholder: imageUrl(this.source, { 
          width: this.width,
          height: this.height,
          crop: this.crop,
          quality: 10,
          downscale: 10
        }),
        'aspect-ratio': this.height / this.width
      }
    }
  },

  methods: {
  }
}
</script>
