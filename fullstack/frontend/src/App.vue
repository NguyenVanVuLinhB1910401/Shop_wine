<template>
  <div>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
  async created() {
    // const user = await this.$store.dispatch('nhanvien');
    // if(user == null) {
    //   this.$router.push({name: 'login'})
    // }
  },
}
</script>

<style>
#app {
  background: #ccf2ff;
  min-height: 100vh;
}
</style>