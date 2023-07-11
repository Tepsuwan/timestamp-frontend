<template>
  <div>
    <el-table
      :data="
        dataTable.filter(
          (data) =>
            !search ||
            data.name.toLowerCase().includes(search.toLowerCase()) ||
            data.id.toLowerCase().includes(search.toLowerCase()) ||
            data.team.toLowerCase().includes(search.toLowerCase())
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
        <el-table-column prop="rownum" width="100" align="center">
        </el-table-column>
        <el-table-column prop="id" sortable label="Id" width="200">
        </el-table-column>
        <el-table-column prop="name" sortable label="Name" width="400">
        </el-table-column>
        <el-table-column prop="team" sortable label="Team" width="200">
        </el-table-column>
        <el-table-column
          prop="access"
          label="Access"
          width="200"
          align="center"
        >
          <template slot-scope="scope">
            <input
              @click="check"
              :id="dataTable[scope.$index].id"
              type="checkbox"
              v-model="dataTable[scope.$index].access"
            />
            <!-- <input
            @change="check($event)"
            type="checkbox"
            v-model="dataTable[scope.$index].access"
            v-if="dataTable[scope.$index].access == '1'"
            checked
          /> -->
          </template>
        </el-table-column>
        <el-table-column prop="workTime" label="Work Time" align="center">
          <template slot-scope="scope">
            <select
              class="custom-select"
              style="width: 200px"
              @change="onChange($event)"
              :id="dataTable[scope.$index].id"
              v-model="dataTable[scope.$index].workTime"
              placeholder="Select"
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
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      dataTable: [],
      dropdown: [],
      search: "",
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
      console.log("id:", e.target.id);
      console.log("workTime:", e.target.value);
      const headers = { "x-access-token": this.token };
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
        .get("http://192.168.5.75:5000/workTimeAll", {
          headers: {
            "x-access-token": this.token,
          },
          params: {
            team: this.team,
          },
        })
        .then((response) => {
          this.dataTable = response.data.data;
          //console.log(this.dataTable2);
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
  },
  mounted() {
    this.token = JSON.parse(localStorage.user).token;
    this.team = "SU";
    this.workTime();
    this.loadWorkShip();
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
