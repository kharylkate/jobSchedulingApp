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
                        <h3> {{ job.name }} </h3>
                    </div>
                </div>

                <b-container fluid class="m-0">
                    <b-row class="m-0">
                        <b-col class="job-row-info" lg="3" >
                            <div class="job-schedules pt-2">
                                <div class="ml-4 pl-4 pr-4 pt-4 pb-4"> Next Trigger in 10 Days </div>
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
                        <b-col class="pl-4 pr-4" SM >
                            <div class="mt-2">
                                <b-button>
                                    Update
                                </b-button>
                            </div>
                            <b-card no-body class="log-script mt-4">
                                <b-container fluid>
                                    <b-row>
                                            <b-col class="p-4" sm="7">
                                                <div>
                                                    <unicon class="log-script" name="clock" fill="white" /> &nbsp;&nbsp;&nbsp;
                                                    {{ job.schedule + " " + job.command }}
                                                </div>
                                            </b-col>
                                            <b-col class="p-4" sm="3">
                                                <div> 
                                                    <unicon class="log-script" name="user" fill="white" /> &nbsp;&nbsp;&nbsp; 
                                                    {{ job.username }} 
                                                </div>
                                            </b-col>
                                            <b-col class="p-4" sm="2">
                                                <div>
                                                    <unicon class="log-script" name="check-circle" fill="limegreen" /> &nbsp;&nbsp;&nbsp;
                                                    {{ job.status ? "Enabled" : "Disabled" }}
                                                </div>
                                            </b-col>
                                    </b-row>
                                </b-container>

                                <b-container class="pl-4 ml-4 mb-4">
                                    <b-row>
                                        <!-- <div>
                                            <b-table-simple small stacked 
                                                :items="job"
                                                
                                                >
                                                {{ job }}
                                            </b-table-simple>
                                        </div> -->
                                        <b-col sm="auto">
                                            <div class="job-info-text">Task Name</div>
                                            <div class="job-info-text">Cron Schedule</div>
                                            <div class="job-info-text">String Schedue</div>
                                            <div class="job-info-text">Server</div>
                                            <div class="job-info-text">Mail to (if enabled)</div>
                                            <div class="job-info-text">Date Created</div>
                                        </b-col>
                                        <b-col>
                                            <div class="job-info-text">{{ job.name }}</div>
                                            <div class="job-info-text">{{ job.schedule }}</div>
                                            <div class="job-info-text">{{ cronToString("* * * * *") }}</div>
                                            <div class="job-info-text"> 172.163.10.19 </div>
                                            <div class="job-info-text"> juihaha.guiapal@biostartuptech.farms.com </div>
                                            <div class="job-info-text">December 14, 2021 </div>
                                        </b-col>
                                    </b-row>
                                </b-container>
                            </b-card>
                        </b-col>
                    </b-row>
                </b-container>

                <b-container fluid class="">
                    <b-card-header header-tag="header" role="tab">
                        <b-button block v-b-toggle.accordion-1 variant="secondary">Logs</b-button>
                    </b-card-header>
                    <b-collapse class="text-white" id="accordion-1" visible accodrion="accordion" role="tab-panel" >
                        <b-container fluid class="p-4 m-3 cron-logs">
                            <b-card-text> <code>BFI@BFI-ITG10 MINGW64 ~ </code> </b-card-text>
                            <b-card-text v-if="cronLog != ''"> 
                                <ul style="list-style: none" v-for="(key, item) in cronLog.stdout" :key="key">
                                    <li> <code> {{ item }} AAAAAAAAAA {{ key }} </code> </li>
                                </ul>
                                
                            </b-card-text>
                        </b-container>
                    </b-collapse>
                </b-container>

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
import cronstrue from 'cronstrue';

import Sidebar from '../../layouts/sidebar.vue';

export default {
    props: { job: Object, nextTriggerDates: Array },
    head() {
        return {
            title: this.job.name,
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
            sampleText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum ",
            fields: [
                {
                    key: "name",
                    label: "Task Name",
                    thClass: "table-job-th"
                },{
                    key: "schedue",
                    label: "Cron Schedule",
                    thClass: "table-job-th",
                },{
                    key: "schedule",
                    label: "String Schedule",
                    thClass: "table-job-th",
                    formatter: value => {
                        if(value == null) return "";
                        return cronstrue.toString(value);
                    },
                },{
                    key: "null",
                    label: "Server",
                },{
                    key: "null",
                    label: "Mail To (if enabled)",
                },{
                    key: "created_at",
                    label: "Date Created",
                },
            ],
            // nextTriggerDates: [],
            show: false,
        }
    },
    computed: {
        ...mapGetters({
            listJobs: "Jobs/getListJobs",
            cronLog: "Jobs/getCronTail"
        }),

        
    },
    async created() {
        this.getCronLog();
    },
    methods: { 
        async getCronLog() {
            let data = {
                action: "cron-read-log-specific-lastlines",
                filename: '/home/kkortiz/test.txt',
                executed_by: 6,
            }
            this.$store.dispatch("Jobs/runCommand", data)
        },
        activateTextArea() {
            this.activeText ? this.activeText = false : this.activeText = true;
        },
        
        showCreateScript() {
            this.$bvModal.show('create-script');
        },
        cronToString(sched) {
            console.log("schedule", sched)
            return cronstrue.toString(sched);
        },
    },
    async beforeCreate() {
        this.show = true;
        await this.$store.dispatch("Jobs/fetchListJobs");
        this.show = false;
    },


}
</script>