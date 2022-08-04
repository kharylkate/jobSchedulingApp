<!-- Please remove this file from your project -->
<template>
  <div>
    <div class="main-content p-0 m-0">
      <div class="header">
        <Navbar />
        <div class="header-page-title m-0 pt-2 pb-1 pr-0 pl-0">
          <h3> Accounts </h3>
        </div>
      </div>

      <div class="jobs-table">
        <div class="jobs-table-top">
          <b-row>
            <div class="jobs-table-command pt-1 mr-auto ml-0">
              <b-form-input class="p-0 m-0 input-search" id="input-search" 
                v-model="search" type="text" 
                ref="username"
                autocomplete="false"
                required>
              </b-form-input>
            </div>
            
            <div class="jobs-table-create ml-auto mr-0">
              &nbsp;&nbsp;
              <b-button class="btn-create-job" variant="font-primary" size="sm" @click="showCreateJobModal()">
                <unicon class="unicon" name="plus" fill="white" /> <b>JOB&nbsp;</b>
              </b-button>
            </div>
          </b-row>
        </div>
        <b-table small hover responsive sticky-header selectable 
          class="table-borderless border-0" 
          select-mode="single"
          :items="listJobs"
          :fields="fields"
          @row-selected="onRowSelect"
        >
          <template v-slot:cell(status)="data">
            <b-badge v-if="(data.item.status)" variant="btn-secondary">ENABLED</b-badge>
            <b-badge v-else variant="disabledbg" style="color: white">DISABLED</b-badge>
          </template>
          <template v-slot:cell(actions)="data">
            <b-button class="btn-update-script px-1 py-1" size="sm" v-if="(data.item.script !== null || data.item.script !== '')" @click="showUpdateJobModal(data.item)">
                &nbsp; <unicon class="icon-update-script" name="pen" fill="white"></unicon>
                Update&nbsp;&nbsp;
            </b-button>
          </template>
        </b-table>
      </div>
      <b-overlay :show="show" no-wrap fixed> </b-overlay>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Accounts',
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