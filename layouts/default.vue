<template lang="pug">
  div  
    //- link(rel='stylesheet', href='/vendor/font-awesome/css/font-awesome.min.css')
    //- //- // IonIcons
    //- link(rel='stylesheet', href='/vendor/ionicons/css/ionicons.min.css')
    //- // Revolution Slider
    //- link(rel='stylesheet', type='text/css', href='/vendor/revolution/css/settings.css')
    //- link(rel='stylesheet', type='text/css', href='/vendor/revolution/css/layers.css')
    //- link(rel='stylesheet', type='text/css', href='/vendor/revolution/css/navigation.css')
    //- // Flickity
    //- link(rel='stylesheet', href='/vendor/flickity/dist/flickity.min.css')
    //- // Photoswipe
    //- link(rel='stylesheet', type='text/css', href='/vendor/photoswipe/dist/photoswipe.css')
    //- link(rel='stylesheet', type='text/css', href='/vendor/photoswipe/dist/default-skin/default-skin.css')
    //- // DateTimePicker
    //- link(rel='stylesheet', type='text/css', href='/vendor/jquery-datetimepicker/build/jquery.datetimepicker.min.css')
    //- // Summernote
    link(rel='stylesheet', type='text/css', href='/vendor/katex/katex.min.css')
    .nk-page-border
      .nk-page-border-t
      .nk-page-border-r
      .nk-page-border-b
      .nk-page-border-l

    video-background(video="https://youtu.be/UkeDo1LhUqQ" placeholder='/images/page-background.jpg')

    header.nk-header.nk-header-opaque          
      .nk-contacts-top
        .container
          .nk-contacts-left
            .nk-navbar
              ul.nk-nav
                li.nk-drop-item
                  a(href='#') USA
                  ul.dropdown
                    li
                      a(href='#') USA
                    li
                      a(href='#') Russia
                    li
                      a(href='#') United Kingdom
                    li
                      a(href='#') France
                    li
                      a(href='#') Spain
                    li
                      a(href='#') Germany
                li
                  a(href='#') Privacy
                li
                  a(href='page-contact.html') Contact
          .nk-contacts-right
            .nk-navbar
              ul.nk-nav
                li
                  a(href='https://twitter.com/nkdevv', target='_blank')
                    span.ion-social-twitter
                li
                  a(href='https://dribbble.com/_nK', target='_blank')
                    span.ion-social-dribbble-outline
                li
                  a(href='#')
                    span.ion-social-instagram-outline
                li
                  a(href='#')
                    span.ion-social-pinterest
      nav.nk-navbar.nk-navbar-top.nk-navbar-sticky.nk-navbar-autohide
        .container
          .nk-nav-table
            router-link.nk-nav-logo(:to='{ name: "lang", params: {} }') 
              img(src='~/assets/images/logo.png', alt='', width='90')
            ul.nk-nav.nk-nav-right.hidden-md-down(data-nav-mobile='#nk-nav-mobile')
            ul.nk-nav.nk-nav-right.nk-nav-icons
              li.single-icon.hidden-lg-up
                a.no-link-effect(href='#', data-nav-toggle='#nk-nav-mobile')
                  span.nk-icon-burger
                    span.nk-t-1
                    span.nk-t-2
                    span.nk-t-3
              li.single-icon
                a.nk-search-toggle.no-link-effect(href='#')
                  span.nk-icon-search
              li.single-icon
                a.no-link-effect(href='#', data-nav-toggle='#nk-side')
                  span.nk-icon-burger
                    span.nk-t-1
                    span.nk-t-2
                    span.nk-t-3
    nuxt

            
    .nk-gap-6
    .nk-gap-6
        
    footer.nk-footer.nk-footer-parallax.nk-footer-parallax-opacity
      img.nk-footer-top-corner(src='~/assets/images/footer-corner.png', alt='')
      .container
        .nk-gap-2
        .nk-footer-logos
          a(href='https://themeforest.net/user/_nk/portfolio?ref=_nK', target='_blank')
            img.nk-img(src='~/assets/images/footer-logo-godlike.png', alt='', width='120')
          a(href='https://themeforest.net/user/_nk/portfolio?ref=_nK', target='_blank')
            img.nk-img(src='~/assets/images/footer-logo-yp3.png', alt='', width='120')
          a(href='https://themeforest.net/user/_nk/portfolio?ref=_nK', target='_blank')
            img.nk-img(src='~/assets/images/footer-logo-nk-team.png', alt='', width='150')
          a(href='https://themeforest.net/user/_nk/portfolio?ref=_nK', target='_blank')
            img.nk-img(src='~/assets/images/footer-logo-pegi-18.png', alt='', width='46')
          a(href='https://themeforest.net/user/_nk/portfolio?ref=_nK', target='_blank')
            img.nk-img(src='~/assets/images/footer-logo-18-restricted.png', alt='', width='160')
        .nk-gap
        p 
          | &copy; 2018 nK Group Inc. Developed in association with LoremInc.
          | IpsumCompany, SitAmmetGroup, CumSit and related logos are registered trademarks. 
          | GodLike and related logos are registered trademarks or trademarks of id Software 
          | LLC in the U.S. and/or other countries. All other trademarks or trade names are 
          | the property of their respective owners. All Rights Reserved.
        p
          | GodLike &reg;: The Darkness&trade; is a fowl beginning there Over had moveth so 
          | land wherein, fruit very gathering of, female creepeth. Dominion above sea gathered 
          | unto whales. Subdue to, have Life fowl firmament wherein. Great air without for, 
          | great him he That let earth together thing sea fly gathering. Air whose. 
          | Green in face tree to spirit life. Place stars. It two. Deep seed man isn't third. 
          | Own he is may had darkness waters you'll forth fifth their don't also fruitful 
          | be years in spirit to tree. Sixth fourth open female.
        .nk-footer-links
          a.link-effect(href='#') Terms of Service
          a.link-effect(href='#') Privacy Policy
        .nk-gap-4


        //- script(src='/vendor/jquery/dist/jquery.min.js')
        //- script(src='/vendor/object-fit-images/dist/ofi.min.js')
        //- // GSAP
        //- script(src='/vendor/gsap/src/minified/TweenMax.min.js')
        //- script(src='/vendor/gsap/src/minified/plugins/ScrollToPlugin.min.js')
        //- // Popper
        //- script(src='/vendor/popper.js/dist/umd/popper.min.js')
        //- // Bootstrap
        //- script(src='/vendor/bootstrap/dist/js/bootstrap.min.js')
        //- // Sticky Kit
        //- script(src='/vendor/sticky-kit/dist/sticky-kit.min.js')
        //- // Jarallax
        //- script(src='/vendor/jarallax/dist/jarallax.min.js')
        //- script(src='/vendor/jarallax/dist/jarallax-video.min.js')
        //- // imagesLoaded
        //- script(src='/vendor/imagesloaded/imagesloaded.pkgd.min.js')
        //- // Flickity
        //- script(src='/vendor/flickity/dist/flickity.pkgd.min.js')
        //- // Isotope
        //- script(src='/vendor/isotope-layout/dist/isotope.pkgd.min.js')
        //- // Photoswipe
        //- script(src='/vendor/photoswipe/dist/photoswipe.min.js')
        //- script(src='/vendor/photoswipe/dist/photoswipe-ui-default.min.js')
        //- // Typed.js
        //- script(src='/vendor/typed.js/lib/typed.min.js')
        //- // Jquery Form
        //- script(src='/vendor/jquery-form/dist/jquery.form.min.js')
        //- // Jquery Validation
        //- script(src='/vendor/jquery-validation/dist/jquery.validate.min.js')
        //- // Jquery Countdown + Moment
        //- script(src='/vendor/jquery-countdown/dist/jquery.countdown.min.js')
        //- script(src='/vendor/moment/min/moment.min.js')
        //- script(src='/vendor/moment-timezone/builds/moment-timezone-with-data.min.js')
        //- // Hammer.js
        //- script(src='/vendor/hammerjs/hammer.min.js')
        //- // NanoSroller
        //- script(src='/vendor/nanoscroller/bin/javascripts/jquery.nanoscroller.js')
        //- // SoundManager2
        //- script(src='/vendor/soundmanager2/script/soundmanager2-nodebug-jsmin.js')
        //- // DateTimePicker
        //- script(src='/vendor/jquery-datetimepicker/build/jquery.datetimepicker.full.min.js')
        //- // Revolution Slider
        //- script(type='text/javascript', src='/vendor/revolution/js/jquery.themepunch.tools.min.js')
        //- script(type='text/javascript', src='/vendor/revolution/js/jquery.themepunch.revolution.min.js')
        //- script(type='text/javascript', src='/vendor/revolution/js/extensions/revolution.extension.video.min.js')
        //- script(type='text/javascript', src='/vendor/revolution/js/extensions/revolution.extension.carousel.min.js')
        //- script(type='text/javascript', src='/vendor/revolution/js/extensions/revolution.extension.navigation.min.js')
        //- // Keymaster
        //- script(src='/vendor/keymaster/keymaster.js')
        //- // Summernote
        //- script(src='/vendor/summernote/dist/summernote.min.js')
        //- // GODLIKE
        //- script(src='/js/godlike.min.js')
        //- //- script(src='/js/godlike-init.js')
        // END: Scripts
</template>

<script>
import VideoBackground from '~/components/VideoBackground'
export default {
  components: {
    VideoBackground
  }
}
</script>


<style>
@import url('https://fonts.googleapis.com/css?family=Alegreya+SC:500|Roboto+Condensed:300i,400,700&subset=cyrillic');

body {
  overflow-y: scroll;
}

</style>
