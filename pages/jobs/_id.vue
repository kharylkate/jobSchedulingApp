<template>
    <div>
        <div class="job-details">
            <b-card class="job-name border-0" :title="job.name" >

                <div class="container-table-job container mt-3">
                    <b-table small stacked borderless="false"
                        :items="[job]"
                        :fields="fields"
                        class="table-job"
                    >
                        <template v-slot:cell(nextTrigger)="">
                            <span v-html="nextTriggerDates" ></span>
                        </template>

                    </b-table>
                </div>

            </b-card>
        </div>
        <div class="job-commands border-1">
            <b-card no-body 
                class="job-script">
                <b-container fluid class="border-1" >
                    <b-row>
                        <b-col cols="auto" class="mr-auto firstcol ml-5">
                            <div class="pt-1">
                                <h5>Script</h5>
                            </div>
                        </b-col>
                        <b-col cols="auto" class="firstcol mr-5">
                            <b-button id="btn-create-script" variant="btn-primary" size="sm" v-if="(job.script !== null || job.script !== '')">
                                <unicon class="icon-create-script" name="arrow" fill="font-primary" />
                            </b-button>
                        </b-col>
                    </b-row>
                </b-container>
            </b-card>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import parser from 'cron-parser';
import moment from 'moment';

export default {
    head() {
        return {
            title: this.job.name
        }
    },
    name: "jobById",
    data() {
        return {
            job: null,
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
                },{
                    key: "schedule",
                    label: "Schedule",
                    thClass: "table-job-th"
                },{
                    key: "nextTrigger",
                    label: "Next 10 Trigger Dates",
                    thClass: "table-job-th"
                },
            ],
            nextTriggerDates: "",
        }
    },
    computed: {
        ...mapGetters({
            listJobs: "Jobs/getListJobs",
        })
    },
    created() {
        this.getJobById();
        this.nextDates(this.job.schedule);
        // console.log(moment().toDate());
        // console.log(moment().add(10, 'days').toDate());
        // console.log(moment.defaultFormat);
        // console.log(moment.defaultFormatUtc);
        // console.log(moment().toDate());
        // try {
        //     var interval = parser.parseExpression(this.job.schedule);
        //     // console.log("schedule: ", parser.parseExpression(this.job.schedule));
        //     console.log("Date: ", interval.next().toString());
        //     console.log("Date: ", interval.next().toString());
        //     console.log("Date: ", interval.next().toString());
        //     console.log("Date: ", interval.next().toString());
        // } catch (err) {
        //     console.log('Error: ' + err.message);
        // }
    },
    methods: { 
        getJobById() {
            this.job = null;
            this.listJobs.map(job => {
                if(job.id === this.$route.params.id) {
                    this.job = job;
                } 
            })
        },
        nextDates(sched) {
            // next 10 trigger dates
            this.nextTriggerDates = `<ul class="list-unstyled">`;

            var options = {
                currentDate: moment().toDate(),
                endDate: moment().add(10, 'days').toDate(),
                iterator: true
            }

            try {
                var interval = parser.parseExpression(sched, options);

                while (true) {
                    try {
                        var obj = interval.next();
                        this.nextTriggerDates += `<li>${obj.value.toString()}</li>`
                    } catch (e) {
                        break;
                    }
                }
                this.nextTriggerDates += `</ul>`
            } catch (err) {
                console.log('Error: ', err.message);
            }
        }
    },
}
</script>