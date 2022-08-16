<template>
  <div>
    <div class="main-content p-0 m-0 vh-100">
      <div class="header">
        <Navbar />
        <div class="header-page-title m-0 pt-2 pb-1 pr-0 pl-0">
          <h3> Dashboard </h3>
        </div>
      </div>

      <b-container fluid class="p-0 m-0 ">
        <b-row class="m-0 p-0 vh-100">
          <b-col cols="3" class="text-white server-div p-1 mr-3">
            <h4 class="pl-2 pt-2">Servers</h4>
            <h6 class="pl-2 pt-0 mt-0" style="font-weight: 300">Show servers with cron jobs</h6>

            <div class="pl-2 pb-2">
              <b-button variant="btn-secondary" size="sm">
                All <b-badge class="px-1 server-count text-white" variant="btn-primary">3</b-badge>
              </b-button> &nbsp;
              <b-button variant="dark" size="sm">
                Active <b-badge class="px-1 server-count text-white" variant="secondary">3</b-badge>
              </b-button> &nbsp;
              <b-button variant="dark" size="sm">
                Inactive <b-badge class="px-1 server-count text-white" variant="secondary">0</b-badge>
              </b-button>
            </div>

            <b-card class="m-1 p-2 mb-2 server-card" v-for="(server, id) in serverCronStatus" :key="id" bg-variant="dark" text-variant="white" @click="selectServer(server)">
              <b-card-text>
                <h6 class="d-flex justify-content-between align-items-center">
                  {{ server.name}}
                  <unicon class="unicon" name="check-circle" fill="#1c8a74" />
                </h6>

                <h6> {{ server.host }} </h6>
                <!-- {{ server.status.stdout }} -->

                <!-- <div class="m-0 p-0" v-for="(el, id) in server.status" :key="id"> -->
                  <!-- <p class="m-0">Main PID: 3159 (cron) <br> Tasks: 1 (limit: 4195)</p> -->
                  <p class="m-0">{{ server.status.stdout[4] }}<br> {{ server.status.stdout[5] }}</p>
                  <p class="m-0 p-0">{{ server.status.stdout[2] }}</p>
                  <!-- <p class="m-0 p-0">Running since Wed 2022-07-08 14:09:52 PST</p> -->
                <!-- </div> -->
              </b-card-text>
              
            </b-card>
              
            
          </b-col>
          <b-col class="job-row-info text-white">
            <b-row>
              
            </b-row>
            <b-row>
              <!-- <Upcoming-Tasks :arr="sortedArr" :server="server" /> -->
              <div v-if="serverClicked" class="job-schedules pt-2">
                <div class="pb-3 pt-2">
                  <h5>Upcoming Tasks</h5>
                </div>
                <ul class="timeline">
                    <li v-for="(task, index) in sortedArr" :key="index">
                      {{ task }}
                    <p class="timeline-date">{{ (task.date ? task.date : 'undefined date') }}</p>
                        <div class="timeline-content">
                          <h5>{{ task.name }}</h5>
                            <p>{{ task.command }}</p>
                        </div>
                    </li>
                </ul>
              </div>
              <div v-else class="job-schedules pt-2">
                <div class="pb-3 pt-2">
                  <h5>Upcoming Tasks</h5>
                </div>
                <ul class="timeline">
                    <li v-for="(task, index) in sortedArr" :key="index">
                      
                    <p class="timeline-date">{{ (task.date ? task.date : 'undefined date') }}</p>
                        <div class="timeline-content">
                          <h5>{{ task.name }}</h5>
                            <p>{{ task.command }}</p>
                        </div>
                    </li>
                </ul>
              </div>
            </b-row>
          </b-col>
          <!-- <b-col class="p-0 ml-3 text-white">

          </b-col> -->
        </b-row>
      </b-container>

      <!-- <b-container fluid class="p-5">
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
      </b-container> -->

        <!-- <div class="jobs-table">
          <div class="jobs-table-top">
            <b-row>
              
            </b-row>
          </div>
        </div> -->

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
import cronstrue from 'cronstrue';
import moment from 'moment';
import parser from 'cron-parser';
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
      filter: {
        all: true,
        active: false,
        inactive: false
      },
      serverClicked: false,
      sortedArr: [],
      server: ['94.237.65.245', '94.237.65.245', '94.237.65.245'],
      show: false,
      user: JSON.parse(localStorage.user),
      cronstatus: "",
      serverCronStatus: [],
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
          https://support.google.`,
    }
  },
  async created(){

  },
  computed: {
    ...mapGetters({
      listJobs: "Jobs/getListJobs",
      listScheduledTasks: "Jobs/getListScheduledTasks",
      listServers: "Server/getListServer",
    }),

    formatStatusCron() {
      return this.cronstatus;
    },

  },
  methods: {
    async cronReadStatus(server) {
      let res = await this.$store.dispatch("Server/cronReadStatus", {
        server,
        username: this.user.username,
        privateKey: this.user.private_key,
      })
      return res;
    },

    cronToHuman(sched) {
      let arr = [];
      sched.map((element) => {

        var options = {
          currentDate: moment().toDate(),
          endDate: moment().add(1, 'days').toDate(),
          iterator: true
        }

        try {
            var interval = parser.parseExpression(element.schedule, options);
                  let obj = interval.next();
                  element.date  = moment(obj.value.toString()).format("MMMM DD, HH:mm")
        } catch (err) {
          console.log('Error: ', err.message);
        }

        arr.push(cronstrue.toString(element.schedule));
      })
      
      this.sortedArr = sched.sort((a,b) => { 
        return moment(a.date).diff(moment(b.date))
      });
    },

    sortedArrByServer(server) {
      console.log("server", server);
      this.sortedArr.filter(element => {
        return element.server == server.id
      })
    },

    selectServer(server) {
      // console.log("server: ", server);
      this.sortedArrByServer(server);
      this.serverClicked = true;
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
    let output = [];

    await this.$store.dispatch("Server/fetchListServer").then(async res => {
      
      res.data.forEach(async element => {
        let result = await this.cronReadStatus(element); 
        this.serverCronStatus.push(result.data[0]);
      })


      let stat = await this.cronReadStatus(res.data[0])
      // console.log("stat", stat);
    });

    await this.$store.dispatch("Jobs/getScheduledTasks").then(res => {
      this.cronToHuman(res.data);
    })

    // console.log("+++++", this.serverCronStatus);
  },
  
}
</script>
