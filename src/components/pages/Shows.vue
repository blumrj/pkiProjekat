<template>
    <div class="container pt-5">
        <div class="row">
            <h1>Tv Shows</h1>
        </div>
        <div class="row justify-content-between">
                <DropDown v-if="seriesGenres" v-model="chosenGenre" :withDefaultOption="true"  id="ddlMovieGenres" :items="seriesGenres" valueProperty="id" textProperty="name" label="Genre" class="w-auto"/>
        </div>
        <div class="row" v-if="discoverSeries">
            <div class="col-6 col-md-3 col-lg-2 mb-5"  v-for="s, sid in discoverSeries" :key="sid">
                <card-component :image-path="s.poster_path" :image-alt="s.title" :product-id="s.id" :product-type="getProductType(s)"/>
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
    name: "DiscoverShowsPage",
    data(){
        return {
            currentPage: this.$route.params.page,
            chosenGenre: this.$route.params.genre,
        }
    },
    computed: {
        seriesGenres(){
            return this.$store.getters.getSeriesState({state: 'seriesGenres', resultName: "genres"})
        },
        discoverSeries(){
            return this.$store.getters.getSeriesState({state: 'discoverSeries', resultName: "results"})
        },
        numberOfPages(){
            return this.$store.getters.getSeriesState({state: 'discoverSeries', resultName: "total_pages"})
        },
        isDisabled(){
            return this.currentPage == 1 ? true : false
        }
    },
    created() {
        window.scrollTo(0,0)
        this.$store.dispatch("callApiAction", {endpoint: "genre/tv/list", mutation: "changeSeriesStateMutation", state: "seriesGenres"});
        this.$store.dispatch("callApiAction", {endpoint: "discover/tv?include_adult=false&page=" + this.currentPage + "&with_genres=" + this.chosenGenre, mutation: "changeSeriesStateMutation", state: "discoverSeries"});

    },
    watch: {
        chosenGenre: function(){
            this.currentPage = 1
            this.$store.dispatch("callApiAction", {endpoint: "discover/tv?include_adult=false&with_genres=" + this.chosenGenre, mutation: "changeSeriesStateMutation", state: "discoverSeries"});
            this.$router.push({name: "shows", params: {genre: this.chosenGenre, page: this.currentPage}})
        }
    },
    methods: {
        nextPage(){
            this.currentPage++
            this.$store.dispatch("callApiAction", {endpoint: "discover/tv?include_adult=false&page=" + this.currentPage + "&with_genres=" + this.chosenGenre, mutation: "changeSeriesStateMutation", state: "discoverSeries"}).then(window.scrollTo(0,0));
            this.$router.push({name: "shows", params: {genre: this.chosenGenre, page: this.currentPage}})
        },
        previousPage(){
            this.currentPage--
            this.$store.dispatch("callApiAction", {endpoint: "discover/tv?include_adult=false&page=" + this.currentPage + "&with_genres=" + this.chosenGenre, mutation: "changeSeriesStateMutation", state: "discoverSeries"}).then(window.scrollTo(0,0));
            this.$router.push({name: "shows", params: {genre: this.chosenGenre, page: this.currentPage}})
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