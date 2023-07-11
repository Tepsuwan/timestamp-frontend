<template>
  <div>
    <div class="row d-flex justify-content-center">
      <h5>Next day</h5>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <el-select v-model="value" placeholder="Please select">
        <el-options
          v-for="item in this.text"
          :key="item.text"
          :label="item.text"
          :value="item.text"
        >
        </el-options>
      </el-select>
    </div>
  </div>
</template>

<script>
//import axios from "axios";

export default {
  data() {
    return {
      text: "",
      token: "",
    };
  },
  methods: {
    WorkShift() {
      // axios
      //   .get("http://192.168.5.75:5000/loadWorkShift", {
      //     headers: {
      //       "x-access-token": this.token,
      //     },
      //   })
      //   .then((response) => {
      //     this.text = response.data.data;
      //     //console.log(this.text);
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });
    },
  },
  mounted() {
    this.token = JSON.parse(localStorage.user).token;
    console.log(this.token);
    this.WorkShift();
  },
  components: {},
};
</script>

<style></style>
