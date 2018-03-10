<template lang="pug">
  div
    link(rel='stylesheet', type='text/css', href='/vendor/katex/katex.min.css')
    .nk-page-border(v-if='show.border')
      .nk-page-border-t
      .nk-page-border-r
      .nk-page-border-b
      .nk-page-border-l

    //- slot(name='page-background' v-if='show.background')
      //- video-background(video="https://youtu.be/UkeDo1LhUqQ" placeholder='/images/page-background.jpg')

    header.nk-header.nk-header-opaque
      top-nav
      main-menu
      
    sidebar
    
    media-browser(v-if='show.mediaBrowser' @close='onMediaBrowserClose' @select='onMediaBrowserSelect')
    button(@click='openBrowser') Open Media Browser
    nuxt
    .nk-gap-6
    .nk-gap-6
    footer-part
</template>

<script>
import Footer from '@/containers/Footer'
import Sidebar from '@/containers/Sidebar'
import TopNav from '@/containers/TopNav'
import MainMenu from '@/containers/MainMenu'

export default {
  props: {
    show: {
      type: Object,
      default: () => ({
        background: true,
        topNav: false,
        mainMenu: true,
        languages: true,
        footer: true,
        mediaBrowser: false
      })
    },

    languages: {
      type: Array,
      default: () => [ "en", "ru", "fr", "de", "zh", "jp", "kr" ]
    }
  },

  data: () => ({
    admin: false,
  }),

  components: {
    'footer-part': Footer,
    Sidebar,
    TopNav,
    MainMenu
  },

  methods: {
    onMediaBrowserClose (reason) {
      this.$set(this.show, 'mediaBrowser', false)
    },
    onMediaBrowserSelect (image) {
      this.$set(this.show, 'mediaBrowser', false)
    },
    openBrowser () {
      this.show.mediaBrowser = true
    }
  }
}
</script>


<style>
@import url('https://fonts.googleapis.com/css?family=Alegreya+SC:500|Roboto+Condensed:300i,400,700&subset=cyrillic');

body {
  overflow-y: scroll;
}

</style>
