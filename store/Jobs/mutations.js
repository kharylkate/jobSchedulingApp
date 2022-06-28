export default {

    setListJobs(state, data) {
        state.listJobs = data;
        return state.listJobs;
    },

    setJobById(state, data) {
        let job = state.listJobs.filter(job => job.id == data)
        state.jobById = job;
        return state.jobById;
        // state.jobById = data;
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
        return data;
        
    }
}