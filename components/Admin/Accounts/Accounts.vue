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
              <b-button class="btn-create-job" variant="font-primary" size="sm" @click="showCreateAccountModal()">
                <unicon class="unicon" name="plus" fill="white" /> <b>ACCOUNT&nbsp;</b>
              </b-button>
            </div>
          </b-row>
        </div>
        
        <b-table small hover responsive sticky-header selectable 
          class="table-borderless border-0" 
          select-mode="single"
          show-empty
          :items="listAccounts"
          :fields="fields"
          @row-selected="onRowSelect"
        >
          <template v-slot:cell(status)="data">
            <b-badge v-if="(data.item.status)" variant="btn-secondary">ENABLED</b-badge>
            <b-badge v-else variant="disabledbg" style="color: white">DISABLED</b-badge>
          </template>
          <template v-slot:cell(actions)="data">
            <b-button class="btn-update-script px-1 py-1" size="sm" v-if="(data.item.script !== null || data.item.script !== '')" @click="showUpdateAccountModal(data.item)">
                &nbsp; <unicon class="icon-update-script" name="pen" fill="white"></unicon>
                Update&nbsp;&nbsp;
            </b-button>
          </template>
        </b-table>
      </div>

      <!-- account create modal -->
      <b-modal centered id="create-new-account" title="Create New Account" @hidden="resetCreateAccountModal" @ok="createAccount">
        <form class="p-2" ref="createJobForm" @submit.stop.prevent="handleSubmit">

          <h6>User Details</h6>
          <hr>

          <b-row class="pb-4">
            <b-col>
              <b-form-group label-size="sm" label="Role" 
              :state="state.role_id" label-for="server-input" invalid-feedback="Role is required">
                <b-form-select id="server-input" size="sm" class="text-white"
                :options="(optionRoles)"
                v-model="account.role_id" required />
              </b-form-group>
            </b-col>
          </b-row>

        <h6>Account Details</h6>
        <hr>

        <b-row>
          <b-col>
            <!-- <b-form-group label-size="sm"
              label-for="username-input" :state="state.username" invalid-feedback="Username is required">
              <div class="label-bg">
                <div class="label-input" v-show="focusField.username">Username</div>
                <b-form-input 
                  class="pt-0 mt-0" 
                  id="username-input" 
                  size="sm"
                  type="text"
                  @focus="focusInput('username')"
                  @blur="blurInput('username')"
                  v-model="account.username"
                  :placeholder="(focusField.username ? '' : 'Username')"
                  required />
              </div>
            </b-form-group> -->
            <b-form-group label-size="sm" label="Username"
              label-for="username-input" :state="state.username" invalid-feedback="Username is required">
              <b-form-input 
                class="pt-0 mt-0" 
                id="username-input" 
                size="sm"
                type="text"
                v-model="account.username"
                required />
            </b-form-group>
          </b-col>

          <b-col>
            <b-form-group label-size="sm" label="Password" 
              :state="state.password" label-for="command-input" invalid-feedback="Password is required">
              <b-form-input id="command-input" size="sm" type="password" v-model="account.password" required />
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <b-form-group label-size="sm" label="Private Key" 
              label-for="private_key-input" :state="state.private_key" invalid-feedback="Private Key is required">
              <b-form-textarea id="script-input" size="sm" v-model="account.private_key" rows="5" required>
              </b-form-textarea>
            </b-form-group>
          </b-col>
        </b-row>


        </form>
        <template #modal-footer>
          <div class="w-100">
            <div class="float-right">
              <b-button
                variant="disabledbg"
                size="sm"
                @click="resetCreateAccountModal"
              >
                Cancel
              </b-button>
              <b-button
                variant="btn-primary"
                size="sm"
                @click="createAccount()"
              >
                Create
              </b-button>
            </div>
          </div>
        </template>
      </b-modal>

      <!-- account update modal -->
      <b-modal centered id="update-account" title="Update Account" @hidden="resetCreateAccountModal" @ok="updateAccount">
        <form class="p-2" ref="createJobForm" @submit.stop.prevent="handleSubmit">

          <h6>User Details</h6>
          <hr>

          <b-row>
            <b-col>
              <b-form-group label-size="sm" label="First Name" 
              :state="state.first_name" label-for="first_name-input" invalid-feedback="First Name is required">
                <b-form-input id="first_name-input" size="sm" v-model="account.first_name" required />
              </b-form-group>
            </b-col>

            <b-col>
              <b-form-group label-size="sm" label="Last Name" 
              :state="state.last_name" label-for="last_name-input" invalid-feedback="Last Name is required">
                <b-form-input id="last_name-input" size="sm" v-model="account.last_name" required />
              </b-form-group>
            </b-col>
          </b-row>

          <b-row class="pb-4">
            <b-col>
              <b-form-group label-size="sm" label="Role" 
              :state="state.role_id" label-for="server-input" invalid-feedback="Role is required">
                <b-form-select id="server-input" size="sm" class="text-white"
                :options="(optionRoles)"
                v-model="account.role_id" required />
              </b-form-group>
            </b-col>
          </b-row>

        <h6>Account Details</h6>
        <hr>

        <b-row>
          <b-col>
            <!-- <b-form-group label-size="sm"
              label-for="username-input" :state="state.username" invalid-feedback="Username is required">
              <div class="label-bg">
                <div class="label-input" v-show="focusField.username">Username</div>
                <b-form-input 
                  class="pt-0 mt-0" 
                  id="username-input" 
                  size="sm"
                  type="text"
                  @focus="focusInput('username')"
                  @blur="blurInput('username')"
                  v-model="account.username"
                  :placeholder="(focusField.username ? '' : 'Username')"
                  required />
              </div>
            </b-form-group> -->
            <b-form-group label-size="sm" label="Username"
              label-for="username-input" :state="state.username" invalid-feedback="Username is required">
              <b-form-input 
                class="pt-0 mt-0" 
                id="username-input" 
                size="sm"
                type="text"
                v-model="account.username"
                disabled
                required />
            </b-form-group>
          </b-col>

          <b-col>
            <b-form-group label-size="sm" label="Password" 
              :state="state.password" label-for="command-input" invalid-feedback="Password is required">
              <b-form-input id="command-input" size="sm" type="password" v-model="account.password" required />
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <b-form-group label-size="sm" label="Private Key" 
              label-for="private_key-input" :state="state.private_key" invalid-feedback="Private Key is required">
              <b-form-textarea id="script-input" size="sm" v-model="account.private_key" rows="5" required>
              </b-form-textarea>
            </b-form-group>
          </b-col>
        </b-row>


        </form>
        <template #modal-footer>
          <div class="w-100">
            <div class="float-right">
              <b-button
                variant="disabledbg"
                size="sm"
                @click="resetCreateAccountModal"
              >
                Cancel
              </b-button>
              <b-button
                variant="btn-primary"
                size="sm"
                @click="updateAccount()"
              >
                Update
              </b-button>
            </div>
          </div>
        </template>
      </b-modal>

      <div>
        <b-alert class="alerticon" v-model="alert.showAlert" variant="light">
          <div class="alertborder" style="borderWidth:40px solid; borderColor:'brown'">
            <unicon :name="alert.color == 'green' ? 'check' : 'multiply' " :fill="alert.color"> </unicon>
              {{ alert.message }}
          </div>
        </b-alert>
      </div>

      <b-overlay :show="show" no-wrap fixed> </b-overlay>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import moment from 'moment';
