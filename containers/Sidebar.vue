<template lang="pug">  
  nav(:class="b()")
    div(:class="b('bg')")
      lazy-image(
        :class="b('bg-content')"
        source="http://localhost:3000/api/containers/site/download/ae274652677e247471ee2d39f17a42ce669404edada8473e21880c2b118b1eed.jpg"
        loading="http://localhost:3000/api/containers/site/download/a610a93a8208af7212412bee2d844cc81a86e1aa976bb8e652d1ce7816b9c3a4.jpg"
        :width="350"
        :height="1080"
        :background="true"
      )
    
    div(:class="b('content')")
      img(:class="b('logo')" src='~/assets/images/logo.svg')
      crypto-auth(:class="b('auth')" v-if='!authenticated')
      connection(:class="b('connection')" v-else)

    //- .nano
      .nano-content
        .nk-nav-table
          .nk-nav-row
            a.nk-nav-logo(href='index.html')
              img(src='~/assets/images/logo.svg', alt='', width='150')
          //- .nk-nav-row.nk-nav-row-full.nk-nav-row-center(style='padding: 20px')
          div
            form.nk-sign-form.nk-form.nk-form--black-bg(action='#')
              input.form-control(type='text', placeholder='Username or Email')
              .nk-gap-2
              input.form-control(type='password', placeholder='Password')
              .nk-gap-2
              .form-check.float-left
                label.form-check-label
                  input.form-check-input(type='checkbox')
                  span Remember me
              button.nk-btn.nk-btn-color-white.link-effect-4.float-right Log In
              .clearfix
              .nk-gap-1
              a.nk-sign-form-lost-toggle.float-right(href='#') Lost Password?
            //- ul.nk-nav
              li.test
                a(href='page-contact.html') test
              li.test
                a(href='page-coming-soon.html') test
              li.test
                a(href='page-404.html') test
              li.test
                a(href='page-age-check.html') test
              li.nk-drop-item
                a(href='#') test
                ul.dropdown
                  li.test
                    a(href='#1') test
                  li.nk-drop-item
                    a(href='#2') test
                    ul.dropdown
                      li.test
                        a(href='#1') test
                      li.test
                        a(href='#2') test
                  li.nk-drop-item
                    a(href='#3') test
                    ul.dropdown
                      li.test
                        a(href='#') test
                  li.nk-drop-item
                    a(href='#4') test
                    ul.dropdown
                      li.test
                        a(href='#') test
          .nk-nav-row
            .nk-nav-footer
</template>

<script>
import { mapGetters } from 'vuex'

import LazyImage from '@/components/LazyImage'
import VideoBackground from '~/components/VideoBackground'

import CryptoAuth from '@/containers/CryptoAuth'
import Connection from '@/containers/Connection'

export default {
  name: 'aofg-sidebar',
  props: {
    size: {
      type: String,
      default: 'md'
    }
  },
  computed: {
    modificators () {
      return {
        size: this.size
      }
    },
    // TODO: mapState
    authenticated () {
      return this['auth/ready'] && this['signer/ready']
    },

    ...mapGetters(['auth/ready', 'signer/ready'])
  },
  components: {
    LazyImage,
    CryptoAuth,
    Connection
  }
}
</script>


<style lang="scss">
$aofg-sidebar-z: 1001 !default;
$aofg-sidebar-bg-z: 0 !default;
$aofg-sidebar-content-z: 1 !default;

.aofg-sidebar {
  width: 100%;
  position: fixed;
  height: 100%;
  top: 0;
  bottom: 0;

  z-index: $aofg-sidebar-z;

  &--size {
    &-sm { max-width: 210px }
    &-md { max-width: 350px }
    &-lg { max-width: 420px }
  }

  &--side {
    &-right { right: 0; left: auto }
    &-left { left: 0; right: auto }
  }

  &__bg {
    position: absolute;
    top: 0; bottom: 0; left: 0; right: 0;
    z-index: $aofg-sidebar-bg-z;
    background-color: black;

    &-content { opacity: 0.55; }
  }

  &__content {
    position: relative;
    z-index: $aofg-sidebar-content-z;

    display: flex;
    flex-direction: column;
    align-items: center;

    height: 100%;

    padding: 50px 20px;
  }

  &__logo {
    width: 100%;
    max-width: 160px;

    margin-bottom: 65px;
  }

  &__auth {
    margin-bottom: auto;
  }
}
</style>
