<template>
    <div>
        <b-container fluid class="m-0 p-0">
            <b-row class="m-0 p-0">
            <b-col cols="12" lg="2" md="2" sm="0" class="sidebar m-0 p-0">
                <Sidebar />
            </b-col>
            <b-col class="content m-0 p-0">
                <JobById :job="job" />
            </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Sidebar from '../../layouts/sidebar.vue';
import JobById from '../../components/Jobs/JobById.vue'

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
            
        }
    },
    computed: {
        ...mapGetters({
            job: "Jobs/getJobById"
        })
    },
    created() {
        console.log("jobbbb", this.job);
    },
    async beforeCreate() {
        await this.$store.dispatch("Jobs/fetchJobById", { id: this.$route.params.id });
    }
}
</script>