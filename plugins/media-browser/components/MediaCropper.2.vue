<template lang="pug">
  div.b-media-cropper(ref='container')
    //- img.b-media-cropper__image(:src='url')
    //- pre {{ image }}
    //- vue-cropper(
    //-   ref='cropper'
    //-   :img='url'
    //-   v-bind='options')

    img#cropper-image.b-media-cropper-preview__image(
      ref='image' 
      :src='url'
      :style='previewImageStyle')

    div#cropper-rect.b-media-cropper-rect(ref='rect' :style='cropStyle')
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
        span.b-media-cropper-form__section Output Size
        div.b-media-cropper-form__field.b-text-field.b-media-cropper-form__field--text-field(style="flex-basis: 100%")
          span.b-media-cropper-form__field-label.b-media-cropper-form__field-label--text-field Scale
          input.b-media-cropper-form__field-input.b-media-cropper-form__field-input--text-field.form-control(type='text' v-model.number="outputScale")
        div.b-media-cropper-form__field.b-text-field.b-media-cropper-form__field--text-field
          span.b-media-cropper-form__field-label.b-media-cropper-form__field-label--text-field Width px
          input.b-media-cropper-form__field-input.b-media-cropper-form__field-input--text-field.form-control(type='text' v-model.number="outputW")
        div.b-media-cropper-form__field.b-text-field.b-media-cropper-form__field--text-field
          span.b-media-cropper-form__field-label.b-media-cropper-form__field-label--text-field Height px
          input.b-media-cropper-form__field-input.b-media-cropper-form__field-input--text-field.form-control(type='text' v-model.number="outputH")

      div.b-media-cropper-form.nk-form
        span.b-media-cropper-form__section Quality &amp; Blur
        div.b-media-cropper-form__field.b-text-field.b-media-cropper-form__field--text-field
          span.b-media-cropper-form__field-label.b-media-cropper-form__field-label--text-field Quality (0-100)
          input.b-media-cropper-form__field-input.b-media-cropper-form__field-input--text-field.form-control(type='text' v-model.number="quality")
        div.b-media-cropper-form__field.b-text-field.b-media-cropper-form__field--text-field
          span.b-media-cropper-form__field-label.b-media-cropper-form__field-label--text-field Blur (0-100)
          input.b-media-cropper-form__field-input.b-media-cropper-form__field-input--text-field.form-control(type='text' v-model.number="blur")
          
      div.b-media-cropper-form.nk-form(style='flex-grow: 10')
        span.b-media-cropper-form__section Variant Params:
        pre {{ urlParams }}
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

export default {
  props: ['image', 'url'],
  data: () => ({
    imageScale: 1,
    outputScale: 1,
    naturalW: 0,
    naturalH: 0,
    outputW: 100,
    outputH: 100,
    quality: 80,
    blur: 0,

    cropX: 0,
    cropY: 0
  }),
  computed: {
    urlParams () {
      if (this.image) {
        const left = Math.floor(this.cropX / this.imageScale)
        const top = Math.floor(this.cropY / this.imageScale)
        const right = Math.floor(left + this.outputW / this.outputScale)
        const bottom = Math.floor(top + this.outputH / this.outputScale)

        return `http://localhost:8000/unsafe/${left}x${top}:${right}x${bottom}/fit-in/${this.outputW}x${this.outputH}/http://10.0.75.1:3000/api/containers/${this.image.container}/download/${this.image.name}`
      } 
      return ''
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
    cropW () {
      return this.outputW * this.outputScale * this.imageScale
    },
    cropH () {
      return this.outputH * this.outputScale * this.imageScale
    },
    previewImageStyle () {
      return {
        width: this.imageW + 'px',
        height: this.imageH + 'px'
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
      const containerAspect = this.containerW / this.containerH

      if (width > height * containerAspect) {
        this.imageScale = Math.min(1, this.containerW / this.naturalW)
      } else {
        this.imageScale = Math.min(1, this.containerH / this.naturalH)
      }
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
    // onImageMove (evt) {
    //   this.positionX += evt.dx
    //   this.positionY += evt.dy
    // },
    onCropMove (evt) {
      this.cropX += evt.dx
      this.cropY += evt.dy
    },
    onCropResize (evt) {
      this.cropX += evt.deltaRect.left
      this.cropY += evt.deltaRect.top
            
      const newW = this.cropW + evt.deltaRect.width
      const newH = this.cropH + evt.deltaRect.height
      const outputScaleW = newW / this.outputW / this.imageScale
      const outputScaleH = newH / this.outputH / this.imageScale

      const outputScaleWDiff = Math.abs(outputScaleW - this.outputScale)
      const outputScaleHDiff = Math.abs(outputScaleH - this.outputScale)

      this.outputScale = outputScaleWDiff > outputScaleHDiff ? outputScaleW : outputScaleH
    },
    normalizeCrop () {
      this.cropX = Math.max(0, Math.min(this.naturalW * this.imageScale - this.cropW, this.cropX))
      this.cropY = Math.max(0, Math.min(this.naturalH * this.imageScale - this.cropH, this.cropY))

      this.outputW = Math.max(1, Math.min(this.naturalW, this.outputW))
      this.outputH = Math.max(1, Math.min(this.naturalH, this.outputH))
    },

    // cropWFromPercentage (evt) {
    //   const value = parseFloat(evt.target.value)
    //   this.cropW = value * 0.01 * this.naturalW * this.imageScale
    // },
    // cropHFromPercentage (evt) {
    //   const value = parseFloat(evt.target.value)
    //   this.cropH = value * 0.01 * this.naturalH * this.imageScale
    // },
    // cropWFromPixels (evt) {
    //   const value = parseFloat(evt.target.value)
    //   this.cropW = value * this.imageScale
    // },
    // cropHFromPixels (evt) {
    //   const value = parseFloat(evt.target.value)
    //   this.cropH = value * this.imageScale
    // },

    // cropFromOutputW (evt) {
    //   const value = parseFloat(evt.target.value)
    //   this.outputW = value
    //   this.cropW = value * this.outputScale * this.imageScale
    // },
    // cropFromOutputH (evt) {
    //   const value = parseFloat(evt.target.value)
    //   this.outputH = value
    //   this.cropH = value * this.outputScale * this.imageScale
    // }
  },
  watch: {
    url: 'updateNatural',
    // cropW: 'normalizeCrop',
    // cropH: 'normalizeCrop',
    cropX: 'normalizeCrop',
    cropY: 'normalizeCrop',
    outputW: 'normalizeCrop',
    outputH: 'normalizeCrop'
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