<template>
    <v-app style="background-color: rgb(254,254,254);">
           
                
        <v-img v-if="!done" contain src="/static/register.gif" style="max-height:650px">
            <v-layout  justify-center column="">
            <h1 class="red--text">Register</h1>
            <v-layout style="margin-top:6%" align-center justify-center >
            <v-form v-model="valid">
            <v-text-field
            v-model="name"
            label="Name"
            outline
            color="black"
            required
            :rules="[rules.required]"
            ></v-text-field>
            <v-text-field
            v-model="email"
            label="Email"
            outline
            color="black"
            required
            :rules="[rules.required, rules.email]"
            ></v-text-field>
            <v-text-field
            v-model="pass"
            label="Password"
            :append-icon="show1 ? 'visibility_off' : 'visibility'"
            outline
            :type="show1 ? 'text' : 'password'"
            counter
            color="black"
            @click:append="show1 = !show1"
            :rules="[rules.required, rules.min]"
            required
            ></v-text-field>
            <v-btn large @click="register" :disabled="!valid" type="submit"  class="elevation-5" color="black" style="border-radius:15px">
                <h1 class="red--text">Submit</h1>
            </v-btn>
            <v-alert :value=alert outline color="error" icon="warning">
                {{ msg }}
            </v-alert>
            </v-form>
            </v-layout>
            </v-layout>
        </v-img>
        <v-img v-if="done" contain style="max-height:250px;margin-top:4%" src="../static/d.gif">
         <v-layout  justify-center column="">
            <h1 class="red--text">Done</h1>
         </v-layout>
         <v-layout  justify-center style="padding-top:150px">
             <h2>Head to<v-btn style="border-radius:15px" large @click="$router.push({ name: 'login' })"   class="elevation-5" color="black">
                <h1 class="red--text">Login</h1>
            </v-btn></h2>
         </v-layout>
        </v-img>            
            <Footer></Footer>
    </v-app>   
</template>

<script>
import auth from '../services/AuthServices'
import Footer from './footer'
export default {
components:{Footer},
data () {
      return {
        show1:false,
        valid:true,
        done: false,
        name: '',
        email: '',
        password: '',
        alert:false,
        msg:"",
        show1: false,
         rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          }}
        }
},
methods : {
async register() {
        
        try {
          console.log("came here");
          let res = await auth.register({
            email: this.email,
            pass: this.password,
            name: this.name,
            following:[],
            followers:[],
            requests:[]
          })
          console.log(res.data)
          if(res.data.message != 'registered'){
            //this.$store.dispatch('setToken', res.data.token)
            //this.$router.push({ name: 'RegisterSuccess' })
            this.msg=res.data.message
            this.alert=true
            console.log("goto");
          } else {
            this.done=true
            //this.alert = !this.alert
            //this.reg_msg = res.data.message
            console.log("done")
            //window.setTimeout(st(),5000);
          }
        } catch (error) {
          this.snack_text = error.data
        }
      },
    /*st(){
        this.$router.push({ name: 'wall' })
    }*/

}
}
</script>

<style>

</style>
