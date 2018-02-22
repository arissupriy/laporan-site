<template>
  <div class="homepage">
      <Post />
  </div>
</template>
<script>

import Vue from 'vue';
import Post from './Post';

Vue.component('Post', Post);

export default {
    name: 'PostIndex',
    data(){
        return {
            title: 'Daftar Laporan'
        }
    }
}
</script>
<style>

</style>
