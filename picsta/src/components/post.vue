<template>
 <div>
     <v-card  width="400px"  class="mt-3">
         <v-card-actions>
             <v-layout column>
            <v-layout row>
             <v-avatar color="red" >
                 <span style="color: black">{{post.email[0].toUpperCase()}}</span>
             </v-avatar>
             <span><h2>{{post.name}}</h2></span></v-layout>
         <v-layout >
             <p class="caption">{{post.time}}</p>
         </v-layout>
         </v-layout>
         </v-card-actions>
         <v-divider></v-divider>
         <v-card-title><h1>{{post.caption}}</h1></v-card-title>
         <v-img v-if="post.media.link.length!=0" :src="'http://localhost:5000/' + post.media.link"  contain>
         </v-img>
         <v-divider></v-divider>
         <v-card-actions>
             <v-layout row>
            <v-badge overlap color="black">
             <span slot="badge">{{likes}}</span>
             <v-btn icon flat @click="newlike()">
             <v-icon color="#D50000" x-large size="150%">whatshot</v-icon>
             </v-btn>
            </v-badge>
             <v-spacer></v-spacer>
             <v-badge overlap color="red">
              <span slot='badge'>{{comments.length}}</span>
              <v-btn @click="com=!com" icon flat>
             <v-icon color="black" x-large size="150%">mode_comment</v-icon>
             </v-btn>
             </v-badge>
             </v-layout>
         </v-card-actions>
          <v-list v-if="com" two-line>
        <v-layout row>
            <v-text-field
            v-model="newcomment"
            label="Comment"
            outline
            color="red"
          ></v-text-field>
          <v-btn class="elevation-12" style="border-raidius:100px" color="black" @click="createcomment">
              <h1 style="color:red">Add</h1>
          </v-btn>
          <v-alert color="error" dismissible :value="noc" transition="scale-transition">
              Empty comment!!
          </v-alert>
        </v-layout>
          <template  v-for="item in comments"><v-layout :key="item.id" row>
              <v-list-tile :key="item.time">
                  <v-list-tile-avatar>
                   <v-avatar color="red">{{item.name[0].toUpperCase()}}</v-avatar>   
                  </v-list-tile-avatar>
              </v-list-tile>
              <v-list-tile-content :key="item.comment">
                  <h1>{{item.comment}}</h1>
                  <p>{{item.name}}</p>
                  <p>{{item.time}}</p>
              </v-list-tile-content>
              </v-layout>
              <v-divider :key="item.name"></v-divider>
          </template>
        </v-list>
     </v-card>
 </div>
</template>

<script>
import posts from '@/services/postservice'
export default {
    props:['post'],
    data(){
        return{
            likes:this.post.likes,
            comments: this.post.comments.reverse(),
            newcomment: null,
            com:false,
            noc:false
        }
    },
    methods:{
        async newlike(){
            this.likes = this.likes+1;
             let r = await posts.likePost({id:this.post.id,likes: this.likes});
            console.log(r)
        },
        async createcomment(){
            if(this.newcomment!=null && this.newcomment.length!=0){
            this.noc = false
            let newc = {id:this.post.id, comment:this.newcomment,name:this.$store.state.user.name,time:Date().slice(0,24)};
            this.comments.push(newc)
            let r = await posts.comment(newc)
            }
            else{
                this.noc= true
            }
        }
    }
}
</script>

<style>
.name-date p{
    margin-bottom: 0px;
}
.clap-button {
    cursor: pointer;
}
</style>
