<template>
  <div>
    <table class="table" width="100%">
      <thead>
        <tr>
          <th scope="col" width="15%">FROM</th>
          <th scope="col" width="15%">TO</th>
          <th scope="col" width="10%">MONTH</th>
          <th scope="col" width="30%">NAME</th>
          <th scope="col" width="15%">TEAM</th>
          <th scope="col" width="15%">OFFICE</th>
        </tr>
      </thead>
    </table>
    <table class="table">
      <thead>
        <tr>
          <th scope="col" width="15%">
            <VueDatePicker
              v-model="from"
              format="YYYY-MM-DD"
              @onChange="fromDatePicker()"
            />
          </th>
          <th scope="col" width="15%">
            <VueDatePicker
              v-model="to"
              format="YYYY-MM-DD"
              @onChange="toDatePicker()"
            />
          </th>
          <th scope="col" width="10%"><input type="checkbox" /> monthly</th>
          <th scope="col" width="30%">
            <select
              class="custom-select"
              v-model="nameSelected"
              @change="nameChange($event)"
            >
              <option
                v-for="item in name"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></option>
            </select>
          </th>
          <th scope="col" width="15%">
            <select
              class="custom-select"
              v-model="teamSelected"
              @change="teamChange($event)"
            >
              <option
                v-for="item in team"
                :key="item.value"
                :label="item.text"
                :value="item.value"
              ></option>
            </select>
          </th>
          <th scope="col" width="15%">
            <select
              class="custom-select"
              v-model="officeSelected"
              @change="officeChange($event)"
              placeholder="Select"
            >
              <option
                v-for="item in office"
                :key="item.value"
                :label="item.text"
                :value="item.value"
              ></option>
            </select>
          </th>
        </tr>
      </thead>
    </table>
    <div class="row">
      <div class="col-md-6">
        <div class="col-md-12">
          <div class="row">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <p>Summary Detail</p>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-button type="warning" v-on:click="viewAll">View all</el-button>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div>
          <button type="button" aria-hidden="true" class="close"></button>
          <el-button
            @click="onExport"
            type="success"
            style="float: right"
            id="export-file"
            >download to excel</el-button
          >
        </div>
      </div>
    </div>
    <br />
    <div v-if="staffId === ''">
      <HotTable ref="myTable" :settings="hotSettings"> </HotTable>
    </div>
    <div v-else>
      <HotTable ref="myTable2" :settings="hotSettings"> </HotTable>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import { VueDatePicker } from "@mathieustan/vue-datepicker";
import { HotTable } from "@handsontable/vue";
import "handsontable/dist/handsontable.full.css";
import "handsontable/dist/handsontable.full.css";
import Handsontable from "handsontable";

