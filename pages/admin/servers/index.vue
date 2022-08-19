<template>
  <div>
      <b-container fluid class="m-0 p-0">
        <b-row class="m-0 p-0 ">
          <b-col cols="12" lg="2" md="2" sm="0" class="sidebar m-0 p-0">
            <Sidebar />
          </b-col>
          <b-col class="content m-0 p-0">
            <Servers />
          </b-col>
        </b-row>
      </b-container>
  </div>
</template>

<script>
import Sidebar from '../../../layouts/sidebar.vue'
import Servers from '../../../components/Admin/Servers/Servers.vue';
export default {
  name: 'IndexPage',
  components: { 
    Sidebar,
    Servers
  }
}
</script>