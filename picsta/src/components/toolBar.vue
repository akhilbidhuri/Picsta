<template>
  <v-app
  >
    <v-navigation-drawer
      v-model="drawer"
      fixed
      clipped
      app
      class="elevation-10"
    >
      <v-list dense>
        <v-list-tile v-for="item in items" :key="item.text" @click="general(item.f)">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        
        <v-list-tile class="mt-3" @click="logout">
          <v-list-tile-action>
            <v-icon color="grey darken-1">add_circle_outline</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="grey--text text--darken-1">Logout</v-list-tile-title>
        </v-list-tile>
        <v-list-tile>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-title class="grey--text text--darken-1">Akhil Bidhuri</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      color="black"
      dense
      fixed
      clipped-left
      app
      height="60"
    >
      <v-toolbar-side-icon dark @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="mr-5 align-center">
        <span style="color:red">PICSTA</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-layout row align-center style="max-width: 650px;" >
         <v-text-field
        solo-inverted
        flat
        dark
        hide-details
        label="Search"
        color="red"
        v-model="query"
        prepend-inner-icon="search"
        @click="search"
      ></v-text-field>
      </v-layout>
    </v-toolbar>
    <v-dialog v-model="sd" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="black">
          <v-btn icon color="red" @click="sd = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Search results</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
          <v-layout v-if="notfound" align-center justify-center>
          <v-img contain src="../static/error.gif"></v-img>
          </v-layout>
          <v-layout v-if="!notfound" align-center justify-center>
          <follow :data="i" v-for="i in users" :key="i.email"></follow>
          </v-layout>
      </v-card>
    </v-dialog>
    <v-dialog
     scrollable 
     v-model="fd"
     max-width="390"
    >
      <v-card>
        <v-card-title class="headline">Following</v-card-title>
        <v-divider></v-divider>
          <template v-if="$store.state.user.following.length >0" v-for="i in $store.state.user.following">
          <v-layout :key="i.email" row>
            <v-avatar color="red">
              <h2>{{i.email[0].toUpperCase()}}</h2>
            </v-avatar>
            <v-layout column>
              <h1>{{i.name}} </h1>
              <h2>{{i.email}}</h2>
            </v-layout>
          </v-layout>
          <v-divider :key="i.name"></v-divider>
          </template>
          <v-layout v-if="this.$store.state.user.following.length ==0" justify center>
            <h1>Not following anyone</h1>
          </v-layout>
      </v-card>
    </v-dialog>    
    <v-dialog max-width="450" scrollable v-model="rd">
      <v-card >
        <v-card-title>
          <h1 style="color:red">Requests</h1>
        </v-card-title>
      </v-card>
    </v-dialog>
  <v-layout  align-center class="mt-5"  column>
      <upload></upload>
      <posts :key="post.id" v-bind:post="post" v-for="post in posts"></posts>
  </v-layout>
  </v-app>
</template>

<script>
import posts from './post'
import upload from './upload'
import getp from '@/services/postservice'
import auth from '@/services/AuthServices'
import follow from './follow'
  export default {
    components:{upload, posts, follow},
    data: () => ({
      query:null,
      drawer: null,
      cards:[],
      follow: [],
      fd:false,
      rd:false,
      md:false,
      sd:false,
      users:[],
      notfound:false,
      items: [
        { icon: 'trending_up', text: 'Most Popular', f:0 }, 
        { icon: 'sentiment_satisfied_alt', text: 'Following', f:1 }
      ],
      posts: null
    }),
    async created(){
      console.log(this.$store.state.user)
      this.getdata();
      setTimeout(this.$forceUpdate(), 1000);
    }
    ,
    props: {
      source: String
    },
    methods:{
      async search(){ 
        this.sd = true
        this.users = []
        if(this.query===null || this.query.length===0)
        {
            let r = await auth.all()
            console.log(r.data)
            for(let i in r.data.users){
              console.log(i)
              if(r.data.users[i].email!=this.$store.state.user.email){
                this.users.push(r.data.users[i])
              }
            }
            console.log("users:",this.users)
            if(this.users.length===0)
            {
              this.notfound = true
            }
            else{
              this.notfound = false
            }
        }
        else if(this.query.length!=0){
          let r = await auth.search(this.query)
          for(let i in r.data.users){
              if(r.data.users[i].email!=this.$store.state.user.email){
                this.users.push(r.data.users[i])
              }
            }
        }
        if(this.users.length==0){
        this.sd=true}
      },
      general(a){
        if(a==0){
          this.mostpopular()
        }
        if(a==1){
          this.fd=true
        }
        if(a==2){
          this.rd = true
        }
      },
      async mostpopular(){
      let r = await getp.getpopular();
      this.posts = r.data.posts;
      console.log(this.posts)
      },
      followers(){
        this.fd = !this.fd
      },
      requests(){},
      async getdata(){
      let r = await getp.getPost();
      this.posts = r.data.posts;
      console.log(this.posts)
      this.posts.reverse();
        },
        logout(){
        console.log('logout')
        this.$store.dispatch('setToken', false)
        this.$store.dispatch('setUser', {})
        this.$router.push({name: 'Home'})
      }
    }
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
