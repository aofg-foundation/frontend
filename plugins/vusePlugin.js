import Vue from 'vue';
// import Uploader from './vuse/src/js/components/Uploader';
import Builder from './vuse/src/js/builder';
// import pwa from './vuse/src/js/plugins/pwa';

import {
  Title,
  Paragraph,
  Blockquote,
  Image,
} from '@/components/body-constructor'

// add the uploader to the list of sub-components.
// Builder.mix({
//   components: {
//     Uploader
//   }
// });

const sections = [
  Title,
  Paragraph,
  Blockquote,
  Image
]

// register components.
sections.forEach(section => Builder.component(section))

// install pwa plugin.
// Builder.use(pwa);

// install the builder
Vue.use(Builder, {
  themes: [{
    name: 'Godlike',
    sections,
  }]
});

// new Vue({
//   el: '#app',
//   methods: {
//     onSave (builder) {
//       builder.export('preview');
//       builder.export('pwa');
//     }
//   }
// });