export default {
  data() {
    return {
      staffId: "",
      userId: "",
      from: "",
      to: "",
      nameSelected: "",
      teamSelected: "",
      officeSelected: "",
      name: "",
      team: "",
      office: "",
      hotSettings2: {
        colHeaders: [
          "day",
          "Name",
          "Date",
          "Start",
          "Stop",
          "Work shift",
          "Work Hours",
          "Late(m)",
          "OT(m)",
          "Absence",
          "reason",
          "note",
          "IP",
        ],

        manualRowMove: true,
        contextMenu: true,
        height: "auto",
        licenseKey: "non-commercial-and-evaluation",
        stretchH: "all",

        afterChange: (itemodificado, accionHanson) => {
          if (!this.$refs.myTable.hotInstance) return;
          const my_instance = this.$refs.myTable.hotInstance;
          if (accionHanson != "loadData") {
            if (itemodificado) {
              itemodificado.forEach((element) => {
                var fila = my_instance.getSourceData()[element[0]];
                console.log("fila", fila);

                axios
                  .post("http://192.168.5.75:5000/note", fila)
                  .then((response) => {
                    console.log("note : " + response);
                    this.$refs.myTable.table;
                  });
              });
            }
          }
        },
      },
      hotSettings: {
        colHeaders: [
          "Name",
          "Date",
          "Work shift",
          "Work hourse",
          "late(minute)",
          "OT(miniute)",
          "Absence",
        ],
        manualRowMove: true,
        contextMenu: true,
        height: "auto",
        licenseKey: "non-commercial-and-evaluation",
        stretchH: "all",
        /* afterOnCellMouseDown: function (e) {
          console.log(e.target);
        },*/
        afterOnCellMouseDown: this.clickName,
        afterChange: (itemodificado, accionHanson) => {
          if (!this.$refs.myTable.hotInstance) return;
          const my_instance = this.$refs.myTable.hotInstance;
          if (accionHanson != "loadData") {
            if (itemodificado) {
              itemodificado.forEach((element) => {
                var fila = my_instance.getSourceData()[element[0]];
                console.log("fila", fila);

                axios
                  .post("http://192.168.5.75:5000/note", fila)
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
    summarydetail() {
      axios
        .get("http://192.168.5.75:5000/loadSummary", {
          headers: {
            "x-access-token": this.token,
          },
          params: {
            staffId: this.staffId,
            from: this.from,
            to: this.to,
          },
        })
        .then((response) => {
          const data2 = response.data;
          // console.log(response.data);
          this.$refs.myTable2.hotInstance.updateSettings({
            data: data2,
            columns: [
              { data: "day", readOnly: true, className: "htCenter" },
              { data: "stampUid", readOnly: true },
              { data: "stampDate", readOnly: true },
              { data: "stampStart", readOnly: true },
              { data: "stampStop", readOnly: true },
              { data: "workShiftId", readOnly: true },
              { data: "workHours", readOnly: true, className: "htCenter" },
              { data: "stampLate", readOnly: true, className: "htCenter" },
              { data: "stampOt", readOnly: true, className: "htCenter" },
              { data: "stampBefore", readOnly: true, className: "htCenter" },
              { data: "reasonId", readOnly: true },
              { data: "stampNote", readOnly: true },
              { data: "stampIp", readOnly: true },
            ],
          });
        });
    },
    summary() {
      function strip_tags(input, allowed) {
        var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
          commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
        // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
        allowed = (
          ((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []
        ).join("");

        return input
          .replace(commentsAndPhpTags, "")
          .replace(tags, function ($0, $1) {
            return allowed.indexOf("<" + $1.toLowerCase() + ">") > -1 ? $0 : "";
          });
      }

      function safeHtmlRenderer(instance, td, row, col, prop, value) {
        var escaped = Handsontable.helper.stringify(value);
        escaped = strip_tags(escaped, "<em><b><strong><a><big>"); //be sure you only allow certain HTML tags to avoid XSS threats (you should also remove unwanted HTML attributes)
        td.innerHTML = escaped;

        return td;
      }
      axios
        .get("http://192.168.5.75:5000/report", {
          headers: {
            "x-access-token": this.token,
          },
          params: {
            uid: this.uid,
            from: this.from,
            to: this.to,
            team: this.teamSelected,
            office: this.officeSelected,
            name: this.nameSelected,
          },
        })
        .then((response) => {
          const data = response.data;
          //console.log(response.data);
          this.$refs.myTable.hotInstance.updateSettings({
            data: data,
            columns: [
              { data: "stampUid", readOnly: true, renderer: safeHtmlRenderer },
              { data: "stampDate", readOnly: true, className: "htCenter" },
              { data: "workShiftId", readOnly: true, className: "htCenter" },
              { data: "workHours", readOnly: true, className: "htCenter" },
              { data: "stampLate", readOnly: true, className: "htCenter" },
              { data: "stampOt", readOnly: true, className: "htCenter" },
              { data: "stampBefore", readOnly: true, className: "htCenter" },
            ],
          });
        });
    },
    shiftDetial() {
      console.log("PP");
    },
    getName() {
      axios
        .get("http://192.168.5.75:5000/staff", {
          headers: {
            "x-access-token": this.token,
          },
        })
        .then((response) => {
          this.name = response.data;
          //console.log(this.name);
        });
    },
    getTeam() {
      axios
        .get("http://192.168.5.75:5000/team", {
          headers: {
            "x-access-token": this.token,
          },
        })
        .then((response) => {
          this.team = response.data;
          //console.log("Dropdown team", this.team);
        });
    },
    getOffice() {
      axios
        .get("http://192.168.5.75:5000/office", {
          headers: {
            "x-access-token": this.token,
          },
        })
        .then((response) => {
          this.office = response.data;
          //console.log(this.office);
        });
    },
    fromDatePicker() {
      this.summary();
      //console.log(this.from);
      console.log("Set from datePicker table", this.from);
    },
    toDatePicker() {
      this.summary();
      //console.log(this.to);
      console.log("Set to datePicker table", this.to);
    },
    nameChange(e) {
      this.summary();
      this.nameSelected = e.target.value;
      console.log("id:", e.target.value);
    },
    teamChange(e) {
      this.summary();
      this.teamSelected = e.target.value;
      console.log("Set team to table:", this.teamSelected);
    },
    officeChange(e) {
      this.summary();
      this.officeSelected = e.target.value;
      console.log("office:", e.target.value);
    },
    clickName(e) {
      this.staffId = e.target.id;
      console.log(this.staffId);

      axios
        .get("http://192.168.5.75:5000/loadSummary", {
          headers: {
            "x-access-token": this.token,
          },
          params: {
            staffId: this.staffId,
            from: this.from,
            to: this.to,
          },
        })
        .then((response) => {
          const data2 = response.data;
          // console.log(response.data);
          this.$refs.myTable2.hotInstance.updateSettings({
            data: data2,
            columns: [
              { data: "day", readOnly: true, className: "htCenter" },
              { data: "stampUid", readOnly: true },
              { data: "stampDate", readOnly: true },
              { data: "stampStart", readOnly: true },
              { data: "stampStop", readOnly: true },
              { data: "workShiftId", readOnly: true },
              { data: "workHours", readOnly: true, className: "htCenter" },
              { data: "stampLate", readOnly: true, className: "htCenter" },
              { data: "stampOt", readOnly: true, className: "htCenter" },
              { data: "stampBefore", readOnly: true, className: "htCenter" },
              { data: "reasonId", readOnly: true },
              { data: "stampNote", readOnly: true },
              { data: "stampIp", readOnly: true },
            ],
          });
        });
    },
    viewAll() {
      this.team = "";
      this.staffId = "";
      this.summary();
      //console.log("loadSummary");
    },
  },
  mounted() {
    this.token = JSON.parse(localStorage.user).token;
    this.staffId = "";
    //this.userId = "00012";
    const date = new Date();
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var year = date.getFullYear();
    var startDate = moment([year, month - 1]);
    var endDate = moment(startDate).endOf("month");
    this.from = startDate.format(`YYYY-MM-DD`);
    this.to = endDate.format(`YYYY-MM-DD`);
    //this.from = "2023-03-01";
    //this.to = "2023-03-31";

    this.getName();
    this.getTeam();
    this.getOffice();
    this.summary();
    //this.summarydetail();
  },
  components: {
    VueDatePicker,
    HotTable,
  },
};
</script>

<style>
.custom-select {
  position: relative;
  font-family: Arial;
}

.custom-select select {
  display: none; /*hide original SELECT element: */
}

.select-selected {
  background-color: DodgerBlue;
}

/* Style the arrow inside the select element: */
.select-selected:after {
  position: absolute;
  content: "";
  top: 14px;
  right: 10px;
  width: 0;
  height: 0;
  border: 6px solid transparent;
  border-color: #fff transparent transparent transparent;
}

/* Point the arrow upwards when the select box is open (active): */
.select-selected.select-arrow-active:after {
  border-color: transparent transparent #fff transparent;
  top: 7px;
}

/* style the items (options), including the selected item: */
.select-items div,
.select-selected {
  color: #ffffff;
  padding: 8px 16px;
  border: 1px solid transparent;
  border-color: transparent transparent rgba(0, 0, 0, 0.1) transparent;
  cursor: pointer;
}

/* Style items (options): */
.select-items {
  position: absolute;
  background-color: DodgerBlue;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 99;
}

/* Hide the items when the select box is closed: */
.select-hide {
  display: none;
}

.select-items div:hover,
.same-as-selected {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
