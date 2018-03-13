<template lang="pug">
  div(:class="b()")
    div(:class="b('nodes')")      
      el-select(v-model='selectedNode' placeholder='Select node')
        el-option(v-for='node in availableNodes', :key='node.endpoint', :label='node.name', :value='node.endpoint')
    div(:class="b('meta')")
      div(:class="b('user-pic')")
        avatar(:src='avatar' :letters='avatarLetters' size="sm")
      div(:class="b('wallet')")
        span(:class="b('wallet-address')") {{ address }}
</template>

<script>
import Avatar from '@/components/elements/Avatar'

export default {
  name: 'aofg-connection',
  components: {
    Avatar
  },
  data: () => ({ selectedNode: null }),
  computed: {
    availableNodes () {
      return this.$store.state.network.nodes
    },
    address () {
      return this.$store.state.signer.address
    },
    account () {
      return this.$store.state.auth.account
    },
    displayName () {
      return this.account.display || this.account.email
    },
    avatar () {
      return null
    },
    avatarLetters () {
      return this.displayName.substring(0, 2)
    }
  },

  watch: {
    address: 'subscribeOnAddress'
  },

  methods: {
    async subscribeOnAddress () {
      if (this.address) {
        alert('subscribe on: ' + this.address)
      }
    }
  },
  
  async mounted () {
    await this.$store.dispatch('network/connect')
    await this.subscribeOnAddress()
    this.selectedNode = this.$store.state.network.selectedNode.endpoint

  }
}
</script>

<style lang="scss">
.aofg-connection {
  width: 100%;

  &__meta {
    display: flex    
  }

  &__user-pic {
    flex-shrink: 0;
    margin-right: 10px;
  }

  &__wallet {
    overflow: hidden;

    &-address {
      display: block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

}
</style>
