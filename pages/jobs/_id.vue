<template>
    <div>
        <b-row>
            <b-col class="job-row-info firstcol" sm="7">
                <div class="job-details">
                    <b-card class="job-name " :title="job.name" >
                        <div class="container-table-job container mt-3">
                            <b-table small stacked borderless
                                :items="[job]"
                                :fields="fields"
                                class="table-job"
                            >
                                <template v-slot:cell(nextDates)>
                                    <b-card no-body class="script-dates" bg-variant="secondary">
                                        <ul class="list-unstyled">
                                            <li v-for="date in nextTriggerDates" :key="date">
                                                {{ date }}
                                            </li>
                                        </ul>
                                    </b-card>
                                </template>

                            </b-table>
                        </div>

                    </b-card>
                </div>
                <div class="job-commands border-1 pl-3 pb-3">
                    <b-card no-body bg-variant="secondary"
                        class="job-script">
                            <b-row>
                                <b-col cols="auto" class="mr-auto firstcol ml-3">
                                    <div class="pt-1">
                                        <h5>Script</h5>
                                    </div>
                                </b-col>
                                <b-col cols="auto" class="firstcol mr-3">
                                    <b-button id="btn-create-script" variant="btn-primary" size="sm" v-if="(job.script !== null || job.script !== '')" @click="activateTextArea" >
                                        <unicon class="icon-create-script" name="arrow" fill="font-primary" />
                                    </b-button>
                                </b-col>
                            </b-row>
                            <b-col>
                                <div class="container p-3">
                                    <b-form-textarea class="text-script" size="sm" :plaintext="activeText" 
                                        :value="sampleScript" rows="3" max-rows="5">
                                        
                                    </b-form-textarea>
                                    
                                </div>
                            </b-col>
                    </b-card>
                </div> 
            </b-col>

            <!-- for logs -->
            <b-col class="log-script" sm="5">
                <b-card no-body class="log-script mt-4">
                    <div class="container">
                        <p>Lorem ipsum dolor sit amet.</p>

                        <p>Lorem, ipsum dolor.</p>

                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem, ea.</p>

                        <p>Lorem ipsum dolor sit amet.</p>

                        <p>Lorem ipsum dolor sit amet consectetur.</p>

                        <p>Lorem, ipsum.</p>

                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus?</p>

                        <p>Lorem ipsum dolor sit.</p>

                        <p>Lorem ipsum dolor sit amet consectetur.</p>

                        <p>Lorem, ipsum dolor.</p>
                        
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio!</p>
                    </div>
                </b-card>
            </b-col>
        </b-row>

        <b-modal class="modal-script" scrollable title="Create Script" id="create-script">
            <b-container fluid>
                <b-form-textarea id="modal-script-text-area" size="sm" placeholder="Create Script" >

                </b-form-textarea>
            </b-container>

        </b-modal>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import parser from 'cron-parser';
import moment from 'moment';

export default {
    // props: {
    //     jobItem:Object
    // },
    head() {
        return {
            title: this.job.name,
            // script: [
            //     {
            //         src: '\codemirror\lib\codemirror.jsles/codemirror/lib/codemirror.js'
            //     }
            // ]
        }
    },
    name: "jobById",
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
                    // return: this.nextTriggerDates,
                },
            ],
            nextTriggerDates: []
        }
    },
    computed: {
        ...mapGetters({
            job: "Jobs/getJobById"
        })
    },
    created() {

    },
    methods: { 
        activateTextArea() {
            this.activeText ? this.activeText = false : this.activeText = true;
        },
        nextDates(sched) {
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
                    console.log("true");
                    try {
                        var obj = interval.next();
                        this.nextTriggerDates.push(obj.value.toString());
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
    async beforeCreate() {
        await this.$store.dispatch("Jobs/fetchJobById", { id: this.$route.params.id })
        .then(res => {
            this.nextDates(res.schedule);
        })
    }
}
</script>