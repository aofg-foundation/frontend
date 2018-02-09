<template lang="pug">
  .nk-image(:class='rootStyles')
    //- .nk-image__wrapper(:class='wrapperStyles' :style='pictureStyles')
      lazy-image.nk-image__picture(:source='source' :width='width' :height='height' :class='pictureStyles')
      div.nk-image__overlay(v-if="heading || description" :class='overlayStyles')
        h3.nk-image__title(:class='titleStyles' v-if='heading') {{ heading }}
        p.nk-image__description(:class='descriptionStyles' v-if='description') {{ description }}
    no-ssr
      lazy-image.nk-image__picture(:source='source' :width='width' :height='height' :crop='true')
</template>

<script>
import LazyImage from '@/components/LazyImage'

export default {
  name: 'b-image',
  builderName: 'Image',
  image: '/static/covers/hero2.png',

  props: {
    source: {
      type: String,
      default: 'https://via.placeholder.com/350x350',
      editor: {
        // TODO: replace with a uploader
        type: 'b-text-field'
      }
    },
    heading: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: 1920
    },
    height: {
      type: Number,
      default: 1080
    },
    overlay: {
      default: () => [ 'overlay-gradient' ],
      editor: {
        type: 'b-enum-multiple',
        values: {
          'overlay': 'Overlay',
          'gradient': 'Gradient',
          'fill': 'Fill',
          'overlay-gradient': 'Under',
          'aside': 'Aside',
          'left': 'Left',
          'right': 'Right'
        }
      }
    },
    description: {
      type: String,
      default: '',
      editor: {
        type: 'b-text-area'
      }
    }
  },

  components: {
    LazyImage
  },

  computed: {
    rootStyles () {
      return {}
    },
    wrapperStyles () {
      return {}
    },
    pictureStyles () {
      return {
        width: this.width ? this.width : 'auto',
        height: this.height ? this.height : 'auto'
      }
    },
    overlayStyles () {
      return {}
    },
    titleStyles () {
      return {}
    },
    descriptionStyles () {
      return {}
    }
  }
}
</script>

<style lang="scss">
.nk-image {
  display: flex;
  align-items: center;
  justify-content: center;

  &__wrapper {
    position: relative;
  
    &:hover {
      .nk-image__overlay {
        opacity: 0;
        padding-top: 0;
      }
    }
  }

  &__picture {
    display: block;
    width: 100%;
  }

  &__overlay {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    padding: 20px;
    padding-top: 60px;

    transition: all 0.2s ease;

    background: linear-gradient(
      to bottom, 
      rgba(0,0,0,0) 0%,
      rgba(0,0,0,0.65) 100%);
  }

  &__title {
    &:last-child {
      margin-bottom: 0;
    }
  }

  &__description {
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
