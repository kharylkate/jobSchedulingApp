<template>
  <div>
    <div class="main-content p-0 m-0">
      <div class="header">
        <Navbar />
        <div class="header-page-title m-0 pt-2 pb-1 pr-0 pl-0">
          <h3> Jobs </h3>
        </div>
      </div>

        <div class="jobs-table">
          <div class="jobs-table-top">
            <b-row>
              <div class="jobs-table-command pt-1 mr-auto ml-0">
                <!-- ${{ user.username }} crontab -l -->
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
            show-empty
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

      <!-- job create modal -->
      <b-modal centered id="create-new-job" title="Create New Job" @hidden="resetCreateJobModal" @ok="createJob">
        <form class="p-2" ref="createJobForm" @submit.stop.prevent="handleSubmit">

          <b-form-group label-cols="4" label-cols-lg="2" label-size="sm" label="Server" 
          :state="state.server" label-for="server-input" invalid-feedback="Server is required">
            <b-form-select id="server-input" size="sm" 
            :options="(optionServers)"
            v-model="job.server" required />
          </b-form-group>

          <b-form-group label-cols="4" label-cols-lg="2" label-size="sm" label="Name" 
          :state="state.name" label-for="name-input" invalid-feedback="Name is required">
            <b-form-input id="name-input" size="sm" v-model="job.name" required />
          </b-form-group>

          <b-form-group label-cols="4" label-cols-lg="2" label-size="sm" label="Schedule" 
            label-for="sched-input" :state="state.schedule" invalid-feedback="Schedule is required">
            <b-form-input id="sched-input" size="sm" v-model="job.schedule" required />
          </b-form-group>

          <b-form-group label-cols="4" label-cols-lg="2" label-size="sm" label="Command" 
            :state="state.command" label-for="command-input" invalid-feedback="Command is required">
            <b-form-input id="command-input" size="sm" v-model="job.command" required />
          </b-form-group>

          <b-form-group label-cols="4" label-cols-lg="2" label-size="sm" label="Status" 
            label-for="status-input" :state="state.status" invalid-feedback="Status is required">
            <b-form-radio-group id="status-input" class="pt-2"
              :options="[{ text: 'Enabled', value: true}, { text: 'Disabled', value: false }]" v-model="job.status" required/>
          </b-form-group>
        </form>
        <template #modal-footer>
          <div class="w-100">
            <div class="float-right">
              <b-button
                variant="disabledbg"
                size="sm"
                @click="resetCreateJobModal"
              >
                Cancel
              </b-button>
              <b-button
                variant="btn-primary"
                size="sm"
                @click="createJob()"
              >
                Create
              </b-button>
            </div>
          </div>
        </template>
      </b-modal>

      <!-- job update modal -->
      <b-modal centered id="update-job" title="Update Job" @hidden="resetCreateJobModal" @ok="updateJob">
        <form class="p-2" ref="createJobForm" @submit.stop.prevent="handleUpdate">

          <b-form-group label-cols="4" label-cols-lg="2" label-size="sm" label="Name" 
          :state="state.server" label-for="name-input" invalid-feedback="Name is required">
            <b-form-select id="server-input" size="sm" v-model="job.server" required />
          </b-form-group>

          <b-form-group label-cols="4" label-cols-lg="2" label-size="sm" label="Name" 
          :state="state.name" label-for="name-input" invalid-feedback="Name is required">
            <b-form-input id="name-input" size="sm" v-model="job.name" required />
          </b-form-group>

          <b-form-group label-cols="4" label-cols-lg="2" label-size="sm" label="Schedule" 
            label-for="sched-input" :state="state.schedule" invalid-feedback="Schedule is required">
            <b-form-input id="sched-input" size="sm" v-model="job.schedule" required />
          </b-form-group>

          <b-form-group label-cols="4" label-cols-lg="2" label-size="sm" label="Command" 
            :state="state.command" label-for="command-input" invalid-feedback="Command is required">
            <b-form-input id="command-input" size="sm" v-model="job.command" required />
          </b-form-group>

          <b-form-group label-cols="4" label-cols-lg="2" label-size="sm" label="Status" 
            label-for="status-input" :state="state.status" invalid-feedback="Status is required">
            <b-form-radio-group id="status-input" class="pt-2"
              :options="[{ text: 'Enabled', value: true}, { text: 'Disabled', value: false }]" v-model="job.status" required/>
          </b-form-group>
        </form>
        <template #modal-footer>
          <div class="w-100">
            <!-- <p class="float-left">Modal Footer Content</p> -->
            <div class="float-right">
              <b-button
                variant="disabledbg"
                size="sm"
                @click="resetCreateJobModal"
              >
                Cancel
              </b-button>
              <b-button
                variant="btn-primary"
                size="sm"
                @click="updateJob(state.id)"
              >
                Update
              </b-button>
            </div>
          </div>
        </template>
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
      <b-overlay :show="show" no-wrap fixed>
      </b-overlay>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import moment from 'moment';
