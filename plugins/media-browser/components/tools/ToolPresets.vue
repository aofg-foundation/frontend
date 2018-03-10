<template lang="pug">
  div.b-media-cropper-form.nk-form
    span.b-media-cropper-form__section Save 
    //- pre {{ params }}
    div
      div
        a(:href='show' target='_blank') Preview
      div
        a(href='#' @click='make') Save
    //- div 
      //- a(:href='show' target='_blank') Store
</template>

<script>
export default {
  props: ['show', 'params'],

  computed: {
    filters () {
      const result = []

      if (this.params.quality) {
        result.push({
          name: 'quality',
          value: parseInt(this.params.quality).toString()
        })
      }

      if (this.params.blur) {
        result.push({
          name: 'blue',
          value: parseInt(this.params.blur).toString()
        })
      }
      return result
    }
  },

  methods: {
    async make () {
      await this.$backend.post('Images/make', {
        name: this.params.name,
        container: this.params.container,
        width: this.params.width,
        height: this.params.height,
        crop: {
          left: this.params.left,
          right: this.params.right,
          top: this.params.top,
          bottom: this.params.bottom,
        },
        filters: this.filters
      })
    }
  }
}
</script>