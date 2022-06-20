export default {

    setListJobs(state, data) {
        state.listJobs = data;
    },

    setJobById(state, data) {
        let job = state.listJobs.filter(job => job.id == data)
        state.jobById = job;
        return state.jobById;
        // state.jobById = data;
    },

    createJob: (state, data) => {
        state.listJobs.push(data);
    }
}