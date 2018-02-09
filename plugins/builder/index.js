import RendererComponent from './components/Renderer'
import BuilderComponent from './components/Builder'
import PageComponent from './components/PageComponent'
import Toolbar from './components/Toolbar'
import ComponentEditor from './components/ComponentEditor'

let _Vue

export default {
  install: function (Vue, options = {}) {
    if (_Vue) {
      // already installed
      return false
    }

    _Vue = Vue

    Vue.mixin(mixin(Object.assign({
      // Default builder options
    }, options)))

    // Install builder component
    Vue.component('b-builder', Vue.extend(BuilderComponent))
    // Install renderer component
    Vue.component('b-renderer', Vue.extend(RendererComponent))
    // Install page component wrapper
    Vue.component('b-component', Vue.extend(PageComponent))
    // Install toolbar
    Vue.component('b-toolbar', Vue.extend(Toolbar))
    // Install editor
    Vue.component('b-editor', Vue.extend(ComponentEditor))

    // Install dependencies
    Vue.component('draggable', draggable)
  }
}