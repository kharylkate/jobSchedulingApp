<template v-if="jobDataHasLoaded">
    <div>
        <b-container fluid class="m-0 p-0">
            <b-row class="m-0 p-0">
            <b-col cols="12" lg="2" md="2" sm="0" class="sidebar m-0 p-0">
                <Sidebar />
            </b-col>
            <b-col class="content m-0 p-0">
                <JobById :job="job" :nextTriggerDates="nextTriggerDates" />
            </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import Sidebar from '../../layouts/sidebar.vue';
import JobById from '../../components/Jobs/JobById.vue';
import moment from 'moment';
import parser from 'cron-parser';

export default {
    head() {
        return {
        }
    },
    name: "id",
    components: {
        Sidebar, JobById
    },
    data() {
        return {
            job: {},
            jobDataHasLoaded: false,
            nextTriggerDates: [],
        }
    },
    computed: {
    },
    async created() {
    },
    methods: {
        async fetchInitData() {
            await this.$store.dispatch("Jobs/fetchJobById", { id: this.$route.params.id }).then(async res => {
                this.job = res;
                this.nextDates(this.job.schedule);
            }).finally(() => {
                this.jobDataHasLoaded = true;
            });
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
                var i = 0;
                while (i < 10) {
                    try {
                        var obj = interval.next();
                        this.nextTriggerDates.push({ 
                            date: moment(obj.value.toString()).format("ddd, MMMM DD, YYYY"),
                            time: moment(obj.value.toString()).format("hh:mm")});
                    } catch (e) {
                        break;
                    }
                    i++
                }
            } catch (err) {
                console.log('Error: ', err.message);
            }
        },
    },
    async beforeCreate() {

    },
    mounted() {
        this.fetchInitData();
    }
}
</script>