<template>
<b-navbar id="header" toggleable="lg" fixed="top">
  <div class="container d-flex justify-content-between">
      <b-navbar-brand to="/" tag="h1" class="logo me-auto w-auto">StreamVault</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse" class=""></b-navbar-toggle>
      <Nav :navItems="navigation" class="w-auto"/>
  </div>        
</b-navbar>
</template>

<script>
import Nav from "./Nav"
import { mapGetters } from 'vuex';


export default{
    name: "HeaderComponent",
    components: {
        Nav
    },
    data(){
    return {
      navigation: [
        {
          text: "Home",
          path: "/",
          role: ["unauthorized", "user", "admin"]
        },
        {
          text: "Discover",
          path: "/discover",
          children: [
            {text: "Movies", path: "/movies/all/1"},
            {text: "Tv Shows", path: "/shows/all/1"},
          ],
          role: ["unauthorized", "user", "admin"]
        },
        {
          text: "Register",
          path: "/register",
          role: ["unauthorized"]
        },
        {
          text: "Admin",
          path: "/admin",
          role: ["admin"]
        },
        // {
        //   text: "My Profile",
        //   path: "/user",
        //   role: ["user"]
        // },
        
      ]
    }
  },
  computed: {
    ...mapGetters(["username"])
  }
}
</script>
<style>
#header {
  background: #4a5562;
  color: #fff;
  transition: all 0.5s;
  z-index: 997;
  padding: 20px 0;
}

#header.header-scrolled {
  box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.1);
  padding: 12px 0;
}

#header.header-inner-pages {
  box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.1);
}

#header .logo {
  font-size: 28px;
  margin: 0;
  padding: 0;
  line-height: 1;
  font-weight: 700;
}

#header .logo a {
  color: #fff;
}

#header .logo img {
  max-height: 40px;
}
</style>

