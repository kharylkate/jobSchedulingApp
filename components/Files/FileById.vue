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
                    <b-row class="mb-4 mt-4 ml-1 text-white script-details " style="height:100px;">
                            <b-col sm="auto">
                                <div>File Name</div>
                                <div>Author</div>
                                <div>Date Created</div>
                                <div v-if="file.modified_at != null">Date Modified</div>
                            </b-col>
                            <b-col sm="auto">
                                <div>:</div>
                                <div>:</div>
                                <div>:</div>
                                <div v-if="file.modified_at != null">:</div>
                            </b-col>
                            <b-col>
                                <div>{{ file.filename }}</div>
                                <div>{{ file.username }}</div>
                                <div>{{ new Date(file.created_at) }}</div>
                                <div v-if="file.modified_at != null">{{ file.modified_at }}</div>
                            </b-col>
                    </b-row>
                    
                    <div class="m-0 script-border">
                        <b-row>
                            <b-col cols="auto" class="mr-auto mt-2">
                                <p v-show="doneUpdate">Work is auto-saved!</p>
                            </b-col>
                            <b-col  cols="auto">
                                <b-button @click="updateFile()">
                                    <unicon class="unicon" name="pen" fill="white"></unicon>
                                </b-button>
                            </b-col>
                        </b-row>
                        <b-form-textarea
                            id="script-textarea"
                            v-model="updatedScript"
                            rows="5"
                            :disabled="disabled"
                        >
                        <template></template>
                        </b-form-textarea>
                    </div>
                </b-container>
                
            </b-overlay>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    props: {
        id: {
            type: Number
        }
    },
    head() {
        return {
            title: this.file.filename,
        }
    },
    name: "FileById",
    data() {
        return {
            activeText: true,
            sampleScript: `#!/bin/bash\n\necho "I have gained consciousness. I am alive."`,
            sampleText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum ",
            show: false,
            disabled: true,
            intervalId: null,
            file: {},
            ID: this.id,
            updatedScript: "",
            doneUpdate: false,
            user: {
                id: 6,
            },
        }
    },
    computed: {
        ...mapGetters({
            listFiles: "Jobs/getListFiles",
            getFile: "Jobs/getFileById"
        }),
        

        
    },
    async created() {
        console.log(this.ID)
        await this.getFileById(this.ID);
        this.updatedScript = this.getFile.script;
    },
    methods: { 
        formatter(value) {
            return (
                `<code> ${value} </code>`
            )
        },
        updateFile() {
            console.log(this);
            if(!this.disabled) {
                this.disabled = true;
            } else {
                this.disabled = false;
                this.getFile
                const updatedScript = this.updatedScript;
                this.intervalId = setInterval(() => {
                    let data = {
                        id: this.getFile.id,
                        filename: this.getFile.id,
                        script: this.updatedScript,
                        modified_by: this.user .id,
                    }
                    console.log("updatedScript", this.updatedScript);
                    this.$store.dispatch("Jobs/updateFile", data).then(res => {
                        console.log(res);
                        if(res.rowCount) {
                            this.doneUpdate = true;
                            setTimeout(() => {
                                this.doneUpdate = false;
                            }, 10000)
                        }
                    })
                }, 60000)
            }
        },
        async getFileById(id) {
            console.log(id);
            await this.$store.dispatch("Jobs/fetchFileById", id).then(res => {
                this.file = res;
            })
        }
        

        
    },
    async beforeCreate() {
        this.show = true;
        await this.$store.dispatch("Jobs/fetchListFiles");
        this.show = false;
    },


}
</script>