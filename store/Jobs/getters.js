export default {
    getListJobs(state) {
        console.log("listJobs", state.listJobs);
        return state.listJobs;
    },

    getJobById(state) {
        console.log("jobById",state)
        return state.jobById;
    }
}