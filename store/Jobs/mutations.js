export default {

    setListJobs(state, data) {
        state.listJobs = data;
    },

    setJobById(state, data) {
        state.jobById = data;
    },

    createJob: (state, data) => {
        state.listJobs.push(data);
    }
}