<template>
  <div>
      <div class="card">

        <div class="card-content">
            <div class="media">
            <div class="media-left">
                <figure class="image is-48x48">
                <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                </figure>
            </div>
            <div class="media-content">
                <p class="title is-4">{{profile.name}}</p>
                <p class="subtitle is-5">{{profile.username}}
                    <span class="icon is-medium is-right button" v-on:click="fullProfile = !fullProfile">
                        <i class="fas fa-eye"></i>
                    </span>
                </p>
                
            </div>
            </div>
            
            
            <div class="content">
                <button class="button is-link is-danger" v-on:click="logoutSubmit">Logout 
                    
                        <i class="fas fa-spinner fa-spin is-white" v-if="logoutLoading"></i>
                    
                </button>
                <button class="button is-link" v-on:click="isActive = true">Edit Profile</button>
            </div>
            <footer class="card-footer" v-if="fullProfile">
                <p class="card-footer-item">
                <span>
                    {{profile.phone}}
                </span>
                </p>
                <p class="card-footer-item">
                <span>
                    {{profile.email}}
                </span>
                </p>
            </footer>
        </div>

        <div class="modal is-active" v-if="!!isActive">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
            <p class="modal-card-title">Edit Profile</p>
            <button class="modal-close is-large" v-on:click="isActive = false" aria-label="close"></button>
            </header>
            
            <footer class="modal-card-foot">
            <button class="button"  v-on:click="isActive = false">Tutup</button>
            </footer>
        </div>
        </div>

        <nav class="panel">
            <p class="panel-heading">
                Laporanku (10)
                
            </p>
            <div class="panel-block">
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title">
                        Component
                        </p>
                        <a href="#" class="card-header-icon" aria-label="more options">
                        <span class="icon">
                            <i class="fas fa-angle-down" aria-hidden="true"></i>
                        </span>
                        </a>
                    </header>
                    <div class="card-content">
                        <div class="content">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
                        <a href="#">@bulmaio</a>. <a href="#">#css</a> <a href="#">#responsive</a>
                        <br>
                        <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                        </div>
                    </div>
                    <footer class="card-footer">
                        <a href="#" class="card-footer-item">Save</a>
                        <a href="#" class="card-footer-item">Edit</a>
                        <a href="#" class="card-footer-item">Delete</a>
                    </footer>
                </div>
            </div>
            <button class="button view-all has-text-centered">Lihat semua</button>
        </nav>
        </div>
  </div>
</template>

<script>
import store from '../../store';
import { loginRequired } from "../../Auth";

export default {
    name: 'Profile',
    data(){
        return {
            token: this.$store.state.token,
            isActive: false,
            fullProfile: false
        }
    },  
    methods: {
        getProfile(){
            store.dispatch('USER_PROFILE', { token: this.token })
        },
        logoutSubmit(){
            store.dispatch('LOGOUT', { token: this.token })
        }
    },
    created(){
        this.getProfile()
        
    },
    computed: {
        profile(){
            const prof = store.state.user;
            document.title = 'Halo '+ prof.username
            return prof;
        },
        logoutLoading(){
            return this.$store.state.logoutLoading;
        }
    }
    
}
</script>

<style>
    .view-all{
        width: 100%;
        height: 75px;
    }
</style>
