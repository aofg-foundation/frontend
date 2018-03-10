<template lang="pug">
  //- div(@click="selectImage")
  div(@click="selectImage")
    div.b-media-item__card(:style='cardStyle')
      img.b-media-item__image(:src='url' :style='style')
      div.b-media-item__info(style='padding: 14px;')
        span.b-media-item__name {{ name }}

      
      div.b-media-item__controls
        div.b-media-item-control.b-media-item-control--select(@click="selectImage")
          i.fa.fa-check
        div.b-media-item-control.b-media-item-control--edit(@click="editImage")
          i.fa.fa-crop
        //- .bottom.clearfix
        //-   el-button.button(type='text') Operating button
</template>

<script>
export default {
  name: 'b-media-item',
  props: ['image', 'name', 'url', 'size'],
  computed: {
    style () {
      return {
        width: this.size + 'px',
        height: this.size + 'px'
      }
    },
    cardStyle () {
      return {
        maxWidth: this.size + 'px'
      }
    }
  },
  methods: {
    selectImage (evt) {
      evt.preventDefault()
      evt.stopPropagation()
      this.$emit('select', this.image)
    },
    editImage (evt) {
      evt.preventDefault()
      evt.stopPropagation()
      this.$emit('edit', this.image)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
