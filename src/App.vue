<template>

  <NavComp/>
  <FooterComp/>
  <router-view/>
</template>

<script>
import  NavComp from './components/NavComp.vue'
import FooterComp from './components/FooterComp.vue';

export default {
  components: {
    NavComp,
    FooterComp
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  word-spacing: 10px;
  font-weight: bold;
  color: white;
}

nav a.router-link-exact-active {
  color: #b71717;
}
</style>
