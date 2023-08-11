<template>
    <div :title="title" :titleTag="titleTag" class="product-content p-3 w-auto">
        <b-skeleton-wrapper :loading="loading">
            <template #loading>
                <b-skeleton animation="wave" width="85%"></b-skeleton>
                <b-skeleton animation="wave" width="55%"></b-skeleton>
                <b-skeleton animation="wave" width="70%"></b-skeleton>
            </template>
      
            <div>
                <component v-if="title" :is="titleTag" class="title">{{title}}</component>
                <slot></slot>
            </div>
          </b-skeleton-wrapper>
        
    </div>
</template>

<script>
export default{
    name: "ProductContentComponent",
    data(){
        return {
            loading: false,
                loadingTime: 0,
                maxLoadingTime: 1
        }
    },
    props: {
        title: {
            type: String,
            required: false
        },
        titleTag: {
            type: String,
            default: "h2"
        }
    },
    watch: {
      loading(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.clearLoadingTimeInterval()

          if (newValue) {
            this.$_loadingTimeInterval = setInterval(() => {
              this.loadingTime++
            }, 300)
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
<style scoped>
.product-content{
    background: rgba(0, 0, 0, 0.28);
    border-radius: 5px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(9.2px);
    -webkit-backdrop-filter: blur(9.2px);
    }
</style>