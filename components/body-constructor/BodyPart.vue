<template lang="pug">
  .body-part
    div.body-part-control-panel
      .container.text-right(:style='child ? "padding: 0" : ""')
        button.nk-btn-select.nk-btn.nk-btn-xs.nk-btn-circle.nk-btn-outline.nk-btn-color-main-3
          span change type
          span.icon
            i.fa.fa-caret-down
        
          ul.nk-btn-select-dropdown.ntc-btn-select-dropdown-xs
            li(
              v-for='possibleType in Object.keys(partTypes)'
              :class='possibleType === type ? "selected" : ""'
              @click='$emit("changeType", partKey, possibleType)'
            ) {{ partTypes[possibleType] }}
        button.nk-btn.nk-btn-xs.nk-btn-circle.nk-btn-outline.nk-btn-color-main-3(@click='$emit("addTo", partKey)')
          span add before
          span.icon
            i.fa.fa-plus
        button.nk-btn.nk-btn-xs.nk-btn-circle.nk-btn-outline.nk-btn-color-main-3(@click='$emit("addChild", partKey)')
          span add child
          span.icon
            i.fa.fa-plus
        button.nk-btn.nk-btn-only-icon.nk-btn-xs.nk-btn-circle.nk-btn-outline.nk-btn-color-main-3(@click='$emit("moveUp", partKey)')
          span.icon
            i.fa.fa-caret-up
        button.nk-btn.nk-btn-only-icon.nk-btn-xs.nk-btn-circle.nk-btn-outline.nk-btn-color-main-3(@click='$emit("moveDown", partKey)')
          span.icon
            i.fa.fa-caret-down

    .nk-gap-2(v-if='!child')
    .nk-gap-1(v-else)

    .container(:style='child ? "padding: 0" : ""')
      p(v-if='type === "p"')
        span.nk-dropcap-3(v-if='!props.hideCap && !child') {{ props.text[0] }}
        span {{ props.text }}
      blockquote.nk-blockquote(v-if='type === "blockquote"')
        .nk-blockquote-icon &ldquo;
        em {{ props.text}}
        .nk-blockquote-author(v-if='props.author') 
          router-link(:to="{ name: 'lang-peoples-id', params: { id: props.author.id}}" v-if="props.author.id")
            span {{ props.author.displayName }}
          span(v-else) {{ props.author.displayName }}
      pre.nk-code(v-if='type === "code"') {{ props.text }}

      .row(v-if='type === "row"' :class='`align-items-${props.align || "center"}`')
        .col-md(v-if='children && children.length' v-for='(child, index) in children' :key='`${partKey},${index}`')
          body-part(
            :config='child' 
            :child='true' 
            :last='index == children.length - 1'
            :partKey='`${partKey},${index}`'

            @addTo='(key) => $emit("addTo", key)'
            @changeType='(key, type) => $emit("changeType", key, type)'
            @addChild='(key) => $emit("addChild", key)'
            @moveUp='(key) => $emit("moveUp", key)'
            @moveDown='(key) => $emit("moveDown", key)')
            
      .text-right(v-if='type == "title"')
        h3.nk-title-back(v-if="props.back") {{ props.back }}
        h2.nk-title.h1 {{ props.text }}
        h4.nk-sub-title.text-main-1(v-if="props.sub") {{ props.sub }}

        
      .nk-image-box-2.nk-no-effect(v-if='type === "image"')
        //- a.nk-image-box-link(href='#')
        img(:src='props.src')
        .nk-image-box-overlay.nk-image-box-bottom(v-if="props.heading")
          div
            h3.nk-image-box-title.h4 {{ props.heading }}

      body-part(
        v-if='children && children.length && type !== "row"' 
        v-for='(child, index) in children' 
        :config='child' 
        :child='true' 
        :last='index == children.length - 1' 
        :key='`${partKey},${index}`'
        :partKey='`${partKey},${index}`'

        @addTo='(key) => $emit("addTo", key)'
        @changeType='(key, type) => $emit("changeType", key, type)'
        @addChild='(key) => $emit("addChild", key)'
        @moveUp='(key) => $emit("moveUp", key)'
        @moveDown='(key) => $emit("moveDown", key)'
      )

    div(v-if='!last')
      .nk-gap-3(v-if='!child')
      .nk-gap-2(v-else)
</template>

<script>
const partTypes = {
  p: 'Paragraph',
  blockquote: 'Blockquote',
  code: 'Code',
  row: 'Row',
  image: 'Image',
  title: 'Title'
}
export default {
  name: 'body-part',
  props: ['config', 'child', 'last', 'partKey'],

  data: () => ({
    partTypes
  }),

  computed: {
    type () {
      return this.config.component
    },
    props () {
      return this.config.props
    },
    children () {
      return this.config.children
    }
  }
}
</script>

