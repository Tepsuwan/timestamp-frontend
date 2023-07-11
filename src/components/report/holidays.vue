<template>
  <div>
    <card>
      <template slot="header">
        <h3 class="card-title">Name</h3>
        <select
          class="custom-select"
          v-model="select"
          @change="onChange($event)"
          placeholder="Select"
        >
          <option
            v-for="item in staff"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></option>
        </select>
        <br /><br />
        <div v-if="select != ''">
          <HotTable ref="myTable" :settings="hotSettings"> </HotTable>
        </div> </template
    ></card>
  </div>
</template>

<script>
import { HotTable } from "@handsontable/vue";
import "handsontable/dist/handsontable.full.css";
import axios from "axios";
import "handsontable/dist/handsontable.full.css";
export default {
  data() {
    return {
      select: "",
      staff: "",
      holidays: "",
      uid: "",
      year: "",

      hotSettings: {
        colHeaders: ["Holidays Name", "Holiday", "used", "Holiday remain"],
        rowHeaders: true,
        manualRowMove: true,
        contextMenu: true,
        height: "auto",
        licenseKey: "non-commercial-and-evaluation",
        stretchH: "all",
      },
    };
  },
  methods: {
    getStaff() {
      axios
        .get("http://192.168.5.75:5000/staff", {
          headers: {
            "x-access-token": this.token,
          },
        })
        .then((response) => {
          this.staff = response.data;
          //console.log(this.staff);
        });
    },
    onChange(event) {
      this.uid = event.target.value;
      //console.log(event.target.value);

      //console.log(this.uid);
      this.getStaff();

      axios
        .get("http://192.168.5.75:5000/holidaysReport", {
          headers: {
            "x-access-token": this.token,
          },
          params: {
            uid: this.uid,
            year: this.year,
          },
        })
        .then((response) => {
          this.holidays = response.data;
          //console.log(this.holidays);
          const data = response.data.data;
          //console.log(response.data);
          this.$refs.myTable.hotInstance.updateSettings({
            data: data,
            columns: [
              { data: "reason_name", readOnly: true },
              { data: "reason_day", readOnly: true, className: "htCenter" },
              { data: "reason_use", readOnly: true, className: "htCenter" },
              { data: "reason_balance", readOnly: true, className: "htCenter" },
            ],
          });
        });
    },
  },
  mounted() {
    this.token = JSON.parse(localStorage.user).token;
    const date = new Date();
    this.year = date.getFullYear();

    this.getStaff();
  },
  components: {
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
