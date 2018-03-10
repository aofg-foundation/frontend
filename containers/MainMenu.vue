<template lang="pug">  
  nav.nk-navbar.nk-navbar-top.nk-navbar-sticky
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
</template>
<script>
export default {
  name: 'main-menu'
}
</script>
