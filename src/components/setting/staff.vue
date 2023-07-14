<template>
  <div>
    <div class="col-md-6"><h3>Staff setting</h3></div>
    <el-table
      :data="
        dataTable.filter(
          (data) =>
            !search ||
            data.Name.toLowerCase().includes(search.toLowerCase()) ||
            data.id.toLowerCase().includes(search.toLowerCase()) ||
            data.Team.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="large"
            placeholder="Type to search"
          />
        </template>
        <el-table-column type="index" align="center"> </el-table-column>
        <el-table-column
          prop="id"
          sortable
          label="Id"
          align="center"
          width="200"
        >
        </el-table-column>
        <el-table-column prop="Name" sortable label="Name" width="400">
        </el-table-column>
        <el-table-column
          prop="Team"
          align="center"
          sortable
          label="Team"
          width="200"
        >
        </el-table-column>

        <el-table-column
          prop="work_shift_id"
          label="Work Time"
          align="center"
          width="300"
        >
          <template slot-scope="scope">
            <pre> {{ dropdown }}</pre>
            {{ dataTable[scope.$index].work_shift_id }}
            <select
              class="custom-select"
              @change="onChange($event)"
              :id="dataTable[scope.$index].id"
              v-model="dataTable[scope.$index].work_shift_id"
            >
              <option
                v-for="item in dropdown"
                :key="item.value"
                :value="item.value"
                :label="item.text"
              ></option>
            </select>
          </template>
        </el-table-column>

        <el-table-column prop="id" label="Extra" align="center">
          <template slot-scope="scope">
            <el-popover placement="right" trigger="click">
              <p-button
                :id="dataTable[scope.$index].id"
                @click.native="addExtra"
                slot="reference"
                type="info"
                outline
              >
                Add extra
              </p-button>
              <div>
                <h3>Extra</h3>
                <VueDatePicker
                  v-model="date"
                  format="YYYY-MM-DD"
                  @onChange="fromDatePicker()"
                />
                <div><br /></div>
                <p>Days</p>
                <select
                  class="custom-select"
                  v-model="scope.$index"
                  @change="daysChang($event)"
                >
                  <option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></option>
                </select>

                <div><br /></div>
                <p>Work shift</p>
                <select
                  class="custom-select"
                  v-model="scope.$index"
                  @change="workshiftChange($event)"
                >
                  <option
                    v-for="item in dropdown"
                    :key="item.value"
                    :label="item.text"
                    :value="item.value"
                  ></option>
                </select>

                <div><br /></div>
                <p-button
                  @click.native="extraInsert"
                  type="success"
                  :id="dataTable[scope.$index].id"
                >
                  Submit
                </p-button>
                <div><br /></div>
                <el-table :data="extraLoad" style="width: 100%">
                  <el-table-column prop="days" label="Day" width="180">
                  </el-table-column>
                  <el-table-column prop="date" label="Date" width="180">
                  </el-table-column>
                  <el-table-column prop="work_shift" label="Time" width="250">
                  </el-table-column>
                  <el-table-column label="Operations" width="180">
                    <template slot-scope="scope">
                      <p-button
                        :uid="dataTable[scope.$index].id"
                        :id="extraLoad[scope.$index].id"
                        @click.native="extraEdit"
                        type="warning"
                        size="sm"
                        outline
                      >
                        Edit</p-button
                      >&nbsp;
                      <p-button
                        :uid="dataTable[scope.$index].id"
                        :id="extraLoad[scope.$index].id"
                        @click.native="extraDelete"
                        type="danger"
                        size="sm"
                      >
                        Delete
                      </p-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column
          prop="is_operator"
          label="Access"
          width="200"
          align="center"
        >
          <template slot-scope="scope">
            <input
              @click="check"
              :id="dataTable[scope.$index].id"
              type="checkbox"
              v-model="dataTable[scope.$index].is_operator"
            />
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
import { VueDatePicker } from "@mathieustan/vue-datepicker";
import moment from "moment";
export default {
  data() {
    return {
      date: "Select Date",
      visible: false,
      dataTable: [],
      dropdown: [],
      search: "",
      extraLoad: [],
      options: [
        {
          value: "Monday",
          label: "Monday",
        },
        {
          value: "Tuesday",
          label: "Tuesday",
        },
        {
          value: "Wednesday",
          label: "Wednesday",
        },
        {
          value: "Thursday",
          label: "Thursday",
        },
        {
          value: "Friday",
          label: "Friday",
        },
        {
          value: "Saturday",
          label: "Saturday",
        },
        {
          value: "Sunday",
          label: "Sunday",
        },
      ],
      value1: [],
      day: "",
      workshift: "",
      dateExtra: "",
    };
  },
  methods: {
    check(e) {
      const headers = { "x-access-token": this.token };
      const data = {
        id: e.target.id,
        access: e.target.checked,
      };
      axios
        .post("http://192.168.5.75:5000/updateWorkTime", data, {
          headers: headers,
        })
        .then((response) => {
          console.log("update: ", response);
        });
    },
    onChange(e) {
      const headers = { "x-access-token": this.token };
      console.log("id:", e.target.id);
      console.log("workTime:", e.target.value);

      const data = {
        id: e.target.id,
        workTime: e.target.value,
      };
      axios
        .post("http://192.168.5.75:5000/updateWorkTime", data, {
          headers: headers,
        })
        .then((response) => {
          console.log("update: ", response);
        });
    },
    workTime() {
      axios
        .get("http://192.168.5.75:5000/employee", {
          headers: {
            "x-access-token": this.token,
          },
        })
        .then((response) => {
          this.dataTable = response.data.data;
          //console.log(this.dataTable);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    loadWorkShip() {
      axios
        .get("http://192.168.5.75:5000/loadWorkshift", {
          headers: {
            "x-access-token": this.token,
          },
        })
        .then((response) => {
          this.dropdown = response.data.data;
          //console.log(this.dropdown);
        })
        .catch(function (err) {
          console.log(err);
        });
    },

    addExtra(e) {
      this.uid = e.target.id;

      axios
        .get("http://192.168.5.75:5000/extraLoad", {
          headers: {
            "x-access-token": this.token,
          },
          params: {
            uid: this.uid,
          },
        })
        .then((response) => {
          this.extraLoad = response.data;
          //console.log(this.extraLoad);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    extraInsert(e) {
      var uid = e.target.id;

      //console.log("uid:", uid);
      const headers = { "x-access-token": this.token };
      const data = {
        uid: uid,
        day: this.day,
        workshift: this.workshift,
        date: this.dateExtra,
        status: "1",
        updateDate: this.currentTimeDate,
      };
      axios
        .post("http://192.168.5.75:5000/extraInsert", data, {
          headers: headers,
        })
        .then((response) => {
          console.log("Insert: ", response);
        });
      axios
        .get("http://192.168.5.75:5000/extraLoad", {
          headers: {
            "x-access-token": this.token,
          },
          params: {
            uid: uid,
          },
        })
        .then((response) => {
          this.extraLoad = response.data;
          //console.log(this.extraLoad);
        })
        .catch(function (err) {
          console.log(err);
        });
      axios
        .get("http://192.168.5.75:5000/extraLoad", {
          headers: {
            "x-access-token": this.token,
          },
          params: {
            uid: this.uid,
          },
        })
        .then((response) => {
          this.extraLoad = response.data;
          //console.log(this.extraLoad);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    extraEdit(e) {
      //console.log(e.target.id);
      var idCommand = e.target.id;
      var uid = e.target.getAttribute("uid");
      const headers = { "x-access-token": this.token };
      const data = {
        uid: uid,
        idCommand: idCommand,
        day: this.day,
        workshift: this.workshift,
        date: this.dateExtra,
        updateDate: this.currentTimeDate,
      };
      axios
        .post("http://192.168.5.75:5000/extraUpdate", data, {
          headers: headers,
        })
        .then((response) => {
          console.log("Update: ", response);
        });
    },

    extraDelete(e) {
      //console.log(e.target.getAttribute("uid"));
      var idCommand = e.target.id;
      //var uid = e.target.getAttribute("uid");
      const headers = { "x-access-token": this.token };
      const data = {
        idCommand: idCommand,
      };
      //console.log(this.uid);
      axios
        .post("http://192.168.5.75:5000/extraDelete", data, {
          headers: headers,
        })
        .then((response) => {
          console.log("Delete: ", response);
        });
      axios
        .get("http://192.168.5.75:5000/extraLoad", {
          headers: {
            "x-access-token": this.token,
          },
          params: {
            uid: this.uid,
          },
        })
        .then((response) => {
          this.extraLoad = response.data;
          //console.log(this.extraLoad);
        })
        .catch(function (err) {
          console.log(err);
        });
    },

    daysChang(e) {
      //console.log(e.target.value);
      this.day = e.target.value;
    },
    workshiftChange(e) {
      //console.log(e.target.value);
      this.workshift = e.target.value;
    },
  },
  mounted() {
    this.token = JSON.parse(localStorage.user).token;
    this.workTime();
    this.loadWorkShip();
    const date = new Date();
    var currentDate = moment(date);
    this.currentTimeDate = currentDate.format(`YYYY-MM-DD h:mm:ss`);
  },
  components: {
    VueDatePicker,
  },
};
</script>

<style></style>
