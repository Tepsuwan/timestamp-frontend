<script>
export default {
  name: "DigitalClock",
  data() {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  },
  mounted() {
    setInterval(() => this.setTime(), 1000);
  },
  methods: {
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
  },
};
</script>

<template>
  <card>
    <div class="row">
      <div class="col-md-1">
        <div class="container">
          <div class="LCD">
            <div class="hours">{{ hours }}</div>
            <div class="divider">:</div>
            <div class="minutes">{{ minutes }}</div>
            <div class="divider">:</div>
            <div class="seconds">{{ seconds }}</div>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="container">
          <div class="LCD">
            <div class="hours">{{ day }}</div>
            <div class="tab"></div>
            <div class="minutes">{{ days }}</div>
            <div class="tab"></div>
            <div class="seconds">{{ month }}</div>
            <div class="tab"></div>
            <div class="seconds">{{ year }}</div>
          </div>
        </div>
      </div>
    </div>
  </card>
</template>

<style scoped>
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
