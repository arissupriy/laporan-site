<template>
  <div class="user has-text-centered">
      <h1 class="has-text-centered">Anda Belum Melakukan Login</h1>
      <br />
      <router-link :to="{name: 'Login'}" class="button">Login</router-link>
      <router-link :to="{name: 'Register'}" class="button">Register</router-link>
  </div>
</template>

<script>
export default {
    name: 'User'
}
</script>

<style>
    .user {
        padding: 20px;
    }
</style>
