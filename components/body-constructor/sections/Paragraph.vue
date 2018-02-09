<template lang="pug">
  section(
    v-styler="$sectionData.classes"
    :class="[{'is-editable': $builder.isEditing}, $sectionData.classes]"
    )
    .nk-gap-1
    .container
    
      p
        span(
          :class="{'is-editable': $builder.isEditing}"
          v-if="$sectionData.dropcap || $builder.isEditing"
          v-styler="$sectionData.dropcap"
          v-html="$sectionData.text[0]"
        )
        span(
          :class="{'is-editable': $builder.isEditing}"
          v-if="$sectionData.text || $builder.isEditing"
          v-styler="$sectionData.text"
          v-html="$sectionData.text"
        )
    .nk-gap-2
      //- h3.nk-title-back(
      //-   :class="{'is-editable': $builder.isEditing}"
      //-   v-if="$sectionData.back || $builder.isEditing"
      //-   v-styler="$sectionData.back"
      //-   v-html="$sectionData.back"
      //- )
      //- h2.nk-title.h1(
      //-   :class="{'is-editable': $builder.isEditing}"
      //-   v-html="$sectionData.title" 
      //-   v-styler="$sectionData.title"
      //- )
      //- h4.nk-sub-title.text-main-1(
      //-   :class="{'is-editable': $builder.isEditing}"
      //-   v-if="$sectionData.subtitle || $builder.isEditing"
      //-   v-styler="$sectionData.subtitle"
      //-   v-html="$sectionData.subtitle"
      //- )
</template>

<script>
import * as types from '@/plugins/vuse/src/js/types';

export default {
  name: 'part-paragraph',
  cover: '/covers/part-paragraph.png',
  group: 'basic',
  $schema: {
    text: types.Text,
    dropcap: types.Boolean,
    classes: types.ClassList
  },
  props: {
    id: Number
  }
};
</script>