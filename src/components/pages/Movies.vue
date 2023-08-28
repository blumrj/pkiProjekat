<template>
    <div class="container pt-5">
        <div class="row pt-5">
            <h1 class="mt-3">Movies</h1>
        </div>
        <div class="row justify-content-between">
                <DropDown v-if="movieGenres" v-model="chosenGenre" :withDefaultOption="true"  id="ddlMovieGenres" :items="movieGenres" valueProperty="id" textProperty="name" label="Genre" class="w-auto"/>
        </div>
        <div class="row" v-if="discoverMovies">
            <div class="col-6 col-md-3 col-lg-2 mb-5"  v-for="m, mid in discoverMovies" :key="mid">
                <card-component :image-path="m.poster_path" :image-alt="m.title" :product-id="m.id" :product-type="getProductType(m)"/>
            </div>
        </div>
        <div class="row justify-content-between mb-5">
            <button class="btn btn-red w-auto" id="previousPageBtn" @click="previousPage()" :disabled="isDisabled">Previous page</button>
            <button class="btn btn-red w-auto" id="nextPageBtn" @click="nextPage()">Next page</button>
        </div>
        <div class="row text-center">
            <p>Page: {{this.currentPage}} / {{this.numberOfPages}}</p>
        </div>
    </div>
    
</template>

<script>

export default{
    name: "DiscoverMoviesPage",
    data(){
        return {
            currentPage: this.$route.params.page,
            chosenGenre: this.$route.params.genre,
        }
    },
    computed: {
        movieGenres(){
            return this.$store.getters.getMovieState({state: 'movieGenres', resultName: "genres"})
        },
        discoverMovies(){
            return this.$store.getters.getMovieState({state: 'discoverMovies', resultName: "results"})
        },
        numberOfPages(){
            return this.$store.getters.getMovieState({state: 'discoverMovies', resultName: "total_pages"})
        },
        isDisabled(){
            return this.currentPage == 1 ? true : false
        },
    },
    created() {
        window.scrollTo(0,0)
        this.$store.dispatch("callApiAction", {endpoint: "genre/movie/list", mutation: "changeMoviesStateMutation", state: "movieGenres"});
        this.$store.dispatch("callApiAction", {endpoint: "discover/movie?include_adult=false&page=" + this.currentPage + "&with_genres=" + this.chosenGenre, mutation: "changeMoviesStateMutation", state: "discoverMovies"});
    },
    watch: {
        chosenGenre: function(){
            this.currentPage = 1
            this.$store.dispatch("callApiAction", {endpoint: "discover/movie?include_adult=false&with_genres=" + this.chosenGenre, mutation: "changeMoviesStateMutation", state: "discoverMovies"});
            this.$router.push({name: "movies", params: {genre: this.chosenGenre, page: this.currentPage}})
        }
    },
    methods: {
        nextPage(){
            this.currentPage++
            this.$store.dispatch("callApiAction", {endpoint: "discover/movie?include_adult=false&page=" + this.currentPage + "&with_genres=" + this.chosenGenre, mutation: "changeMoviesStateMutation", state: "discoverMovies"}).then(window.scrollTo(0,0));
            this.$router.push({name: "movies", params: {genre: this.chosenGenre, page: this.currentPage}})
        },
        previousPage(){
            this.currentPage--
            this.$store.dispatch("callApiAction", {endpoint: "discover/movie?include_adult=false&page=" + this.currentPage + "&with_genres=" + this.chosenGenre, mutation: "changeMoviesStateMutation", state: "discoverMovies"}).then(window.scrollTo(0,0));
            this.$router.push({name: "movies", params: {genre: this.chosenGenre, page: this.currentPage}})
        },
        getProductType(element){
            if(element.release_date){
                return "movie"
            }
            if(element.first_air_date){
                return "series"
            }
        }
    }

    
}
</script>