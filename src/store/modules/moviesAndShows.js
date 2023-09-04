import movies from "./movies";
import shows from "./shows";
import axios from 'axios'
import Vue from "vue";

export default {
    modules: {
        movies: movies,
        shows: shows,
    },
    state: {
        token: "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ODAxZGUxNTBmYTM2NmE3YWYwMzYyYTJiMDhjMjk5NiIsInN1YiI6IjY0YjQwNTM0Nzg1NzBlMDBhZDRiZTVkYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mn7cdq3gAVMWOl6SqJqD7e8YN_qYf2bBADsl336uOxc",
        product: [],
        hero: [],
        watchlist: localStorage.getItem("watchlist") ? JSON.parse(localStorage.getItem("watchlist")) : []

    },
    mutations: {
        changeSeriesStateMutation(state, payload){
            state.shows[payload.stateName] = payload.data
        },
        changeMoviesStateMutation(state, payload){
            state.movies[payload.stateName] = payload.data
        },
        changeProductStateMutation(state, payload){
            state[payload.stateName] = payload.data
        },
        addToWatchList(state, payload){
            state[payload.stateName].push(payload.data)
            console.log(state[payload.stateName])
            const watchlistString = JSON.stringify(state.watchlist)
            localStorage.setItem("watchlist", watchlistString)
        }
    },
    actions: {
        callApiAction({commit,state}, dataArray){
            axios.get("https://api.themoviedb.org/3/" + dataArray.endpoint, {
                headers: {
                    'Authorization': "Bearer " + state.token
                }
            }).then(response => {
                commit(dataArray.mutation, {data: response.data, stateName: dataArray.state})
            }).catch(error => {
                console.log(error)
            })
        },
    },
    getters: {
        getMovieState: (state) => (payload) => {
            return state.movies[payload.state][payload.resultName]
        },
        getSeriesState: (state) => (payload) => {
            return state.shows[payload.state][payload.resultName]
        },
        getProductState: (state) => (payload) => {
            if(payload.resultName == undefined){
                return state[payload.state]
            }
            else{
                return state[payload.state][payload.resultName]
            }
        },
        getSearchResults: (state) => (payload) => {
            Vue.nextTick(() => {
            })
            console.log(state.search)
            return state[payload.state][payload.resultName]
        }
    }
}