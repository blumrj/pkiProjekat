<template>
    <b-collapse id="nav-collapse" is-nav class="flex-grow-0 column-gap-5">
        <!-- <text-field class="w-auto" placeholder="Search"/> -->
        <AutocompleteComponent></AutocompleteComponent>

        <b-nav-item  v-for="item,index in navItems" :key="index" :class="item.children ? 'dropdown' : ''" v-role="item.role" class="mt-4 mt-lg-0">
          <router-link :to="item.children ? '#' : item.path" :class="item.path == '/register' ? 'getstarted' : ''">{{item.text}}
              <ul v-if="item.children">
                  <b-nav-item v-for="c, cid in item.children" :key="cid" class="my-3">
                      <router-link :to="item.path + c.path">{{c.text}}</router-link>
                  </b-nav-item>
              </ul>
              <b-icon v-if="item.children" icon="chevron-down" class="ms-1" font-scale="0.8"></b-icon>
          </router-link>
      </b-nav-item >
      <b-nav-item  v-role="['user']"><router-link :to="'/user/' + username"><b-icon icon="person-fill"></b-icon>{{username}}</router-link></b-nav-item>
      

    </b-collapse>
    
      
</template>

<script>
import { mapGetters } from 'vuex';

export default{
    name: "NavComponent",
    props: {
        navItems: Array
    },
    computed: {
        ...mapGetters(["username"])
    }
    
}
</script>

<style scoped>
 li{
  list-style-type: none !important;
}
</style>

<style>
.navbar a,
.navbar a:focus {
  color: #fff;
}


.navbar a:hover,
.navbar .active,
.navbar .active:focus,
.navbar li:hover>a {
  color: #d9232d;
}

.navbar .getstarted,
.navbar .getstarted:focus {
  background: #d9232d;
  padding: 8px 25px;
  border-radius: 4px;
  color: #fff;
}

.navbar .getstarted:hover,
.navbar .getstarted:focus:hover,
.btn-red:hover,
.btn-red:focus:hover {
  color: #fff;
  background: #e1444d;
}

.navbar .dropdown ul {
  display: block;
  position: absolute;
  top: calc(100% + 30px);
  z-index: 99;
  opacity: 0;
  visibility: hidden;
  background: #4a5562;
  box-shadow: 0px 0px 30px rgba(127, 137, 161, 0.25);
  transition: 0.3s;
}

.navbar .dropdown ul li {
  min-width: 150px;
}

.navbar .dropdown ul a:hover,
.navbar .dropdown ul .active:hover,
.navbar .dropdown ul li:hover>a {
  color: #d9232d;
}

.navbar .dropdown:hover a >ul {
  opacity: 1;
  top: 100%;
  visibility: visible;
}

.navbar .dropdown .dropdown:hover a >ul {
  opacity: 1;
  top: 0;
  left: 100%;
  visibility: visible;
}
</style>