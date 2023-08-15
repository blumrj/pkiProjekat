<template>
    <div>
        <b-skeleton-wrapper :loading="loading">
            <template #loading>
                <b-skeleton animation="wave" width="85%"></b-skeleton>
                <b-skeleton animation="wave" width="55%"></b-skeleton>
                <b-skeleton animation="wave" width="70%"></b-skeleton>
            </template>
      
            <div class="">
                <!-- toggle button -->
                <toggle-button v-if="toggleButton" :toggleButtonDefaultValue="toggleButtonDefaultValue" :color="{checked: 'var(--tv-shows-background-color)', unchecked: 'var(--movie-background-color)'}" :labels="{checked: 'TV shows', unchecked: 'Movies'}" :value="toggleButtonDefaultValue" :width="90" :height="30" @change="toggleElements"/>
                <!-- swiper container -->
                <swiper-container v-if="arrayToShow.length" :navigation="navigation" :slides-per-view="slidesPerView" :slides-per-group-auto="slidesPerGroup" :loop="loop" :movies="movies" :shows="shows" :space-between="30" :autoplay-delay="autoplayDelay" :autoplay-disable-on-interaction="autoplayInteraction" class="px-4 py-5 my-4 " :style="{backgroundColor: this.containerColor}">
                    <!-- swiper slides -->
                    <swiper-slide v-for="e in arrayToShow" :key="e.id" class="col-2">
                        <card-component :image-path="e[path]" :image-alt="e.title" :product-id="e.id" :product-type="getProductType(e)"/>
                        <slot  v-bind:product="{title: e.title, overview: e.overview, img: e.poster_path, id: e.id}"></slot>
                    </swiper-slide>
                </swiper-container>
            </div>
          </b-skeleton-wrapper>
    </div>
    
    
</template>

<script>
import Vue from 'vue';

export default{
    name: "SwiperCardComponent",
    data(){
        return {
            arrayToShow:  [],
            containerColor: "",
            loading: false,
            loadingTime: 0,
            maxLoadingTime: 1,
        }
    },
    props: {
        navigation: {
            type: Boolean,
            default: true
        },
        slidesPerView: {
            type: [Number, String],
            default: "auto"
        },
        slidesPerGroup: {
            type: [Number, String],
            default: "auto"
        },
        loop: {
            type: Boolean,
            default: false
        },
        toggleButton: {
            type: Boolean,
            default: false
        },
        toggleButtonDefaultValue: {
            type: Boolean,
            default:false
        },
        movies: {
            type: Array
        },
        shows: {
            type: Array
        },
        path:{
            type: String,
            default: "poster_path"
        },
        autoplayDelay: {
            type: String, Boolean
        },
        autoplayInteraction: {
            type: String, Boolean,
        }
        
    },
    computed: {
        localElements: {
            get(){
                if(!this.toggleButton){
                return this.movies ? this.movies : this.shows
                }
                if(!this.toggleButtonDefaultValue){
                    return this.movies
                }
                else{
                    return this.shows
                }
            },

            set(newValue){
                this.arrayToShow = newValue
            }   
        },
    },
    methods: {
        toggleElements(value){
            var buttonState = value.value; //is button on or off (true or false)
            if(!buttonState){
                this.localElements = this.movies
                this.containerColor = "var(--movie-background-color)"
            }
            else{
                this.localElements = this.shows
                this.containerColor = "var(--tv-shows-background-color)"
            }
        },
        getProductType(element){
            if(element.release_date){
                return "movie"
            }
            if(element.first_air_date){
                return "series"
            }
        },
        clearLoadingTimeInterval() {
        clearInterval(this.$_loadingTimeInterval)
        this.$_loadingTimeInterval = null
      },
      startLoading() {
        this.loading = true
        this.loadingTime = 0
      },
    },
    watch: {
        localElements: function(){
            // this.arrayToShow = this.localElements
            this.localElements.forEach((element,index) => {
            Vue.set(this.arrayToShow, index, element)
            })
        },
        loading(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.clearLoadingTimeInterval()

          if (newValue) {
            this.$_loadingTimeInterval = setInterval(() => {
              this.loadingTime++
            }, 500)
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
    mounted(){
        if(this.toggleButton){
            this.containerColor = "var(--movie-background-color)"
        }

        this.startLoading()
    }
    
}
</script>

<style>
 :root{
  --swiper-navigation-color: #d9232d;
}
</style>