<template lang="pug">
  div.b-media-cropper(ref='container')
  
    div.b-media-cropper-preview.b-media-cropper__preview(:style='previewImageStyle')
      img#cropper-image.b-media-cropper-preview__image(
        ref='image' 
        :src='url')
      
      span.b-media-cropper-preview__label.b-media-cropper-preview__label--image-size {{ label(size) }}

      div#cropper-rect.b-media-cropper-rect(ref='rect' :style='cropStyle')
        span.b-media-cropper-rect__dot
        span.b-media-cropper-rect__dot
        span.b-media-cropper-rect__dot
        span.b-media-cropper-rect__dot

        span.b-media-cropper-rect__dot.b-media-cropper-rect__dot--keep

    div.b-media-cropper-toolbox.b-media-cropper__toolbox
      tool-image-size(:size='size' @change='updateSize')
      tool-canvas-size(:size='{ w: crop.right - crop.left, h: crop.bottom - crop.top }' @change='updateCrop')
      tool-crop(:quality='quality' :blur='blur' @change="updateFilters")
      tool-pan
      tool-presets(:show='cropUrl' :params='cropParams')
</template>

<script>
import interact from 'interactjs'

import ToolCanvasSize from './tools/ToolCanvasSize'
import ToolCrop from './tools/ToolCrop'
import ToolImageSize from './tools/ToolImageSize'
import ToolPan from './tools/ToolPan'
import ToolPresets from './tools/ToolPresets'

