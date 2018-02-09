<template lang="pug">
  div.b-markdown.b-builder__editor-field--markdown(@click='$emit("change", !field)')
    span.b-markdown-label.b-builder__editor-field-label.b-builder__editor-field-label--markdown {{ label }}
    span.b-markdown-input.b-builder__editor-field-input.b-builder__editor-field-input--markdown(
      :class="field ? 'b-markdown-input--checked' : 'b-markdown-input--unchecked'"
    )
      i.fa(:class="field ? 'fa-check-circle' : 'fa-times-circle'")
</template>

<script>
export default {
  name: 'b-markdown',
  
  props: ['field', 'label'],

  methods: {
    change (evt) {
      console.log(evt)
      this.$emit('change', evt.target.checked)
    }
  }
}
</script>

<style lang="scss">
.b-markdown {
  flex-basis: 10%;
  flex-grow: 1;
  &-input {
    width: 100%;
    border: 0;
    font-size: 21px;

    &--checked { color: #2ed573 }
    &--unchecked { color: #ff4757 }
  }
}
</style>
