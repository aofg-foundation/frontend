import Vue from 'vue'
import Builder from './builder/builder'


// Register builder components
const blocks = ['Markdown','Paragraph','Title','Image', 'ThreeImages']
blocks.forEach(block => Builder.component(require(`@/components/builder/${block}`)))

// Register custom editors
Builder.editor(require(`@/components/builder/editors/Immutable`))

Vue.use(Builder)