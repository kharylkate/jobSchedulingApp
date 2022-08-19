<template v-if="fileDataHasLoaded">
    <div>
        <b-container fluid class="m-0 p-0">
            <b-row class="m-0 p-0 ">
            <b-col cols="12" lg="2" md="2" sm="0" class="sidebar m-0 p-0">
                <Sidebar />
            </b-col>
            <b-col class="content m-0 p-0">
                <FileById :id="parseInt(this.$route.params.id)" />
            </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import Sidebar from '../../layouts/sidebar.vue';
import FileById from '../../components/Files/FileById.vue';

export default {
    head() {
        return {
        }
    },
    name: "id",
    components: {
        Sidebar, FileById
    },
    data() {
        return {
            // file: {},
            // fileDataHasLoaded: false,
        }
    },
    computed: {
    },
    async created() {
        // await this.fetchInitData();
    },
    methods: {
        // async fetchInitData() {
        //     await this.$store.dispatch("Jobs/fetchFileById", { id: this.$route.params.id }).then(async res => {
        //         this.file = res;
        //         console.log(res);
        //     }).finally(() => {
        //         this.fileDataHasLoaded = true;
        //     });
        // },
        
    },
    async beforeCreate() {

    },
    mounted() {
        
    }
}
</script>