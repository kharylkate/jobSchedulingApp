<!-- Please remove this file from your project -->
<template>
  <div>
    <div class="main-content p-0 m-0">
      <b-overlay :show="show">
        <div class="header">
          <Navbar />
          <div class="header-page-title m-0 pt-2 pb-1 pr-0 pl-0">
            <h3> Admin </h3>
          </div>
        </div>
      </b-overlay>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Admin',
  data() {
    return {
      
    }
  },
  async created(){
  },
  computed: {

  },
  methods: {

  },
  async beforeCreate() {

  },
  
}
</script>