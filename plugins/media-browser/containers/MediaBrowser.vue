<template lang="pug">
  div.b-media-browser
    div.b-media-browser-header
      span.b-media-browser-header__title Media Browser
      span.b-media-browser-header__container.b-media-browser-header__container--name(v-if='!selectedContainer') ../
      a.b-media-browser-header__link(href='#' @click='selectedContainer = null' v-if='selectedContainer') ../
      span.b-media-browser-header__container.b-media-browser-header__container--name(v-if='selectedContainer') {{ selectedContainer }}
      div.b-media-browser-header__close(@click='$emit("close")')
        i.fa.fa-times
    div.b-media-browser__layout
      transition(name="media-browser-transition")
        div.b-media-browser__list(v-if='!selectedContainer')
          a(v-for='container in containers' @click='selectedContainer = container.name')
            div.b-media-browser__item
              div.b-media-item__card(style='width: 200px; height: 200px')
                i.b-media-item__image.b-media-item__image--icon.fa.fa-folder
                div.b-media-item__info(style='padding: 14px;')
                  span.b-media-item__name {{ container.name }}
        div.b-media-browser__list(v-else='selectedContainer')
          no-ssr
            media-upload(
              :action="uploadUrl"
              @success='uploadedImage'
            )
          media-item.b-media-browser__item(
            v-for='image in images'
            :key='image.name'
            v-bind='image' 
            :image='image'
            :url='makeUrl(image)' 
            :size='size'
            @edit='onImageEdit'
            @select='onImageSelect'
          )
      div.b-media-browser__cropper(v-if='editingImage')
        div.b-media-browser-cropper__close(@click='editingImage = null')
          i.fa.fa-times
        media-cropper(v-if='editingImage' :image='editingImage' :url='originalUrl(editingImage)' style='flex-grow: 1')
</template>

<script>
import copy from 'copy-to-clipboard'
import MediaItem from '../components/MediaItem'
import MediaCropper from '../components/MediaCropper'
import MediaUpload from '../components/MediaUpload'

// Vue.use(VueClip)
// import Vue from 'vue'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// Vue.use(ElementUI)

export default {
  name: 'b-media-browser',

  components: {
    MediaItem,
    MediaCropper,
    MediaUpload
  },

  data: () => ({
    images: [],
    containers: [],
    selectedContainer: null,
    editingImage: null,
    cropImage: null,
    size: 200
  }),

  computed: {
    uploadUrl () {
      return `http://localhost:3000/api/containers/${this.selectedContainer}/upload`
    }
  },

  async mounted () {
    this.loadContainers()
    // this.loadImages()
  },

  watch: {
    'selectedContainer': 'loadImages'
  },

  methods: {
    async loadImages () {
      this.images = []
      console.log('load images')
      this.images = await this.$backend.find(`containers/${this.selectedContainer}/files`)
      // this.images = await this.$backend.find('Images', {
      //   where: {
      //     container: this.selectedContainer,
      //   },
      //   order: 'modifiedAt DESC'
      // })

      console.log(this.images)
    },
    async loadContainers () {
      this.containers = await this.$backend.find('containers')
    },
    zoomIn () {
      this.size = Math.min(300, this.size + 50)
    },
    zoomOut () {
      this.size = Math.max(50, this.size - 50)
    },
    makeUrl (image) {
      return `http://localhost:3000/api/images/thumb/${image.container}/${image.name}`
    },
    originalUrl (image) {
      return `http://localhost:3000/api/containers/${image.container}/download/${image.name}`
    },
    uploadedImage (file) {
      console.log(file, arguments)
      this.loadImages()
      // this.uploadingImage = {
      //   ...file
      // }
    },
    onImageEdit (image) {
      this.editingImage = image
    },
    onImageSelect (image) {
      copy(this.originalUrl(image))
      console.log('select', this.originalUrl(image))
    }
  }
}
</script>

