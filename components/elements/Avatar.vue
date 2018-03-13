<template lang="pug">
  div(:class="b()")
    img(:class="b('image')" :src='src' v-if='src')
    span(:class="b('letters')" v-else) {{ letters }}
</template>

<script>
export default {
  name: 'aofg-avatar',
  props: ['src', 'letters', 'size'],
  computed: {
    modificators () {
      return {
        size: this.size
      }
    }
  }
}
</script>

<style lang="scss">
@mixin size($width, $height: $width) {
  width: $width * 1px;
  height: $height * 1px;
}

.aofg-avatar {
  @include size(140);
  border-radius: 300px;
  overflow: hidden;
  background-color: #e08821;
  display: flex;
  align-items: center;
  justify-content: center;

  &__image {
    display: block;
    width: 100%;
    height: 100%
  }

  &__letters {
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 0.1em;
    font-size: 21px;

    &--size {
    &-sm { font-size: 18px; }
    &-md { font-size: 24px; }
    &-lg { font-size: 38px; }
    }
  }

  &--size {
    &-sm { @include size(60) }
    &-md { @include size(180) }
    &-lg { @include size(220) }
  }
}
</style>
