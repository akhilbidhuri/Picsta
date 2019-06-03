<template>
    <v-card height="300" width="600" class="elevation-10">
        <v-card-title >
          <v-layout justify-center column>
          <h1  style="color:red;text-align:center">Post</h1>
          <input type="file" ref="file" name='imgUploader'  v-on:change="handleFilesUpload()">
           <v-text-field
            box
            color="black"
            label="Caption"
            class="mt-3"
            v-model="caption"
          ></v-text-field>
          <v-btn @click="submitPost()" large color="black" style="border-radius:15px" class="elevation-10">
              <h1 style="color:red">Go</h1>
          </v-btn>
        <v-alert
      :value="ft"
      dismissible
      type="error"
    >
      Incompatible file type.
    </v-alert>
    <v-alert
      :value="alert"
      dismissible
      type="error"
    >
      Empty post not allowed.
    </v-alert>
          </v-layout>
        </v-card-title>

      </v-card>
</template>

<script>
import upload from '@/services/postservice'
export default {
data() {
    return{
        file:'',
        caption:'',
        ft: false,
        alert:false
    }
},
methods:{
    async submitPost(){
        if(this.file==='' && this.caption===''){
            this.alert=true
            return
        }
        console.log(this.caption)
        let formdata = new FormData;
        formdata.set('email',this.$store.state.user.email)
        formdata.set('name',this.$store.state.user.name)
        formdata.set('caption',this.caption)
        formdata.append('postFile',this.file);
        let res = await upload.newPost(formdata)
        console.log(res)
    },
    handleFilesUpload(){
        this.file = this.$refs.file.files[0];
        console.log(this.file.name.split('.')[1])
        var type = this.file.name.split('.')[1]
        if(  type ==='png'||type ==='PNG'||type ==='jpg'||type ==='JPG'||type ==='jpeg'||type ==='JPEG'||type ==='gif'||type ==='GIF'||type ==='svg'||type ==='SVG'){}
        else{
            this.file=''
            this.ft=true
        }
    }
}
}
</script>

<style>

</style>
