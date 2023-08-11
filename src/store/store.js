import Vue from 'vue'
import Vuex from 'vuex'
import users from './modules/users'
import moviesAndShows from './modules/moviesAndShows'


Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        users: users,
        moviesAndShows: moviesAndShows
    },
})