<template>
    <v-app>
           
                
        <v-img src="/static/login.gif">
            <v-layout justify-center column="">
            <h1 class="red--text">Login</h1>
            <v-layout style="margin-top:6%" align-center justify-center >
            <v-form v-model="valid" ref="form">
            <v-text-field
            v-model="email"
            label="Email"
            outline
            color="black"
            required
            :rules="[rules.required, rules.email]"
            ></v-text-field>
            <v-text-field
            v-model="password"
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
            <v-btn large style="border-radius:15px" type="submit" :disabled="!valid" @click="login" class="elevation-5" color="black">
                <h1 class="red--text">Submit</h1>
            </v-btn>
            <v-alert :value=alert outline color="error" icon="warning">
                {{ msg }}
            </v-alert>
            </v-form>
            </v-layout>
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
        wrong_pass: "The Entered Email or the Password is Incorrect.",
        email: '',
        password: '',
        show1: false,
        valid: true,
        alert:false,
        msg:"",
         rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          }}
        }
},
methods:{
    async login() {
        if (this.$refs.form.validate()){
          
          try {
            console.log("here")
            let res = await auth.login({
              email: this.email,
              pass: this.password
            })
            console.log(res)
            if (res.data.user) {
              this.$store.dispatch('setUser', res.data.user)
              this.$store.dispatch('setToken', true)
              this.$refs.form.reset()
              this.$router.push({ name: 'wall' })
            } else {
              this.msg = res.data.message
              this.alert = !this.alert
              this.$refs.form.reset()
              //alert(String(res.message))
            }
          } catch (error) {
            // this.error = error.data.error || error.data
          }}
      }
}
}
</script>

<style>

</style>
