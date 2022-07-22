<template>
  <div>
    <div class="main-content p-0 m-0">
      <div class="header">
        <Navbar />
        <div class="header-page-title m-0 pt-2 pb-1 pr-0 pl-0">
          <h3> Dashboard </h3>
        </div>
      </div>

      <b-container fluid class="p-0 m-0 bords">
        <b-row class="m-0 p-0">
          <b-col cols="3" class="bords p-0 mr-3" style="height: 200px;">
            <v-card
              class="mx-auto"
              max-width="300"
              tile
            >
              <v-list dense>
                <v-subheader>REPORTS</v-subheader>
                <v-list-item-group
                  v-model="server"
                  color="primary"
                >
                  <v-list-item
                    v-for="(item, i) in server"
                    :key="i"
                  >
                    <v-list-item-icon>
                      <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title v-text="item.text"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card>
          </b-col>
          <b-col class="bords p-0 ml-3" style="height: 100px;"></b-col>
        </b-row>
      </b-container>

      <b-container fluid class="p-5">
        <b-row>
          <b-col xl="5">
            <b-row class="jobs-counter mb-5 p-4" style="padding-left: 10px; margin-left:20px;">
              <div class="">
                OH YES
              </div>
            </b-row>
            <b-row class="jobs-running mt-5 p-4" style="margin-left:20px;">
              <div class="">
                <ul>
                  <li>YES</li>
                  <li>YES</li>
                  <li>YES</li>
                </ul>
              </div>
            </b-row>
          </b-col>

          <b-col xl="7">
            <b-col class="jobs-status mb-5 p-4" style="padding-left: 10px; margin-left:20px;">
              <div class="job-status-command">
                <p class="text-white"> systemctl status cron </p>
              </div>
              <div>
                <highlightjs :code="codeJs" />
              </div>
            </b-col>
            <b-row class="jobs-scheduled mt-5 p-4"  style="padding-left: 10px; margin-left:20px;">
              <div class="">
                <ul>
                  <li>YES</li>
                  <li>YES</li>
                  <li>YES</li>
                </ul>
              </div>
            </b-row>
          </b-col>
        </b-row>
      </b-container>

        <div class="jobs-table">
          <div class="jobs-table-top">
            <b-row>
              
            </b-row>
          </div>
        </div>

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
import '../../node_modules/highlight.js/styles/atom-one-dark-reasonable.css'

export default {
  name: 'Dashboard',
  data() {
    return {
      alert: {
        showAlert: 0,
        message: "",
        color: ""
      },
      server: ['94.237.65.245', '94.237.65.245', '94.237.65.245'],
      show: false,
      user: JSON.parse(localStorage.user),
      cronstatus: "",
      codeJs: `● cron.service - Regular background program processing daemon
   Loaded: loaded (/lib/systemd/system/cron.service; enabled; vendor preset: enabled)
   Active: active (running) since Wed 2022-07-06 14:09:52 PST; 2 weeks 1 days ago
     Docs: man:cron(8)
 Main PID: 3529 (cron)
    Tasks: 1 (limit: 4915)
   CGroup: /system.slice/cron.service
           └─3529 /usr/sbin/cron -f

    Jul 18 15:55:02 sap-integrations sSMTP[9842]: Authorization failed (535 5.7.8  
    https://support.google.com/mail/?p=BadCredentials g21-20020aa796b5000000b005289cade5b0sm8528830pfk.124 - gsmtp)
    Jul 18 15:56:01 sap-integrations sSMTP[9919]: Creating SSL connection to host
    Jul 18 15:56:01 sap-integrations sSMTP[9919]: SSL connection using ECDHE_RSA_CHACHA20_POLY1305
    Jul 18 15:56:02 sap-integrations sSMTP[9919]: Authorization failed (535 5.7.8  
    https://support.google.com/mail/?p=BadCredentials d31-20020a630e1f000000b00411bbcdfbf7sm7405414pgl.87 - gsmtp)
    Jul 18 15:57:01 sap-integrations sSMTP[10009]: Creating SSL connection to host
    Jul 18 15:57:01 sap-integrations sSMTP[10009]: SSL connection using ECDHE_RSA_CHACHA20_POLY1305
    Jul 18 15:57:01 sap-integrations sSMTP[10009]: Authorization failed (535 5.7.8  
    https://support.google.com/mail/?p=BadCredentials a4-20020aa79704000000b00529cbfc8b38sm8498514pfg.191 - gsmtp)
    Jul 18 15:58:01 sap-integrations sSMTP[10152]: Creating SSL connection to host
    Jul 18 15:58:01 sap-integrations sSMTP[10152]: SSL connection using ECDHE_RSA_CHACHA20_POLY1305
    Jul 18 15:58:02 sap-integrations sSMTP[10152]: Authorization failed (535 5.7.8  
    https://support.google.`
    }
  },
  async created(){
    this.runCommand();
  },
  computed: {
    ...mapGetters({
      listJobs: "Jobs/getListJobs",
    }),

    formatStatusCron() {
      return this.cronstatus;
    },

  },
  methods: {
    async runCommand() {
      let data = {
        action: "cron-read-status",
        executed_by: this.user.id,
        username: this.user.username
      }
      await this.$store.dispatch("Jobs/runCommand", data).then( (res) => {
        console.log(res);
        this.cronstatus = (res && res.stderr == '', res.stdout != '') ? res.stdout : (res && res.stdout == '' && res.stderr != '') ? res.stderr : ''
      })
      console.log(JSON.stringify(this.cronstatus));
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
    await this.$store.dispatch("Jobs/fetchListJobs");
  },
  
}
</script>
