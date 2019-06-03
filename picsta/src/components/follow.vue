<template>
    <v-card class="elevation-10 mt-2" height="230" width="200">
    <v-layout justify-center align-center column>
    <v-avatar class="mt-4" color="red" size="100">
      <span class="white--text headline">{{data.email[0].toUpperCase()}}</span>
    </v-avatar>
    <h1>{{data.name}}</h1>
        <v-btn v-if="!followed" large style="border-radius:15px"  @click="follow" class="elevation-5" color="black">
                <h1 class="red--text">Follow</h1>
            </v-btn>
            <v-chip v-if="followed"  color="teal" text-color="white">
      <v-avatar>
        <v-icon>check_circle</v-icon>
      </v-avatar>
      Followed    </v-chip>
 
    </v-layout>
    </v-card>
</template>
    
<script>
import auth from '@/services/AuthServices'
export default {
    props: ['data'],
    data(){
        return {
            followed: false
        }
    },
    mounted(){
        console.log("bidhuri")
        console.log(this.$store.state.user.following)
            for(let i=0;i< this.$store.state.user.following.length;i++){
                console.log(this.$store.state.user.following[i].email)
                if(this.data.email === this.$store.state.user.following[i].email){
                    this.followed=true
                    break
                }
            }
        }
    ,
    methods:{
        async follow(){
            this.followed=true
            let q = {femail:this.$store.state.user.email,email:this.data.email,name:this.data.name, time:Date().split(0, 24)}
            let r = await auth.follow(q)
            console.log(r)
            this.$store.dispatch('addfollow',{email:this.data.email,name:this.data.name,time:Date().split(0, 24)})
            console.log(this.$store.state.user.following)
        }
    }
}
</script>
    
<style>

</style>