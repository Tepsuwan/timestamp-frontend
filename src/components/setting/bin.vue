<template>
  <div>
    <div class="col-md-6"><h3>Bin setting</h3></div>
    <el-table
      :data="
        tableData.filter(
          (data) =>
            !search ||
            data.stamp_date.toLowerCase().includes(search.toLowerCase()) ||
            data.stamp_note.toLowerCase().includes(search.toLowerCase()) ||
            data.stamp_start.toLowerCase().includes(search.toLowerCase()) ||
            data.stamp_start_ip.toLowerCase().includes(search.toLowerCase()) ||
            data.stamp_stop.toLowerCase().includes(search.toLowerCase()) ||
            data.stamp_uid.toLowerCase().includes(search.toLowerCase()) ||
            data.stamp_stop_ip.toLowerCase().includes(search.toLowerCase())
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
        <el-table-column prop="stamp_date" sortable label="Date" align="center">
        </el-table-column>
        <el-table-column prop="stamp_uid" sortable label="Name">
        </el-table-column>
        <el-table-column prop="stamp_start" sortable label="Start">
        </el-table-column>
        <el-table-column prop="stamp_stop" sortable label="Stop">
        </el-table-column>
        <el-table-column prop="reason_id" sortable label="Reason">
        </el-table-column>
        <el-table-column prop="stamp_note" sortable label="Note">
        </el-table-column>
        <el-table-column prop="stamp_start_ip" sortable label="Start IP">
        </el-table-column>
        <el-table-column prop="stamp_stop_ip" sortable label="Stop IP">
        </el-table-column>
        <el-table-column align="center">
          <template slot-scope="scope">
            <input @click="check" type="checkbox" />
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
      tableData: [],
      dataTable: [],
      search: "",
    };
  },
  methods: {
    check(e) {
      e;
    },

    binLoad() {
      axios
        .get("http://192.168.5.75:5000/binLoad", {})
        .then((response) => {
          this.tableData = response.data;
          //console.log(this.dropdown);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
  },
  mounted() {
    this.binLoad();
  },
};
</script>

<style></style>
