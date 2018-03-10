<template lang="pug">
  div.b-media-cropper
    //- img.b-media-cropper__image(:src='url')
    //- pre {{ image }}
    //- vue-cropper(
    //-   ref='cropper'
    //-   :img='url'
    //-   v-bind='options')

    div.b-media-cropper__preview(ref='container')
      img#cropper-image.b-media-cropper-preview__image(
        ref='image' 
        :src='url'
        :style='previewImageStyle')

      div#cropper-rect.b-media-cropper-rect(ref='rect' :style='cropStyle')
        span.b-media-cropper-rect__info.b-media-cropper-rect__info--size {{ cropSizeInfo }}
        span.b-media-cropper-rect__dot
        span.b-media-cropper-rect__dot
        span.b-media-cropper-rect__dot
        span.b-media-cropper-rect__dot
        span.b-media-cropper-rect__dot
        span.b-media-cropper-rect__dot
        span.b-media-cropper-rect__dot
        span.b-media-cropper-rect__dot
    
    div.b-media-cropper__form
      div.b-media-cropper-form.nk-form
        span.b-media-cropper-form__section Crop Size
        div.b-media-cropper-form__field.b-text-field.b-media-cropper-form__field--text-field
          span.b-media-cropper-form__field-label.b-media-cropper-form__field-label--text-field Width %
          input.b-media-cropper-form__field-input.b-media-cropper-form__field-input--text-field.form-control(type='text' :value="cropWPercentage" @change="cropWFromPercentage")
        div.b-media-cropper-form__field.b-text-field.b-media-cropper-form__field--text-field
          span.b-media-cropper-form__field-label.b-media-cropper-form__field-label--text-field Height %
          input.b-media-cropper-form__field-input.b-media-cropper-form__field-input--text-field.form-control(type='text' :value="cropHPercentage" @change="cropHFromPercentage")
        div.b-media-cropper-form__field.b-text-field.b-media-cropper-form__field--text-field
          span.b-media-cropper-form__field-label.b-media-cropper-form__field-label--text-field Width px
          input.b-media-cropper-form__field-input.b-media-cropper-form__field-input--text-field.form-control(type='text' :value="cropWPixels" @change="cropWFromPixels")
        div.b-media-cropper-form__field.b-text-field.b-media-cropper-form__field--text-field
          span.b-media-cropper-form__field-label.b-media-cropper-form__field-label--text-field Height px
          input.b-media-cropper-form__field-input.b-media-cropper-form__field-input--text-field.form-control(type='text' :value="cropHPixels" @change="cropHFromPixels")
      
      div.b-media-cropper-form.nk-form
        span.b-media-cropper-form__section Output Size ({{ outputScale.toFixed(2) }} scale)
        div.b-media-cropper-form__field.b-text-field.b-media-cropper-form__field--text-field
          span.b-media-cropper-form__field-label.b-media-cropper-form__field-label--text-field Scale
          input.b-media-cropper-form__field-input.b-media-cropper-form__field-input--text-field.form-control(type='text' v-model.number="outputScale")
        div.b-media-cropper-form__field.b-text-field.b-media-cropper-form__field--text-field
          span.b-media-cropper-form__field-label.b-media-cropper-form__field-label--text-field Width px
          input.b-media-cropper-form__field-input.b-media-cropper-form__field-input--text-field.form-control(type='text' :value="outputW" @change="cropFromOutputW")
        div.b-media-cropper-form__field.b-text-field.b-media-cropper-form__field--text-field
          span.b-media-cropper-form__field-label.b-media-cropper-form__field-label--text-field Height px
          input.b-media-cropper-form__field-input.b-media-cropper-form__field-input--text-field.form-control(type='text' :value="outputH" @change="cropFromOutputH")
          
      div.b-media-cropper-form.nk-form
        span.b-media-cropper-form__section Output Size
        div.b-media-cropper-form__field.b-text-field.b-media-cropper-form__field--text-field
          span.b-media-cropper-form__field-label.b-media-cropper-form__field-label--text-field Width px
          input.b-media-cropper-form__field-input.b-media-cropper-form__field-input--text-field.form-control(type='text' :value="cropWPercentage" @change="cropWFromPercentage")
        div.b-media-cropper-form__field.b-text-field.b-media-cropper-form__field--text-field
          span.b-media-cropper-form__field-label.b-media-cropper-form__field-label--text-field Height px
          input.b-media-cropper-form__field-input.b-media-cropper-form__field-input--text-field.form-control(type='text' :value="cropHPercentage" @change="cropHFromPercentage")
      //- el-form(:model='options' label-width='120px')
      //-   el-form-item(label='Crop position')
      //-     el-col(:span='12')
      //-       el-input(v-model.number='cropX')
      //-     el-col(:span='12')
      //-       el-input(v-model.number='cropY')
      //-   el-form-item(label='Crop size')
      //-     el-col(:span='12')
      //-       el-input(v-model.number='cropW')
      //-     el-col(:span='12')
      //-       el-input(v-model.number='cropH')

</template>

<script>
import interact from 'interactjs'
import VueCropper from 'vue-cropper'

