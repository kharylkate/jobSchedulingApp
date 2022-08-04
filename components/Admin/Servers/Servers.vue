<!-- Please remove this file from your project -->
<template>
  <div>
    <div class="main-content p-0 m-0">
        <div class="header">
          <Navbar />
          <div class="header-page-title m-0 pt-2 pb-1 pr-0 pl-0">
            <h3> Servers </h3>
          </div>
        </div>
      <b-overlay :show="show"></b-overlay>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Servers',
  data() {
    return {
      show: false,
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