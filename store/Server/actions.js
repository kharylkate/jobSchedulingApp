import axios from 'axios';
export default {
    
    async fetchListServer({ commit }) {
        return await axios({
            method: "GET",
            url: `${this.$axios.defaults.baseURL}/server`,
            headers: {
                "Content-Type": "application/json, text/plain, */*"
            }
        }).then( async res => {
            if(Array.isArray(res.data)) {
                commit("setListServer", res.data);
            } else {
                commit("setListServer", []);
            }
            console.log(res)
            return res;
        })
    },

    async cronReadStatus({ commit }, data ) {
        console.log("DATA: ", data);
        return await axios({
            method: "POST",
            url: `${this.$axios.defaults.baseURL}/cron/status`,
            headers: {
                "Content-Type": "application/json"
            },
            data: data,
        }).then( async res => {
            console.log("result cronreadstatus: ",res);
            if(Array.isArray(res.data)) {
                commit("setListServer", res.data);
            } else {
                commit("setListServer", []);
            }
            console.log(res);
            return res;
        })
    }
}