export default {
  props: ['image', 'url'],
  data: () => ({
    options: {
      // info: true,
      size: 1,
      canScale: true,
      autoCrop: true,
      autoCropWidth: 250,
      autoCropHeight: 250
    },

    imageScale: 1,
    naturalH: 0,
    naturalW: 0,
    positionX: 0,
    positionY: 0,
    cropX: 0,
    cropY: 0,
    cropW: 100,
    cropH: 100,
    outputW: 100,
    outputH: 100,
    outputScale: 1
  }),
  components: {
    VueCropper
  },
  computed: {
    cropWPercentage () {
      if (this.imageScale == 0) return 0
      return Math.round(this.cropW / this.imageScale / this.naturalW * 100)
    },
    cropHPercentage () {
      if (this.imageScale == 0) return 0
      return Math.round(this.cropH / this.imageScale / this.naturalH * 100)
    },
    cropWPixels () {
      if (this.imageScale == 0) return 0
      return Math.round(this.cropW / this.imageScale)
    },
    cropHPixels () {
      if (this.imageScale == 0) return 0
      return Math.round(this.cropH / this.imageScale)
    },
    containerW () {
      return this.$refs.container.clientWidth
    },
    containerH () {
      return this.$refs.container.clientHeight
    },
    imageW () {
      return Math.floor(this.naturalW * this.imageScale)
    },
    imageH () {
      return Math.floor(this.naturalH * this.imageScale)
    },
    previewImageStyle () {
      return {
        width: this.imageW + 'px',
        height: this.imageH + 'px',
        transform: `translate(${this.positionX}px, ${this.positionY}px)`
      }
    },
    cropStyle () {
      return {
        width: this.cropW + 'px',
        height: this.cropH + 'px',
        transform: `translate(${this.cropX}px, ${this.cropY}px)`
      }
    },
    naturalRatio () {
      if (this.naturalW == 0) {
        return 1
      }

      return this.naturalH / this.naturalW
    },
    cropSizeInfo () {
      if (this.imageScale == 0) return ''

      return `${Math.floor(this.cropW / this.imageScale)} x ${Math.floor(this.cropH / this.imageScale)}`
    }
  },
  methods: {
    async updateNatural () {
      const [ width, height] = await this.reloadNatural(this.url)
      this.naturalW = width
      this.naturalH = height
      this.imageScale = Math.min(1, this.containerW / this.naturalW)
    },
    reloadNatural (url) {
      return new Promise(resolve => {
        const newImg = new Image()

        newImg.onload = () => {
          resolve([newImg.width, newImg.height])
        }

        newImg.src = url
      })
    },

    onImageScale (evt) {
      const percentage = evt.deltaY / 100 // 1% per tick
      this.imageScale = Math.min(1, Math.max(0, this.imageScale + percentage / 100))
      evt.preventDefault()
    },
    onImageMove (evt) {
      this.positionX += evt.dx
      this.positionY += evt.dy
    },
    onCropMove (evt) {
      this.cropX += evt.dx
      this.cropY += evt.dy
    },
    onCropResize (evt) {
      this.cropX += evt.deltaRect.left
      this.cropY += evt.deltaRect.top
      this.cropW += evt.deltaRect.width
      this.cropH += evt.deltaRect.height
      this.outputW = this.cropW / this.outputScale / this.imageScale
      this.outputH = this.cropH / this.outputScale / this.imageScale
    },
    normalizeCrop () {
      this.cropW = Math.max(0, Math.min(this.naturalW * this.imageScale, this.cropW))
      this.cropH = Math.max(0, Math.min(this.naturalH * this.imageScale, this.cropH))
      this.cropX = Math.max(0, Math.min(this.naturalW * this.imageScale - this.cropW, this.cropX))
      this.cropY = Math.max(0, Math.min(this.naturalH * this.imageScale - this.cropH, this.cropY))
    },

    cropWFromPercentage (evt) {
      const value = parseFloat(evt.target.value)
      this.cropW = value * 0.01 * this.naturalW * this.imageScale
    },
    cropHFromPercentage (evt) {
      const value = parseFloat(evt.target.value)
      this.cropH = value * 0.01 * this.naturalH * this.imageScale
    },
    cropWFromPixels (evt) {
      const value = parseFloat(evt.target.value)
      this.cropW = value * this.imageScale
    },
    cropHFromPixels (evt) {
      const value = parseFloat(evt.target.value)
      this.cropH = value * this.imageScale
    },

    cropFromOutputW (evt) {
      const value = parseFloat(evt.target.value)
      this.outputW = value
      this.cropW = value * this.outputScale * this.imageScale
    },
    cropFromOutputH (evt) {
      const value = parseFloat(evt.target.value)
      this.outputH = value
      this.cropH = value * this.outputScale * this.imageScale
    }
  },
  watch: {
    url: 'updateNatural',
    cropW: 'normalizeCrop',
    cropH: 'normalizeCrop',
    cropX: 'normalizeCrop',
    cropY: 'normalizeCrop'
  },
  async mounted () {
    await this.updateNatural()
    // interact(this.$refs.image)
    //   .draggable({
    //     autoScroll: true,
    //     onmove: this.onImageMove
    //   })

    interact(this.$refs.rect)
      .draggable({
        autoScroll: true,
        onmove: this.onCropMove
      })
      .resizable({
        edges: { left: true, right: true, bottom: true, top: true },
        onmove: this.onCropResize
      })
  }
}
</script>