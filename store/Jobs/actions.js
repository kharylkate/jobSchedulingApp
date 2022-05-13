export default {
    fetchListJobs: ({ commit }, data) => {
        commit("setListJobs", data);
        return data;
    },
    createJob({ commit }, data) {
        commit("createJob", data);
        return {
            status: 201,
            message: "Successfully Created"
        }
    },
}