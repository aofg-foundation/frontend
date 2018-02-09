<template lang="pug">
  section(
    v-styler="$sectionData.classes"
    :class="[{'is-editable': $builder.isEditing}, $sectionData.classes]"
    )
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
</template>

<script>
import * as types from '@/plugins/vuse/src/js/types';

export default {
  name: 'part-image',
  cover: '/covers/part-image.png',
  group: 'basic',
  $schema: {
    title: types.Title,
    back: types.Text,
    title: types.Text,
    subtitle: types.Text,
    classes: types.ClassList
  },
  props: {
    id: Number
  }
};
</script>