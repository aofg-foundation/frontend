<template lang="pug">
  div.b-toggle.b-builder__editor-field--toggle(@click='$emit("change", !field)')
    span.b-toggle-label.b-builder__editor-field-label.b-builder__editor-field-label--toggle {{ label }}
    span.b-toggle-input.b-builder__editor-field-input.b-builder__editor-field-input--toggle(
      :class="field ? 'b-toggle-input--checked' : 'b-toggle-input--unchecked'"
    )
      i.fa(:class="field ? 'fa-check-circle' : 'fa-times-circle'")
</template>

<script>
export default {
  name: 'b-toggle',
  
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
.b-toggle {
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
