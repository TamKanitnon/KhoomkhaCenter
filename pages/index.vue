<template>
  <div class="container">
    <loading-page v-if="loading"></loading-page>
    <h2 class="text-center mt-2 mb-4">home</h2>
    <div class="row  my-5">
      <div class="col-12 pa-2 col-sm-6">
       
      </div>
    
    </div>


   
  </div>
</template>

<script>

import LoadingPage from "../components/LoadingPage.vue";
export default {

  data() {
    return {
 
      loading: false
    };
  },
 
  async mounted() {
 
  
  },
  methods: {
 
  }
};
</script>

<style></style>
