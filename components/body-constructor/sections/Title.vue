<template lang="pug">
  section(
    v-styler="$sectionData.classes"
    :class="[{'is-editable': $builder.isEditing}, $sectionData.classes]"
    )
    .nk-gap-2
    .container
      h3.nk-title-back(
        :class="{'is-editable': $builder.isEditing}"
        v-if="$sectionData.back || $builder.isEditing"
        v-styler="$sectionData.back"
        v-html="$sectionData.back"
      )
      h2.nk-title.h1(
        :class="{'is-editable': $builder.isEditing}"
        v-html="$sectionData.title" 
        v-styler="$sectionData.title"
      )
      h4.nk-sub-title.text-main-1(
        :class="{'is-editable': $builder.isEditing}"
        v-if="$sectionData.subtitle || $builder.isEditing"
        v-styler="$sectionData.subtitle"
        v-html="$sectionData.subtitle"
      )
    .nk-gap-2
</template>

<script>
import * as types from '@/plugins/vuse/src/js/types';

export default {
  name: 'part-title',
  cover: '/covers/part-title.png',
  group: 'basic',
  $schema: {
    back: types.Title,
    title: types.Title,
    subtitle: types.Title,
    classes: types.ClassList
  },
  props: {
    id: Number
  }
};
</script>