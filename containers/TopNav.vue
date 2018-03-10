<template lang="pug">
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
</template>

<script>
export default {
  name: 'top-nav'
}
</script>
