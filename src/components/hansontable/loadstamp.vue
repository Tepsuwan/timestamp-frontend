<template>
  <div>
    <br />
    <div class="places-buttons">
      <div class="row d-flex justify-content-center">
        <div class="col-md-6">
          <p-button
            type="success"
            round
            block
            @click.native="buttonStart('top', 'center')"
            >Start</p-button
          >
        </div>
        <div class="col-md-6">
          <p-button
            round
            type="danger"
            block
            @click.native="buttonStop('top', 'center')"
            >Stop</p-button
          >
        </div>
      </div>
    </div>
    <br />
    <card>
      <paper-table :data="users" type="hover">
        <template slot="columns">
          <th>NAME</th>
          <th>WORK SHIFT</th>
          <th>TEAM</th>
          <th>EMAIL</th>
          <th>OFFICE</th>
        </template>
        <template slot-scope="{ row }">
          <td>{{ row.name }}</td>
          <td>{{ row.workshift }}</td>
          <td>{{ row.team }}</td>
          <td>{{ row.email }}</td>
          <td>{{ row.office }}</td>
        </template>
      </paper-table>
    </card>
    <br />
    <div class="places-buttons">
      <div class="row d-flex justify-content-center"></div>
      <div class="row d-flex justify-content-center">
        <div class="col-md-3">
          <div class="row">
            <p>From &nbsp;</p>
            <VueDatePicker
              v-model="from.start"
              @onChange="startDatePicker()"
              format="YYYY-MM-DD"
            />
          </div>
        </div>
        <div class="col-md-3">
          <div class="row">
            <p>to &nbsp;</p>
            <VueDatePicker
              v-model="from.end"
              @onChange="startDatePicker()"
              format="YYYY-MM-DD"
            />
          </div>
        </div>
        <div class="col-md-3">
          <input
            type="radio"
            id="yes"
            value="today"
            v-model="picked"
            @click="toDay()"
          />
          <label for="yes">Today</label>

          <a href="">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
          <a href="">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
          <input
            type="radio"
            id="no"
            value="monthly"
            v-model="picked"
            @click="monthly()"
          />
          <label for="no">Monthly</label>
        </div>
      </div>
    </div>
    <br />
    <div class="col-md-5">
      <input
        id="1"
        type="radio"
        name="tab"
        v-model="activeTabs"
        value="1"
        v-on:change="Ch"
      /><label for="yes">{{ this.name }}</label>

      <a href="">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
      <input
        id="2"
        type="radio"
        name="tab"
        v-model="activeTabs"
        value="2"
        v-on:change="Ch"
      /><label for="yes">Online</label>

      <a href="">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
      <input
        id="3"
        type="radio"
        name="tab"
        v-model="activeTabs"
        value="3"
        v-on:change="Ch"
      /><label for="yes">Holidays</label>
    </div>

    <div v-if="activeTabs == 1">
      <HotTable ref="myTable" :settings="hotSettings"></HotTable>
    </div>
    <div v-if="activeTabs == 2">
      <loadOnline></loadOnline>
    </div>
    <div v-if="activeTabs == 3"><LoadHolidays></LoadHolidays></div>
    <!-- <el-button-group>
      <el-button v-on:click="show = 1">11111</el-button>
      <el-button v-on:click="show = 2">22222</el-button>
      <el-button v-on:click="show = 3">33333</el-button>
    </el-button-group>
    <div v-if="show == 1">
      <HotTable ref="myTable" :settings="hotSettings"></HotTable>
    </div>
    <div v-if="show == 2"><loadOnline></loadOnline></div>
    <div v-if="show == 3"><LoadHolidays></LoadHolidays></div>-->
  </div>
</template>

<script>
import Stamp from "./stamp.vue";
import LoadOnline from "../../components/hansontable/loadOnline.vue";
import LoadHolidays from "../../components/hansontable/loadHolidays.vue";
import NotificationTemplate from "../../pages/Notifications/NotificationTemplate.vue";
import { VueDatePicker } from "@mathieustan/vue-datepicker";
import "@mathieustan/vue-datepicker/dist/vue-datepicker.min.css";
import { defineComponent } from "vue";
import { HotTable } from "@handsontable/vue";
import "handsontable/dist/handsontable.full.css";
import axios from "axios";
import Handsontable from "handsontable";
import { PaperTable } from "@/components";
import moment from "moment";

