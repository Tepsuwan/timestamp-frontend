<template>
  <div>
    <div class="col-md-6">
      <h3>Work Shift</h3>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="start">
          <el-input
            v-model="ruleForm.start"
            placeholder="Start Ex (08:00)"
          ></el-input>
        </el-form-item>
        <el-form-item prop="stop">
          <el-input
            v-model="ruleForm.stop"
            placeholder="Stop Ex (17:00)"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="success" @click="submitForm('ruleForm')"
            >Add</el-button
          >
          <el-button @click="resetForm('ruleForm')">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table :data="dataTable" style="width: 100%">
      <el-table-column align="center" type="index" prop="index">
      </el-table-column>
      <el-table-column prop="id" label="id"> </el-table-column>
      <el-table-column prop="work_shift_start" label="start"> </el-table-column>
      <el-table-column prop="work_shift_stop" label="stop"> </el-table-column>

      <el-table-column label="Operations">
        <template slot-scope="scope">
          <el-popover placement="right" trigger="click">
            <div>
              <h3>Edit Reason</h3>
              <el-form
                :model="editForm"
                :rules="edit"
                ref="editForm"
                class="demo-editForm"
              >
                <el-form-item prop="reasonName">
                  <el-input
                    v-model="editForm.reasonName"
                    placeholder="Start Ex (08:00)"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="reasonDay">
                  <el-input
                    v-model="editForm.reasonDay"
                    placeholder="Stop Ex (08:00)"
                  ></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button
                    type="primary"
                    plain
                    @click="submitForm2('editForm')"
                    >Save</el-button
                  >
                  <el-button @click="resetForm2('editForm')">Reset</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div><br /></div>
            <p-button
              :id="dataTable[scope.$index].id"
              @click.native="reasonEdit"
              type="warning"
              outline
              size="sm"
              slot="reference"
            >
              Edit
            </p-button>
          </el-popover>
          &nbsp;
          <p-button
            :id="dataTable[scope.$index].id"
            @click.native="reasonDelete"
            type="danger"
            size="sm"
            slot="reference"
          >
            Delete
          </p-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  data() {
    return {
      dataTable: [],
      name: "",
      day: "",
      uid: "",
      dateCurrent: "",

      ruleForm: {
        start: "",
        stop: "",
      },

      rules: {
        start: [
          {
            required: true,
            message: "Please input start",
            trigger: "blur",
          },
        ],
        stop: [
          {
            required: true,
            message: "Please input stop",
            trigger: "blur",
          },
        ],
      },
      editForm: {
        reasonName: "",
        reasonDay: "",
      },

      edit: {
        reasonName: [
          {
            required: true,
            message: "Please input start",
            trigger: "blur",
          },
        ],
        reasonDay: [
          {
            required: true,
            message: "Please stop",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    reasonSetting() {
      axios
        .get("http://192.168.5.75:5000/ws", {
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("Insert workshift success.");
          console.log(this.ruleForm);

          const data = {
            start: this.ruleForm.start,
            stop: this.ruleForm.stop,
            createUid: this.uid,
            createDate: this.currentTimeDate,
          };
          //console.log(data);
          const headers = { "x-access-token": this.token };
          axios
            .post("http://192.168.5.75:5000/wsInsert", data, {
              headers: headers,
            })
            .then((response) => {
              console.log("Insert reason success ", response);
            });
          axios
            .get("http://192.168.5.75:5000/loadWorkShift", {
              headers: {
                "x-access-token": this.token,
              },
            })
            .then((response) => {
              this.dataTable = response.data.data;
              //console.log(this.dataTable);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    submitForm2(formName2) {
      this.$refs[formName2].validate((valid) => {
        if (valid) {
          alert("Insert reason success.");
          console.log(this.editForm);
          const headers = { "x-access-token": this.token };
          const data2 = {
            idCommand: this.idCommand,
            start: this.editForm.reasonName,
            stop: this.editForm.reasonDay,
            createUid: this.uid,
            createDate: this.currentTimeDate,
          };
          console.log(data2);

          axios
            .post("http://192.168.5.75:5000/wsUpdate", data2, {
              headers: headers,
            })
            .then((response) => {
              console.log("Update reason success ", response);
            });

          this.reasonSetting();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    resetForm2(formName2) {
      this.$refs[formName2].resetFields();
    },
    reasonEdit(e) {
      this.idCommand = e.target.getAttribute("id");
      //console.log(e.target.getAttribute("id"));
    },
    reasonDelete(e) {
      this.idCommad2 = e.target.getAttribute("id");
      //console.log(e.target.getAttribute("id"));

      const data3 = {
        idComand2: this.idCommad2,
      };
      //console.log(data3);
      const headers = { "x-access-token": this.token };
      axios
        .post("http://192.168.5.75:5000/wsDelete", data3, {
          headers: headers,
        })
        .then((response) => {
          console.log("Delete reason success ", response);
        });
      this.reasonSetting();
    },
  },
  mounted() {
    this.token = JSON.parse(localStorage.user).token;
    this.uid = JSON.parse(localStorage.user).id;
    //console.log(this.uid);
    const date = new Date();
    var currentDate = moment(date);
    this.currentTimeDate = currentDate.format(`YYYY-MM-DD h:mm:ss`);
    this.reasonSetting();
  },
};
</script>

<style></style>
