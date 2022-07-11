<template>
  <div>
    <div class="main-content p-0 m-0">
      <b-overlay :show="show">
        <div class="header">
          <b-navbar toggleable="lg" type="dark">
            <b-nav-form>
              <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
              <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
            </b-nav-form>

            <b-dropdown class="ml-auto" right>
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item href="#">Sign Out</b-dropdown-item>
              </b-dropdown>
            </b-navbar>

            <div class="header-page-title m-0 pt-2 pb-1 pr-0 pl-0">
              <h3> Jobs </h3>
            </div>
        </div>

          <div class="jobs-table">
            <div class="jobs-table-top">
              <b-row>
                <div class="jobs-table-command pt-1 mr-auto ml-0">
                  ${{ user.username }} crontab -l
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
              <!-- <template v-slot:cell(name)="data">
                <nuxt-link :to='/jobs/+ data.item.id' :jobItem="[ data.item ]" target="_blank">
                  {{ data.item.name }}
                </nuxt-link>
              </template> -->
              <template v-slot:cell(status)="data">
                <b-badge v-if="(data.item.status)" variant="secondary">ENABLED</b-badge>
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

        <!-- file create modal -->
        <b-modal centered id="create-new-file" title="Create File" size="lg" @hidden="resetCreateFileModal" @ok="createFile">
          <form class="p-2" ref="createJobForm" @submit.stop.prevent="handleUpdate">

            <b-form-group label-cols="4" label-cols-lg="2" label-size="sm" label="File Name" 
            :state="file_state.filename" label-for="file-input" invalid-feedback="File Name is required">
              <b-form-input id="file-input" size="sm" v-model="file.filename" required />
            </b-form-group>

            <b-form-group label-cols="4" label-cols-lg="2" label-size="sm" label="Script" 
              label-for="script-input" :state="file_state.text" invalid-feedback="Script is required">
              <b-form-textarea id="script-input" size="sm" v-model="file.text" rows="5" required>
                <!-- <b-form-input  /> -->
              </b-form-textarea>
            </b-form-group>

          </form>
          <template #modal-footer>
            <div class="w-100">
              <!-- <p class="float-left">Modal Footer Content</p> -->
              <div class="float-right">
                <b-button
                  variant="disabledbg"
                  size="sm"
                  @click="resetCreateFileModal"
                >
                  Cancel
                </b-button>
                <b-button
                  variant="btn-primary"
                  size="sm"
                  @click="createFile()"
                >
                  Create
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
  components: {
  },
  data() {
    return {
      show: false,
      user: {
        id: 6,
        username: 'kkortiz'
      },
      list: [],
      fields: [
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
      file: {
        filename: "",
        text: "",
      },
      file_state: {
        filename: null,
        text: null
      }
    }
  },
  async created(){
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
    createJob() {
      console.log(this.job);
      if(!this.validation()) {
        return;
      }

      this.$store.dispatch("Jobs/createJob", this.job).then(res => {
        console.log(res);
        if(res.status == 201) {
          // 201 created status 
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
        
        if(res && res.status == 204) {
          await this.$store.dispatch("Jobs/fetchListJobs")
          this.job = {}
          this.showAlert("Successfully Updated", "green");
        }
      }).catch((e) => {
        this.showAlert(e.response.data.errorMsg, "red");
      })

      this.show = false;
    },
    showCreateFileModal() {
      this.file = {
        filename: "",
        text: "",
        created_by: this.user.id,
      }
      this.file_state = {
        filename: null,
        text: null,
      }
      this.$bvModal.show("create-new-file");
    },
    resetCreateFileModal() {
      this.file = {
        filename: "",
        text: "",
      }
      this.file_state = {
        filename: null,
        text: null,
      }
      this.$bvModal.hide("create-new-file");
    },
    async createFile() {
      if(!this.validate_file()) {
        return;
      }

      this.show = true;
      await this.$store.dispatch("Jobs/createFile", this.file).then(async res => {
        console.log(res);

        if(res && res.status == 201) {
          await this.$store.dispatch("Jobs/fetchListFiles")
          this.file = {}
          this.showAlert("Successfully Created", "green");
          this.$bvModal.hide("create-new-file");
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

    validate_file() {
      if(this.file.filename == null || this.file.filename.length < 1) {
        document.getElementById("file-input").style.borderColor = "red";
        this.file_state.filename = false;
      } else {
        document.getElementById("file-input").style.borderColor = "";
        this.file_state.filename = true;
      }
      if(this.file.text == null || this.file.text.length < 1) {
        document.getElementById("script-input").style.borderColor = "red";
        this.file_state.text = false;
      } else {
        document.getElementById("script-input").style.borderColor = "";
        this.file_state.text = true;
      }

      if(this.file.filename != null && this.file.text != null) {
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
    await this.$store.dispatch("Jobs/fetchListJobs").then(res => console.log(res));
  },
  
}
</script>



// npm install ssh2-sftp-client (for connecting to ssh-putty)
// https://www.npmjs.com/package/ssh2-sftp-client#sec-3

// npm install bree (for cron stuff)
// https://jobscheduler.net/#/