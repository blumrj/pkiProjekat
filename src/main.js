import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// import 'bootstrap-vue/dist/bootstrap-vue'
// import "../public/assets/css/style.css"
// import 'bootstrap-icons/font/bootstrap-icons.min.css'
import VueRouter from 'vue-router'
import Home from './components/pages/Home'
import Register from './components/pages/Register'
import Discover from './components/pages/Discover'
import DiscoverMovies from './components/pages/Movies'
import DiscoverShows from './components/pages/Shows'
import Product from './components/pages/Product'
import Admin from './components/pages/Admin'
import User from './components/pages/User'
import TextField from './components/forms/TextField'
import DropDown from './components/forms/DropDown'
import Image from './components/Image'
import Autocomplete from './components/Autocomplete'
import store from './store/store'
import {register} from 'swiper/element/bundle'
import Card from './components/Card'
import ToggleButton from 'vue-js-toggle-button'
import SwiperCard from './components/SwiperCard'
import 'animate.css';
import RoleDirective from "./directives/roleDirective"




register();

Vue.config.productionTip = false

const routes = [
  {path: "/", component: Home},
  {path: "/register", component: Register},
  {path: "/discover", component: Discover, children: [{name: "movies", path: "movies/:genre/:page", component: DiscoverMovies}, {name: "shows", path: "shows/:genre/:page", component: DiscoverShows}]},
  {name:"user", path: "/user/:username", component: User},
  {name: "products", path: "/:productType/:id", component: Product},
  {path: "/admin", component: Admin},
]

const router = new VueRouter({
  routes
})



// const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ODAxZGUxNTBmYTM2NmE3YWYwMzYyYTJiMDhjMjk5NiIsInN1YiI6IjY0YjQwNTM0Nzg1NzBlMDBhZDRiZTVkYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mn7cdq3gAVMWOl6SqJqD7e8YN_qYf2bBADsl336uOxc"

// const instance = axios.create({
//   baseUrl: "https://api.themoviedb.org/3/",
//   headers: {'Authorization': AUTH_TOKEN}
// })

Vue.use(VueRouter);
Vue.use(ToggleButton)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.component("TextField", TextField);
Vue.component("DropDown", DropDown);
Vue.component("CardComponent", Card);
Vue.component("SwiperCard", SwiperCard);
Vue.component("ImageComponent", Image);
Vue.component("AutocompleteComponent", Autocomplete);

Vue.directive("role", RoleDirective)


// Vue.prototype.$axios = instance;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
