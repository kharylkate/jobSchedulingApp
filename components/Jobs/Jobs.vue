<!-- Please remove this file from your project -->
<template>
  <div>
    <b-card border-variant="light" bg-variant="default" text-variant="black" title="Jobs">
      <b-card-text class="jobs-description-container">
        <div>
          
        </div>
        
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, voluptates? Quo illo facilis libero voluptatum iste molestias ipsam quisquam, alias cumque id nemo cupiditate possimus recusandae explicabo expedita ullam aliquam. <unicon class="icon-create-script" name="direction" fill="fontprimary"></unicon>
      </b-card-text>
      <b-button href="#" variant="primary" @click="showCreateJobModal()">Create Job</b-button>
    </b-card>

    <div class="container mt-3">
      <b-table responsive outlined sticky-header="100px;"
        :items="listJobs"
        :fields="fields"
      >
        <template v-slot:cell(description)="data">
          <!-- <nuxt-link :to="'JobNewTab/'+data.item.id" target="_blank"> -->
          <nuxt-link :to='/jobs/+ data.item.id' target="_blank">
            {{ data.item.description }}
          </nuxt-link>
          <!-- </nuxt-link> -->
        </template>
        <template v-slot:cell(actions)="data">
          <b-button id="btn-create-script" variant="btn-primary" size="sm" v-if="(data.item.script !== null || data.item.script !== '')">
            <unicon class="icon-create-script" name="direction" fill="font-primary"></unicon>
          </b-button>
        </template>
      </b-table>
    </div>

    <b-modal centered id="create-new-job" title="Create New Job" @hidden="resetCreateJobModal" @ok="createJob">
      <form ref="createJobForm" @submit.stop.prevent="handleSubmit">
        <b-form-group label="Name" label-size="sm" label-for="name-input" :state="state.name" invalid-feedback="Name is required">
          <b-form-input id="name-input" size="sm" v-model="job.name" required />
        </b-form-group>

        <b-form-group label="Description" label-size="sm" label-for="desc-input" :state="state.description" invalid-feedback="Description is required">
          <b-form-input id="desc-input" size="sm" v-model="job.description" required />
        </b-form-group>

        <b-form-group label="Schedule" label-size="sm" label-for="sched-input" :state="state.schedule" invalid-feedback="Schedule is required">
          <b-form-input id="sched-input" size="sm" v-model="job.schedule" required />
        </b-form-group>

        <b-form-group label="Status" label-size="sm" label-for="status-input" :state="state.status" invalid-feedback="Status is required">
          <b-form-radio-group id="status-input" class="pt-2"
            :options="['Enabled', 'Disabled']" v-model="job.status" required/>
        </b-form-group>
      </form>
    </b-modal>

    <!-- alert -->
    <div>
      <b-alert class="alerticon" v-model="alert.showAlert" variant="light">
        <div class="alertborder" style="borderWidth:40px solid; borderColor:'brown'">
          <unicon :name="alert.color == 'green' ? 'check' : 'multiply' " :fill="alert.color"> </unicon>
            {{ alert.message }}
        </div>
      </b-alert>
    </div>

  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import cronstrue from "cronstrue";

export default {
  name: 'NuxtTutorial',
  data() {
    return {
      fields: [
        {
          key: "name",
          label: "Name"
        },{
          key: "description",
          label: "Description"
        },{
          key: "status",
          label: "Status",
          formatter: value => {
            return value == 1 ? "Enabled" : "Disabled";
          }
        },{
          key: "schedule",
          label: "Schedule",
          formatter: value => {
            return cronstrue.toString(value);
          }
        },{
          key: "actions",
          label: "Action",
        },
      ],
      job: {
        name: null,
        description: null,
        status: null,
        schedule: null,
      },
      alert: {
        showAlert: 0,
        color: "",
        message: ""
      },
      state: {
        name: null,
        description: null,
        status: null,
        schedule: null,
      }
    }
  },
  created(){
  },
  computed: {
    ...mapGetters({
      listJobs: "Jobs/getListJobs",
    }),

    cronToString(schedule) {
      console.log(schedule);
      return cronstrue.toString(schedule)
    }
  },
  methods: {
    showCreateJobModal() {
      // this.showAlert("Successfully Created", "green");
      this.$bvModal.show("create-new-job");
    },
    resetCreateJobModal() {
      this.job = {
        name: null,
        description: null,
        status: null,
        schedule: null,
      }
    },
    createJob(bvModalEvent) {
      bvModalEvent.preventDefault();
      if(!this.validation()) {
        return;
      }

      this.$store.dispatch("Jobs/createJob", this.job).then(res => {
        console.log(res);
        if(res.status == 201) {
          this.job = {
            name: null,
            description: null,
            status: null,
            schedule: null,
          }
          this.state = {
            name: null,
            description: null,
            status: null,
            schedule: null,
          }
          this.showAlert("Successfully Created", "green");
          this.$bvModal.hide("create-new-job");
        } else {
          this.showAlert("Error", "red");
        }
      })
    },
    validation() {
      if(this.job.name == null || this.job.name.length < 1) {
        document.getElementById("name-input").style.borderColor = "red";
        this.state.name = false;
      } else {
        document.getElementById("name-input").style.borderColor = "";
        this.state.name = true;
      }
      if(this.job.description == null || this.job.description.length < 1) {
        document.getElementById("desc-input").style.borderColor = "red";
        this.state.description = false;
      } else {
        document.getElementById("desc-input").style.borderColor = "";
        this.state.description = true;
      }
      if(this.job.schedule == null || this.job.schedule.length < 1) {
        document.getElementById("sched-input").style.borderColor = "red";
        this.state.schedule = false;
      } else {
        document.getElementById("sched-input").style.borderColor = "";
        this.state.schedule = true;
      }
      if(this.job.status == null || this.job.status.length < 1) {
        document.getElementById("status-input").style.color = "red";
        this.state.status = false;
      } else {
        document.getElementById("status-input").style.color = "";
        this.state.status = true;
      }

      if(this.job.name != null && this.job.description != null && this.job.schedule != null && this.job.status != null) {
        return true;
      }
      
      return false;
    },
    showAlert(message, color) {
      this.alert = {
        showAlert: 3,
        message,
        color
      }
    }

  },
  async beforeCreate() {
    // await this.$store.dispatch("Jobs/fetchListJobs");
  },
  
}
</script>

<style scoped>
  /* b-card {
    border-radius: 0 !important;
  } */
</style>




// npm install ssh2-sftp-client (for connecting to ssh-putty)
// https://www.npmjs.com/package/ssh2-sftp-client#sec-3

// npm install bree (for cron stuff)
// https://jobscheduler.net/#/