import cronstrue from "cronstrue";

export default {
  name: 'Jobs',
  data() {
    return {
      show: false,
      user: JSON.parse(localStorage.user),
      list: [],
      optionServers: [],
      fields: [
        {
          key: "server_name",
          label: "Server",
          thClass: "thead-colorless",
          tdClass: "align-middle"
        },
        {
          key: "name",
          label: "Name",
          thClass: "thead-colorless",
          tdClass: "align-middle"
        },{
          key: "command",
          label: "Command",
          thClass: "thead-colorless",
          tdClass: "align-middle"
        },{
            key: "schedule",
            label: "Schedule",
            formatter: value => {
              if(value == null) return "";
              return cronstrue.toString(value);
            },
            thClass: "thead-colorless",
            tdClass: "align-middle"
        },{
          key: "status",
          label: "Status",
          thClass: "thead-colorless",
          tdClass: "align-middle"
        },{
          key: "created_at",
          label: "Date Created",
          formatter: value => {
            return moment(value).format('MMM DD, YYYY, h:mm A')
          },
          thClass: "thead-colorless",
          tdClass: "align-middle"
        },{
          key: "actions",
          label: "Action",
          thClass: "thead-colorless",
          tdClass: "align-middle"
        },
      ],
      job: {
        id: null,
        name: null,
        command: null,
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
        command: null,
        status: null,
        schedule: null,
      },
      search: "",
    }
  },
  async created(){
  },
  computed: {
    ...mapGetters({
      listJobs: "Jobs/getListJobs",
      listServers: "Server/getListServers",
    }),

    cronToString(schedule) {
      return cronstrue.toString(schedule)
    }

  },
  methods: {
    onRowSelect(data) {
      console.log(data)
      let route = this.$router.resolve({ path: '/jobs/' + data[0].id , params: { id: data[0].id }})
      window.open(route.href, '_blank');
    },
    showCreateJobModal() {
      this.$bvModal.show("create-new-job");
      this.job = {
        name: null,
        command: null,
        status: null,
        schedule: null,
        created_by: this.user.id,
      }

      this.state = {
        name: null,
        command: null,
        status: null,
        schedule: null,
      }
    },
    resetCreateJobModal() {
      this.job = {}
      this.state = {}
    },
    async createJob() {
      console.log(this.job);
      if(!this.validation()) {
        return;
      }

      await this.$store.dispatch("Jobs/createJob", this.job).then(async res => {
        console.log(res);
        if(res.status == 201) {
          // 201 created status 
          await this.$store.dispatch("Jobs/getListJobs");
          this.job = {}
          this.state = {}

          this.showAlert("Successfully Created", "green");
          this.$bvModal.hide("create-new-job");
        } else {
          this.showAlert("Error", "red");
        }
      })
    },
    showUpdateJobModal(data) {
      console.log("data", data);
      this.job = {
        id: data.id,
        name: data.name,
        schedule: data.schedule,
        command: data.command,
        status: data.status,
        modified_by: this.user.id,
      }

      this.state = {
        name: null,
        command: null,
        status: null,
        schedule: null,
        modified_by: this.user.id,
      }

      this.$bvModal.show("update-job");
    },
    async updateJob() {
      if(!this.validation()) {
        return;
      }

      this.$bvModal.hide("update-job");
      this.show = true;
      await this.$store.dispatch("Jobs/updateJob", this.job).then(async res => {
        
        if(res && res.status == 200) {
          await this.$store.dispatch("Jobs/fetchListJobs")
          this.job = {}
          this.showAlert("Successfully Updated", "green");
        }
      }).catch((e) => {
        this.showAlert(e.response.data.errorMsg, "red");
      })

      this.show = false;
    },
    validation() {
      if(this.job.name == null || this.job.name.length < 1) {
        document.getElementById("name-input").style.borderColor = "red";
        this.state.name = false;
      } else {
        document.getElementById("name-input").style.borderColor = "";
        this.state.name = true;
      }
      if(this.job.command == null || this.job.command.length < 1) {
        document.getElementById("command-input").style.borderColor = "red";
        this.state.command = false;
      } else {
        document.getElementById("command-input").style.borderColor = "";
        this.state.command = true;
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

      if(this.job.name != null && this.job.command != null && this.job.schedule != null && this.job.status != null) {
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
    const { username } = JSON.parse(localStorage.user);
    await this.$store.dispatch("Jobs/fetchListJobs", { username });
    await this.$store.dispatch("Server/fetchListServer").then(res => {
      (res && res.data) ? (
        this.optionServers.push({ text: "Please select an option", value: null }),
        this.optionServers = res.data.map(element => {
        return { text: element.name, value: element.host}
      })) : 
      { text: "There are no servers available", value: null };
    })
  },
  
}
</script>