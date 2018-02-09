<template lang="pug">
  div.b-builder__editor
    div.b-builder__editor-table.nk-form
      component.b-builder__editor-field(
        v-for="(field, index) in fields" :key="index"
        :is='field.editor.type'
        v-bind='field'
        @change='(value) => $set(element.props, field.label, value)'
      )
</template>

<script>
import _ from 'lodash'

export default {
  name: 'b-editor',
  props: ['element'],

  computed: {
    builder () {
      return this.$builder
    },
    meta() {
      return this.$builder.meta[this.element.name]
    },
    fields () {
      return _.flatten(
        Object.keys(this.meta.props)
        .map(key => ({
          editor: this.meta.props[key].editor || this.getDefaultEditor(this.meta.props[key].type),
          field: this.element.props[key],
          label: key
        }))
      )
    }
  },

  methods: {
    getDefaultEditor (type) {
      switch (type) {
        case undefined:
          return { type: 'b-text-field' }
        case Boolean:
          return { type: 'b-toggle' }
        case Number:
          return { type: 'b-number' }
        default:
          return { type: 'b-text-field' }
      }
    }
  }
}
</script>

