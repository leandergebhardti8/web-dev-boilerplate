<template>
  <div id="app">
    <Header/>
    <!-- <Breadcrumb/> -->
    <router-view/>
  </div>
</template>

<script>
import Header from './components/navigation/Header.vue'
// import Breadcrumb from './components/navigation/Breadcrumb.vue'

export default {
  name: 'App',
  components: {
    Header,
    // Breadcrumb,
  }, 
  data() {
    return{
      items: [
        {
          text: 'Home',
          href: '/'
        },
      ],
    }
  },
}
</script>

<style>

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    -webkit-font-smoothing: antialiased;
  }
  body {
    background-color: #4643EC !important;
  }
  h1 {
      padding: 20px;
      color: white;
  }
</style>
