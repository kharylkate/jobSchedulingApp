export default {
    getListJobs(state) {
        return state.listJobs;
    },

    getJobById(state) {
        return state.jobById;
    },

    getCronTail(state) {
        return state.cronTail;
    },

    getListFiles(state) {
        return state.listFiles;
    },

    getFileById(state) {
        return state.fileById;
    },
}