<template>
  <div>
    <div class="row d-flex justify-content-center">
      <h5>Team shift</h5>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <el-select v-model="value" placeholder="Select edit Shift">
        <el-option
          v-for="item in this.text"
          :key="item.text"
          :label="item.text"
          :value="item.text"
        >
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      text: "",
      uid: "",
    };
  },
  methods: {
    WorkShift() {
      this.uid = JSON.parse(localStorage.user).id;
      this.token = JSON.parse(localStorage.user).token;
      //console.log("sdads");
      // axios
      //   .get("http://192.168.5.75:5000/loadWorkShift", {
      //     headers: {
      //       // "x-access-token": this.token,
      //       "x-access-token":
      //         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODg2MDY1NTcsImV4cCI6MTY4ODYxMDE1N30.fEAbzfxWWmHjPT90bhhVc9ao7vWJb9KE5NPYx1_z8Bc",
      //     },
      //     params: {
      //       uid: this.uid,
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
    //this.uid = "00012";
    this.WorkShift();
    //console.log(this.uid);
  },
  components: {},
};
</script>

<style></style>