<style lang="scss">

$z-wrap: 99999;
$z-preview: 1;
$z-crop: 6;
$z-labels: 7;
$z-tools: 4;

.b-media-browser {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: $z-wrap;
  background-color: #57606f;

  &-header {
    height: 70px;
    color: white;
    padding: 20px;
    display: flex;
    align-items: center;

    > * {
      margin-right: 20px;
    }

    &__title {
      text-transform: uppercase;
      font-weight: bold;
      font-size: 18px;
    }

    &__container {
      &--name {
        font-weight: bold;
      }
    }

    &__close {
      margin-left: auto;
      cursor: pointer;
      width: 40px;
      height: 40px;
      font-size: 21px;
      
      background-color: #ff4757;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;

      border-radius: 999px;

      transition: background-color 0.2s ease;

      &:hover {
        background-color: darken(#ff4757, 10%);
      }
    }
  }

  &__layout {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    bottom: 0;
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    margin: 0;
    padding: 0;
  }

  &__cropper {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    width: 60%;
  }

  &-upload,
  &__item {
    padding: 10px;
  }

  &-cropper__close {
    position: absolute;

    left: -60px;
    top: 20px;
    z-index: $z-wrap;

    width: 40px;
    height: 40px;
    font-size: 21px;
    
    background-color: #ff4757;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 999px;

    transition: background-color 0.2s ease;

    &:hover {
      background-color: darken(#ff4757, 10%);
    }
  }
}


.b-media-cropper {
  position: relative;
  background-color: #2f3542;
  overflow: hidden;

  &__preview {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate3d(-50%, -50%, 0);
  }

  &-preview {
    overflow: hidden;
    &__image {
      width: 100%;
      height: 100%;
      display: block;
      user-select: none;
    }

    &__label {
      position: absolute;
      display: block;
      background-color: #2f3542;
      font-size: 12px;
      text-transform: uppercase;
      font-weight: bold;
      color: white;
      z-index: $z-labels;
      padding: 5px 10px;

      &--image-size {
        top: 0;
        left: 0;
      }
    }
  }

  &__toolbox {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 20px;
    display: flex;

    z-index: $z-tools;
  }

  &-form { 
    // display: flex;
    // flex-wrap: wrap;
    // align-items: flex-start;
    // > * { flex: 0 1; }

    margin-right: 20px;

    &__section {
      white-space: nowrap;
      flex-basis: 100%;
      margin-bottom: 10px;
      display: block;
    }

    &__field {
      display: flex;
      align-items: center;
      position: relative;
      
      &-label {
        width: 65px;
        font-size: 12px;
        text-transform: uppercase;
        font-weight: bold;
        opacity: 0.65;

        margin-right: 10px;
        white-space: nowrap;
      }

      &-input {
        width: 120px;
      }
    }
  }

  &-rect {
    user-select: none;
    $dot-size: 6px;
    $rect-color: red;
    outline: 2000px solid rgba(0,0,0,0.65);
    border: 1px solid $rect-color;
    position: absolute;
    z-index: $z-crop;
    top: 0; left: 0;

    &__dot {

      display: block;
      position: absolute;
      width: $dot-size;
      height: $dot-size;
      background-color: $rect-color;
      border-radius: 99px;
      margin-top: -($dot-size / 2);
      margin-left: -($dot-size / 2);

      &--keep {
        width: $dot-size * 2;
        height: $dot-size * 2;
        margin-top: -$dot-size;
        margin-left: -$dot-size;
        background-color: lighten($rect-color, 25%);
      }

      &:nth-child(1),
      {
        top: 0;
      }

      &:nth-child(2),
      &:nth-child(3)
      {
        top: 50%;
      }

      &:nth-child(4),
      &:nth-child(5),
      {
        top: 100%;
      }

      
      &:nth-child(2)
      {
        left: 0;
      }

      &:nth-child(1),
      &:nth-child(4)
      {
        left: 50%;
      }

      &:nth-child(3),
      &:nth-child(5)
      {
        left: 100%;
      }
    }
  }
}

@keyframes upload-dragging-icon {
  0% { margin-top: -30px; opacity: 1; }
  90% { margin-top: 20px; opacity: 0; }
  100% { margin-top: -30px; opacity: 1; }
}

.b-media-upload {
  padding: 10px;
  &__card {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 200px;

    text-align: center;
    color: #2f3542;

    border: 1px dashed #2f3542;
    border-radius: 15px;

    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background-color: white; 
      border-color: transparent;
    }
  }

  &__preview {
    position: absolute;
    left: 0; top: 0; right: 0; bottom: 0;
    display: block;
    border-radius: 15px;
    overflow: hidden;

    > img {
      display: block;
      width: 100%;
      max-width: 100%;
    }
  }

  &__info {
    position: absolute;
    bottom: 14px;
    right: 14px;
    left: 14px;

    transition: opacity 0.2s ease;

    &--dragging { 
      opacity: 0;
    }
  }

  &__progress {
    position: relative;
    z-index: 1;
    display: block;
    height: 8px;
    border-radius: 10px;
    background-color: #5cacec;

    &--error {
      background-color: #ff4757;
    }

    &--success {
      background-color: #2ed573;
    }

    &--fill {
      position: absolute;
      width: 100%;
      z-index: 0;

      background-color: #2f3542;
    }
  }

  &__icon {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate3d(-50%, -50%, 0);
    font-size: 35px;
    transition: opacity 0.2s ease;
    
    &--dragging { 
      margin-top: -30px;
      opacity: 0;
      
      &:nth-child(2) { animation-delay: 0.2s }
      &:nth-child(3) { animation-delay: 0.4s }
    }
  }

  &--dragging {
    .b-media-upload__info--dragging,
    .b-media-upload__icon--dragging { opacity: 1; }
    .b-media-upload__info--normal,
    .b-media-upload__icon--normal { opacity: 0 }

    .b-media-upload__icon--dragging {
      animation-name: upload-dragging-icon;
      animation-duration: 1s;
      animation-iteration-count: infinite;
    }

    .b-media-upload__card {
      background-color: white; 
      border-color: transparent;
    }
  }
}

.b-media-item {
  &__controls {
    position: absolute;
    z-index: $z-labels;
    top: 10px;
    right: 10px;
    display: flex;
  }

  &-control {
    width: 35px;
    height: 35px;
    font-size: 16px;

    margin-left: 10px;
    
    background-color: #5cacec;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 999px;
    transition: background-color 0.2s ease;

    opacity: 0;

    &:hover {
      background-color: darken(#5cacec, 10%);
    }
  }

  &__card {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border: 0;
    box-shadow: 0 0 0 0 transparent;
    transition: box-shadow 0.3s ease;
    padding: 0;

    &--selected,

    &:hover {
      box-shadow: 0 0 0 3px #409EFF;

      .b-media-item-control { opacity: 1; }
    }
  }
  &__link {
    display: block;
    border-radius: 15px;
    border: 3px solid blue;
    overflow: hidden;
  }

  &__image {
    // display: block;
    // width: 200px;
    // height: 200px;

    &--icon {
      font-size: 32px;
    }
  }

  &__info {
    position: absolute;
    bottom: 0;
    width: 100%;
    left: 0;
    text-align: center;
  }

  &__name {
    white-space: nowrap;
    max-width: 100%;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}


.media-browser-transition {
  // &-enter
  // &-leave-to
  // &-leave
  // &-enter-to
  // &-enter-active
  // &-leave-active
  &-enter,
  &-leave-to { opacity: 0 }

  &-leave,
  &-enter-to { opacity: 1 }

  &-enter-active,
  &-leave-active { transition: opacity 0.2s ease }
}
</style>