function firstRowRenderer(instance, td) {
  Handsontable.renderers.TextRenderer.apply(this, arguments);
  td.style.fontWeight = "bold";
  td.style.color = "red";
  td.style.background = "#CEC";
}

function negativeValueRenderer() {
  Handsontable.renderers.TextRenderer.apply(this, arguments);
}
Handsontable.renderers.registerRenderer(
  "negativeValueRenderer",
  negativeValueRenderer
);
Handsontable.renderers.registerRenderer(
  "customStylesRenderer",
  (hotInstance, TD, ...rest) => {
    Handsontable.renderers.TextRenderer(hotInstance, TD, ...rest);

    TD.style.fontWeight = "bold";
    TD.style.color = "green";
    TD.style.background = "#d7f1e1";
  }
);

const ExampleComponent = defineComponent({
  data() {
    return {
      from: {
        start: "",
        end: "",
        uid: "",
      },
      token: "",
      ipAddress: null,
      show: 1,
      activeTabs: 1,
      users: [],
      name: "",
      isHidden: true,
      picked: null,
      data: [],
      type: ["", "info", "success", "warning", "danger"],
      notifications: {
        topCenter: false,
      },
      hotSettings: {
        colHeaders: ["Day", "Date", "Start", "Stop", "Reason", "Note"],
        rowHeaders: true,
        manualRowMove: true,
        contextMenu: true,
        height: "auto",
        licenseKey: "non-commercial-and-evaluation",
        stretchH: "all",
        cell: [],

        afterChange: (itemodificado, accionHanson) => {
          if (!this.$refs.myTable.hotInstance) return;
          const my_instance = this.$refs.myTable.hotInstance;
          if (accionHanson != "loadData") {
            if (itemodificado) {
              itemodificado.forEach((element) => {
                const headers = { "x-access-token": this.token };
                var fila = my_instance.getSourceData()[element[0]];
                console.log("fila", fila);

                axios
                  .post("http://192.168.5.75:5000/note", fila, {
                    headers: headers,
                  })
                  .then((response) => {
                    console.log("note : " + response);
                    this.$refs.myTable.table;
                  });
              });
            }
          }
        },
      },
    };
  },
  methods: {
    handleCommand(show) {
      this.show = show;
      //console.log(command);
      this.getDataAxios();
    },
    Ch(e) {
      if (e.target.value == 1) {
        this.getDataAxios();
      }
    },
    getDataAxios() {
      axios
        .get("http://192.168.5.75:5000/loadStamps", {
          headers: {
            "x-access-token": this.token,
          },
          params: {
            uid: this.from.uid,
            start: this.from.start,
            end: this.from.end,
          },
        })

        .then((response) => {
          //const data = response.data.data;
          const data = response.data;
          //console.log(data);
          this.$refs.myTable.hotInstance.updateSettings({
            data: data,
            hiddenColumns: {
              columns: [0],
              indicators: true,
            },
            cells(row) {
              const cellProperties = {};
              if (this.instance.getDataAtCell(row, 0) === "Sunday") {
                cellProperties.renderer = firstRowRenderer;
              } else if (this.instance.getDataAtCell(row, 0) === "Saturday") {
                cellProperties.renderer = firstRowRenderer;
              }
              return cellProperties;
            },

            columns: [
              { data: "stamp_day", readOnly: true, className: "htCenter" },
              { data: "stamp_date", readOnly: true, className: "htCenter" },
              { data: "stamp_start", readOnly: true, className: "htCenter" },
              { data: "stamp_stop", readOnly: true, className: "htCenter" },
              {
                data: "reason_id",
                className: "htCenter",
                type: "dropdown",

                source: function (query, process) {
                  console.log("Query : ", query);
                  console.log("process : ", process);
                  this.token = JSON.parse(localStorage.user).token;
                  axios
                    .get("http://192.168.5.75:5000/reasonname", {
                      headers: {
                        "x-access-token": this.token,
                        // "x-access-token":
                        //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODg0NjA5NDksImV4cCI6MTY4ODQ2NDU0OX0.cSFRozeKUX438utz8fkVnqWLdFohfUs4zMLxIjaYAho",
                      },
                    })
                    .then((response) => {
                      process(response.data);
                      console.log(response.data);
                    });
                },
              },
              { data: "stamp_note", className: "htCenter" },
            ],
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    toDay() {
      this.from.start = this.currentDate;
      this.from.end = this.currentDate;
      this.getDataAxios();
      console.log("Set toDay table");
    },
    monthly() {
      this.from.start = this.from.s;
      this.from.end = this.from.e;
      this.getDataAxios();
      console.log("Set Monthly table");
    },
    startDatePicker() {
      this.getDataAxios();
      console.log("Set start datePicker table");
    },
    endDatePicker() {
      this.getDataAxios();
      console.log("Set stop datePicker table");
    },
    buttonStart(verticalAlign, horizontalAlign) {
      this.$notify({
        component: NotificationTemplate,

        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: this.type[2],
      });
      const headers = { "x-access-token": this.token };
      const data = {
        uid: this.from.uid,
        stamp_start_ip: "192.168.5.75",
        stamp_note: "",
        d: this.currentDate,
        stamp_start: this.currentDate,
        action: "start",
      };
      //this.token = JSON.parse(localStorage.user).token;
      axios
        .post("http://192.168.5.75:5000/start", data, { headers: headers })
        .then((response) => {
          console.log("start : ", response);
          this.getDataAxios();
        });
    },
    buttonStop(verticalAlign, horizontalAlign) {
      this.$notify({
        component: NotificationTemplate,
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: this.type[4],
      });
      const headers = { "x-access-token": this.token };
      const data = {
        uid: this.from.uid,
        stamp_stop_ip: "192.168.5.75",
        d: this.currentDate,
        timeNow: this.currentTimeDate,
      };
      axios
        .post("http://192.168.5.75:5000/stop", data, { headers: headers })
        .then((response) => {
          console.log("stop: ", response);
          this.getDataAxios();
        });
    },
    openCity(evt, cityName) {
      var i, tabcontent, tablinks;
      tabcontent = document.getElementsByClassName("tabcontent");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }
      tablinks = document.getElementsByClassName("tablinks");
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }
      document.getElementById(cityName).style.display = "block";
      evt.currentTarget.className += " active";
    },
    userData() {
      axios
        .get("http://192.168.5.75:5000/userDatas", {
          headers: {
            "x-access-token": this.token,
          },
          params: {
            uid: this.from.uid,
          },
        })
        .then((response) => {
          this.users = response.data;
          this.name = response.data.data.name;
          //console.log("user : ", this.users);
          //console.log("userName:" + this.name);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    ip() {
      axios
        .get("https://api.ipify.org?format=json")
        .then((response) => {
          this.ipAddress = response.data.ip;
          //console.log(this.ipAddress);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    const date = new Date();
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let year = date.getFullYear();
    var currentDate = moment(date);
    var startDate = moment([year, month - 1]);
    var endDate = moment(startDate).endOf("month");

    this.currentDate = currentDate.format(`YYYY-MM-DD`);
    this.currentTimeDate = currentDate.format(`YYYY-MM-DD h:mm:ss`);
    this.from.s = startDate.format(`YYYY-MM-DD`);
    this.from.e = endDate.format(`YYYY-MM-DD`);
    this.from.start = startDate.format(`YYYY-MM-DD`);
    this.from.end = endDate.format(`YYYY-MM-DD`);

    this.from.uid = JSON.parse(localStorage.user).id;
    this.token = JSON.parse(localStorage.user).token;

    this.getDataAxios();
    this.userData();
    // this.ip();
    //console.log(this.token);
  },
  components: {
    HotTable,
    VueDatePicker,
    PaperTable,
    LoadOnline,
    LoadHolidays,
  },
});

export default ExampleComponent;
</script>

<style></style>
