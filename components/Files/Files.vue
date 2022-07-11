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
              <h3> Files </h3>
            </div>
        </div>

          <div class="jobs-table">
            <div class="jobs-table-top">
              <b-row>
                <div class="jobs-table-command pt-1 mr-auto ml-0">
                  ${{ user.username }} crontab -l
                </div>
                <div class="jobs-table-create ml-auto mr-0">
                  <b-button class="btn-create-job" variant="font-primary" size="sm" @click="showCreateFileModal()">
                    <unicon class="unicon" name="plus" fill="white" /> <b>FILE&nbsp;</b>
                  </b-button>
                  &nbsp;&nbsp;
                </div>
              </b-row>
            </div>
            <b-table small hover responsive sticky-header selectable 
              class="table-borderless table-scrollbar border-0" 
              select-mode="single"
              :items="listFiles"
              :fields="fields"
              @row-selected="onRowSelect"
            >
              <template v-slot:cell(status)="data">
                <b-badge v-if="(data.item.status)" variant="secondary">ENABLED</b-badge>
                <b-badge v-else variant="disabledbg" style="color: white">DISABLED</b-badge>
              </template>
              <template v-slot:cell(actions)="data">
                <b-button class="btn-update-script px-1 py-1" size="sm" v-if="(data.item.script !== null || data.item.script !== '')" @click="showUpdateFileModal(data.item)">
                    &nbsp; <unicon class="icon-update-script" name="pen" fill="white"></unicon>
                    Update&nbsp;&nbsp;
                </b-button>
              </template>
            </b-table>
          </div>

        <!-- file create modal -->
        <b-modal centered id="create-new-file" title="Create File" size="lg" @hidden="resetCreateFileModal" @ok="createFile">
          <b-form class="p-2" ref="createJobForm" @submit.stop.prevent="handleUpdate">
              
              <div>
                <div class="file-name-label mb-1">File Name:</div>
                <b-form-group :state="file_state.filename" label-for="file-input" invalid-feedback="File Name is required">
                  <b-form-input id="file-input" size="sm" v-model="file.filename" required />
                </b-form-group>
              </div>

            <div>
              <div class="file-script-label mb-1">Script:</div>
              <b-form-group :state="file_state.text" invalid-feedback="Script is required">
                <b-form-textarea id="script-input" size="sm" v-model="file.text" rows="5" required>
                  <!-- <b-form-input  /> -->
                </b-form-textarea>
              </b-form-group>
            </div>

          </b-form>
          <template #modal-footer>
            <div class="w-100">
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
import { mapGetters } from "vuex";
import moment from 'moment';

export default {
  name: 'Files',
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
          key: "id",
          label: "ID",
          thClass: "thead-colorless",
          tdClass: "align-middle"
        },{
          key: "filename",
          label: "File Name",
          thClass: "thead-colorless",
          tdClass: "align-middle"
        },{
          key: "username",
          label: "Created By",
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
          key: "modified_at",
          label: "Date Modified",
          formatter: value => {
            return value ? moment(value).format('MMM DD, YYYY, h:mm A') : ''
          },
          thClass: "thead-colorless",
          tdClass: "align-middle"
        }
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
      file: {
        filename: "",
        text: "",
      },
      file_state: {
        filename: null,
        text: null
      },
      selectedFile: [],
      
    }
  },
  async created(){
  },
  computed: {
    ...mapGetters({
      listFiles: "Jobs/getListFiles",
    }),
  },
  methods: {
    onRowSelect(data) {
      console.log(data)
      let route = this.$router.resolve({ path: '/files/' + data[0].id , params: { id: data[0].id }})
      window.open(route.href, '_blank');
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
      this.$bvModal.hide("create-new-file");
      this.show = true;
      await this.$store.dispatch("Jobs/createFile", this.file).then(async res => {
        if(res && res.status == 201) {
          await this.$store.dispatch("Jobs/fetchListFiles").then(res => {
            console.log("object", res);
          })
          this.file = {}
          this.showAlert("Successfully Created", "green");
        } else {
          this.showAlert("Error", "red");
        }
        this.show = false;
      })

    },
    showUpdateFileModal(data) {
      console.log("data", data);
      this.file = {
        id: data.id,
        filename: data.filename,
        script: data.script,
        modified_by: this.user.id, 
      }

      this.file_state = {
        filename: null,
        text: null,
      }
      this.$bvModal.show("update-job");
    },
    async updateFile() {
      if(!this.validation()) {
        return;
      }

      this.show = true;
      await this.$store.dispatch("Jobs/updateFile", this.file).then(async res => {
        if(res && res.status == 204) {
          await this.$store.dispatch("Jobs/fetchListFiles")
          this.job = {}

          this.showAlert("Successfully Updated", "green");
          this.$bvModal.hide("update-file");
        } else {
          this.showAlert("Error", "red");
        }
      })

      this.show = false;
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
    await this.$store.dispatch("Jobs/fetchListFiles")//.then(res => console.log(res));
  },
  
}
</script>



// npm install ssh2-sftp-client (for connecting to ssh-putty)
// https://www.npmjs.com/package/ssh2-sftp-client#sec-3

// npm install bree (for cron stuff)
// https://jobscheduler.net/#/