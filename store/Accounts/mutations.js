export default {

    setListAccounts(state, data) {
        state.listAccounts = data;
    },

    setAccountById(state, data) {
        state.accountById = data;
    },

    createAccount(state, data) {
        state.listAccount.push(data);
    },

    updateAccount(state, data) {
        let index = state.listAccounts.map((val, ind) => {
            if(val.id == data.id) {
                return ind;
            }
        })
        let ind = index.filter((item) => item != undefined);
        state.listAccounts[ind] = data;
    },

    setListRoles(state, data) {
        state.listRoles = data
    },

    setRoleById(state, data) {
        state.roleById = data
    },

    createRole(state, data) {
        state.listRoles.push(data)
    },

    updateRole(state, data) {
        let index = state.listRoles.map((val, ind) => {
            if(val.id == data.id) {
                return ind;
            }
        })
        let ind = index.filter((item) => item != undefined);
        state.listRoles[ind] = data;
    },


}