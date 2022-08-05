<template>
    <div>
        <b-navbar toggleable="lg" type="dark">
            <!-- <b-nav-form>
                <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
            </b-nav-form> -->
            
            <div class="ml-auto pr-3">
              
              <b-row>
                <div class="text-white pb-0 pr-4 mb-0">
                  <p class="user-username pt-2 pb-0 mb-0">${{ user.username }}</p>
                </div>
                <b-dropdown right>
                  <b-dropdown-item href="#">Profile</b-dropdown-item>
                  <b-dropdown-item @click="logOut" href="#">Sign Out</b-dropdown-item>
                </b-dropdown>
              </b-row>
            </div>
        </b-navbar>
    </div>
</template>

<script>
import '../node_modules/highlight.js/styles/atom-one-dark-reasonable.css'
export default {
  name: 'Navbar',
  data() {
    return {
      user: JSON.parse(localStorage.user)
    }
  },
  async created(){
  },
  methods: {
    logOut() {
      console.log(localStorage);
      localStorage.removeItem('user');
      this.$router.push("/");
    },
  },
}
</script>

<style scoped>
  .user-username {
    font-family:Courier New, Courier, monospace;
    font-weight: 500;
  }
</style>