<template>
    <div class="pt-5 container vh-100">
        <div class="pt-5 row justify-content-between align-items-center">
            <h1 class="w-auto"><b-icon icon="person-fill"></b-icon> {{$route.params.username}}</h1>
            <div class="col-auto row column-gap-2">
                <button @click="logout" class="btn btn-red w-auto">Logout</button>
            </div>
        </div>
        <div class="text-start my-5">

            <h2> {{$route.params.username}}'s watchlist:</h2>
            <div class="row" v-if="watchlist.length">
                <div class="col-6 col-md-3 col-lg-2 mb-5"  v-for="w, wid in watchlist" :key="wid">
                <card-component :image-path="w.poster_path" :image-alt="w.title" :product-id="w.id" :product-type="getProductType(w)"/>
                </div>
            </div>
            <div v-else>
                <p>Your watchlist is empty! Discover movies and tv shows and add them to your list!</p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default{
    name: "UserPage",
    mounted(){
        if(this.role != "user"){
            this.$router.push("/")
        }
    },
    computed: {
        ...mapGetters(["role"]),
        watchlist(){
            return this.$store.getters.getProductState({state: 'watchlist', resultName: undefined})
        },
    },
    methods: {
      logout() {
        this.$store.commit("changeUser", undefined)
        this.$forceUpdate()
        // this.$router.push("/")
        this.$router.go(0)
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