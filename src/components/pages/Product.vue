<template>
    <div class="" id="backdrop-image" :style="`--bgImg: url(${backgroundImg})`">
        <!-- product content -->
        <div class="container pt-10">
            <div class="row justify-content-center justify-content-lg-between align-items-center">
                <!-- poster img -->
                <image-component :imagePath="this.localProduct.poster_path" :imageAlt="localProduct.title || localProduct.name" class="img-fluid col-10 col-md-6 col-lg-4 my-5 my-lg-0"/>
                <!-- about product -->
                <div class="col-12 col-lg-6 text-start">
                    <!-- product content: title -->
                    <product-content :title="this.localProduct.title || this.localProduct.name">
                        <ul class="row justify-content-start">
                            <li v-if="localProduct.genres" class="w-auto me-3">{{genres}}</li>
                            <li class="w-auto me-3">{{duration || "Seasons: " + this.localProduct.number_of_seasons}}</li>
                            <li v-if="localProduct.videos" class="w-auto me-3"><a :href="trailer" target="_blank">Watch trailer </a></li>
                        </ul>
                    </product-content>
                    <!-- product content: cast -->
                    <product-content title="Cast" titleTag="h4" class="mt-3">
                        <p v-if="this.localProduct.credits">{{cast}}</p>
                    </product-content>
                    <!-- product content: overview -->
                    <product-content title="Overview" titleTag="h4" class="mt-3">
                        <p>{{product.overview}}</p>
                    </product-content>
                    <!-- product content: actions -->
                    <product-content title="" titleTag="h4" class="mt-3">
                        <button class="btn w-auto me-3" :style="{backgroundColor: this.btnColor, color: '#fff'}" @click="addToWatchList()">Add to Watch Later</button>
                        <button class="btn w-auto" :style="{backgroundColor: this.btnColor, color: '#fff'}">Add to List</button>
                    </product-content>
                </div>
            </div>
        </div>
    </div>  
</template>

<script>
import Vue from 'vue';
import ProductContent from '../ProductContent.vue';
import { mapGetters } from 'vuex';

    export default{
        name: "ProductPage",
        components: {
            ProductContent
        },
        data() {
            return {
                localProduct: {},
                productId: this.$route.params.id,
                productType: this.$route.params.productType,
                btnColor: "",
            }
        },
        created() {
            if(this.productType == "movie"){
                this.$store.dispatch("callApiAction", {endpoint: "movie/" + this.productId + "?append_to_response=videos,credits", mutation: "changeProductStateMutation", state: "product"});
            }
            if(this.productType == "series"){
                this.$store.dispatch("callApiAction", {endpoint: "tv/" + this.productId + "?append_to_response=videos,credits", mutation: "changeProductStateMutation", state: "product"});
            }
        },
        computed: {
            product(){
                return this.$store.getters.getProductState({state: 'product', resultName: undefined})
            },
            year(){
                if(this.productType == "movie"){
                    return this.localProduct.release_date.split("-")[0]
                }
                else{
                    return undefined
                }
            },
            duration(){
                var h = Math.floor(this.localProduct.runtime/60)
                var min = this.localProduct.runtime%60
                
                return isNaN(h) || isNaN(min) ? undefined : h + "h " + min + "min"
            },
            genres(){
                return this.localProduct.genres.map((genre) => genre.name).join(", ")
            },
            trailer(){
                var trailerKey = this.localProduct.videos.results.find(({type}) => type == "Trailer").key
                return "https://www.youtube.com/watch?v=" + trailerKey
            },
            cast(){
                return this.localProduct.credits.cast.map((member => member.name)).splice(0,10).join(", ")
            },
            seriesDuration(){
                var firstAirYear = this.localProduct.first_air_date.split("-")[0]
                if(this.localProduct.status == "Ended"){
                    var lastAirYear = this.localProduct.last_air_date.split("-")[0]
                    if(firstAirYear == lastAirYear){
                        return firstAirYear
                    }
                    else{
                        return firstAirYear + "-" + lastAirYear
                    }
                }
                else{
                    return firstAirYear + "-"
                }
            },
            ...mapGetters(["role"]),
            backgroundImg(){
                return "https://image.tmdb.org/t/p/original" + this.localProduct.backdrop_path
            }
        },
        mounted(){
            if(this.productType == "movie"){
                this.btnColor = "var(--movie-background-color)"
            }
            if(this.productType == "series"){
                this.btnColor = "var(--tv-shows-background-color)"
            }
        },
        watch: {
            product: function(){
                Object.keys(this.product).forEach(key => {
                    Vue.set(this.localProduct, key, this.product[key])
                });

            }
        },
        methods: {
            addToWatchList(){
                if(this.role != "user"){
                    this.$router.push("/register")
                }
                else{
                    console.log(this.productId)

                    this.$store.dispatch("callApiAction", {endpoint: "movie/" + this.productId, mutation: "addToWatchList", state: "watchlist"});
                }
            }
        }
    }
</script>

<style scoped>
#backdrop-image {
    background-image: var(--bgImg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center; 
}
.pt-10{
    padding-top: 12%;
    padding-bottom: 12%;
}
</style>