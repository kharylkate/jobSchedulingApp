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
                                <div v-if="file.modified_at != null">{{ file.modified_at ? new Date(file.modified_at) : '' }}</div>
                            </b-col>
                    </b-row>
                    
                    <div class="m-0 script-border">
                        <b-row>
                            <b-col cols="auto" class="mr-auto mt-2">
                                <p v-show="doneUpdate">{{ autoUpdateMessage }}</p>
                            </b-col>
                            <b-col  cols="auto">
                                <b-button v-if="showCancelButton" @click="cancel()">
                                    <unicon class="unicon" name="pen" fill="white"></unicon>
                                </b-button>
                                <b-button @click="enableTextArea()">
                                    <unicon class="unicon" :name="updateIcon ? 'pen' : 'save'" fill="white"></unicon>
                                </b-button>
                            </b-col>
                        </b-row>
                        <b-form-textarea
                            id="script-textarea"
                            v-model="updatedScript"
                            rows="5"
                            :disabled="disabled"
                        >
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
            autoUpdateMessage: "",
            updateIcon: true,
            showCancelButton: false,

        }
    },
    computed: {
        ...mapGetters({
            listFiles: "Jobs/getListFiles",
            getFile: "Jobs/getFileById"
        }),
        

        
    },
    async created() {
        await this.getFileById(this.ID);
        this.updatedScript = this.getFile.script;
    },
    methods: { 
        formatter(value) {
            return (
                `<code> ${value} </code>`
            )
        },
        async enableTextArea() {
            if(!this.disabled) {
                this.disabled = true;
                clearInterval(this.intervalId);
                await this.updateFile(false);
            } else {
                this.disabled = false;
                this.intervalId = await setInterval( async() => {
                    await this.updateFile(true);
                }, 60000)
                
            }
        },
        async updateFile(interval) {
            this.updateIcon = (this.updateIcon ? false : true);
            this.autoUpdateMessage = (interval ? 'Work is aut-saved' : 'Work has been saved!');
            let data = {
                id: this.getFile.id,
                filename: this.getFile.filename,
                script: this.updatedScript,
                modified_by: this.user .id,
            }
            this.$store.dispatch("Jobs/updateFile", data).then(res => {
                if(res.data.rowCount) {
                    this.doneUpdate = true;
                    setTimeout(() => {
                        this.doneUpdate = false;
                    }, 5000)
                }
            })
        },
        async getFileById(id) {
            await this.$store.dispatch("Jobs/fetchFileById", id).then(res => {
                this.file = res;
            })
        },
        cancel() {
            this.updatedScript = this.getFile.script;
            this.disabled = true;
            
        },
        
    },
    async beforeCreate() {
        this.show = true;
        await this.$store.dispatch("Jobs/fetchListFiles");
        this.show = false;
    },


}
</script>