<template>
  <div>
    <div class="main-content p-0 m-0">
      <b-overlay :show="show">
        <div class="header">
          <Navbar />

          <div class="header-page-title m-0 pt-2 pb-1 pr-0 pl-0">
            <h3> Files </h3>
          </div>
        </div>

          <div class="jobs-table">
            <div class="jobs-table-top">
              <b-row>
                <b-col class="m-0 mr-1 p-0 mt-2" cols="auto">
                    <unicon name="search" fill="#bee7de" class="unicon" />
                </b-col>
                <b-col class="m-0 p-0" cols="auto">
                    <b-form-input class="p-0 m-0 input-search" id="input-search" 
                      v-model="search" type="text" 
                      ref="username"
                      autocomplete="false"
                      required
                      placeholder="Search"
                      >
                    </b-form-input>
                    </b-col>
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
              :current-page="currentPage"
              :per-page="perPage"
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
            <b-row>
              <!-- <b-col cols="auto">
                <b-form-group
                  label=""
                  label-for="per-page-select"
                  label-cols="auto"
                  label-align-sm="right"
                  label-size="sm"
                  class="mb-0 text-white"
                >
                  <b-form-select
                    id="per-page-select"
                    v-model="perPage"
                    :options="pageOptions"
                    size="sm"
                  ></b-form-select>
                </b-form-group>
              </b-col> -->
              <b-col cols="auto" class="pt-1 mr-auto ml-3">
                <b-pagination
                class="pagination mb-1"
                  v-model="currentPage"
                  :total-rows="rows"
                  :per-page="perPage"
                  aria-controls="my-table"
                  hide-goto-end-buttons
                  size="sm"
                  limit="1"
                >
                </b-pagination>
              </b-col>
            </b-row>
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

        <!-- file create modal -->
        <b-modal centered id="update-file" title="Update File Name" size="md" @hidden="resetCreateFileModal" @ok="updateFile">
          <b-form class="p-2" ref="updateJobForm" @submit.stop.prevent="handleUpdate">
              
              <div>
                <div class="file-name-label mb-1">File Name:</div>
                <b-form-group :state="file_state.filename" label-for="file-input" invalid-feedback="File Name is required">
                  <b-form-input id="file-input" size="sm" v-model="file.filename" required />
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
                  @click="updateFile()"
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
      user: JSON.parse(localStorage.user),
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
          sortable: true,
          thClass: "thead-colorless",
          tdClass: "align-middle"
        },{
          key: "modified_at",
          label: "Date Modified",
          formatter: value => {
            return value ? moment(value).format('MMM DD, YYYY, h:mm A') : ''
          },
          sortable: true,
          thClass: "thead-colorless",
          tdClass: "align-middle"
        },
        // {
        //   key: "actions",
        //   label: "Action",
        //   thClass: "thead-colorless",
        //   tdClass: "align-middle"
        // }
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
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
      search: "",
      
    }
  },
  async created(){
  },
  computed: {
    ...mapGetters({
      listFiles: "Jobs/getListFiles",
    }),

    rows() {
      return this.listFiles.length
    }

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
        script: "",
        modified_by: this.user.id, 
        username: this.user.username
      }

      this.file_state = {
        filename: null,
        text: null,
      }
      this.$bvModal.show("update-file");
    },
    async updateFile() {
      if(!this.validation()) {
        return;
      } else {
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
      }
    },
    validation() {
      if(this.file.filename == null || this.file.filename.length < 1) {
        document.getElementById("file-input").style.borderColor = "red";
        this.file_state.filename = false;
      } else {
        document.getElementById("file-input").style.borderColor = "";
        this.file_state.filename = true;
      }

      if(this.file.filename != null) {
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