import RendererComponent from './components/Renderer'
import BuilderComponent from './components/Builder'
import PageComponent from './components/PageComponent'
import Toolbar from './components/Toolbar'
import ComponentEditor from './components/ComponentEditor'

import Builder from './builder'

export default function(Vue, options) {
  // default editors
  Builder.editor(require('./components/editors/Enum'))
  Builder.editor(require('./components/editors/EnumMultiple'))
  Builder.editor(require('./components/editors/Markdown'))
  Builder.editor(require('./components/editors/TextArea'))
  Builder.editor(require('./components/editors/TextField'))
  Builder.editor(require('./components/editors/Number'))
  Builder.editor(require('./components/editors/Toggle'))
  Builder.editor(require('./components/editors/Wiswig'))

  const builder = new Builder(options)

  // Install builder component
  Vue.component('b-builder', Vue.extend(BuilderComponent))
  // Install renderer component
  Vue.component('b-renderer', Vue.extend(RendererComponent))
  // Install page component wrapper
  Vue.component('b-component', Vue.extend(PageComponent))
  // Install toolbar
  Vue.component('b-toolbar', Vue.extend(Toolbar))
  // Install editor
  Vue.component('b-editor',  Vue.extend(ComponentEditor).extend({
    components: builder.editors
  }))

  return {
    components: builder.components,
    
    beforeCreate () {
      this.$builder = builder
    }
  }
}