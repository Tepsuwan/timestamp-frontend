<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">{{ routeName }}</a>
      <h1>{{ hours }}</h1>
      <h3>:</h3>
      <h1>{{ minutes }}</h1>
      <h3>:</h3>
      <h1>{{ seconds }}</h1>
      <h3 class="navbar-brand"></h3>
      <h3 class="navbar-brand">
        {{ day }}&nbsp;&nbsp;{{ days }}&nbsp;{{ month }}&nbsp;{{ year }}
      </h3>

      <button
        class="navbar-toggler navbar-burger"
        type="button"
        @click="toggleSidebar"
        :aria-expanded="$sidebar.showSidebar"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-bar"></span>
        <span class="navbar-toggler-bar"></span>
        <span class="navbar-toggler-bar"></span>
      </button>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a href="#" @click.prevent="logout" class="nav-link">
              <p>Log out</p>
            </a>
            <!-- <button>sad</button> -->
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  computed: {
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    },
  },
  data() {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
      day: "",
      days: "",
      month: "",
      year: "",
      activeNotifications: false,
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("user");
      this.$router.push("/login");
    },
    setTime() {
      const date = new Date();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      hours = hours <= 9 ? `${hours}`.padStart(2, 0) : hours;
      minutes = minutes <= 9 ? `${minutes}`.padStart(2, 0) : minutes;
      seconds = seconds <= 9 ? `${seconds}`.padStart(2, 0) : seconds;
      this.hours = hours;
      this.minutes = minutes;
      this.seconds = seconds;
      const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      let day = weekday[date.getDay()];
      let days = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);
      let month = months[date.getMonth()];
      let year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(
        date
      );

      this.day = day;
      this.days = days;
      this.month = month;
      this.year = year;
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },
  },
  mounted() {
    setInterval(() => this.setTime(), 1000);
  },
};
</script>
<style>
.LCD {
  display: flex;
}
.LCD > div {
  font-family: "alarm clock";
  font-size: x-large;
}

.tab {
  display: inline-block;
  margin-left: 10px;
}
</style>
