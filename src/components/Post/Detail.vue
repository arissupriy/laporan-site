<template>
  <div>
      <div class="card">
            <header class="card-header">
                <p class="card-header-title">
                    {{dataPost.title}} ({{dataPost.category_name}})
                </p>
                <a href="#" class="card-header-icon" aria-label="more options">
                    <span class="icon">
                        <i class="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                </a>
            </header>
            <div class="card-image">
                <figure class="image is-16by9">
                <img :src="url_image + dataPost.photos" alt="Placeholder image">
                </figure>
            </div>
            <div class="card-content content-post">
                <div class="content">
                    {{dataPost.description}}
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
        <Comment />

  </div>
</template>

<script>
import Vue from 'vue';
import { IMAGE_URL } from '../../api';
import Comment from './Comment';

Vue.component('Comment', Comment);


export default {
    name: 'PostDetail',
    
    data(){
        return {
            url_image: IMAGE_URL
        }
    },
    methods: {
        getPost(){
            this.$store.dispatch('GET_POST_DETAIL', { id: this.$route.params.id })
        }
        
    },
    created: function () {
        try {
            this.getPost();
        } catch (error) {
            console.log(error)
        }
    },
    computed: {
        dataPost(){
            const post = this.$store.state.posts;
            document.title = 'Lapor '+ post.title;
            return post
        }
    }
}
</script>

<style>
    
</style>
