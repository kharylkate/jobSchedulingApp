<template>
    <div class="">
        <b-card bg-variant="mainbg" text-variant="white" class="login-card">
            <b-card-text>
                <b-form @submit="login">
                    <div class="creds-box">
                        <b-row align-h="start" class="p-0 m-0">
                            <b-col cols="auto" class="p-0 mt-2 pr-1 m-0">
                                <code class="code-label p-0 m-0">
                                    $username 
                                </code>
                            </b-col>
                            <b-col class="p-0 m-0"> 
                                <b-form-input class="p-0 m-0" id="username" 
                                    v-model="user.username" type="text" 
                                    ref="username"
                                    autocomplete="false"
                                    @focus="resetState()"
                                    @keyup.enter="getUser()"
                                    required>
                                </b-form-input>
                            </b-col>
                        </b-row>
                        <b-row v-if="unameNotFound">
                            <p class="ml-3">
                                <code class="not-found" ref="unameNotFound"> 
                                    $username does not exist 
                                </code>
                            </p>
                        </b-row>
                    </div>
                    <div class="creds-box">
                        <b-row align-h="start" class="p-0 m-0" v-show="focus">
                                <b-col cols="auto" class="p-0 mt-2 pr-1 m-0">
                                    <code class="code-label p-0 m-0">
                                        $password 
                                    </code>
                                </b-col>
                                <b-col class="p-0 m-0"> 
                                    <b-form-input class="p-0 m-0" id="password" 
                                        v-model="user.password" type="password" 
                                        ref="password"
                                        @keyup.enter="login()"
                                        required>
                                    </b-form-input>
                                </b-col>
                            </b-row>
                            <b-row v-if="acctNotFound">
                            <p class="ml-3">
                                <code class="not-found" ref="unameNotFound"> 
                                    $system: there is no such account
                                </code>
                            </p>
                        </b-row>
                    </div>
                </b-form>
            </b-card-text>
        </b-card>
    </div>
</template>

<script>

export default {
  name: 'Jobs',
  components: {
  },
  data() {
    return {
        user: {
            username: "",
            password: ""
        },
        focus: false,
        cred: {
            username: ""
        },
        state: {
            username: null,
            password: null
        },
        unameNotFound: false,
        acctNotFound: false,
    }
  },
  mounted() {
    this.$refs['username'].focus();
  },
  methods: {
    focusPassword() {
        // this.getUser(this.user.username);
        this.focus = !this.focus;
        setTimeout(() => {
            document.getElementById("password").focus();
        }, 100)
        
    },
    async getUser() {
        this.$store.dispatch("Jobs/fetchUserByUsername", this.user.username).then(res => {
            console.log(res)
            if(res && res.data && res.data[0].id) {
                this.focusPassword();
            } else if(res.response && res.response.status == 404){
                document.getElementById("username").blur();
                this.unameNotFound = true;
                setTimeout(() => {
                    this.unameNotFound = false;
                    this.user.username = "";
                    this.$refs['username'].focus();
                }, 3000);
            }
        })
    },
    resetState() {
        if(this.focus) {
            this.unameNotFound = false;
            this.user.password = "";
            this.focus = false;
        }
    },
    async login() {
        this.$store.dispatch("Jobs/login", this.user).then(res => {
            console.log(res.data);
            if(res.response && res.response.status == 404) {
                this.acctNotFound = true;
                document.getElementById("password").blur();
                setTimeout(() => {
                    this.acctNotFound = false;
                    this.user.password = "";
                    this.$refs['username'].focus();
                    this.focus = false;
                }, 3000);
            } else if(res && res.data){
                console.log("hello?");
                // let route = this.$router.resolve({ path: '/jobs/', params: { user: res.data }})
                // window.open(route.href);
                this.$router.push({
                    path: '/jobs/',
                    props: res.data
                });
            }
        })
    },
  }
  
}
</script>

