<template>
        <div>
            <div class="container main-content">
            <div class="icon-bar ">
                <router-link :to="{name: 'Home'}">
                    <i class="fa fa-home"></i>
                </router-link>
                <router-link :to="{name: 'Post'}" >
                    <i class="fa fa-quote-left"></i>
                </router-link>
                <router-link :to="{name: 'Notif'}" >
                    <i class="fa fa-bell"></i>
                </router-link>
                <router-link :to="{name: 'User'}">
                    <i class="fa fa-user"></i>
                </router-link>
            </div>
        </div>
        </div>
        
</template>
<script>
    export default {
        name: 'IconBar',
        data(){
            return {
                homeActive: false,
                notifActive: false,
                userActive: false,
                postActive: false
            }
        }
    }
</script>
<style>
    .icon-bar .router-link-exact-active{
        background-color: #efefef !important;
        color: #3273dc;
    }

</style>