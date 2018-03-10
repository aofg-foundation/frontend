import Vue from 'vue'
const MediaBrowser = () => import('./containers/MediaBrowser')

Vue.component('media-browser', MediaBrowser)