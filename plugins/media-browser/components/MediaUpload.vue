<template lang="pug">
  vue-transmit.b-media-upload(
      v-bind="options"
      drag-class="b-media-upload--dragging"
      @queue-complete='onAdded'
      @sending='onSending'
      @success='onSuccess'
      @error='onError'
      @upload-progress='onProgress'
    )
    //- template(slot="clip-uploader-action" slot-scope="params")
    div.b-media-upload__card.dz-message
      .b-media-upload__preview(:style='previewStyles' v-if='preview')
        img(:src="previewUrl")
      i.b-media-upload__icon.b-media-upload__icon--normal.fa.fa-cloud(v-if='!uploading')
      i.b-media-upload__icon.b-media-upload__icon--dragging.fa.fa-chevron-down
      i.b-media-upload__icon.b-media-upload__icon--dragging.fa.fa-chevron-down
      i.b-media-upload__icon.b-media-upload__icon--dragging.fa.fa-chevron-down
      div.b-media-upload__info.b-media-upload__info--normal(v-if='!uploading')
        span.b-media-upload__name Drop Image here or click
      div.b-media-upload__info.b-media-upload__info--dragging(v-if='!uploading')
        span.b-media-upload__name Drop here to upload
      div.b-media-upload__info.b-media-upload__info--progress(v-if='uploading')
        span.b-media-upload__progress.b-media-upload__progress--fill
        span.b-media-upload__progress(:style='progressStyles' :class='progressClass')
</template>
<script>
function progressClass (mod) {
  return `b-media-upload__progress--${mod}`
}
export default {
  props: ['action'],
  data() {
    return {
      options: {
        url: this.action,
        acceptedFileTypes: [ 'image/*' ],
        url: this.action
      },

      progress: 0,
      error: null,
      success: false,
      uploading: false,
      preview: null,
      dragging: false
    }
  },

  computed: {
    previewUrl () {
      return this.preview ? this.preview.dataUrl : null
    },
    wrapperClass () {
      return {
        'b-media-upload--dragging': this.dragging
      }
    },
    previewStyles () {
      if (this.uploading) {
        return {
          opacity: this.progress
        }
      }
      else {
        return {
          display: 'none'
        }
      }
    },
    progressStyles () {
      return { width: Math.round(this.progress * 100) + '%' }
    },
    progressClass () {
      return {
        [progressClass('in-progress')]: this.uploading && this.progress,
        [progressClass('error')]: this.error,
        [progressClass('success')]: this.success
      }
    }
  },

  methods: {
    onAdded (file) {
      this.preview = file
    },
    onSending (file, xhr, formData) {
      this.uploading = true
      this.error = false
      this.success = false

      if (this.clearing) {
        clearTimeout(this.clearing)
      }
    },
    onSuccess (file, response) {
      this.success = true
      this.$emit('success', file)
      this.clear()
    },
    onError (file, message) {
      this.error = message
      this.clear()
    },
    onProgress (file, progress, bytesSent) {
      this.progress = bytesSent / file.size
    },
    clear () {
      this.clearing = setTimeout(() => {
        this.uploading = false
        this.error = false
        this.success = false
        this.preview = null
      }, 1000)
    }
  }
}
</script>

