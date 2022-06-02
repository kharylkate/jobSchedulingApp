export default {
    getListJobs(state) {
        return state.listJobs;
    },

    getJobById(state) {
        return state.jobById;
    }

    // getJobById: (state => (id) => {
    //     return state.listJobs.find(job => job.id === id);
    // }) 
}