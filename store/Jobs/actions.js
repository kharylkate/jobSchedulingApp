import axios from 'axios';
export default {

    async fetchListJobs({ commit }, data) {
        await commit("setListJobs", data);
        return data;
    },

    async fetchJobById({ commit }, data) {
        await commit("setJobById", data.id);
    },

    createJob({ commit }, data) {
        commit("createJob", data);
        return {
            status: 201,
            message: "Successfully Created"
        }
    },
}