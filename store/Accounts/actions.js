import axios from 'axios';
export default {

    async fetchListAccounts({ commit }) {
        return await axios({
            method: "GET",
            url: `${this.$axios.defaults.baseURL}/accounts`,
            headers: {
                "Content-Type": "application/json, text/plain, */*"
            }
        }).then( async res => {
            if(Array.isArray(res.data)) {
                commit("setListAccounts", res.data);
            } else {
                commit("setListAccounts", []);
            }
            console.log(res)
            return res;
        })
    },

    async fetchAccountById({ commit }, data) {
        return await axios({
            method: "GET",
            url: `${this.$axios.defaults.baseURL}/accounts/${data}`,
            headers: {
                "Content-Type": "application/json, text/plain, */*"
            }
        }).then( async res => {
            if(Array.isArray(res.data)) {
                commit("setListAccounts", res.data[0]);
            } else {
                commit("setListServer", []);
            }
            console.log(res)
            return res;
        })
    },

    async createAccount({ commit }, data) {
        const { first_name, last_name, username, password, created_by, role_id, private_key } = data;
        return await axios({
            method: "POST",
            url: `${this.$axios.defaults.baseURL}/accounts`,
            headers: {
                "Content-Type": "application/json"
            },
            data: {
                first_name,
                last_name,
                username,
                created_by,
                role_id,
                password,
                private_key
            }
        }).then( async res => {
            if(res.data.length > 0 && Array.isArray(res.data)) {
                commit("setListAccounts", data);
            } else {
                commit("setListServer", []);
            }
            console.log(res)
            return res;
        })
    },

    async updateAccount({ commit }, data) {
        const { id, first_name, last_name, password, modified_by, role_id } = data;
        return await axios({
            method: "PUT",
            url: `${this.$axios.defaults.baseURL}/accounts/${id}`,
            headers: {
                "Content-Type": "application/json"
            },
            data: {
                first_name,
                last_name,
                modified_by,
                role_id,
                password
            }
        }).then( async res => {
            if(res) {
                commit("updateAccount", data);
            } else {
                commit("updateAccount", []);
            }
            return res;
        })
    },

    async fetchListRoles({ commit }) {
        return await axios({
            method: "GET",
            url: `${this.$axios.defaults.baseURL}/roles`,
            headers: {
                "Content-Type": "application/json, text/plain, */*"
            }
        }).then( async res => {
            if(Array.isArray(res.data)) {
                commit("setListRoles", res.data);
            } else {
                commit("setListRoles", []);
            }
            console.log(res)
            return res;
        })
    },

    async fetchRoleById({ commit }, data) {
        return await axios({
            method: "POST",
            url: `${this.$axios.defaults.baseURL}/roles/${data}`,
            headers: {
                "Content-Type": "application/json, text/plain, */*"
            },
        }).then( async res => {
            if(Array.isArray(res.data)) {
                commit("setRoleById", res.data[0]);
            } else {
                commit("setRoleById", []);
            }
            console.log(res)
            return res;
        })
    },

    async createRole({ commit }, data) {
        return await axios({
            method: "POST",
            url: `${this.$axios.defaults.baseURL}/roles`,
            headers: {
                "Content-Type": "application/json, text/plain, */*"
            },
            data: {
                rolename: data.rolename,
                created_by: data.created_by
            }
        }).then( async res => {
            if(Array.isArray(res.data)) {
                commit("createRole", data);
            } else {
                commit("createRole", []);
            }
            console.log(res)
            return res;
        })
    },

    async updateRole({ commit }, data) {
        const { id, rolename, modified_by } = data;

        return await axios({
            method: "PUT",
            url: `${this.$axios.defaults.baseURL}/roles/${id}`,
            headers: {
                "Content-Type": "application/json, text/plain, */*"
            },
            data: {
                rolename, 
                modified_by
            }
        }).then(async res => {
            if(Array.isArray(res.data)) {
                commit("updateRole", data);
            } else {
                commit("updateRole", []);
            }
            console.log(res)
            return res;
        })
    }


}