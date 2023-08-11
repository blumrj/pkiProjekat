<template>
    <b-skeleton-wrapper :loading="loading">
        <template #loading>
          <b-skeleton-img aspect="4:6"></b-skeleton-img>
        </template>
  
        <img v-if="imagePath" :src="imageUrl + imagePath" :alt="imageAlt"/>
      </b-skeleton-wrapper>
</template>

<script>
    export default{
        name: "ImageComponent",
        data(){
            return{
                imageUrl: 'https://image.tmdb.org/t/p/original',
                loading: false,
                loadingTime: 0,
                maxLoadingTime: 1
            }
        },
        props: {
            imagePath: {
                type: String
            },
            imageAlt: {
                type: String
            }
        },
        watch: {
      loading(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.clearLoadingTimeInterval()

          if (newValue) {
            this.$_loadingTimeInterval = setInterval(() => {
              this.loadingTime++
            }, 400)
          }
        }
      },
      loadingTime(newValue, oldValue) {
        if (newValue !== oldValue) {
          if (newValue === this.maxLoadingTime) {
            this.loading = false
          }
        }
      }
    },
    created() {
      this.$_loadingTimeInterval = null
    },
    mounted() {
      this.startLoading()
    },
    methods: {
      clearLoadingTimeInterval() {
        clearInterval(this.$_loadingTimeInterval)
        this.$_loadingTimeInterval = null
      },
      startLoading() {
        this.loading = true
        this.loadingTime = 0
      }
    }
    }
</script>
