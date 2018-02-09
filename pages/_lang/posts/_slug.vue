<template lang="pug">
  section.post    
    .nk-header-title.nk-header-title-md.nk-header-title-parallax.nk-header-title-parallax-opacity
      .bg-image.op-5
        img(src='/uploaded/sunset-3084651_1920.jpg')
      .nk-header-table.align-items-end
        .nk-header-table-cell
          .nk-header-text.container
            .row.text-left.align-items-end
              .col-lg-8
                //- .nk-gap-5.d-none.d-lg-block                
                .text-left
                  h3.nk-title-back Blog
                  h1.nk-title.h1 {{ $tt(post.title) }}
                  //- .nk-title-sep-icon
                  //-   span.icon
                  //-     span.ion-paper-airplane
                //- .nk-gap-3.d-none.d-lg-block
                //- .nk-gap-5.d-none.d-lg-block
              .col-lg-4
                aside.nk-sidebar.nk-sidebar-right
                  //- .nk-gap-5.d-none.d-lg-block
                  //- .nk-gap.d-lg-none
                  table.nk-table.nk-table-shrink
                    tbody
                      tr
                        td
                          strong Published:
                        td September 18, 2016
                      tr
                        td
                          strong Category:
                        td
                          a(href='#') News
                      tr
                        td
                          strong Written by:
                        td
                          a(href='#') nK
                      tr
                        td
                          strong Views:
                        td 589
                      tr
                        td
                          strong Comments:
                        td 4
                      tr
                        td
                          strong Likes:
                        td
                          span.nk-action-heart
                            span.num 17
                            span.like-icon.ion-android-favorite-outline
                            span.liked-icon.ion-android-favorite
                  .nk-gap-5.d-lg-none
      .nk-header-text-bottom(style='opacity: 1; transform: translateY(0px) translateZ(0px);') test
    
    .nk-gap-6
    //- .container
    //-   .text-right
    //-     h3.nk-title-back Night Lesser Hath
    //-     h2.nk-title.h1 Там где начинается история
    //-     h4.nk-sub-title.text-main-1 Whales place heaven every
    //-     //- .nk-title-sep-icon
    //-     //-   span.icon
    //-     //-     span.ion-chatbubbles
    //-   .nk-gap-4

    //- .container
    //-   .row.align-items-center
    //-     .col-sm
    //-       p
    //-         span.nk-dropcap-3 I
    //-         span I'll input the multi-byte SMTP application, that should monitor the COM card! Use the open-source SQL hard drive, then you can compress the digital driver! Use the online XML driver, then you can hack the multi-byte firewall! The HDD interface is down, input the mobile panel so we can compress the SMTP port! You can't index the panel without generating the bluetooth IB transmitter! Use the multi-byte COM bus, then you can program the neural program! We need to index the wireless COM circuit! Try to back up the HTTP microchip, maybe it will connect the virtual array!
    //-     .col-sm          
    //-       .nk-image-box-2.nk-no-effect
    //-         //- a.nk-image-box-link(href='#')
    //-         img(src='~/assets/images/image-3-600x600.jpg')
    //-         .nk-image-box-overlay.nk-image-box-bottom
    //-           div
    //-             h3.nk-image-box-title.h4 Heading
    //-   .nk-gap-4

      
    //- .container
    //-   .text-center
    //-     h3.nk-title-back Night Lesser Hath
    //-     h2.nk-title.h1 Там где начинается история
    //-     h4.nk-sub-title.text-main-1 Whales place heaven every
    //-     //- .nk-title-sep-icon
    //-     //-   span.icon
    //-     //-     span.ion-chatbubbles
    //-   .nk-gap-4

      
    //- .container
    //-   .row.align-items-center
    //-     .col-sm          
    //-       .nk-image-box-2.nk-no-effect
    //-         //- a.nk-image-box-link(href='#')
    //-         img(src='~/assets/images/image-3-600x600.jpg')
    //-         .nk-image-box-overlay.nk-image-box-bottom
    //-           div
    //-             h3.nk-image-box-title.h4 Heading
    //-     .col-sm          
    //-       .nk-image-box-2.nk-no-effect
    //-         //- a.nk-image-box-link(href='#')
    //-         img(src='~/assets/images/image-3-600x600.jpg')
    //-         .nk-image-box-overlay.nk-image-box-bottom
    //-           div
    //-             h3.nk-image-box-title.h4 Heading
    //-     .col-sm          
    //-       .nk-image-box-2.nk-no-effect
    //-         //- a.nk-image-box-link(href='#')
    //-         img(src='~/assets/images/image-3-600x600.jpg')
    //-         .nk-image-box-overlay.nk-image-box-bottom
    //-           div
    //-             h3.nk-image-box-title.h4 Heading
    //-   .nk-gap-4

    div(v-for='(part, index) in body' :key='index')
      body-part(
        :partKey='index.toString()'
        :config='part'
        @addTo='(key) => partAddTo(key)'
        @addChild='(key) => partAddChild(key)'
        @moveUp='(key) => partMoveUp(key)'
        @moveDown='(key) => partMoveDown(key)'
        @changeType='(key, type) => partChangeType(key, type)'
      )
      
    .container.text-center
      button.nk-btn.nk-btn-xs.nk-btn-circle.nk-btn-outline.nk-btn-color-main-1(@click='addTo(-1)')
        span.icon
          i.fa.fa-plus
</template>

<script>
import BodyPart from '~/components/body-constructor/BodyPart'
export default {
  name: 'post',

  components: {
    BodyPart
  },

  computed: {
    body () {
      return this.post.body[this.$store.state.locale.locale]
    }
  },

  methods: {
    log (...args) {
      console.log(...args)
    },
    getContainer (path) {
      let container = this.body

      if (path.length > 1) {
        for (let index = 0; index < path.length - 1; index++) {
          const part = parseInt(path[index])
          container = container.children ? container.children[part].children : container[part].children
        }
      }
      
      return container
    },
    partAddTo (key) {
      const path = key.split(',')
      let container = this.getContainer(path)
      let place = path[path.length - 1]

      container.splice(place, 0, {
        component: "p",
        props: {
          text: "Place you content here..."
        }
      })
    },
    partAddChild (key) {
      const path = key.split(',')
      let place = path[path.length - 1]
      let container = this.getContainer(path)[place]

      this.$set(container, 'children', container.children || [])

      container.children.push({
        component: "p",
        props: {
          text: "Place you content here..."
        }
      })
    },
    partChangeType (key, type) {
      const path = key.split(',')
      let place = path[path.length - 1]
      let container = this.getContainer(path)[place]

      container.component = type
    },
    partMoveUp (key) {},
    partMoveDown (key) {}
  },

  async asyncData ({ app, params }) {
    const post = await app.$backend.findOne('Posts', {
      where: {
        slug: params.slug 
      },
      include: [
        'comments', 'author'
      ]
    })

    console.log(post)
    return {
      post,
      comments: await app.$backend.find('Comments', {
        where: {
          postId: post.id
        }
      })
    }
  }
}
</script>
