<template>
  <div>
      <div class="notification is-danger" v-if="loginStatus.status">
        <button class="delete" v-on:click="closeNotif"></button>
        <strong>Maaf</strong>, {{loginStatus.message}}
        </div>
      <div class="field">
        <p class="control has-icons-left has-icons-right">
            <input class="input" ref="username" placeholder="Username" v-model="credentials.username">
            <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
            </span>
            <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
            </span>
        </p>
        </div>
        <div class="field">
        <p class="control has-icons-left">
            <input class="input" ref="password" type="password" placeholder="Password" v-model="credentials.password">
                <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
            </span>
        </p>
        </div>
        <div class="field">
        <p class="control">
            <button class="button is-success" @click="submit()">
            Login <div v-if="loginProcess"><i class="fas fa-spin fa-spinner"></i></div>
            </button> 
            <router-link class="button is-text" :to="{name: 'Register'}">
            Daftar Sekarang
            </router-link> 
        </p>
        </div>
  </div>
</template>

<script>
import store from '../../store';
import { nonLogin } from "../../Auth";

export default {
    name: 'Login',
    data(){
        return {
            credentials: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        submit(){
            if (this.credentials.username === '') {
                this.$refs.username.focus()
            } else if (this.credentials.password === '') {
                this.$refs.password.focus()
            } else {
                let cred = {
                    username: this.credentials.username,
                    password: this.credentials.password
                }
                try {
                    this.$store.dispatch('LOGIN', { data: cred }).then((response) => {
                        if(this.$store.state.isLogin){
                            this.$router.push({ name: 'Profile' })
                        }
                    })
                } catch (error) {
                    console.log(error)
                }
            }
            
        },
        closeNotif(){
            this.loginStatus.status = false
        }
        
    },
    computed: {
        loginStatus(){
            return store.state.userError;
        },
        loginProcess(){
            return this.$store.state.userLoading;
        }
    },
    created(){
            document.title = 'Login';
    },
    beforeCreate(){
        nonLogin
    }
}
</script>

<style>

</style>
