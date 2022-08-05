<template>
    <div>
        <div class="main-content">
            <b-overlay :show="show">
                <div class="header">
                    <Navbar />

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

                <b-modal centered id="update-file-permission" title="Update File Permission" size="md" @ok="updatePermission">
                    <div>
                        <p>Your permission has been denied. Would you like to update file permission and try to update again?
                        </p>
                        <br>
                        <p>The following command will be executed: 
                            <code> chmod u+x {{ getFile.filename }} </code>
                        </p>
                    </div>
                    <template #modal-footer>
                        <div class="w-100">
                            <div class="float-right">
                                <b-button
                                    variant="disabledbg"
                                    size="sm"
                                    @click="exit()" >
                                    NO </b-button>
                                <b-button
                                    variant="btn-primary"
                                    size="sm"
                                    @click="updatePermission()"
                                    > YES </b-button>
                            </div>
                        </div>
                    </template>
                </b-modal>

                <!-- alert -->
                <div>
                <b-alert class="alerticon" v-model="alert.showAlert" variant="light">
                    <div class="alertborder" style="borderWidth:40px solid; borderColor:'brown'">
                    <unicon :name="alert.color == 'green' ? 'check' : 'multiply' " :fill="alert.color"> </unicon>
                        {{ alert.message }}
                    </div>
                </b-alert>
                </div>
                
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
            user: JSON.parse(localStorage.user),
            autoUpdateMessage: "",
            updateIcon: true,
            showCancelButton: false,
            alert: {
                showAlert: 0,
                color: "",
                message: ""
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
                this.updateIcon = false;
                this.disabled = false;
                this.intervalId = await setInterval( async() => {
                    await this.updateFile(true);
                    // 1 minute interval
                }, 60000)
                
            }
        },
        async updateFile(interval) {
            this.updateIcon = (this.updateIcon ? false : true);
            this.autoUpdateMessage = (interval ? 'Work is auto-saved' : 'Work has been saved!');
            let data = {
                id: this.getFile.id,
                filename: this.getFile.filename,
                script: this.updatedScript,
                modified_by: this.user.id,
                username: this.user.username
            }
            console.log("this.user.username", this.user.username);
            this.$store.dispatch("Jobs/updateFile", data).then(res => {
                console.log(res);
                if(res && res.data && res.data.rowCount && res.status == 201) {
                    this.doneUpdate = true;
                    setTimeout(() => {
                        this.doneUpdate = false;
                    }, 5000)
                } else {

                    if(res.response.data.errorMsg.includes('Permission denied')) {
                        this.$bvModal.show('update-file-permission');
                    } else {
                        this.showAlert("Error", "red");
                    }
                }
            })
        },
        async getFileById(id) {
            await this.$store.dispatch("Jobs/fetchFileById", id).then(res => {
                console.log(res);
                this.file = res;
            })
        },
        cancel() {
            this.updatedScript = this.getFile.script;
            this.disabled = true;
            
        },
        async updatePermission() {
            this.$bvModal.hide('update-file-permission');
            console.log(this.user);
            await this.$store.dispatch("Jobs/runCommand", { 
                action: 'permission-add',
                filename: this.getFile.filename,
                executed_by: this.user.id,
                username: this.user.username,
            }).then( async res => {
                console.log(res);
                if(res.stdout == "" && res.stderr == "") {
                    await this.updateFile();
                } else {
                    this.showAlert(res.stderr, "red")
                }
            })
        },
        showAlert(message, color) {
            this.alert = {
                showAlert: 3,
                message,
                color
            }
        },
        exit() {
            this.$bvModal.hide('update-file-permission');
        }
        
    },
    async beforeCreate() {
        this.show = true;
        await this.$store.dispatch("Jobs/fetchListFiles", { username: JSON.parse(localStorage.user).username });
        this.show = false;
    },


}
</script>