<template>
<div class="home">
    <h1>Home</h1>
    <button @click="navigateToSomeSite" class="btn btn-primary space-medium">Go some Page</button>
    <div class="home-component">
        <h3>Some Header</h3>
        <p v-if="builds" style="padding: 10px;">Some text</p>
        <b-table v-if="builds" hover></b-table>
    </div>
</div>
</template>

<script>
  import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  created: function () {
    this.GetProjects(this.user);
    this.createTableWithBuilds()
  },
  mounted () {
  
  },
  computed: {
    ...mapGetters({user: "StateUser"}),
  },
  data() {
    return {

    }
  },
   methods: {
    navigateToSomeSite() {
        this.$router.push('/some-site');
    },
  }
}
</script>

<style scoped lang="scss">
  h1 {
    padding: 20px;
  }

  .home-component {
    background: white;
    margin: 2rem 2rem 0 15px;
    width: 50%;
    margin: auto;
    color: black;
    border-radius: 15px 15px 0 0;
    h3{
      color: white;
      padding: 20px;
      background-color: #2B1DAE;
      border-radius: 12px 12px 0 0;
    }
  }
</style>
