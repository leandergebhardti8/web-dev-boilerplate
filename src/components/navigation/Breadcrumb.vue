<template>
<div class="breadcrumb">
  <b-breadcrumb>
      <b-breadcrumb-item href="#foo">Foo</b-breadcrumb-item>
      <router-link 
        tag="b-breadcrumb-item" 
        :to="/environment/" 
        >
        Hello there
    </router-link>
  </b-breadcrumb>
</div>
</template>

<script>
export default {
  name: 'Breadcrumb',
    data() {
        return{
            items: [
                {
                    text: 'Home',
                    href: '/'
                }
            ]
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  a {
    color: white !important;
    text-decoration: none;
  }
  li {
    
    &:hover {
      border-radius: 5px 5px 0 0;
      background-color: #1CB5E0;
    }
  }
</style>
