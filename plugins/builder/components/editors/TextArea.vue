<template lang="pug">
  div.b-text-area.b-builder__editor-field--text-area
    //- span.b-text-area-label.b-builder__editor-field-label.b-builder__editor-field-label--text-area {{ label }}
    textarea.b-text-area-input.b-builder__editor-field-input.b-builder__editor-field-input--text-area.form-control(
      @keyup='change'
      v-model='currentValue'
    )
</template>

<script>
import _ from 'lodash'

export default {
  name: 'b-text-area',
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
.b-text-area {
  flex-basis: 1000%;
  flex-grow: 1;

  flex-direction: column;
  align-items: flex-start;

  &-input {
    width: 100%;
    min-height: 105px;
  }
}
</style>
