<template>
  <div>
    <div class="col-md-6">
      <h3>Reason</h3>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item prop="name">
          <el-input
            v-model="ruleForm.name"
            placeholder="Please input name"
          ></el-input>
        </el-form-item>
        <el-form-item prop="dayNumber">
          <el-input
            v-model="ruleForm.dayNumber"
            placeholder="Please input number of day"
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
      <el-table-column type="index" align="center"> </el-table-column>
      <el-table-column prop="id" label="Id"> </el-table-column>
      <el-table-column prop="reason_name" label="Name"> </el-table-column>
      <el-table-column prop="reason_day" label="Day"> </el-table-column>
      <el-table-column label="Operations">
        <template slot-scope="scope">
          <!--  -->
          <el-popover placement="left" trigger="click">
            <div>
              <h3>Edit Reason</h3>
              <el-form
                :model="editForm"
                :rules="edit"
                ref="editForm"
                class="demo-editForm"
              >
                <el-form-item>
                  <input
                    type="text"
                    style="width: 400px"
                    :value="dataTable[scope.$index].reason_name"
                    @input="reasonNameInput"
                  />
                </el-form-item>

                <el-form-item>
                  <el-input
                    v-model="editForm.reasonDay"
                    :value="dataTable[scope.$index].reason_day"
                    style="width: 400px"
                    @input="reasonDayInput"
                  ></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button
                    type="primary"
                    plain
                    @click="submitForm2('editForm')"
                    size="small"
                    style="width: 100px"
                    >Save</el-button
                  >
                </el-form-item>
              </el-form>
            </div>
            <div><br /></div>
            <p-button
              :id="dataTable[scope.$index].id"
              :reasonName="dataTable[scope.$index].reason_name"
              :reasonDay="dataTable[scope.$index].reason_day"
              @click.native="reasonEdit"
              type="warning"
              outline
              size="sm"
              slot="reference"
            >
              Edit
            </p-button>
          </el-popover>
          <!--  -->
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
      idCommand: "",
      idCommand2: "",
      uid: "",
      dateCurrent: "",
      centerDialogVisible: false,
      dataTable: [],
      name: "",
      day: "",

      ruleForm: {
        name: "",
        dayNumber: "",
      },

      rules: {
        name: [
          {
            required: true,
            message: "Please input name",
            trigger: "blur",
          },
        ],
        dayNumber: [
          {
            required: true,
            message: "Please input day number",
            trigger: "blur",
          },
        ],
      },

      editForm: {
        reasonName: "",
        reasonDay: "",
      },
    };
  },
  methods: {
    reasonSetting() {
      axios
        .get("http://192.168.5.75:5000/reasonSetting", {
          headers: {
            "x-access-token": this.token,
          },
        })
        .then((response) => {
          this.dataTable = response.data;
          //console.log(this.dataTable);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("Insert reason success.");
          console.log(this.ruleForm);

          const data = {
            reasonName: this.ruleForm.name,
            reasonDay: this.ruleForm.dayNumber,
            createUid: this.uid,
            createDate: this.currentTimeDate,
          };
          //console.log(data);
          const headers = { "x-access-token": this.token };
          axios
            .post("http://192.168.5.75:5000/reasonInsert", data, {
              headers: headers,
            })
            .then((response) => {
              console.log("Insert reason success ", response);
            });

          this.reasonSetting();
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
            reasonName: this.editForm.reasonName,
            reasonDay: this.editForm.reasonDay,
            createUid: this.uid,
            createDate: this.currentTimeDate,
          };
          console.log(data2);

          axios
            .post("http://192.168.5.75:5000/reasonUpdate", data2, {
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

    reasonEdit(e) {
      this.idCommand = e.target.getAttribute("id");

      this.editForm.reasonName = e.target.getAttribute("reasonName");
      this.editForm.reasonDay = e.target.getAttribute("reasonDay");
    },
    reasonDelete(e) {
      this.idCommad2 = e.target.getAttribute("id");
      //console.log(e.target.getAttribute("id"));
      const headers = { "x-access-token": this.token };
      const data3 = {
        idCommad2: this.idCommad2,
      };
      console.log(data3);

      axios
        .post("http://192.168.5.75:5000/reasonDelete", data3, {
          headers: headers,
        })
        .then((response) => {
          console.log("Delete reason success ", response);
        });
      this.reasonSetting();
    },
    reasonNameInput(e) {
      this.editForm.reasonName = e.target.value;
      //console.log(e.target.value);
    },
    reasonDayInput(e) {
      this.editForm.reasonDay = e.target.value;
      //console.log(this.ruleForm2.roleKey2);
    },
  },
  mounted() {
    this.token = JSON.parse(localStorage.user).token;
    //console.log(this.token);
    this.uid = JSON.parse(localStorage.user).id;
    //console.log(this.uid);
    const date = new Date();
    var currentDate = moment(date);
    this.currentTimeDate = currentDate.format(`YYYY-MM-DD h:mm:ss`);
    this.reasonSetting();
  },
  components: {},
};
</script>

<style></style>
