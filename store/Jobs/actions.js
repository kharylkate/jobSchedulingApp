import axios from 'axios';
export default {

    async fetchListJobs({ commit }, data) {
        return await axios({
            method: "GET",
            url: `${this.$axios.defaults.baseURL}/jobs`,
            headers: {
                "Content-Type": "application/json, text/plain, */*"
            }
        }).then( async res => {
            if(res.data.length > 0 && Array.isArray(res.data)) {
                await commit("setListJobs", res.data);
            } else {
                await commit("setListJobs", []);
            }
            return res;
        }).catch(err => err);
    },

    async fetchJobById({ commit }, data) {
        const id = parseInt(data.id);
        return await axios({
            method: "GET",
            url: `${this.$axios.defaults.baseURL}/jobs/${id}`
        }).then(async res => {
            if(res && res.data.length && Array.isArray(res.data)) {
                await commit("setJobById", res.data);
                return res.data[0];
            } else {
                await commit("setJobById", []);
                return res.data[0];
            }

        }).catch(err => err);
    },

    async createJob({ commit }, data) {
        return await axios({
            method: "POST",
            url: `${this.$axios.defaults.baseURL}/jobs/`,
            headers: {
                "Content-Type": "application/json"
            },
            data: { 
                name: data.name, 
                schedule: data.schedule,
                command: data.command,
                status: data.status,
                created_by: data.created_by,
            },
        }).then( async res => {
            if(res.data.length > 0 && Array.isArray(res.data)) {
                await commit("setListJobs", data);
            } else {
                await commit("setListJobs", data);
            }
            return res;
        }).catch(err => err);
    },

    async updateJob({ commit }, data) {
        return await axios({
            method: "PUT",
            url: `${this.$axios.defaults.baseURL}/jobs/${data.id}`,
            headers: {
                "Content-Type": "application/json"
            },
            data: {
                name: data.name,
                command: data.command,
                schedule: data.schedule,
                status: data.status,
                modified_by: data.modified_by,
            },
        }).then(res => {
            if(res) {
                commit("updateJob", data)
                return res;
            } else {
                return res;
            }
        })        
    },

    async runCommand({ commit }, data) {
        return await axios({
            method: "POST",
            url: `${this.$axios.defaults.baseURL}/connect/`,
            headers: {
                "Content-Type": "application/json"
            },
            data: data,
        }).then(res => {
            console.log(res);
            switch (data.action) {
                case 'cron-read-log-specific-lastlines':
                    console.log("cron read log");
                    commit("cronReadLogSpecific", (res.data));

            }
            return res.data;

        })
    },

    async fetchListFiles({ commit }, data) {
        return await axios({
            method: "GET",
            url: `${this.$axios.defaults.baseURL}/files`,
            headers: {
                "Content-Type": "application/json, text/plain, */*"
            }
        }).then( async res => {            
            if(res.data.length > 0 && Array.isArray(res.data)) {
                await commit("setListFiles", res.data);
            } else {
                await commit("setListFiles", []);
            }
            return res;
        }).catch(err => err);
    },

    async fetchFileById({ commit }, data) {
        return await axios({
            method: "GET",
            url: `${this.$axios.defaults.baseURL}/files/${data}`,
            headers: {
                "Content-Type": "application/json"
            },
        }).then(async res => {
            if(res && res.data.length && Array.isArray(res.data)) {
                await commit("setFileById", res.data);
                return res.data[0];
            } else {
                await commit("setFileById", []);
                return res.data[0];
            }
        }).catch(err => err);
    },

    async createFile({ commit }, data) {
        return await axios({
            method: "POST",
            url: `${this.$axios.defaults.baseURL}/files/`,
            headers: {
                "Content-Type": "application/json"
            },
            data: { 
                filename: data.filename,
                script: data.text,
                created_by: data.created_by,
            },
        }).then( async res => {
            console.log(res)
            if(res.data.length > 0 && Array.isArray(res.data)) {
                await commit("setFile", data);
            } else {
                await commit("setFile", data);
            }
            return res;
        }).catch(err => err);
    },

    async updateFile({ commit }, data) {
        return await axios({
            method: "PUT",
            url: `${this.$axios.defaults.baseURL}/files/${data.id}`,
            headers: {
                "Content-Type": "application/json"
            },
            data: { 
                id: data.id,
                filename: data.filename,
                script: data.script,
                modified_by: data.modified_by,
            },
        }).then( async res => {
            console.log(res)
            if(res.data.length > 0 && Array.isArray(res.data)) {
                await commit("updateFile", data);
            } else {
                await commit("updateFile", data);
            }
            return res;
        }).catch(err => err);
    },

}