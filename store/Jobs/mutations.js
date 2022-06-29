export default {

    setListJobs(state, data) {
        state.listJobs = data;
    },

    async setJobById(state, data) {
        state.jobById = data[0];
        return data[0];
    },

    createJob: (state, data) => {
        state.listJobs.push(data);
    },

    updateJob: (state, data) => {
        let index = state.listJobs.map((val, ind) => {
            if(val.id == data.id) {
                return ind;
            }
        })
        let ind = index.filter((item) => item != undefined);
        state.listJobs[ind] = data;
        console.log(state.listJobs[ind]);
    }
}