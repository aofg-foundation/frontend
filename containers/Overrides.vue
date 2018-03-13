<template lang="pug">
  div
</template>

<style lang="scss">
.el {
  &-input {
    &__inner {
      background-color: transparent;
      border-radius: 0;
      border: 0;
      border-bottom: 1px solid #dcdfe6;
      color: inherit;
    }
  }
  //el-switch__input
  &-switch {
    &__core { 
      flex-shrink: 0;
      background-color: rgba(0,0,0,0.3);
      border-color: rgba(0,0,0,0.3);
    }
    &__label {
    }

    &.is-checked {
      .el-switch__core {
        background-color: #e08821;
        border-color: #e08821;
      }
    }
  }
  // .el-form-item__label
  &-form {
    &-item {
      &__label {
        line-height: inherit;
      }
    }
  }
}
</style>
