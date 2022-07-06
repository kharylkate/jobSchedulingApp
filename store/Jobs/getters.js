export default {
    getListJobs(state) {
        console.log("listJobs", state.listJobs);
        return state.listJobs;
    },

    getJobById(state) {
        console.log("jobById",state)
        return state.jobById;
    },

    getCronTail(state) {
        console.log(state.cronTail)
        return state.cronTail;
    },

    getListFiles(state) {
        console.log(state.listFiles);
        return state.listFiles;
    },

    getFileById(state) {
        console.log("fileById",state)
        return state.fileById;
    },
}