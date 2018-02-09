<template lang="pug">
  div.b-enum-multiple.b-builder__editor-field--enum-multiple
    //- (@click='$emit("change", !field)')
    span.b-enum-multiple__label.b-builder__editor-field-label.b-builder__editor-field-label--enum-multiple {{ label }}
    span.b-enum-multiple__input.b-builder__editor-field-input.b-builder__editor-field-input--enum-multiple.form-control(:style='this.copyField.length ? "" : "color: #57606f"') {{ printValues }}
      ul.b-enum-multiple__options
        li.b-enum-multiple__options-item(
          v-for='(name, key) in values'
          :class='{ "b-enum-multiple__options-item--selected": copyField.indexOf(key) !== -1 }'
          @click='toggle(key)'
        ) {{ name }}
      //- (type='text' @change='change' :value='field')
    //- span.b-enum-multiple-input.b-builder__editor-field-input.b-builder__editor-field-input--enum-multiple(
    //-   :class="field ? 'b-enum-multiple-input--checked' : 'b-enum-multiple-input--unchecked'"
    //- )
    //-   i.fa(:class="field ? 'fa-check-circle' : 'fa-times-circle'")
</template>

<script>
export default {
  name: 'b-enum-multiple',
  props: ['field', 'label', 'editor'],

  data () {
    return {
      copyField: []
    }
  },

  created () {
    this.copyField = [...this.field]
  },

  methods: {
    toggle (key) {
      const index = this.copyField.indexOf(key)
      if (index !== -1) {
        this.copyField.splice(index, 1)
      } else {
        this.copyField.push(key)
      }

      this.change(this.copyField)
    },
    change (newArray) {
      console.log(newArray)
      this.$emit('change', newArray)
    }
  },

  computed: {
    values () {
      return this.editor.values
    },
    printValues () {
      return this.copyField.length ? this.copyField.map(key => this.values[key]).join(', ') : 'None..'
    }
  }
}
</script>

<style lang="scss">
.b-enum-multiple {
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

      color: white;

      &:hover {
        background-color: darken(#57606f, 10%);
      }

      &--selected {
        background-color: #5352ed;
        cursor: default;

        &:hover {
          background-color: darken(#5352ed, 10%);
        }
      }
    }
  }

  &__input {
    position: relative;
    
    &:hover {
      .b-enum-multiple__options {
        display: block;
      }
    }
  }
}
</style>
