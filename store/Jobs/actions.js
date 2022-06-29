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
                await commit("setListJobs", ok);
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

    createJob({ commit }, data) {
        commit("createJob", data);
        return {
            status: 201,
            message: "Successfully Created"
        }
    },

    async updateJob({ commit }, data) {
        console.log("data", data);
        console.log("data", data.id);
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
            console.log(res);
            if(res) {
                commit("updateJob", data)
                return {
                    status: 204,
                    message: "Successfully Updated"
                }
            }
        })
        
    },
}