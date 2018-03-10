<template lang="pug">
  div.b-media-cropper-form.nk-form
    span.b-media-cropper-form__section Crop Size
    div.b-media-cropper-form__field.b-text-field.b-media-cropper-form__field--text-field(style="flex-basis: 100%")
    div.b-media-cropper-form__field.b-text-field.b-media-cropper-form__field--text-field
      span.b-media-cropper-form__field-label.b-media-cropper-form__field-label--text-field Width px
      input.b-media-cropper-form__field-input.b-media-cropper-form__field-input--text-field.form-control(type='text' :value.number="size.w" @change='update' ref='width')
    div.b-media-cropper-form__field.b-text-field.b-media-cropper-form__field--text-field
      span.b-media-cropper-form__field-label.b-media-cropper-form__field-label--text-field Height px
      input.b-media-cropper-form__field-input.b-media-cropper-form__field-input--text-field.form-control(type='text' :value.number="size.h" @change='update' ref='height')
</template>

<script>
export default {
  props: [ 'size' ],
  methods: {
    update (evt) {
      this.$emit('change', {
        w: parseInt(this.$refs.width.value),
        h: parseInt(this.$refs.height.value)
      })
    }
  }
}
</script>
