<template lang="pug">
  div.b-builder__sorting
    draggable(v-model="pageData" :options="sortingDraggableOptions" :clone='clone' @end='onEnd')
      div.b-builder__sorting-component(v-for="componentMeta in availableComponents" :key="componentMeta.name")
        img.b-builder__sorting-component-cover(:src="componentMeta.image")
        span.b-builder__sorting-component-name {{ componentMeta.builderName || componentMeta.name }}
</template>

<script>
export default {
  name: 'b-sorting',

  props: ['pageData'],

  data: () => ({
    sortingDraggableOptions: {
      // draggable: '.b-builder__sorting-component'
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

