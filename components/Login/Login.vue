<template>
    <div class="">
        <b-card bg-variant="mainbg" text-variant="white" class="login-card">
            <b-card-text>
                <b-form @submit="login">
                    <div class="username-box">
                        <b-form-group id="input-username" label-for="username">
                            <b-row align-h="start" class="pl-3 pb-0 mb-0">
                                <p class="pb-0 mb-0">
                                    <code>
                                        Username:
                                    </code>
                                </p>
                            </b-row>
                            <b-form-input id="username" v-model="user.username" type="text" required>
                            </b-form-input>
                        </b-form-group>
                    </div>
                    <div class="password-box">
                        <b-row align-h="start" class="pl-3 pb-0 mb-0">
                            <p class="pb-0 mb-0">
                                <code>
                                    Password:
                                </code>
                            </p>
                        </b-row>
                        <b-form-group id="input-password" label-for="password">
                            <b-form-input id="password" v-model="user.password" type="text" required>
                            </b-form-input>
                        </b-form-group>
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
        }
    }
  },
  methods: {
    async login() {

    }
  }
  
}
</script>

