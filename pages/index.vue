<template>
  <div>
      <b-container fluid class="m-0 p-0 login-page">
        <b-row class="vh-100 text-center" align-h="center" align-v="center">
          <b-col cols="4"> 
            <Login />
          </b-col>
        </b-row>
      </b-container>
  </div>
</template>

<script>
// import Jobs from '../components/Jobs/Jobs.vue';
import Sidebar from '../layouts/sidebar.vue';
export default {
    name: "IndexPage",
    // layout: "sidebar",
    components: { Sidebar }
}
</script>