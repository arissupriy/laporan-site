<template>
  <div class="wrap" id="wrap">
    <Header/>
    
    <section class="section">
      <div class="menu">
        <IconBar/>
      </div>
      <div class="container main-content w-main">
        <div class="spinner" v-if="loading">
          <div class="bounce1"></div>
          <div class="bounce2"></div>
          <div class="bounce3"></div>
        </div>
        <router-view></router-view>
      </div>
    </section>
    <router-link href="#" class="float" :to="{name: 'Report'}">
        <i class="fa fa-plus my-float"></i>
    </router-link>
  </div>
</template>

<script>
import IconBar from "./components/IconBar";
import Header from "./components/Header";

import Vue from "vue";
import store from './store';

import './assets/fa.js';

Vue.component("IconBar", IconBar);
Vue.component("Header", Header);

export default {
  name: "App",
  computed: {
    loading(){
      return store.state.loading;
    }
  }
};
</script>

<style src='./assets/bulma.css'></style>
<style src='./assets/style.css'></style>
<style>
  .spinner {
    padding: 100px 0;
    margin: 0px auto 0;
    width: 70px;
    text-align: center;
  }

  .spinner > div {
    width: 18px;
    height: 18px;
    background-color: #333;

    border-radius: 100%;
    display: inline-block;
    -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  }

  .spinner .bounce1 {
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }

  .spinner .bounce2 {
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }

  @-webkit-keyframes sk-bouncedelay {
    0%, 80%, 100% { -webkit-transform: scale(0) }
    40% { -webkit-transform: scale(1.0) }
  }

  @keyframes sk-bouncedelay {
    0%, 80%, 100% { 
      -webkit-transform: scale(0);
      transform: scale(0);
    } 40% { 
      -webkit-transform: scale(1.0);
      transform: scale(1.0);
    }
  }

  

</style>



