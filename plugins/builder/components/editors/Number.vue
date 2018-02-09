<template lang="pug">
  div.b-text-field.b-builder__editor-field--text-field
    span.b-text-field-label.b-builder__editor-field-label.b-builder__editor-field-label--text-field {{ label }}
    input.b-text-field-input.b-builder__editor-field-input.b-builder__editor-field-input--text-field.form-control(type='number' @keyup='change' v-model.number='currentValue')
</template>

<script>
import _ from 'lodash'
export default {
  name: 'b-number',
  props: ['field', 'label'],

  data: () => ({
    currentValue: null,
    emitChange: _.debounce(function () {
      console.log('change', this)
      this.$emit('change', this.currentValue)
    }, 500)
  }),

  created () {
    this.currentValue = this.field
  },

  methods: {
    change (evt) {
      this.emitChange()
    }
  }
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
