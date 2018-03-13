<template lang="pug">
  div(:class="b()")
    div(:class="b('mode-tabs')")
      // TODO: Move to tabs component
      h3(:class="b('mode-link', { selected: mode === 'auth' })" href="#" @click="mode = 'auth'") Login
      h3(:class="b('mode-link', { selected: mode === 'create' })" href="#" @click="mode = 'create'") Create Account
    transition(name='aofg-crypto-auth__mode-change')
      div(:class="b('tab-content')" v-if="mode === 'auth'")
        el-form(label-position="top")
          el-form-item(label="Email")
            el-input(name='authEmail' type='email' v-model='auth.email' placeholder='Enter your email')
          el-form-item(label="Password")
            el-input(name='authPassword' type='password' v-model='auth.password' placeholder='Strong password is required')

        button(:class='b("login", "nk-btn")' @click='loginWithAccount') Login
    transition(name='aofg-crypto-auth__mode-change')
      div(:class="b('tab-content')" v-if="mode === 'create'")
        el-form(label-position="top")
          el-form-item(label="Email")
            el-input(type='email' v-model='create.email' placeholder='Enter your email')
          el-form-item(label="Password")
            el-input(type='password' v-model='create.password' placeholder='Strong password is required')
          el-form-item(label="Repeat Password")
            el-input(type='password' v-model='create.repeatPassword' placeholder='Repeat your password')
          el-form-item()
            el-switch(v-model='create.ensure0' active-text="I understand that I will lose access to my funds if I lose my password")
          el-form-item()
            el-switch(v-model='create.ensure1' active-text="I understand that no one can recover my password if I lose or forget it")
          el-form-item()
            el-switch(v-model='create.ensure2' active-text="I have written down or otherwise stored my password")

        button(:class='b("create", "nk-btn")' @click='createAccount') Create
</template>

<script>
import { createAccount, loginWithAccount } from '@/libs/actions'
import { createWallet, sign, toBuffer } from '@/libs/crypto'
export default {
  name: 'aofg-crypto-auth',

  data: () => ({
    mode: 'auth',

    auth: {
      email: '',
      password: ''
    },
    create: {
      email: '',
      password: '',
      ensure0: false,
      ensure1: false,
      ensure2: false
    }
  }),

  computed: {
    modificators () {
      return {
        mode: this.mode
      }
    }
  },

  methods: {
    async createAccount (evt) {
      evt.preventDefault()
      const response = await createAccount(this.create.email, this.create.password)
      console.log(response)
      // this.$store.dispatch('signer/unlock', { email: this.create.email, password: this.create.password })
      // this.$store.dispatch('auth/signup', { email: this.create.email, address: this.$store.state.signer.address })
      // const walletData = await createWallet(this.create.email, this.create.password)
      // const wallet = walletData.wallets[0]
      // console.log(wallet)

      // const payload = {
      //   email: this.create.email,
      //   address: wallet.address
      // }
      
      // const signature = await sign(toBuffer(payload), wallet.pkey)

      // console.log(await this.$backend.signup(payload, signature.encoded))
      /* 

      send to backend
      {
        "address": "0xfb5bea81ee63438cd1dc388951e5b5ddde425d07",
        "signature": (65-bytes of sig),
        "email": (email)
      }

      auth:
      1) request auth message for (email)
      2) sig message (from address)
      3) send to server
      */
    },

    async loginWithAccount (evt) {
      evt.preventDefault()
      const response = await loginWithAccount(this.auth.email, this.auth.password)
      console.log(response)
      // console.log(this.auth)

      // const walletData = await createWallet(this.auth.email, this.auth.password)
      // const wallet = walletData.wallets[0]
      // console.log(wallet)

      // const payload = {
      //   email: this.auth.email,
      //   address: wallet.address
      // }

      // const nonceResponse = await this.$backend.nonce(payload)
      // console.log(nonceResponse)
      // const { nonce } = nonceResponse
      // console.log(nonce)
      // payload.nonce = nonce + 1

      // const signature = await sign(toBuffer(payload), wallet.pkey)
      // const token = await this.$backend.login(payload, signature.encoded)

      // console.log(token)
    }
  }

}
</script>

<style lang="scss">
.aofg-crypto-auth {
  width: 100%;

  &__mode-change {
    &-leave-to,
    &-enter {
      opacity: 0;
      transform: translate3d(30%, 0, 0);
    }
    
    &-leave,
    &-enter-to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }

    &-enter-active,
    &-leave-active {
      position: absolute;
      width: calc(100% - 40px);
      transition: opacity 0.2s ease, transform 0.2s ease;
    }
  }

  &__mode-tabs {
    margin: 0;
    padding: 0;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    height: 45px;
  }

  &__mode-link {
    margin-right: 10px;
    font-size: 18px;
    opacity: 0.75;
    cursor: pointer;
    transition: opacity 0.2s ease, font-size 0.1s ease, color 0.2s ease;

    color: white;

    &:hover {
      opacity: 1;
    }

    &--selected {
      color: saturate(lighten(#e08821, 5%), 10%);
      font-size: 24px;
      opacity: 1;
    }
  }

  .el-switch {
    &__label {
      color: rgba(255, 255, 255, 0.75);

      &.is-active {
        color: white;
      }
    }
  }

  .el-form-item__label {
    color: white;
    opacity: 0.8;
  }
}
</style>

