<template>
    <div class="" @wheel.prevent @touchmove.prevent @scroll.prevent>
        <div :class="inputClassObj">
            <!-- <div > -->
                <input v-model="searchtext" type="text" @focus="inFocus()"  placeholder="search.." :class="isFocused ? 'w-75' : 'mt-4 mt-lg-0'" class="form-control form-control-sm ">
            <!-- </div> -->
            <button v-if="isFocused" class="btn btn-red w-auto" @click="onInput"><b-icon icon="search" aria-hidden="true"></b-icon></button>
        </div>
        <b-icon v-if="isFocused" icon="x-lg" aria-hidden="true" @click="outOfFocus()" class="position-absolute top-50 end-5 cursor-pointer z-3"></b-icon>

        <b-overlay :fixed="true" no-wrap :show="isFocused" rounded="sm" z-index="2" opacity="0.9" :no-center="false" variant="dark" class="vw-100 vh-100" >
            <template #overlay>
                
                <h3 v-if="!searchStatus">Search movies and tv shows</h3>
                <!-- <h3 v-if="searchStatus && !searchResults.length">No results for "{{search}}"</h3> -->
                <div class="row justify-content-between">
                    <div class="col-6 col-sm-5 col-md-4 col-lg-3 col-xl-2 mb-2 mb-xl-0" v-for="res,index in localResults" :key="index" @click="outOfFocus()">
                        <card-component  :image-path="res.poster_path" :image-alt="res.title" :product-id="res.id" :product-type="getProductType(res)" />
                    </div>
                </div>
            </template>
        </b-overlay>
    </div>

</template>

<script>
import axios from 'axios'

export default{
    name: "AutocompleteComponent",
    data(){
        return {
            searchtext: '',
            isFocused: false,
            searchStatus: false,
            localResults: []
        }
    },
    computed: {
        inputClassObj(){
            return {
                'position-absolute top-50 start-50 translate-middle-x z-3 w-75 row column-gap-3 justify-content-center': this.isFocused,
            }
        },
    },
    methods: {
        inFocus(){
            this.isFocused = true
        },
        outOfFocus(){
            this.isFocused = false
            this.searchStatus = false
            this.searchtext = ''
            this.localResults = []
        },
        onInput: async  function(){
            this.searchStatus = true
            axios.get("https://api.themoviedb.org/3/search/multi?include_adult=false&language=en-US&page=1&query=" + this.searchtext, {
                headers: {
                    'Authorization': "Bearer " + this.$store.state.moviesAndShows.token
                }
            }).then(response => {
                this.localResults = response.data.results.splice(0,5)
            }).catch(error => {
                console.log(error)
            })

        },
        getProductType(element){
            if(element.release_date){
                return "movie"
            }
            if(element.first_air_date){
                return "series"
            }
        },
    }
}
</script>
<style scoped>
.end-5{
   right: 5%;
}
.cursor-pointer{
    cursor: pointer;
}

</style>