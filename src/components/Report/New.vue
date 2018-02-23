<template>
  <div class="new-report">
    <a align="right" class="button is-danger" v-on:click="category = 0" v-if="category !== 0">Kembali</a>
    <div class="notification is-danger" v-if="isError" ref="error">
        <button class="delete" v-on:click="closeNotif"></button>
        <strong>Maaf</strong>, Proses gagal, silakan ulangi lagi
    </div>
    <div v-if="category === 0">
      <p class="has-text-centered">Pilih Kategori</p>
      <br/>
      <div class="columns">
        <div class="column col-mobile category" v-for="ctg in categoryData" v-bind:key="ctg.id">
          <div class="card" v-on:click="category = ctg.id">
            <div class="card-image">
              <figure class="image is-4by3">
                <img :src="image_url+ctg.icon"  alt="Placeholder image">
              </figure>
            </div>
            
          </div>
        </div>
    </div>
    </div>
    <div v-else>
      <form v-on:submit.prevent="submit">
        <div class="field">
          <label class="label">Kategori</label>
          <div class="control">
            <input class="input" type="text" placeholder="Text input" v-model="filterCategory.name" disabled>
          </div>
        </div>

        <div class="field">
          <label class="label">Judul Laporan</label>
          <div class="control">
            <input class="input" type="text" placeholder="Text input" v-model="cred.title" ref="title">
          </div>
        </div>

        <div class="field">
          <label class="label">Keterangan</label>
          <div class="control">
            <textarea class="textarea is-primary" type="text" placeholder="Keterangan Laporan" ref="more" v-model="cred.more"></textarea>
          </div>
        </div>

        <div class="file has-name is-boxed">
          <label class="file-label">
            <input class="file-input" type="file" name="resume" @change="previewImage" accept="image/*">
            <span class="file-cta">
              <span class="file-icon">
                <i class="fas fa-upload"></i>
              </span>
              <span class="file-label">
                Choose a file…
              </span>
            </span>
            <span class="file-name">
              {{imageName}}
            </span>
            <div class="image-preview" v-if="imageData.length > 0">
                <img class="preview" :src="imageData">
            </div>
          </label>
        </div>

        <br/>
        <div class="field">
          <div class="control">
            <label class="checkbox">
              <input type="checkbox" v-model="cred.syarat" value="1" ref="syarat">
              Saya setuju dengan <a href="#">Peraturan dan Kebijakan</a>
            </label>
          </div>
        </div>

        <div class="field is-grouped">
          <div class="control">
            <button v-if="!isLoading" class="button is-link" type="submit">Submit</button>
            <button v-else-if="!!isLoading" class="button is-loading is-link" type="submit">Submit</button>
          </div>
          <div class="control">
            <button class="button is-text" >Cancel</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { IMAGE_URL } from '../../api';

export default {
    name: 'NewReport',
    data(){
      return {
        token: localStorage.getItem('auth'),
        customImageMaxSize: 1,
        imageData: "",
        imageName: "Pilih dulu ...",
        category: 0,
        image_url: IMAGE_URL,
        cred: {
          title: '',
          more: '',
          image: '',
          syarat: false
        }
      }
    },
    created(){
      document.title = 'Lapor Keluhan';
      this.getCategory();
    },
    computed: {
      filterCategory(){
        const self = this
        const temp = this.categoryData.filter(function(e){
          return e ? e.id === self.category : null
        })

        return temp[0]

      },
      isLoading(){
        return this.$store.state.createComplaint.isLoading;
      },
      isError(){
        return this.$store.state.createComplaint.error;
      },
      categoryData(){
        return this.$store.state.categoryData;
      }
    },
    methods: { 
      getCategory(){
        this.$store.dispatch('GET_CATEGORY');
      },
      closeNotif(){
        this.isError = false;
      },
      submit(){
        const cred = this.cred;

        if(this.checkNull(cred.title)){
          this.$refs.title.focus();
        } else if(this.checkNull(cred.more)){
          this.$refs.more.focus();
        } else if(!cred.syarat){
          this.$refs.syarat.focus();
        } else {
          const img = null
          
          const credential = {
            title: cred.title,
            more: cred.more,
            image: cred.image? cred.image : null,
            category_id: this.category
          }

          this.$store.dispatch('NEW_LAPOR', {
            data: credential,
            token: this.token
          })
          
        }
        
      },
      checkNull(cred){
        return (cred === '' || cred === null)
      },
      previewImage: function(event) {
            // Reference to the DOM input element
            var input = event.target;
            // Ensure that you have a file before attempting to read it
            this.imageName = input.files[0].name;
            if (input.files && input.files[0]) {
                // create a new FileReader to read this image and convert to base64 format
                var reader = new FileReader();
                // Define a callback function to run, when FileReader finishes its job
                reader.onload = (e) => {
                    // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
                    // Read image as base64 and set to imageData
                    this.imageData = e.target.result;
                    this.cred.image = this.imageData;
                }
                // Start the reader job - read file as a data url (base64 format)
                reader.readAsDataURL(input.files[0]);
            }
        }
    },
}
</script>

<style>
  .new-report{
    padding: 20px;
  }

  .file-upload-form, .image-preview {
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    padding: 20px;
  }
  img.preview {
      width: 200px;
      background-color: white;
      border: 1px solid #DDD;
      padding: 5px;
  }

  .col-mobile{
    float: left;
    width: 25%;
  }

  .category{
    cursor: pointer;
  }
  

</style>
