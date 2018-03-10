<template lang="pug">  
  nav#nk-side.nk-navbar.nk-navbar-side.nk-navbar-right-side.nk-navbar-lg.nk-navbar-align-center.nk-navbar-overlay-content.open(style='transform: translateX(-100%)')
    .nk-navbar-bg
      lazy-image(
        source="http://localhost:3000/api/containers/site/download/ae274652677e247471ee2d39f17a42ce669404edada8473e21880c2b118b1eed.jpg"
        loading="http://localhost:3000/api/containers/site/download/a610a93a8208af7212412bee2d844cc81a86e1aa976bb8e652d1ce7816b9c3a4.jpg"
        :width="550"
        :height="1080"
        :background="true"
      )
    .nano
      .nano-content
        .nk-nav-table
          .nk-nav-row
            a.nk-nav-logo(href='index.html')
              img(src='~/assets/images/logo.svg', alt='', width='150')
          //- .nk-nav-row.nk-nav-row-full.nk-nav-row-center(style='padding: 20px')
          div
            form.nk-sign-form-login.active(action='#')
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
import LazyImage from '@/components/LazyImage'
import VideoBackground from '~/components/VideoBackground'

export default {
  name: 'sidebar',
  components: {
    LazyImage
  }
}
</script>
