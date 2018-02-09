<template lang="pug">
  div.b-text-field.b-builder__editor-field--text-field
    span.b-text-field-label.b-builder__editor-field-label.b-builder__editor-field-label--text-field Immutable {{ label }}
    input.b-text-field-input.b-builder__editor-field-input.b-builder__editor-field-input--text-field.form-control(type='text' disabled :value='field')
</template>

<script>
export default {
  name: 'b-immutable',
  props: ['field', 'label']
}
</script>

<style lang="scss">
.b-text-field {
  flex-basis: 25%;
  flex-grow: 1;

  &-input {
    width: 100%;
  }
}
</style>
