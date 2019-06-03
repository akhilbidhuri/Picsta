<template>
<v-app style="background:white">
    <v-toolbar flat color="transparent">
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat color="black" v-on:click="$router.push({'name':'login'})">
          <h1 class="red--text">Login </h1>
          <v-icon dark right>person</v-icon>
        </v-btn>
        <v-btn flat color="black" v-on:click="$router.push({'name':'register'})">
          <h1 class="red--text">Register</h1>
          <v-icon dark right>how_to_reg</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
 
  <v-layout align-center justify-center>
  <v-img contain src="/static/shards.gif" style="height:600px">  
  <v-layout align-center justify-center>
    <h1 class=" red--text" style="padding-top:13%;font-size:1000%">
      PICSTA
    </h1>
  </v-layout>
  </v-img>
  </v-layout>
  <Footer></Footer>
</v-app>
</template>

<script>
import Footer from './footer'
export default {
  components:{Footer},
    data: () => ({
    })
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Bangers');
    #app {
      font-family: 'Bangers', cursive;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
    }
</style>
