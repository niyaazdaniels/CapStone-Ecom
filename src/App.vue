<template>
  <NavComp/>
  <router-view/>
  <FooterComp/>
</template>

<script>
import NavComp from './components/NavComp.vue'
import FooterComp from './components/FooterComp.vue';

export default {
  components: {
    NavComp,
    FooterComp
  }
}
</script>
<style>

@import url('https://fonts.googleapis.com/css2?family=Prompt:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

#app {
  font-family: "Prompt", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  scroll-behavior:smooth;
  margin: 0;
  padding: 0;
  font-weight: light;
  font-size: 12px;
  box-sizing: border-box;
  
}
.btn {
  font-size: 12px;

}

nav {
  padding: 30px;
  
}
nav a {
  font-size: 12px;
  word-spacing: 10px;
  font-weight: lighter;
  color: white;
  padding-left: 0;
  margin-left: 8px;
}

nav a.router-link-exact-active {
  color: #BD0000;
  font-weight: bold;
  border-bottom: 2px solid  #BD0000;
}
html::-webkit-scrollbar {
  display: none;
}
/* Hide scrollbar for IE, Edge and Firefox */
html {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
