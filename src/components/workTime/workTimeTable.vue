<template>
  <div>
    <select
      v-for="(dropdown, index) in dropdowns"
      :key="index"
      v-model="dropdown.selected"
    >
      <option :value="null" selected disabled>Select</option>
      <option
        v-for="option in dropdown.options"
        :key="option"
        :value="option"
        v-text="option"
      ></option>
    </select>
    <select
      @change="sw($event)"
      v-for="(dd, index) in dd"
      :key="index"
      v-model="dd.selected"
    >
      <option :value="null" selected>Select</option>
      <option
        v-for="op in dd.option"
        :key="op.text"
        :value="op.text"
        v-text="op.text"
      ></option>
    </select>
    <div v-for="(item, index) in dataTable" v-bind:key="index">
      <br />
      <p>{{ index }}</p>
    </div>
    <br />
    {{ this.time }}
    <el-select v-model="value" placeholder="Select" @change="sw($event)">
      <el-option
        v-for="item in this.text"
        :key="item.value"
        :label="item.label"
        :value="item.text"
      >
      </el-option>
    </el-select>

    <div class="card">
      <div class="places-buttons">
        <div class="row d-flex justify-content-center"></div>
      </div>
      <br />
      <div class="places-buttons">
        <div class="row d-flex justify-content-center">
          <div class="col-md-2">
            <p-button type="success" round outline block>All</p-button>
          </div>
          <div class="col-md-2">
            <p-button round type="success" outline block>Photo Edit</p-button>
          </div>
          <div class="col-md-2">
            <p-button round type="success" outline block>Floorplan</p-button>
          </div>
          <div class="col-md-2">
            <p-button round type="success" outline block>Web</p-button>
          </div>
          <div class="col-md-2">
            <p-button type="success" round outline block>3D</p-button>
          </div>
          <div class="col-md-2">
            <p-button type="success" round outline block>SU</p-button>
          </div>
        </div>
      </div>
    </div>
    <br />

    <br />
    <el-table
      ref="singleTable"
      highlight-current-row
      @current-change="handleCurrentChange"
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
          <el-input v-model="search" size="mini" placeholder="Type to search" />
        </template>
        <el-table-column type="index"> </el-table-column>
        <el-table-column label="Id" sortable prop="id"> </el-table-column>
        <el-table-column label="Name" sortable prop="name"> </el-table-column>
        <el-table-column label="Team" sortable prop="team"> </el-table-column>
        <el-table-column
          label="Access"
          prop="access"
          type="selection"
          align="center"
        >
        </el-table-column>
        <el-table-column label="Work Time" align="center" prop="workTime">
          <select
            :id="dd[0]"
            :data-prop="index"
            v-for="(dd, index) in dd"
            :key="index"
            @change="sw()"
            class="form-control"
          >
            <option
              v-for="op in dd.option"
              :key="op.text"
              value="55bf108f52d8a"
              v-text="op.value"
              selected
            ></option>
          </select>
        </el-table-column>
        <el-table-column label="Work Time" align="center" prop="workTime">
        </el-table-column>
      </el-table-column>
    </el-table>
    <br />
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Name</th>
          <th scope="col">Team</th>
          <th scope="col">Access</th>
          <th scope="col">Work Time</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="index in dataTable" :key="index.rownum">
          <td>{{ index.id }}</td>
          <td>{{ index.name }}</td>
          <td>{{ index.team }}</td>
          <td>{{ index.access }}</td>
          <td>
            {{ index.workTime }}
            <select
              :id="dd[0]"
              :data-prop="index"
              v-for="(dd, index) in dd"
              :key="index"
              :v-model="null"
              class="form-control"
            >
              <option value="" selected disabled>{{ index.workTime }}</option>
              <option
                v-for="op in dd.option"
                :key="op.text"
                :value="op.value"
                v-text="op.value"
              ></option>
            </select>
            <select id="mySelect">
              <option>a</option>
              <option selected="selected">b</option>
              <option>c</option>
            </select>
          </td>
          <td>{{ index.workTime }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      dd: [
        {
          selected: null,
          option: "",
        },
      ],
      team: "",
      search: "",
      dataTable: [],
      value: "07:00-16:00",
      text: [],
    };
  },
  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },

    workTime() {
      axios
        .get("http://192.168.5.75:5000/workTimeAll", {
          params: {
            team: this.team,
          },
        })
        .then((response) => {
          this.dataTable = response.data.data;
          this.dataTable2 = response.data.data;
          //console.log(this.dataTable2);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    loadWorkShift() {
      axios
        .get("http://192.168.5.75:5000/loadWorkShift", {})
        .then((response) => {
          this.text = response.data.data;

          this.dd[0].option = this.text;
          for (let i = 0; i < this.dd.length; i++) {
            this.dd[i].option = this.text;
          }

          this.time = this.text[0].text;
          //console.log(this.time);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    sw() {
      //console.log(this.selected);
    },
  },
  mounted() {
    this.team = "FP";
    this.workTime();
    this.loadWorkShift();
  },
  components: {},
};
</script>
<style>
.VuePagination {
  text-align: center;
}

.vue-title {
  text-align: center;
  margin-bottom: 10px;
}

.vue-pagination-ad {
  text-align: center;
}

.glyphicon.glyphicon-eye-open {
  width: 16px;
  display: block;
  margin: 0 auto;
}

th:nth-child(3) {
  text-align: center;
}

.VueTables__child-row-toggler {
  width: 16px;
  height: 16px;
  line-height: 16px;
  display: block;
  margin: auto;
  text-align: center;
}

.VueTables__child-row-toggler--closed::before {
  content: "+";
}

.VueTables__child-row-toggler--open::before {
  content: "-";
}

[v-cloak] {
  display: none;
}
</style>
