<template>
    <div>
        <Hero/>
        <div class="container text-start my-5">
            <div>
                <h3>Trending This Week</h3>
                <swiper-card :toggle-button="true" :movies="trendingMovies" :shows="trendingShows"></swiper-card>
            </div>
            <div>
                <h3>Top Rated</h3>
                <swiper-card :toggle-button="true" :movies="topRatedMovies" :shows="topRatedShows"></swiper-card>
            </div>
            <div>
                <h3>Popular</h3>
                <swiper-card :toggle-button="true" :movies="popularMovies" :shows="popularShows" ></swiper-card>
            </div>
        </div>
    </div>
</template>

<script>
import Hero from "../Hero.vue"
import SwiperCard from '../SwiperCard.vue'


export default{
    name: "HomePage",
    components: {
        Hero,
        SwiperCard,
    },
    data(){
        return {
            toggleButtonDefaultValue: {
                value: false
            },
            isMounted: false
        }
    },
    computed: {
        popularMovies(){
            return this.$store.getters.getMovieState({state: 'popularMovies', resultName: "results"})
        },
        topRatedMovies(){
            return this.$store.getters.getMovieState({state: 'topRatedMovies', resultName: "results"})
        },
        trendingMovies(){
            return this.$store.getters.getMovieState({state: 'trendingMovies', resultName: "results"})
        },
        popularShows(){
            return this.$store.getters.getSeriesState({state: 'popularShows', resultName: "results"})
        },
        topRatedShows(){
            return this.$store.getters.getSeriesState({state: 'topRatedShows', resultName: "results"})
        },
        trendingShows(){
            return this.$store.getters.getSeriesState({state: 'trendingShows', resultName: "results"})
        },
    
    },
    created() {
        this.$store.dispatch("callApiAction", {endpoint: "movie/popular", mutation: "changeMoviesStateMutation", state: "popularMovies"});
        this.$store.dispatch("callApiAction", {endpoint: "movie/top_rated", mutation: "changeMoviesStateMutation", state: "topRatedMovies"});
        this.$store.dispatch("callApiAction", {endpoint: "trending/movie/week", mutation: "changeMoviesStateMutation", state: "trendingMovies"});
        this.$store.dispatch("callApiAction", {endpoint: "tv/popular", mutation: "changeSeriesStateMutation", state: "popularShows"});
        this.$store.dispatch("callApiAction", {endpoint: "tv/top_rated", mutation: "changeSeriesStateMutation", state: "topRatedShows"});
        this.$store.dispatch("callApiAction", {endpoint: "trending/tv/week", mutation: "changeSeriesStateMutation", state: "trendingShows"});
    },
    
    
}
</script>

<style scoped>
>>> swiper-container{
    border-radius: 10px;
}

</style>