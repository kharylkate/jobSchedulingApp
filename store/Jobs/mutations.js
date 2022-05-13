export default {

    setListJobs: (state, data) => {
        state.listJobs = data;
    },

    createJob: (state, data) => {
        state.listJobs.push(data);
    }
}