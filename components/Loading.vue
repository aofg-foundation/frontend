<template lang="pug">
  .nk-preloader(v-if='loading')
    //
      Preloader animation
      data-close-... data used for closing preloader
      data-open-...  data used for opening preloader
    .nk-preloader-bg(
      v-if='state'
      :style='loadingStyles'
      ref='loader'
    )
    .nk-preloader-content(
      :style='`opacity: ${logo}`'
    )
      div
        img.nk-img(
          src='~/assets/images/logo.svg'
          alt='GodLike - Gaming Bootstrap 4 Template'
          width='170'
        )
        .nk-preloader-animation
    .nk-preloader-skip Skip
</template>

<script>

Math.lerp = function (value1, value2, amount) {
	amount = amount < 0 ? 0 : amount;
	amount = amount > 1 ? 1 : amount;
	return value1 + (value2 - value1) * amount;
};

export default {
  name: 'loading',
  data: () => ({
    loading: false,
    finished: false,
    close: {
      frames: 22,
      speed: 3.5,
      sprites: '/preloader/bg.png',
      loaded: false,
      position: 0,
      logo: [1, -5]
    },
    open: {
      frames: 22,
      speed: 3.5,
      sprites: '/preloader/bg-bw.png',
      loaded: false,
      position: 0,
      logo: [-5, 1]
    },
    logo: 0,
    state: null
  }),

  computed: {
    loadingStyles () {
      return {
        'background-image': `url(${this.state.sprites})`,
        'background-position': `${this.state.position}% 50%`,
        'background-size': `${this.state.frames * 100}vw 100vh`, 
        'background-color': 'transparent'
      }
    }
  },

  async mounted () {
    await this.preloadImages(this.open)
    this.preloadImages(this.close)

    this.loop()
  },

  methods: {
    preloadImages (data) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = function onImgLoad() {
            data.width  = this.width;
            data.height = this.height;
            data.loaded = true;
            resolve(data)
        };
        img.src = data.sprites;
      })
    },
    start () {
      this.finished = false
      this.loading = true
      this.state = Object.assign({
        progress: 0,
        time: 0,
        position: 0
      }, this.open)
    },
    finish () {
      this.finished = true
      this.state = Object.assign({
        progress: 0,
        time: 0,
        position: 0
      }, this.close)
    },


    loop () {
      const dt = (1000 / 60) / 1000
      if (this.state) {
        this.state.time += dt
        this.state.progress = Math.min(1, this.state.time / this.state.speed)
        this.state.frame = Math.floor(this.state.frames * this.state.progress)
        this.state.position = (this.state.frame / this.state.frames) * 100
        this.logo = Math.lerp(this.state.logo[0], this.state.logo[1], this.state.progress)
      }

      if (this.finished && this.state.progress == 1) {
        this.loading = false
      }

      setTimeout(() => this.loop(), dt) // 60 fps
    }
  }
}
</script>
