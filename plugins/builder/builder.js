import draggable from 'vuedraggable'
import mixin from './mixin'

let _Vue

// list of plugins to inject
let PLUGINS = []


export default class Builder {
  constructor (options) {
    this.components = {}
    this.meta = {}
    this.editors = {}
    this.installPlugins()
  }

  installPlugins () {
    PLUGINS.forEach((ctx) => {
      ctx.plugin({ builder: this }, ctx.options)
    })

    // reset to prevent duplications
    PLUGINS = []
  }

  component (name, definition) {
    // reoslve the component name automatically.
    if (typeof name === 'object') {
      definition = name.default
      name = definition.name
    }

    const component = _Vue.extend(definition)

    this.components[name] = component
    this.meta[name] = definition
  }

  editor (name, definition) {
    // resolve the editor name automatically.
    if (typeof name === 'object') {
      definition = name.default
      name = definition.name
    }
    
    const component = _Vue.extend(definition)
    this.editors[name] = component
  }

  static install (Vue, options = {}) {
    if (_Vue) {
      // already installed
      return false
    }

    _Vue = Vue

    Vue.mixin(mixin(Vue, Object.assign({
      // Default builder options
    }, options)))

    // Install dependencies
    Vue.component('draggable', draggable)
  }

  static use (plugin, options = {}) {
    if (typeof plugin !== 'function') {
      return console.warn('Plugins must be a function')
    }

    // append to the list of to-be installed plugins.
    PLUGINS.push({ plugin, options })
  }

  static editor (name, definition) {
    // Just make a plugin that installs a editor.
    Builder.use((ctx) => {
      ctx.builder.editor(name, definition)
    })
  }

  static component (name, definition) {
    // Just make a plugin that installs a component.
    Builder.use((ctx) => {
      ctx.builder.component(name, definition)
    })
  }
}