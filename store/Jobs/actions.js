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

    // router.get('/jobs/', api.getAllJobs);
    // router.get('/jobs/:id', api.getJobById);
    // router.post('/jobs/', api.createJob);
    // router.put('/jobs/:id', api.updateJob);
    // router.delete('/jobs/:id', api.deleteJob);

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