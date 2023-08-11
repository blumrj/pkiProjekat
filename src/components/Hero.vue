<template>
  <div>
    <b-skeleton-wrapper :loading="loading">
      <template #loading>
        <b-card>
          <b-skeleton width="85%"></b-skeleton>
          <b-skeleton width="55%"></b-skeleton>
          <b-skeleton width="70%"></b-skeleton>
        </b-card>
      </template>

      <swiper-card :movies="heroProducts" :slides-per-view="1" path="backdrop_path" :slides-per-group="1" :loop="true" autoplay-delay="2000" autoplay-interaction="false" class="" v-slot:default="slotProps">

        <div class="position-absolute top-50 start-50 translate-middle container">
          <div class="d-flex justify-content-center">
            <image-component :image-path="slotProps.product.img" class="img-fluid w-25 poster-img animate__animated animate__fadeInDown"/>
          </div>
          
          <div class="d-flex justify-content-center">
              <button class="btn btn-red animate__animated animate__fadeInUp mt-4 title" @click="goToProductPage(slotProps.product.id)">Watch now: {{slotProps.product.title}}</button>
          </div>
          
          
  
        </div>
        
      </swiper-card>
    </b-skeleton-wrapper>
  </div>
</template>

<script>
import Vue from 'vue';
export default{
    name: "HeroComponent",
    data(){
      return {
        heroProducts: [],
        loading: false,
        loadingTime: 0,
        maxLoadingTime: 2
      }
    },
    computed: {
      products(){
          return this.$store.getters.getProductState({state: 'product', resultName: "results"})
      },
    },
    created() {
      this.$store.dispatch("callApiAction", {endpoint: "trending/movie/day", mutation: "changeProductStateMutation", state: "product"});
    },
    watch: {
      products: function(){
          this.products.forEach((element,index) => {
          Vue.set(this.heroProducts, index, element)
        })
        this.heroProducts.splice(5,15)
      },
    },
    methods: {
      goToProductPage(id){
            this.$router.push({name: "products", params: {productType: "movie", id: id}})
        }
    }
}
</script>
<style scoped>
>>> .title{
  font-weight: bolder;
}
@media only screen and (max-width: 600px) {
  >>> .card-img-top{
    width: 100vh ;
    height: 100vh;
  }
  .poster-img{
    width: 60% !important;
  }
}

>>> swiper-container{
  padding: 0 !important;
  margin: 0 !important;
}


</style>