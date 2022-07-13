<template>
    <div>
        <b-navbar toggleable="lg" type="dark">
            <b-nav-form>
                <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
            </b-nav-form>

            <b-dropdown class="ml-auto" right>
                <b-dropdown-item href="#">Profile</b-dropdown-item>
                <b-dropdown-item @click="logOut" href="#">Sign Out</b-dropdown-item>
            </b-dropdown>
        </b-navbar>
    </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
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
