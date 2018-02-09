<template lang="pug">
  div.b-builder-builder
    b-toolbar(v-if='!realPreview')

    .container
      div.b-builder__toggle-preview(@click='realPreview = !realPreview')
        i.fa.fa-eye(v-if='!realPreview')
        i.fa.fa-eye-slash(v-else)

      draggable.b-builder__artboard(v-model='pageData' :options='builderDraggableOptions' v-if='!realPreview')
        div.b-builder__component(
          v-for="(block, index) in pageData" 
          :key="sha256(block)"
          :testkey="sha256(block)"
          :class='[edit === block ? "b-builder__component--edit" : "b-builder__component--preview"]')

          .b-builder__component-controls
            div.b-builder__component-handle.b-builder__component-controls-button.b-builder__component-controls-button--handle
              i.fa.fa-bars
            div.b-builder__component-controls-button.b-builder__component-controls-button--edit(@click='edit = edit === block ? null : block')
              i.fa.fa-cog
            div.b-builder__component-controls-button.b-builder__component-controls-button--delete(@click='pageData.splice(index, 1)')
              i.fa.fa-times

          b-editor(:element="block" v-if='edit === block')
          b-component(:config='block')

      b-renderer(:pageData='pageData' v-else)
</template>

<script>
const sha256 = require('spark-md5').hash

export default {
  name: 'b-builder',

  data: () => ({
    realPreview: false,
    edit: null,
    pageData: [],
    builderDraggableOptions: {
      handle: '.b-builder__component-handle',
      sort: 'false',
      group: 'builder-components'
    }
  }),

  methods: {
    sha256 (data) {
      if (typeof data === 'object') {
        data = JSON.stringify(Object.assign({}, data))
      }

      return sha256(data)
    }
  }
}
</script>

<style lang="scss">
$builder-toolbar-width: 250px;

.b-builder {
  &__toggle-preview {
    position: fixed;

    right: 20px;
    bottom: 20px;
    z-index: 3000;

    width: 40px;
    height: 40px;
    font-size: 21px;
    
    background-color: #2f3542;
    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 999px;

    transition: background-color 0.2s ease;

    &:hover {
      background-color: #57606f;
    }
  }
  &__editor {
    padding: 20px;
    background-color: #2f3542;

    &-table {
      display: flex;
      flex-wrap: wrap;
    }
    &-field {
      padding: 10px;
      display: flex;
      align-items: center;

      position: relative;

      &-label {
        font-size: 12px;
        text-transform: uppercase;
        font-weight: bold;
        opacity: 0.65;

        margin-right: 10px;
      }
    }
  }
  &__artboard {
    min-height: 150px;
    outline: 1px dashed rgba(255,255,255,0.15);
    .b-builder__toolbar-component {
      max-height: 50px;
      overflow: hidden;
    }
  }
  &__component {
    outline: 1px dashed rgba(255,255,255,0.15);
    position: relative;
    &-controls {
      opacity: 0.1;
      position: absolute;
      width: 100%;
      // z-index: 2;

      display: flex;
      justify-content: flex-end;

      transition: opacity 0.35s ease;
      padding: 5px;

      &:hover {
        opacity: 1;
      }

      &-button {
        width: 20px;
        height: 20px;
        font-size: 12px;
        
        background-color: #2f3542;
        display: flex;
        align-items: center;
        justify-content: center;

        border-radius: 999px;

        transition: background-color 0.2s ease;

        &:hover {
          background-color: #57606f;
        }

        &--handle {
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }

        &--edit {
          margin-right: auto;
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        }

        &--delete {
          background-color: #ff4757;
        }
      }
    }

    &--edit {
      .b-builder__component-controls-button--edit {
        background-color: #57606f;
      }
    }
  }
  &__toolbar {
    position: fixed;
    z-index: 10000;
    top: 0; bottom: 0; left: -$builder-toolbar-width + 20px; width: $builder-toolbar-width;
    color: black;
    background-color: #ffffff;
    transition: left 0.3s ease;
    padding: 30px;
    
    &:hover { left: 0 }

    &-component {
      // display: flex;
      // align-items: flex-end;

      min-height: 85px;

      // padding: 10px;
      position: relative;

      border: 1px solid #d6e6f3;
      outline: 1px solid transparent;
      margin-bottom: 10px;

      transition: border-color 0.2s ease, outline-color 0.2s ease;
      overflow: hidden;
      user-select: none;

      &:hover {
        border-color: #5cacec;
        outline-color: #5cacec;
      }

      &-cover {
        width: 100%;
      }

      &-name {
        position: absolute;
        left: 0; right: 0; bottom: 0;
        padding: 5px 10px;
        z-index: 2;
        background-color: rgba(255, 255, 255, 0.55);
      }
    }
  }
}
</style>


