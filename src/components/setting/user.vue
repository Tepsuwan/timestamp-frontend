<template>
  <div>
    <div class="col-md-6">
      <h3>User setting</h3>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="User name" prop="username">
          <select
            class="custom-select"
            v-model="ruleForm.username"
            placeholder="Select"
          >
            <option
              v-for="item in dropdown"
              :key="item.id"
              :label="item.Name"
              :value="item.id"
            ></option>
          </select>
        </el-form-item>
        <el-form-item label="Role" prop="role">
          <select
            class="custom-select"
            v-model="ruleForm.role"
            placeholder="Select"
          >
            <option
              v-for="item in roles"
              :key="item.role_key"
              :label="item.role_name"
              :value="item.role_key"
            ></option>
          </select>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="submitForm('ruleForm')"
            >Add</el-button
          >
          <el-button @click="resetForm('ruleForm')">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="dataTable">
      <el-table-column type="index" align="center"> </el-table-column>
      <el-table-column prop="name" label="Name"> </el-table-column>
      <el-table-column prop="role_name" label="Role"> </el-table-column>

      <el-table-column label="Operations">
        <template slot-scope="scope">
          <el-popover placement="right" trigger="click">
            <div>
              <h3>Edit user</h3>

              <el-form
                :model="ruleForm2"
                :rules="rules2"
                ref="ruleForm2"
                label-width="100px"
                class="demo-ruleForm2"
              >
                <el-form-item label="User name" prop="username2">
                  <select
                    class="custom-select"
                    :id="dataTable[scope.$index].id"
                    :uid="dataTable[scope.$index].uid"
                    v-model="dataTable[scope.$index].uid"
                    @click="username2Change($event)"
                  >
                    <option
                      v-for="item in dropdown"
                      :key="item.id"
                      :label="item.Name"
                      :value="item.id"
                    ></option>
                  </select>
                </el-form-item>
                <el-form-item label="Role" prop="role">
                  <select
                    class="custom-select"
                    :id="dataTable[scope.$index].id"
                    :role_key="dataTable[scope.$index].role_key"
                    v-model="dataTable[scope.$index].role_key"
                    @click="role2Change($event)"
                  >
                    <option
                      v-for="item in roles"
                      :key="item.role_key"
                      :label="item.role_name"
                      :value="item.role_key"
                    ></option>
                  </select>
                </el-form-item>
                <el-form-item>
                  <el-button
                    size="small"
                    type="warning"
                    @click="submitForm2('ruleForm2')"
                    style="width: 100px"
                    >Edit</el-button
                  >
                </el-form-item>
              </el-form>
            </div>
            <div><br /></div>
            <p-button
              :id="dataTable[scope.$index].id"
              :uid="dataTable[scope.$index].uid"
              :role_key="dataTable[scope.$index].role_key"
              @click.native="roleEdit"
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
            @click.native="roleDelete"
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
      visible: false,
      idCommad2: "",
      uid: "",
      value: "Select",
      roleSelect: "ss",
      dataTable: [],
      name: "",
      day: "",
      user: [],
      dropdown: [],
      roles: [],

      ruleForm: {
        username: "",
        role: "",
      },
      rules: {
        username: [
          {
            required: true,
            message: "Please select username",
            trigger: "change",
          },
        ],
        role: [
          {
            required: true,
            message: "Please select role",
            trigger: "change",
          },
        ],
      },
      ruleForm2: {
        username2: "",
        role2: "",
      },
      rules2: {
        username2: [
          {
            //required: true,
            message: "Please select username",
            trigger: "change",
          },
        ],
        role2: [
          {
            //required: true,
            message: "Please select role",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    employee() {
      axios
        .get("http://192.168.5.75:5000/user", {
          headers: {
            "x-access-token": this.token,
          },
        })
        .then((response) => {
          this.dataTable = response.data.data;
          this.user = response.data;
          //console.log(this.user);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    options() {
      axios
        .get("http://192.168.5.75:5000/employee", {
          headers: {
            "x-access-token": this.token,
          },
        })
        .then((response) => {
          this.dropdown = response.data.data;
          //this.user = response.data;
          //console.log(this.dropdown);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    role() {
      axios
        .get("http://192.168.5.75:5000/role", {
          headers: {
            "x-access-token": this.token,
          },
        })
        .then((response) => {
          this.roles = response.data;
          //this.user = response.data;
          //console.log(this.roles);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
          console.log(this.ruleForm);

          const data = {
            uid: this.ruleForm.username,
            roleKey: this.ruleForm.role,
            createUid: this.uid,
            createDate: this.currentTimeDate,
          };
          // console.log(data);
          const headers = { "x-access-token": this.token };
          axios;
          axios
            .post("http://192.168.5.75:5000/userInsert", data, {
              headers: headers,
            })
            .then((response) => {
              console.log("Insert user success ", response);
            });

          this.employee();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    submitForm2() {
      alert("submit!");
      // console.log(this.ruleForm2.username2);
      // console.log(this.ruleForm2.role2);

      const data = {
        idCommand: this.idCommand2,
        uid: this.ruleForm2.username2,
        roleKey: this.ruleForm2.role2,
        createUid: this.uid,
        createDate: this.currentTimeDate,
      };
      console.log(data);
      const headers = { "x-access-token": this.token };
      axios
        .post("http://192.168.5.75:5000/userUpdate", data, {
          headers: headers,
        })
        .then((response) => {
          console.log("Update user success ", response);
        });

      this.employee();
    },
    resetForm2(formName2) {
      this.$refs[formName2].resetFields();
    },

    roleEdit(e) {
      this.idCommand2 = e.target.getAttribute("id");

      this.ruleForm2.username2 = e.target.getAttribute("uid");
      this.ruleForm2.role2 = e.target.getAttribute("role_key");
      //console.log(this.ruleForm2);
    },
    roleDelete(e) {
      var idCommand = e.target.getAttribute("id");
      //console.log(idCommad);
      //alert(e.target.getAttribute("id"));
      const data3 = {
        idCommand: idCommand,
      };
      //console.log(data3);
      const headers = { "x-access-token": this.token };
      axios
        .post("http://192.168.5.75:5000/userDelete", data3, {
          headers: headers,
        })
        .then((response) => {
          console.log("Delete reason success ", response);
        });
      this.employee();
    },
    username2Change(e) {
      this.ruleForm2.username2 = e.target.getAttribute("uid");
      //console.log(this.ruleForm2.username2);
    },
    role2Change(e) {
      this.ruleForm2.role2 = e.target.getAttribute("role_key");
      //alert(this.ruleForm2.role2);
      //console.log(this.ruleForm2.role2);
    },
  },
  mounted() {
    this.token = JSON.parse(localStorage.user).token;
    this.uid = JSON.parse(localStorage.user).id;
    // console.log(this.uid);
    const date = new Date();
    var currentDate = moment(date);
    this.currentTimeDate = currentDate.format(`YYYY-MM-DD h:mm:ss`);
    this.employee();
    this.options();
    this.role();
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
