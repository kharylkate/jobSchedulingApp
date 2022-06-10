import axios from 'axios';
export default {

    async fetchListJobs({ commit }, data) {
        await commit("setListJobs", data);
        return data;
    },

    async fetchJobById({ commit }, data) {
        const id = parseInt(data.id);
        return await axios({
            method: "GET",
            url: `${this.$axios.defaults.baseURL}/jobs/${id}`
        }).then(async res => {
            if(res && res.data && Array.isArray(res.data)) {
                await commit("setJobById", res.data[0]);
            } else {
                await commit("setJobById", {});
            }
            return res.data[0];
        }).catch(err => err);
    },

    createJob({ commit }, data) {
        commit("createJob", data);
        return {
            status: 201,
            message: "Successfully Created"
        }
    },
}