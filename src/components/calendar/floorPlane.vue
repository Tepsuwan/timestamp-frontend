<template>
  <div>
    <div class="row">
      <div class="col-xl-3 col-lg-5 col-md-6">
        <div id="external-events">
          <br />
          <strong> FP Shift</strong>
          <div style="float: right">
            <el-select
              v-model="value"
              placeholder="Select team shift"
              @change="teamShift($event)"
            >
              <el-option value="All">All</el-option>
              <el-option
                v-for="item in text"
                :key="item.label"
                :label="item.text"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <br />
          <br />
          <br />

          <p>
            <strong>Draggable</strong>
          </p>
          <div id="planned-tasks" class="planned-tasks">
            <div v-for="name in calendarName" :key="name.id">
              <div
                :id="name.id"
                class="fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event"
              >
                <div :id="name.id" class="fc-event-main">
                  {{ name.name }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-9 col-lg-10 col-md-12">
        <FullCalendar class="demo-app" :options="calendarOptions" ref="TEST">
          <template v-slot:eventContent="arg">
            <b>{{ arg.timeText }}</b>
            &nbsp;&nbsp;
            <b>{{ arg.event.title }}</b>
          </template>
        </FullCalendar>
      </div>
    </div>
    <!-- <div class="demo-app">
      <div class="demo-app-sidebar-section">
        <h2>All Events ({{ currentEvents.length }})</h2>
        <ul>
          <li v-for="event in currentEvents" :key="event.id">
            <b>{{ event.startStr }}</b>
            <i>{{ event.title }}</i>
            <p>{{ event }}</p>
          </li>
        </ul>
      </div>
    </div> -->
  </div>
</template>

<script>
import axios from "axios";
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import moment from "moment";

export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },

  data: function () {
    return {
      token: "",
      value: "55c871499df11",
      uid: "",
      id: "",
      team: "",
      workShiftTime: "",
      text: "",
      currentDate: "",
      currentTimeDate: "",
      calendarName: [],
      calendaLoad: [],
      currentEvents: [],
      calendarOptions: {
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin, // needed for dateClick
        ],
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        },
        initialView: "dayGridMonth",
        events: [],
        editable: false,
        droppable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        eventReceive: this.handleDrop,
      },
    };
  },

  methods: {
    setupDraggable() {
      new Draggable(document.getElementById("planned-tasks"), {
        itemSelector: ".fc-event",
        eventData: function (eventEl) {
          let events = {
            title: eventEl.innerText,
            start: "",
            end: "",
            id: eventEl.getAttribute("id"),
          };
          return events;
        },
      });
    },

    handleDrop(info) {
      /*
      info.event.setProp("backgroundColor", this.calendarBgColor);
      info.event.setProp("borderColor", this.calendarBorderColor);
      info.event.setExtendedProp(
        "calendarBorderColor",
        this.calendarBorderColor
      );
      */
      var data = {
        workShiftId: this.workShiftId,
        uid: info.event.id,
        start: info.event.startStr,
        end: info.event.startStr,
        bgColor: info.event.backgroundColor,
        borderColor: info.event.borderColor,
        team: this.team,
        createDate: this.currentTimeDate,
      };
      if (this.value != "All") {
        const headers = { "x-access-token": this.token };
        axios
          .post("http://192.168.5.75:5000/calendarInsert", data, {
            headers: headers,
          })
          .then((response) => {
            console.log("Calendar Insert: ", response);
          });
      } else {
        alert("Please Select workShift");
        axios
          .get("http://192.168.5.75:5000/loadCalendar", {
            headers: {
              "x-access-token": this.token,
            },
            params: {
              team: this.team,
              workShiftId: this.value,
            },
          })
          .then((response) => {
            this.calendaLoad = response.data.data;
            this.calendarOptions.events = this.calendaLoad;
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },

    handleEventClick(clickInfo) {
      if (
        //console.log(clickInfo.event.extendedProps.uid),
        confirm(
          `Are you sure you want to delete '${clickInfo.event.extendedProps.uid}'`
        )
      ) {
        clickInfo.event.remove();

        this.calendaId = clickInfo.event.extendedProps.calendar_id;
        const headers = { "x-access-token": this.token };
        var data = {
          idCommand: this.calendaId,
        };
        axios
          .post("http://192.168.5.75:5000/calendarDelete", data, {
            headers: headers,
          })
          .then((response) => {
            console.log("Delete event: ", response);
          });
      }
    },

    handleEvents(events) {
      this.currentEvents = events;
    },

    loadCalendar() {
      axios
        .get("http://192.168.5.75:5000/loadCalendar", {
          headers: {
            "x-access-token": this.token,
          },
          params: {
            team: this.team,
            workShiftId: this.workShiftId,
          },
        })
        .then((response) => {
          this.calendaLoad = response.data.data;
          this.calendarOptions.events = this.calendaLoad;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    calendarUser() {
      axios
        .get("http://192.168.5.75:5000/calendarUser", {
          headers: {
            "x-access-token": this.token,
          },
          params: {
            team: this.team,
          },
        })
        .then((response) => {
          this.calendarName = response.data.data;
          this.id = [];
          for (let i = 0; i < this.calendarName.length; i++) {
            let id = response.data.data[i].id;
            this.id.push(id);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    workShift() {
      axios
        .get("http://192.168.5.75:5000/loadWorkShift", {
          headers: {
            "x-access-token": this.token,
          },
        })
        .then((response) => {
          this.text = response.data.data;
          this.text2 = response.data.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    getWorkShift() {
      axios
        .get("http://192.168.5.75:5000/getWorkShift", {
          headers: {
            "x-access-token": this.token,
          },
          params: {
            workShiftId: this.workShiftId,
          },
        })
        .then((response) => {
          this.workShiftTime = response.data[0].text;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    teamShift(event) {
      this.value = event;
      console.log(this.value);
      axios
        .get("http://192.168.5.75:5000/loadCalendar", {
          headers: {
            "x-access-token": this.token,
          },
          params: {
            team: this.team,
            workShiftId: this.value,
          },
        })
        .then((response) => {
          this.calendaLoad = response.data.data;
          this.calendarOptions.events = this.calendaLoad;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  mounted() {
    this.token = JSON.parse(localStorage.user).token;
    this.uid = JSON.parse(localStorage.user).token;
    this.team = "FP";
    this.workShiftId = this.value;
    this.calendarBgColor = "rgb(0, 115, 183)";
    this.calendarBorderColor = "rgb(255, 255, 255)";
    this.setupDraggable();
    this.calendarUser();
    this.loadCalendar();
    this.workShift();
    this.getWorkShift();

    const date = new Date();
    var currentDate = moment(date);

    this.currentDate = currentDate.format(`YYYY-MM-DD`);
    this.currentTimeDate = currentDate.format(`YYYY-MM-DD h:mm:ss`);
    //console.log(this.currentDate);
  },
};
</script>
<style>
.demo-app {
  display: flex;
  min-height: 100%;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 12px;
}
.demo-app-sidebar {
  width: 300px;
  line-height: 1.5;
  background: #eaf9ff;
  border-right: 1px solid #d3e2e8;
}

.demo-app-sidebar-section {
  padding: 2em;
}

.demo-app-main {
  flex-grow: 1;
  padding: 3em;
}

#external-events {
  z-index: 2;
  top: 20px;
  left: 20px;
  width: 300px;
  padding: 0 10px;
  /* border: 1px solid #ccc;
  background: #eee; */
}

#external-events .fc-event {
  font-size: 14px;
  cursor: move;
  margin: 7px 0;
}

.fc-daygrid-event {
  color: white;
  background: rgb(14, 150, 155);
  margin: 3px 0;
}
</style>
