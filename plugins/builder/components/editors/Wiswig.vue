<template lang="pug">
  div.b-wiswig.b-builder__editor-field--wiswig(@click='$emit("change", !field)')
    span.b-wiswig-label.b-builder__editor-field-label.b-builder__editor-field-label--wiswig {{ label }}
    span.b-wiswig-input.b-builder__editor-field-input.b-builder__editor-field-input--wiswig(
      :class="field ? 'b-wiswig-input--checked' : 'b-wiswig-input--unchecked'"
    )
      i.fa(:class="field ? 'fa-check-circle' : 'fa-times-circle'")
</template>

<script>
export default {
  name: 'b-wiswig',
  
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
.b-wiswig {
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
