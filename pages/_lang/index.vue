<template lang="pug">
  section.page
    .nk-header-title.nk-header-title-lg.nk-header-title-parallax.nk-header-title-parallax-opacity
      .bg-image
        img.jarallax-img(src='~/assets/pictures/dreams-2904682.jpg', alt='')
      .nk-header-table
        .nk-header-table-cell
          .container
            .nk-header-text
              h1.nk-title.display-3 GodLike
              .nk-gap-2
              a.nk-btn.nk-btn-lg.nk-btn-color-main-1.link-effect-4(
                href='https://themeforest.net/item/godlike-the-game-template/17166433?ref=_nK'
                target='_blank'
                style='margin-right: 25px'
              )
                span Purchase
              a.nk-btn.nk-btn-lg.link-effect-4(href='https://nkdev.info/docs/godlike-html/')
                span Documentation
              .nk-gap-4
    div.container  
      .nk-gap-6
      .nk-gap-2
      .row.vertical-gap.lg-gap
        .col-md-4
          .nk-ibox
            .nk-ibox-icon.nk-ibox-icon-circle
              span.ion-ios-game-controller-b
            .nk-ibox-cont
              h2.nk-ibox-title Incredible Atmosphere
              span 
                | Second Made make spirit green divide lesser creeping void and night 
                | replenish cattle don't was female first their day open.
        .col-md-4
          .nk-ibox
            .nk-ibox-icon.nk-ibox-icon-circle
              span.ion-fireball
            .nk-ibox-cont
              h2.nk-ibox-title Catchy Battles
              span
                | Image their gathered. Every. Called together signs winged, unto 
                | midst sea life air them. Us sea them shall you saw.
        .col-md-4
          .nk-ibox
            .nk-ibox-icon.nk-ibox-icon-circle
              span.ion-ribbon-a
            .nk-ibox-cont
              h2.nk-ibox-title 28 Awards
              span 
                | Moveth fruitful it appear wherein man don't firmament set blessed.
                | Beast seas god itself. Made night image male. Own night.
      .nk-gap-2
      .nk-gap-6
      h2.subtitle Test
      ul(v-for="post in posts" :key="post.id")
        li
          router-link(:to='{ name: "lang-posts-slug", params: { slug: post.slug } }') {{ $tt(post.title) }}
      .links
        router-link(to='/about') About
        a(@click='testStoreContext' href="#") Test Func
</template>

<script>

export default {
  async asyncData ({ app }) {
    // return new Promise((resolve) => {
    //   setTimeout(function () {
    //     resolve({ name: 'world' })
    //   }, 1000)
    // })
    return {
      posts: await app.$backend.find('Posts')
    }
  },

  mounted () {
    console.log(this.$router)
  },

  methods: {
    testStoreContext () {
      this.$store.dispatch('auth/signIn', {
        email: 'test',
        password: 'test'
      })
    }
  }
}
</script>

<style>
</style>