export default {
  props: ['image', 'url'],
  components: {
    ToolCanvasSize,
    ToolCrop,
    ToolImageSize,
    ToolPan,
    ToolPresets
  },
  data: () => ({
    size: {
      w: 100,
      h: 100,
    },

    crop: {
      top: 100,
      left: 100,
      right: 200,
      bottom: 200
    },
    fit: false,

    preview: {
      scale: 1,
      offset: {
        x: 0,
        y: 0
      },
      size: {
        w: 100,
        h: 100
      }
    },

    original: {
      w: 0,
      h: 0
    },

    blur: 0,
    quality: 85,

    container: null
  }),

  computed: {
    cropParams () {
        const scale = this.original.w / this.size.w
        const left = Math.floor(this.crop.left * scale)
        const right = Math.floor(this.crop.right * scale)
        const top = Math.floor(this.crop.top * scale)
        const bottom = Math.floor(this.crop.bottom * scale)
        const width = this.crop.right - this.crop.left
        const height = this.crop.bottom - this.crop.top
        const quality = this.quality
        const blur = this.blur

        return {
          url: `http://10.0.75.1:3000/api/containers/${this.image.container}/download/${this.image.name}`,
          container: this.image.container,
          name: this.image.name,
          left,
          right,
          top,
          bottom,
          width,
          height,
          quality,
          blur
        }
    },
    cropUrl () {
      const params = this.cropParams
      return `http://localhost:8000/unsafe/${params.left}x${params.top}:${params.right}x${params.bottom}/${params.width}x${params.height}/http://10.0.75.1:3000/api/containers/${this.image.container}/download/${this.image.name}`
    },
    previewImageStyle () {
      return {
        width: (this.preview.scale * this.original.w) + 'px',
        height: (this.preview.scale * this.original.h) + 'px'
      }
    },
    cropStyle () {
      if (this.crop) {
        const scale = this.original.w / this.size.w * this.preview.scale

        const cw = this.crop.right - this.crop.left
        const ch = this.crop.bottom - this.crop.top
        const cx = this.crop.left
        const cy = this.crop.top

        const width = (cw * scale) + 'px'
        const height = (ch * scale) + 'px'
        const left = (cx * scale) + 'px'
        const top = (cy * scale) + 'px'

        return {
          width,
          height,
          transform: `translate(${left}, ${top})`
        }
      } else {
        return {
          display: 'none'
        }
      }
    },
  },
  methods: {
    async updateNatural () {
      
      this.container = {
        w: this.$refs.container.clientWidth,
        h: this.$refs.container.clientHeight
      }

      const [ width, height] = await this.reloadNatural(this.url)
      this.original.w = width
      this.original.h = height
      this.size = { ...this.original }
      const containerAspect = this.container.w / this.container.h

      if (width > height * containerAspect) {
        this.preview.scale = Math.min(1, this.container.w / this.original.w)
      } else {
        this.preview.scale = Math.min(1, this.container.h / this.original.h)
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

    updateSize (size) {
      if (size.w > this.original.w || size.h > this.original.h) {
        this.size = { ...this.original }
      } else {
        this.size = { ...size }
      }

      this.fitCrop()
    },

    updateCrop (size) {
      this.crop.right = this.crop.left + size.w
      this.crop.bottom = this.crop.top + size.h

      this.fitCrop()
    },

    updateFilters ([quality, blur]) {
      this.quality = quality
      this.blur = blur
    },

    fitCrop () {
      this.crop.left = Math.floor(this.crop.left)
      this.crop.right = Math.floor(this.crop.right)
      this.crop.top = Math.floor(this.crop.top)
      this.crop.bottom = Math.floor(this.crop.bottom)

      // fit canvas
      if (this.crop.right - this.crop.left > this.size.w) {
        this.crop.left = 0
        this.crop.right = this.size.w
      }
      if (this.crop.bottom - this.crop.top > this.size.h) {
        this.crop.top = 0
        this.crop.bottom = this.size.h
      }

      if (this.crop.right > this.size.w) {
        this.crop.left = this.size.w - (this.crop.right - this.crop.left)
        this.crop.right = this.size.w
      }
      if (this.crop.bottom > this.size.h) {
        this.crop.top = this.size.h - (this.crop.bottom - this.crop.top)
        this.crop.bottom = this.size.h
      }
      
      if (this.crop.left < 0) {
        this.crop.right = (this.crop.right - this.crop.left)
        this.crop.left = 0
      }
      
      if (this.crop.top < 0) {
        this.crop.bottom = (this.crop.bottom - this.crop.top)
        this.crop.top = 0
      }
    },

    onCropMove (evt) {
      const scale = this.original.w / this.size.w * this.preview.scale
      this.crop.left += evt.dx / scale
      this.crop.right += evt.dx / scale
      this.crop.top += evt.dy / scale
      this.crop.bottom += evt.dy / scale

      this.fitCrop()
    },
    onCropResize (evt) {
      console.log(evt.ctrlKey)
      const keepSize = (evt.edges.left || evt.edges.right) && (evt.edges.top || evt.edges.bottom)
      const scale = this.original.w / this.size.w * this.preview.scale

      if (!keepSize) {
        this.crop.left += evt.deltaRect.left / scale
        this.crop.right += evt.deltaRect.right / scale
        this.crop.top += evt.deltaRect.top / scale
        this.crop.bottom += evt.deltaRect.bottom / scale

        this.crop.left = Math.round(this.crop.left)
        this.crop.right = Math.round(this.crop.right)
        this.crop.top = Math.round(this.crop.top)
        this.crop.bottom = Math.round(this.crop.bottom)
      } else {
        const new_left = this.crop.left + evt.deltaRect.left / scale
        const new_right = this.crop.right + evt.deltaRect.right / scale
        const new_top = this.crop.top + evt.deltaRect.top / scale
        const new_bottom = this.crop.bottom + evt.deltaRect.bottom / scale

        let new_w = new_right - new_left
        let new_h = new_bottom - new_top

        const old_w = (this.crop.right - this.crop.left)
        const old_h = (this.crop.bottom - this.crop.top)

        const aspect = old_w / old_h

        const inf_w = old_w / new_w
        const inf_h = old_h / new_h

        if (inf_w > inf_h) {
          new_h = new_w / aspect
        } else {
          new_w = new_h * aspect
        }

        const new_scale = old_w / new_w
        this.crop.left *= new_scale
        this.crop.right = this.crop.left + old_w
        this.crop.top *= new_scale
        this.crop.bottom = this.crop.top + old_h
        this.size.w *= new_scale
        this.size.h *= new_scale

        this.crop.left = Math.round(this.crop.left)
        this.crop.right = Math.round(this.crop.right)
        this.crop.top = Math.round(this.crop.top)
        this.crop.bottom = Math.round(this.crop.bottom)
        
        this.size.w = Math.round(this.size.w)
        this.size.h = Math.round(this.size.h)
      }
      //console.log(evt.deltaRect)
      // this.crop.left += evt.deltaRect.left
      // this.cropX += evt.deltaRect.left
      // this.cropY += evt.deltaRect.top
            
      // const newW = this.cropW + evt.deltaRect.width
      // const newH = this.cropH + evt.deltaRect.height
      // const outputScaleW = newW / this.outputW / this.imageScale
      // const outputScaleH = newH / this.outputH / this.imageScale

      // const outputScaleWDiff = Math.abs(outputScaleW - this.outputScale)
      // const outputScaleHDiff = Math.abs(outputScaleH - this.outputScale)

      // this.outputScale = outputScaleWDiff > outputScaleHDiff ? outputScaleW : outputScaleH
    },

    label (dim) {
      return Math.floor(dim.w) + ' x ' + Math.floor(dim.h)
    }
  },
  watch: {
    url: 'updateNatural'
  },
  async mounted () {
    await this.updateNatural()

    window.addEventListener('resize', () => this.updateNatural())
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
