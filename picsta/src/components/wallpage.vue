<template>
  <v-app>
    <Toolbar>
    </Toolbar>

  </v-app>
</template>

<script>
import Toolbar from './toolbar'
export default {
    components:{Toolbar},
    created: function () {
      console.log("came to wall")
      if (!this.$store.state.isUserLoggedIn) {
        this.$router.push({
          name: 'login'
        })
      }
    }
}
</script>

<style>

</style>