export default {
  name: 'Accounts',
  data() {
    return {
      show: false,
      search: "",
      user: JSON.parse(localStorage.user),
      account: {
        first_name: null,
        last_name: null,
        username: null,
        password: null,
        created_by: null,
        role_id: null,
        private_key: null,
      },
      state: {
        first_name: null,
        last_name: null,
        username: null,
        password: null,
        role_id: null,
        private_key: null,
      },
      fields: [
        {
          key: "name",
          label: "Name",
          thClass: "thead-colorless",
          tdClass: "align-middle"
        },
        {
          key: "username",
          label: "Username",
          thClass: "thead-colorless",
          tdClass: "align-middle"
        },{
          key: "rolename",
          label: "Role",
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
        },{
          key: "actions",
          label: "Action",
          thClass: "thead-colorless",
          tdClass: "align-middle"
        },
      ],
      alert: {
        showAlert: 0,
        color: "",
        message: ""
      },
      focusField: {
        username: false
      },
      optionRoles: [],
    }
  },
  async created(){
  },
  computed: {
    ...mapGetters({
      listAccounts: "Accounts/getListAccounts",
    })
  },
  methods: {
    onRowSelect(data) {
      console.log(data)
      let route = this.$router.resolve({ path: '/accounts/' + data[0].id , params: { id: data[0].id }})
      window.open(route.href, '_blank');
    },

    showCreateAccountModal() {
      this.$bvModal.show("create-new-account");
      this.account = {
        first_name: null,
        last_name: null,
        username: null,
        password: null,
        created_by: this.user.id,
        role_id: null,
        private_key: null,
      }

      this.state = {
        first_name: null,
        last_name: null,
        username: null,
        password: null,
        role_id: null,
        private_key: null,
      }
    },
    resetCreateAccountModal() {
      this.account = {}
      this.state = {}
    },
    createAccount() {

    },
    async showUpdateAccountModal(data) {
      // await this.$store.dispatch("/Accounts/fetchAccountById", { id: data.id })
  console.log(data);
      this.$bvModal.show("update-account");
      this.account = {
        first_name: data.first_name,
        last_name: data.last_name,
        // username: null,
        password: null,
        modified_by: this.user.id,
        role_id: data.role_id,
        // private_key: null,
      }

      this.state = {
        first_name: null,
        last_name: null,
        username: null,
        // password: null,
        role_id: null,
        private_key: null,
      }
    },
    updateAccount() {

    },
    focusInput(e) {
      this.focusField[e] = true;
    },
    blurInput(e) {
      console.log(e);
      (this.account[e] == '' || this.account[e] == ' ' || this.account[e] == null) 
        ? this.focusField[e] = false : '';
    },
    resetCreateAccountModal() {
      this.$bvModal.hide('create-new-account');
      this.$bvModal.hide('update-account');
      this.state = {};
      this.account = {};
      
    }

  },
  async beforeCreate() {
    await this.$store.dispatch("Accounts/fetchListAccounts").then(res => {
      console.log(res);
    })
    await this.$store.dispatch("Accounts/fetchListRoles").then(res => {
      res.data.map(element => {
        this.optionRoles.push({
          text: element.rolename,
          value: element.id
        })
      })
    })

    

  },
  
}
</script>