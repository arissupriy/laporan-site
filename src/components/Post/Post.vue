<template>
    <div>
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
            title: 'Warga Rembang'
        }
    },
    methods: {
        getPost(){
            console.log('memperbarui post');
            store.dispatch(types.GET_POST, { page_number: 1})
        },
        
        showDetail(id){
            this.$router.push({ name: 'PostDetail', params: { id: id } })
        }
    },
    created: function () {
        try {
            document.title = 'Warga Rembang';
            console.log('created');
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
