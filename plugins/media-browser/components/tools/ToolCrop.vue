<template lang="pug">
  div.b-media-cropper-form.nk-form
    span.b-media-cropper-form__section Filters Size
    div.b-media-cropper-form__field.b-text-field.b-media-cropper-form__field--text-field(style="flex-basis: 100%")
      span.b-media-cropper-form__field-label.b-media-cropper-form__field-label--text-field Quality
      input.b-media-cropper-form__field-input.b-media-cropper-form__field-input--text-field.form-control(type='text' :value="quality" @change='changeQuality')
    div.b-media-cropper-form__field.b-text-field.b-media-cropper-form__field--text-field(style="flex-basis: 100%")
      span.b-media-cropper-form__field-label.b-media-cropper-form__field-label--text-field Blur
      input.b-media-cropper-form__field-input.b-media-cropper-form__field-input--text-field.form-control(type='text' :value="blur" @change='changeBlur')
</template>


<script>
export default {
  props: ['quality', 'blur'],
  methods: {
    changeQuality (evt) {
      this.change(parseInt(evt.target.value), this.blur)
    },

    changeBlur (evt) {
      this.change(this.quality, parseInt(evt.target.value))
    },

    change (quality, blur) {
      this.$emit('change', [quality, blur])
    }
  }
}
</script>
