<template>
  <div class="new-report">
    <div class="field">
      <label class="label">Judul Laporan</label>
      <div class="control">
        <input class="input" type="text" placeholder="Text input">
      </div>
    </div>

    <div class="field">
      <label class="label">Keterangan</label>
      <div class="control">
        <textarea class="textarea is-primary" type="text" placeholder="Primary textarea"></textarea>
      </div>
    </div>

    <div class="file has-name">
      <label class="file-label">
        <input class="file-input" type="file" name="resume">
        <span class="file-cta">
          <span class="file-icon">
            <i class="fas fa-upload"></i>
          </span>
          <span class="file-label">
            Choose a file…
          </span>
        </span>
        <span class="file-name">
          Screen Shot 2017-07-29 at 15.54.25.png
        </span>
      </label>
    </div>

    <div class="field">
      <div class="control">
        <label class="checkbox">
          <input type="checkbox">
          Saya setuju dengan <a href="#">Peraturan dan Kebijakan</a>
        </label>
      </div>
    </div>


    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link">Submit</button>
      </div>
      <div class="control">
        <button class="button is-text">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'NewReport',
    created(){
      document.title = 'Lapor Keluhan';
    }
}
</script>

<style>
  .new-report{
    padding: 20px;
  }
</style>
