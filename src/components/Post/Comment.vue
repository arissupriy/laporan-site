<template>
  <div class="comment">
      <article class="media" v-if="!!token">
                <figure class="media-left">
                    <p class="image is-64x64">
                    <img src="https://bulma.io/images/placeholders/128x128.png">
                    </p>
                </figure>
                <form v-on:submit.prevent="submit">
                    <div class="media-content">
                    <div class="field">
                    <p class="control">
                        <textarea v-model="cred.comment" class="textarea comment-text" placeholder="Add a comment..." required></textarea>
                    </p>
                    </div>
                    <div class="field">
                    <p class="control">
                        <button type="submit" class="button">Kirim Komentar</button>
                    </p>
                    </div>
                </div>
                </form>
                </article>
            <article class="media" v-for="comment in commentData" v-bind:key="comment.id">
                <figure class="media-left">
                    <p class="image is-64x64">
                    <img src="https://bulma.io/images/placeholders/128x128.png">
                    </p>
                </figure>
                <div class="media-content">
                    <div class="content">
                    <p>
                        <strong>{{comment.username}}</strong>
                        <br>
                        {{comment.comment}}
                        <br>
                        <small><a>Like</a> · <a>Reply</a> · 3 hrs</small>
                    </p>
                    </div>
                </div>
                </article>
  </div>
</template>

<script>
export default {
    name: 'Comment',
    data(){
        return {
            token: localStorage.getItem('auth'),
            complaint_id: this.$route.params.id,
            cred: {
                comment: null
            }
        }
    },
    created(){
        this.getComment()
    },
    methods: {
        getComment(){
            this.$store.dispatch('GET_COMMENTS', { complaint: this.complaint_id})
        },
        submit(){
            const credential = {
                comment: this.cred.comment,
                complaint_id: this.complaint_id
            }

            this.$store.dispatch('CREATE_COMMENT', { data: credential, token: this.token })

            if(!this.$store.state.createComment.error){
                this.cred.comment = null;
            }
        }
    },
    computed: {
        commentData(){
            return this.$store.state.commentsData;
        }
    }

}
</script>

<style>
    .comment{
        padding: 10px 20px;
    }
    .comment-text {
        min-height: 65px;
    }
</style>
