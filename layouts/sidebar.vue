<template>
    <div class="sidebar" id="sidebar">
        <div class="sidebar-header p-2 pt-2 m-2">
          <b-row>
            <div class="sidebar-header-logo">
              <img class="sidebar-logo-bfi" src="/bfi-org.png" href="/" alt="bfi-org-logo-leaf">
            </div>
            <div class="sidebar-header-appname pt-1">
              <h4>
                <p class="header-title">Job</p>
                <p class="header-title">Scheduling</p>
              </h4>
            </div>
          </b-row>
        </div>
        <div>
          <nav class="mb-3">
            <b-nav vertical v-for="(mod, index) in modules" :key="index" class="sidebar-link">
              <b-nav-item class="sidebar-link-item" :href="mod.path">
                <b-row>
                  <div class="nav-icon"> <unicon :name="mod.icon" fill="white" /> </div>
                  <div class="nav-name"> &nbsp; {{ mod.name }} </div>
                </b-row>
              </b-nav-item>
            </b-nav>
          </nav>
        </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modules: [
        {
          name: "Jobs",
          icon: "arrow",
          path: "/"
        }, {
          name: "File",
          icon: "file-alt",
          path: "/files"
        }, {
          name: "Admin",
          icon: "lock-access",
          path: "/admin"
        }
      ]
    }
  },
  methods: {
    hide() {
      console.log("HIDE ME");
    }
  }
}
</script>
