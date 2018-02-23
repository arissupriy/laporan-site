import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import * as types from '../actions/types';
import { stat } from 'fs';
import * as API from '../api';
import route from '../router'

Vue.use(Vuex);

const store =  new Vuex.Store({
    state: {
        posts: [],
        posts_detail: null,
        loading: false,
        userLoading: false,
        user: {
            username: null,
            email: null,
            token: null
        },
        isLogin: !!localStorage.getItem("auth"),
        token: localStorage.getItem('auth'),
        userError: {
            status: false,
            message: ""
        },
        registerSuccess: {
            status: false,
            message: 'test'
        },
        regSuccess: false,
        logoutLoading: false,
        createComplaint: {
            isLoading: false,
            finished: false,
            error: false
        },
        categoryData: []
    },
    actions: {
        GET_POST: function({commit},{ page_number }) {
            commit('LOADING', true);
            axios.get(API.COMPLAINT_DATA, {
                params: {
                    page: page_number
                }
            })
            .then(function(response) {
                commit(types.GET_POST, response.data);
                commit('LOADING', false);
            }, function(err) {
                console.log(err);
                commit('LOADING', false);
            })
        },
        GET_POST_DETAIL: function({ commit },{ id }) {
            commit('LOADING', true);
            const url = API.COMPLAINT_BY_ID+'/'+id;
            axios.get(url)
            .then(function(response) {
                commit(types.GET_POST, response.data);
                commit('LOADING', false);
            }, function(err) {
                console.log(err);
                commit('LOADING', false);
            })
        },
        LOGIN: function({commit}, { data }){
            commit('LOGIN_PROCESS');
            return new Promise((resolve, reject) => {
                axios.post(API.API_LOGIN, { 
                    username: data.username, password: data.password
                }).then(function(response){
                    commit('LOGIN_SUCCESS', {data: response.data});
                    resolve(response.data);
                }).catch(function(error){
                    commit('LOGIN_ERROR', { 
                        status: error.response.status, 
                        message: 'Maaf Login Gagal'
                    });
                    //resolve(error);
                });
            })
        },
        REGISTER: function({commit}, { data }){
            commit('REGISTER_PROCESS');
            new Promise((resolve, reject) => {
                axios.post(API.API_REGISTER, { 
                    username: data.username, 
                    email: data.email, 
                    password: data.password, 
                    phone: data.phone, 
                    name: data.name
                }).then(function(response){
                    commit('REGISTER_SUCCESS');
                    resolve(response);
                }).catch(function(error){
                    commit('REGISTER_ERROR', {
                       status: error.response.status 
                    });
                });
            })
        },
        LOGOUT: function({commit}, { token }){
            commit('LOGOUT_PROCESS');
            axios.get(API.API_LOGOUT, {
                headers : {
                    Authorization: token
                }      
            })
            .then(function(response){
                commit('LOGOUT_SUCCESS');
            })
            .catch(function(error){
                commit('LOGOUT_SUCCESS');
            })
        },
        USER_PROFILE: function({commit}, { token }){
            axios.get(API.API_PROFILE, { headers: { Authorization: token }})
            .then(function(response){
                commit('LOAD_PROFILE', {data: response.data})
            })
            .catch(function(error){
                localStorage.clear();
                route.push({name: 'User'})
            })
        },
        GET_CATEGORY: function({ commit }){
            axios.get(API.COMPLAINT_CATEGORY)
            .then(function(response){
                commit('GET_CATEGORY', { data: response.data })
            })
            .catch(function(error){

            })
        },
        NEW_LAPOR: function({commit}, { data, token }){
            commit('CREATE_PROCESS');
            const credentials = {
                category_id: data.category_id,
                title: data.title,
                description: data.more,
                photos: data.image
            };

            const HTTP = axios.create({
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token
                }

            });

            HTTP.post(API.COMPLAINT_CREATE, credentials)
            .then(function(response) {
                commit('CREATE_SUCCESS');
            }).catch(function(error) {
                commit('CREATE_ERROR', { res: error.response });
            })            
        }
    },
    mutations: {
        GET_POST (state, payload) {
            state.posts = payload;
        },
        GET_POST_DETAIL (state, payload) {
            state.posts_detail = payload;
        },
        LOADING (state, bool){
            state.loading = bool;
        },
        USER_LOADING (state, bool){
            state.userLoading = bool;
        },
        LOGIN_PROCESS (state) {
            state.isLogin = false;
            state.userLoading = true;
            state.userError.status = false;
            state.userError.message = null;
        },
        LOGIN_SUCCESS (state, { data }) {
            localStorage.setItem('auth', data.token)
            state.isLogin = true;
            state.token = localStorage.getItem('auth');
            state.userLoading = false;
            state.userError.status = false;
            state.userError.message = null;
        },
        LOGIN_ERROR (state, {status}) {
            state.userLoading = false;
            state.isLogin = false;
            if(status === 401){
                state.userError.message = 'Username atau password tidak ditemukan';
            } else if (status == 400) {
                state.userError.message = 'Form tidak boleh ada yang kosong';
            } else {
                state.userError.message = 'Login tidak berhasil dilakukan';
            }
            state.userError.status = true;
            
        },
        LOGOUT (state) {
            state.isLogin = false;
        },
        LOGOUT_PROCESS (state) {
            state.logoutLoading = true;
        },
        LOGOUT_SUCCESS (state) {
            localStorage.clear();
            state.logoutLoading = false;
            route.push({name: 'User'});
        },
        REGISTER_PROCESS (state) {
            state.userLoading = true;
            state.registerSuccess.status = false;
            state.userError.status = false;
            state.userError.message = null;
        }, 
        REGISTER_SUCCESS (state){
            state.registerSuccess = {
                status: true,
                message: 'Berhasil'
            };
            state.userLoading = false;
            state.userError = {
                status: false,
                message: null
            };
        },
        REGISTER_ERROR (state, { status }) {
            state.userLoading = false;
            if (status === 400) {
                state.userError.message = 'Form tidak boleh ada yang kosong';
            } else if (status == 409) {
                state.userError.message = 'Username/Email sudah digunakan';
            } else {
                state.userError.message = 'Registrasi gagal, silakan laporkan ke administrator';
            }
            state.userError.status = true;
            state.registerSuccess.status = false;
        },
        LOAD_PROFILE (state, {data}){
            state.user = data;
        },
        CREATE_PROCESS (state){
            const c = state.createComplaint;
            c.isLoading = true;
            c.error = false;
            c.finished = false;
        },
        CREATE_SUCCESS (state){
            const c = state.createComplaint;
            c.isLoading = false;
            c.error = false;
            c.finished = true;
            route.push({
                name: 'Post'
            })
        },
        GET_CATEGORY (state, { data }){
            state.categoryData = data;
        },
        CREATE_ERROR (state, { res }){
            if(res.status == 401){
                localStorage.clear();
                route.push({name: 'Login'});
            }
            const c = state.createComplaint;
            c.isLoading = false;
            c.error = true;
            c.finished = true;
        }
    },
    getters: {
        posts: state => {
            return state.posts;
        },
        loading: state => {
            return state.loading;
        },
        userLoading: state => {
            return state.userLoading;
        },
        userError: state => {
            return state.userError;
        },
        loginSuccess: state => {
            return state.isLogin;
        },
        registerSuccess: state => {
            return state.registerSuccess;
        }
    }
})

export default store;