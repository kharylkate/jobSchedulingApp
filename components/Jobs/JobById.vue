<template>
    <div>
        <div class="main-content">
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
                        <h3> {{ job[0].name }} </h3>
                    </div>
                </div>

                <b-row class="m-0">
                    <b-col class="job-row-info" sm="auto">
                        <div class="job-schedules pt-2">
                            <div class="ml-4 pl-4 pt-4 pb-4"> Next Trigger in 10 Days </div>
                            <ul class="timeline">
                                <li v-for="(date, index) in nextTriggerDates" :key="index">
                                <p class="timeline-date"></p>
                                    <div class="timeline-content">
                                        <p>{{ date.date }}&nbsp;{{ date.time }}</p>
                                    </div>
                                </li>
                                <!-- <li>
                                    <p class="timeline-date">2007年2月</p>
                                    <div class="timeline-content">
                                    <p>ワーホリビザで渡加。アクセサリーショップ等でバイト。カナダ生活を満喫。</p>
                                    </div>
                                </li>
                                <li>
                                    <p class="timeline-date">2008年3月</p>
                                    <div class="timeline-content">
                                    <p>有給インターンシップ付きの一年プログラムを受講。HTML、CSS、JavaScript、PHP等のコーディングやWebデザインの基礎を学ぶ。</p>
                                    </div>
                                </li>
                                <li>
                                    <p class="timeline-date">2009年2月</p>
                                    <div class="timeline-content">
                                    <p>私以外全員カナダ人という環境で英語やWebの技術を学びながら必死に働く</p>
                                    </div>
                                </li> -->
                            </ul>
                        </div>
                    </b-col>

                    <!-- for logs -->
                    <b-col class="pl-4 pr-4">
                        <b-card no-body class="log-script mt-4">
                            <!-- <div class="container"> -->
                               <b-container fluid>
                                   <b-row>
                                        <b-col class="p-4" sm="7">
                                            <div>
                                                <unicon class="log-script" name="clock" fill="white" /> &nbsp;&nbsp;&nbsp;
                                                {{ job[0].schedule + " " + job[0].command }}
                                            </div>
                                        </b-col>
                                        <b-col class="p-4" sm="3">
                                            <div> 
                                                <unicon class="log-script" name="user" fill="white" /> &nbsp;&nbsp;&nbsp; 
                                                {{ job[0].created_by }} 
                                            </div>
                                        </b-col>
                                        <b-col class="p-4" sm="2">
                                            <div>
                                                <unicon class="log-script" name="check-circle" fill="limegreen" /> &nbsp;&nbsp;&nbsp;
                                                {{ job[0].status ? "Enabled" : "Disabled" }}
                                            </div>
                                        </b-col>
                                   </b-row>
                               </b-container>

                               <b-container class="pl-4 ml-4">
                                   <b-row>
                                       <b-col sm="auto">
                                           <div class="job-info-text">Task Name</div>
                                           <div class="job-info-text">Cron Schedule</div>
                                           <div class="job-info-text">String Schedue</div>
                                           <div class="job-info-text">Server</div>
                                           <div class="job-info-text">Mail to (if enabled)</div>
                                           <div class="job-info-text">Date Created</div>
                                       </b-col>
                                       <b-col>
                                           <div class="job-info-text">{{ job[0].name }}</div>
                                           <div class="job-info-text">{{ job[0].schedule }}</div>
                                           <div class="job-info-text">7:00PM Weekdays</div>
                                           <div class="job-info-text"> 172.163.10.19 </div>
                                           <div class="job-info-text"> juihaha.guiapal@biostartuptech.farms.com </div>
                                           <div class="job-info-text">December 14, 2021 </div>
                                       </b-col>
                                   </b-row>
                               </b-container>
                            <!-- </div> -->
                        </b-card>
                    </b-col>
                </b-row>

                <b-modal class="modal-script" scrollable title="Create Script" id="create-script">
                    <b-container fluid>
                        
                    </b-container>

                </b-modal>
            </b-overlay>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import parser from 'cron-parser';
import moment from 'moment';
import Sidebar from '../../layouts/sidebar.vue';

export default {
    props: ['job'],
    head() {
        return {
            title: this.job[0].name,
        }
    },
    name: "jobById",
    components: {
        Sidebar
    },
    data() {
        return {
            activeText: true,
            sampleScript: `#!/bin/bash\n\necho "I have gained consciousness. I am alive."`,
            fields: [
                {
                    key: "description",
                    label: "Description",
                    thClass: "table-job-th"
                },{
                    key: "status",
                    label: "Status",
                    thClass: "table-job-th",
                    formatter: value => {
                        return value == 1 ? "Enabled" : "Disabled";
                    }
                },{
                    key: "schedule",
                    label: "Schedule",
                    thClass: "table-job-th"
                },{
                    key: "nextDates",
                    label: "Next 10 Trigger Dates",
                },
            ],
            nextTriggerDates: [],
            show: false,
        }
    },
    computed: {
    },
    created() {
        console.log("object", this);
        console.log("job-by-id", this.job)
        this.job.length ? this.nextDates(this.job[0].schedule) : '';
    },
    methods: { 
        activateTextArea() {
            this.activeText ? this.activeText = false : this.activeText = true;
        },
        nextDates(sched) {
            console.log("sched", sched);
            // next 10 trigger dates
            this.nextTriggerDates = [];

            var options = {
                currentDate: moment().toDate(),
                endDate: moment().add(10, 'days').toDate(),
                iterator: true
            }

            try {
                var interval = parser.parseExpression(sched, options);
                var i = 1;
                while (true) {
                    try {
                        var obj = interval.next();
                        this.nextTriggerDates.push({ 
                            date: moment(obj.value.toString()).format("ddd, MMMM DD, YYYY"),
                            time: moment(obj.value.toString()).format("h:mm:ss a")});
                    } catch (e) {
                        break;
                    }
                }
                console.log(this.nextTriggerDates);
            } catch (err) {
                console.log('Error: ', err.message);
            }
        },
        showCreateScript() {
            this.$bvModal.show('create-script');
        }
    },

}
</script>