<template>
    <div class="sidebar vh-100" id="sidebar">
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
            <b-nav vertical v-for="(mod, index) in modules.main" :key="index" class="sidebar-link">
              <b-nav-item class="sidebar-link-item" :href="mod.path">
                <b-row>
                  <div class="nav-icon"> <unicon :name="mod.icon" fill="white" /> </div>
                  <div class="nav-name" v-if="mod.name != 'Admin'"> &nbsp; {{ mod.name }} </div>
                </b-row>
              </b-nav-item>
            </b-nav>
            <b-nav vertical class="sidebar-link">
              <b-nav-item class="sidebar-link-item" v-b-toggle.admin-submodules>
                <b-row>
                  <div class="nav-icon"> <unicon name="lock-access" fill="white" /> </div>
                  <div class="nav-name"> &nbsp; Admin </div>
                </b-row>
              </b-nav-item>
            </b-nav>
            <div>
              <b-collapse id="admin-submodules" class="admin-submodules">
                <b-nav vertical v-for="(mod, index) in modules.submodules" :key="index" class="sidebar-link">
                  <b-nav-item class="sidebar-link-item pl-5" :href="mod.path">
                    <b-row>
                      <div class="nav-icon"> <unicon :name="mod.icon" fill="white" /> </div>
                      <div class="nav-name" v-if="mod.name != 'Admin'"> &nbsp; {{ mod.name }} </div>
                      <div class="nav-name" v-if="mod.name == 'Admin'"
                        v-b-toggle.admin-submodules
                      > &nbsp; {{ mod.name }} </div>
                    </b-row>
                  </b-nav-item>
                </b-nav>
              </b-collapse>
            </div>
          </nav>
        </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modules: {
        main: [
          {
            name: "Dashboard",
            icon: "home",
            path: "/dashboard"
          }, {
            name: "Jobs",
            icon: "arrow",
            path: "/jobs"
          }, {
            name: "File",
            icon: "file-alt",
            path: "/files"
          }, 
          // {
          //   name: "Admin",
          //   icon: "lock-access",
          // },
        ],
        submodules: [
          {
            name: "Servers",
            icon: "server",
            path: "/admin/servers"
          }, {
            name: "Accounts",
            icon: "users-alt",
            path: "/admin/accounts"
          }, 
        ]
      }
    }
  },
  methods: {
    hide() {
      console.log("HIDE ME");
    }
  }
}
</script>
