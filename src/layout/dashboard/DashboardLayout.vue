<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link to="/Home" name="Home" icon="ti-home"> </sidebar-link>

        <sidebar-link to="/Dayshift" name="DayShift" icon="ti-shine">
        </sidebar-link>

        <sidebar-link to="/Worktime" name="WorkTime" icon="ti-timer" />
        <sidebar-link to="/Report" name="Report" icon="ti-notepad" />
        <sidebar-link
          to="/Setting"
          name="Setting"
          icon="ti-settings"
          @click="greet"
        >
        </sidebar-link>
      </template>
      <mobile-menu>
        <li class="nav-item">
          <a class="nav-link">
            <i class="ti-panel"></i>
            <p>Stats</p>
          </a>
        </li>
        <drop-down
          class="nav-item"
          title="5 Notifications"
          title-classes="nav-link"
          icon="ti-bell"
        >
          <p class="dropdown-item">Notification 1</p>
          <p class="dropdown-item">Notification 2</p>
          <p class="dropdown-item">Notification 3</p>
          <p class="dropdown-item">Notification 4</p>
          <p class="dropdown-item">Another notification</p>
        </drop-down>
        <li class="nav-item">
          <a class="nav-link">
            <i class="ti-settings"></i>
            <p>Settings</p>
          </a>
        </li>
        <li class="divider"></li>
      </mobile-menu>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar"> </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss"></style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu,
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
    greet() {
      // `this` inside methods points to the current active instance
      alert(`Hello ${this.name}!`);
    },
  },
};
</script>
