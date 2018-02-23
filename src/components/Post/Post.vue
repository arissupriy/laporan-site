<template>
    <div>
        <div class="container main-content box">
            <div class="dropdown" v-bind:class="{ 'is-active': toggleDropdown}">
                <div class="dropdown-trigger">
                    <button class="button" aria-haspopup="true" aria-controls="dropdown-menu" v-on:click="toggleDropdown = !toggleDropdown">
                    <span>Pilih Kategori</span>
                    <span class="icon is-small">
                        <i class="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                    </button>
                </div>
                <div class="dropdown-menu" id="dropdown-menu" role="menu">
                    <div class="dropdown-content">
                    <a href="#" class="dropdown-item">
                        Dropdown item
                    </a>
                    <a class="dropdown-item">
                        Other dropdown item
                    </a>
                    <a href="#" class="dropdown-item is-active">
                        Active dropdown item
                    </a>
                    <a href="#" class="dropdown-item">
                        Other dropdown item
                    </a>
                    <hr class="dropdown-divider">
                    <a href="#" class="dropdown-item">
                        With a divider
                    </a>
                    </div>
                </div>
                </div>
        </div>
        <div class="card" v-for="post in dataPost" v-bind:key="post.id">
            <header class="card-header">
                <p class="card-header-title">
                    {{post.title}} ({{post.category_name}})
                </p>
                <a href="#" class="card-header-icon" aria-label="more options">
                    <span class="icon">
                        <i class="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                </a>
            </header>
            <div class="card-content content-post" v-on:click=showDetail(post.id)>
                <div class="content">
                    {{post.description}}
                </div>
                </div>
            <footer class="card-footer">
                <a href="#" class="card-footer-item">
                    <span class="fa fa-thumbs-up"></span>
                </a>
                <a href="#" class="card-footer-item">
                    <span class="fa fa-comment"></span>
                </a>
                <a href="#" class="card-footer-item">
                    <span class="fa fa-share-alt"></span>
                </a>
            </footer>
        </div>
    </div>
</template>
<script>
import store from '../../store';
import * as types from '../../actions/types';

export default {
    name: 'Post',
    data(){
        return {
            toggleDropdown: false
        }
    },
    methods: {
        getPost(){
            store.dispatch(types.GET_POST, { page_number: 1})
        },
        
        showDetail(id){
            this.$router.push({ name: 'PostDetail', params: { id: id } })
        }
    },
    created: function () {
        try {
            document.title = 'Laporan Warga';
            this.getPost();
        } catch (error) {
            console.log(error)
        }
    },
    computed: {
        dataPost(){
            return store.state.posts;
        }
    }
}
</script>
<style>
    .content-post{
        cursor: pointer;
    }
</style>
