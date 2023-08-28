<template>
  <div id="app">
    <Header/>
    <main>
      <router-view :key="$route.path"></router-view>
    </main>
    <Footer/>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',

  components: {
    Header,
    Footer
  },

  data: () => ({
    //
  }),
};
</script>
<style>
:root{
  --movie-background-color: rgb(108, 125, 71);
  --tv-shows-background-color: #454ADE;
  --button-background-color: linear-gradient(90deg, var(--movie-background-color) 0%, var(--tv-shows-background-color) 100%);
}

#app {
  font-family: "Open Sans", sans-serif;
  font-family: "Raleway", sans-serif;
  color: #a5a3a3;
  color: #fff;
  background-color: #181717;
}

 #app a {
  text-decoration: none;
}

#app .btn-red,
#app .btn-red:focus {
  background: var(--button-background-color);
  border-radius: 4px;
  color: #fff;
}

#app .btn-red:hover {
  background: var(--movie-background-color);
  border-radius: 4px;
  color: #fff;
}


</style>
