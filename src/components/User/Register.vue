<template>
    <div>
        
        <div class="notification is-danger" v-if="registerStatus.status" ref="error">
            <button class="delete" v-on:click="closeNotif"></button>
            <strong>Maaf</strong>, {{registerStatus.message}}
        </div>
        <div class="notification is-success has-text-centered" v-if="registerSuccess.status" ref="success">
            <button class="delete" v-on:click="closeSuccess"></button>
            <strong>Terima kasih</strong>, Proses registrasi berhasil dilakukan
            <br/>
            <br/>
            <li>Silakan melakukan <router-link class="button is-link" :to="{name: 'Login'}">Login</router-link></li>
        </div>
        <div v-else>
            <div class="field">
            <label class="label">Nama Lengkap</label>
            <div class="control">
                <input class="input" type="text" placeholder="Nama Lengkap" v-model="cred.name" ref="name">
            </div>
            </div>

            <div class="field">
            <label class="label">Username</label>
            <div class="control has-icons-left has-icons-right">
                <input class="input" type="text" placeholder="Username" v-model="cred.username" ref="username">
                <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
                </span>
                
            </div>
            </div>

            <div class="field">
            <label class="label">Email</label>
            <div class="control has-icons-left has-icons-right">
                <input class="input" type="email" placeholder="Email input" v-model="cred.email" ref="email">
                <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
                </span>
                
            </div>
            </div>

            <div class="field">
            <label class="label">Password</label>
            <div class="control has-icons-left has-icons-right">
                <input class="input" v-show="!showPassword" placeholder="*********" v-model="cred.password1" ref="password1">
                <span class="icon is-small is-left"  v-on:click="showPassword">
                    <i class="fas fa-key show-password"></i>
                </span>

                
                <input class="input" type="password" v-show="!!showPassword" placeholder="*********" v-model="cred.password1" ref="password2">
                <span class="icon is-small is-left">
                    <i class="fas fa-key"></i>
                </span>
                
                </div>
            </div>
            <div class="field">
                <div class="control">
                    <label class="checkbox">
                    <input type="checkbox" value="1" ref="syarat" v-on:click="showPassword = !showPassword">
                        {{!showPassword? 'Tutup':'Buka'}} Password
                    </label>
                </div>
            </div>
            <div class="field">
            <label class="label">Handphone</label>
            <div class="control has-icons-left has-icons-right">
                <input class="input" type="text" placeholder="Username" v-model="cred.phone" ref="phone">
                <span class="icon is-small is-left">
                <i class="fas fa-phone"></i>
                </span>
                
            </div>
            </div>

            <div class="field">
            <div class="control">
                <label class="checkbox">
                <input type="checkbox" v-model="cred.syarat" value="1" ref="syarat">
                    Saya setuju <a href="#">dengan aturan dan persyaratan</a>
                </label>
            </div>
            </div>

            <div class="field is-grouped">
            <div class="control">
                <button v-if="!registerProcess" class="button is-link" v-on:click="submit">Register</button>
                <button v-else-if="!!registerProcess" class="button is-loading is-link" v-on:click="submit">Submit</button>
                
            </div>
            <div class="control">
                <button class="button is-text" v-on:click="back">Batalkan</button>
            </div>
            </div>
        </div>
        
    </div>
    
</template>

<script>
import store from '../../store';
export default {
    name: 'Register',
    data(){
        return {
            cred: {
                username: null,
                password1: null,
                password2: null,
                email: null,
                phone: null,
                name: null,
                syarat: null
            },
            showPassword: true
        }
    },
    methods: {
        back(){
            this.$router.go(-1)
        },
        submit(){
            if(!this.cred.syarat){
                this.$refs.syarat.focus()
            } 
             else if (this.checkNull(this.cred.name)){
                this.$refs.name.focus();
            } else if (this.checkNull(this.cred.username)){
                this.$refs.username.focus();
            } else if (this.checkNull(this.cred.email)){
                this.$refs.email.focus();
            } else if (this.checkNull(this.cred.password1)){
                this.$refs.password1.focus();
            } else if (this.checkNull(this.cred.phone)){
                this.$refs.phone.focus();
            } else {
                const credentials = {
                    username: this.cred.username,
                    password: this.cred.password1,
                    email: this.cred.email,
                    phone: this.cred.phone,
                    name: this.cred.name
                }

                try {

                    this.$store.dispatch('REGISTER', { data: credentials })
                    .then((res) => {
                        if (this.$store.state.userError.status){
                            this.$refs.error.focus();
                        } 

                        if (this.$store.state.registerSuccess.status){
                            this.cred = {
                                username: null,
                                password1: null,
                                password2: null,
                                email: null,
                                phone: null,
                                name: null,
                                syarat: null
                            }
                        }
                        
                    })                
                    
                } catch (error) {
                    console.log(error);
                }
            }
        },
        checkPassword(p1, p2){
            return p1 === p2;
        },
        checkNull(cred){
            return (cred === '' || cred === null)
        },
        closeNotif(){
            this.registerStatus.status = false;
        },
        closeSuccess(){
            this.registerSuccess.status = false;
        }
    },
    created(){
        document.title = 'Registrasi'
    },
    computed: {
        registerStatus(){
            return store.state.userError;
        },
        registerProcess(){
            return store.state.userLoading;
        },
        registerSuccess(){
            return store.state.registerSuccess;
        }
    },
}
</script>

<style>
    .show-password {
        cursor: pointer;
    }
</style>
