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
                        <h3> {{ file.filename }} </h3>
                    </div>
                </div>

                <b-container fluid class="m-0">
                    <b-row class="m-0 bords" style="height:200px;">
                        
                    </b-row>
                    <b-row class="m-0 bords">
                        <!-- <div> -->
                            <b-form-textarea
                                id="script-textarea"
                                v-model="file.script"
                                rows="5"
                                :formatter="formatter"
                                disabled
                            >

                            </b-form-textarea>
                        <!-- </div> -->
                    </b-row>
                </b-container>
                
            </b-overlay>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import cronstrue from 'cronstrue';

import Sidebar from '../../layouts/sidebar.vue';

export default {
    props: { file: Object },
    head() {
        return {
            title: this.file.filename,
        }
    },
    name: "fileById",
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
            show: false,
        }
    },
    computed: {
        ...mapGetters({
            listFiles: "Jobs/getListFiles",
        }),

        
    },
    async created() {
    },
    methods: { 
        formatter(value) {
            return (
                `<code> ${value} </code>`
            )
        },

        
    },
    async beforeCreate() {
        this.show = true;
        await this.$store.dispatch("Jobs/fetchListFiles");
        this.show = false;
    },


}
</script>