<template lang="pug">
  div.b-media-cropper-form.nk-form
    span.b-media-cropper-form__section Image Size
    div.b-media-cropper-form__field.b-text-field.b-media-cropper-form__field--text-field(style="flex-basis: 100%")
    div.b-media-cropper-form__field.b-text-field.b-media-cropper-form__field--text-field
      span.b-media-cropper-form__field-label.b-media-cropper-form__field-label--text-field Width px
      input.b-media-cropper-form__field-input.b-media-cropper-form__field-input--text-field.form-control(type='text' :value.number="size.w" @change='updateWidth' ref='width')
    div.b-media-cropper-form__field.b-text-field.b-media-cropper-form__field--text-field
      span.b-media-cropper-form__field-label.b-media-cropper-form__field-label--text-field Height px
      input.b-media-cropper-form__field-input.b-media-cropper-form__field-input--text-field.form-control(type='text' :value.number="size.h" @change='updateHeight' ref='height')
</template>

<script>
export default {
  props: [ 'size' ],
  computed: {
    aspect () {
      return this.size.w / this.size.h
    }
  },
  methods: {
    updateWidth (evt) {
      const width = parseInt(evt.target.value)
      const height = Math.floor(width / this.aspect)
      this.change(width, height)
    },
    updateHeight (evt) {
      const height = parseInt(evt.target.value)
      const width = Math.floor(height * this.aspect)
      this.change(width, height)
    },
    change (width, height) {
      this.$emit('change', {
        w: width,
        h: height
      })
    }
  }
}
</script>
