<template lang="pug">
  div.b-builder__toolbar
    draggable(v-model="availableComponents" :options="toolbarDraggableOptions" :clone='clone' @end='onEnd')
      div.b-builder__toolbar-component(v-for="componentMeta in availableComponents" :key="componentMeta.name")
        img.b-builder__toolbar-component-cover(:src="componentMeta.image")
        span.b-builder__toolbar-component-name {{ componentMeta.builderName || componentMeta.name }}
</template>

<script>
export default {
  name: 'b-toolbar',

  data: () => ({
    toolbarDraggableOptions: {
      draggable: '.b-builder__toolbar-component',
      group: {
        pull: 'clone',
        put: false,
        name: 'builder-components'
      }
    }
  }),

  computed: {
    availableComponents: {
      get() {
        return Object.values(this.$builder.meta)
      },
      set() {
        console.log('dont set')
        return;
      }
    },

    builder () {
      return this.$builder
    }
  },
  
  methods: {
    onEnd (evt) {
      console.log(evt)
    },
    clone (original) {
      return {
        name: original.name,
        props: Object.keys(original.props).reduce((props, prop) => {
          props[prop] = original.props[prop].default
          return props
        }, {}),
        rnd: Math.random() * 10000 >> 0
      }
    }
  }
}
</script>

