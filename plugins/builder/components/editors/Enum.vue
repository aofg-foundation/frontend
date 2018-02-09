<template lang="pug">
  div.b-enum.b-builder__editor-field--enum
    //- (@click='$emit("change", !field)')
    span.b-enum__label.b-builder__editor-field-label.b-builder__editor-field-label--enum {{ label }}
    span.b-enum__input.b-builder__editor-field-input.b-builder__editor-field-input--enum.form-control {{ values[field] }}
      ul.b-enum__options
        li.b-enum__options-item(
          v-for='(name, key) in values'
          :class='{ "b-enum__options-item--selected": field === key }'
          @click='$emit("change", key)'
        ) {{ name }}
      //- (type='text' @change='change' :value='field')
    //- span.b-enum-input.b-builder__editor-field-input.b-builder__editor-field-input--enum(
    //-   :class="field ? 'b-enum-input--checked' : 'b-enum-input--unchecked'"
    //- )
    //-   i.fa(:class="field ? 'fa-check-circle' : 'fa-times-circle'")
</template>

<script>
export default {
  name: 'b-enum',
  props: ['field', 'label', 'editor'],

  methods: {
    change (evt) {
      console.log(evt)
      this.$emit('change', evt.target.checked)
    }
  },

  computed: {
    values () {
      return this.editor.values
    }
  }
}
</script>

<style lang="scss">
.b-enum {
  flex-basis: 15%;
  flex-grow: 1;

  &__options {
    display: none;
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;

    padding: 0;
    margin: 0;

    background-color: #57606f;

    &-item {
      padding: 12px 20px;
      list-style: none;
      transition: background-color 0.2s ease;
      word-wrap: none;
      word-break: keep-all;
      cursor: pointer;

      &:hover {
        background-color: darken(#57606f, 10%);
      }

      &--selected {
        background-color: darken(#57606f, 10%);
        cursor: default;
      }
    }
  }

  &__input {
    position: relative;
    
    &:hover {
      .b-enum__options {
        display: block;
      }
    }
  }
}
</style>
