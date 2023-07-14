<template>
  <div>
    <div class="col-md-6">
      <h3>Role edit</h3>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="roleName">
          <el-input
            v-model="ruleForm.roleName"
            placeholder="Please input role name"
          ></el-input>
        </el-form-item>

        <el-form-item prop="roleKey">
          <el-input
            v-model="ruleForm.roleKey"
            placeholder="Please input role key value"
          ></el-input>
        </el-form-item>

        <el-form-item prop="roleDescription">
          <el-input
            v-model="ruleForm.roleDescription"
            placeholder="Please input role description (You can put it on or not.)"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="success" @click="submitForm3('ruleForm')"
            >Add</el-button
          >
          <el-button @click="resetForm3('ruleForm')">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>

    <br />
    <el-table :data="dataTable">
      <el-table-column type="index" align="center"> </el-table-column>
      <el-table-column prop="id" label="Role id"> </el-table-column>
      <el-table-column prop="role_name" label="Role name"> </el-table-column>
      <el-table-column prop="role_discription" label="Role description">
      </el-table-column>
      <el-table-column prop="role_key" label="Key"> </el-table-column>
      <el-table-column label="Operations">
        <template slot-scope="scope">
          <!--  -->
          <el-popover placement="left">
            <div>
              <h3>Role edit</h3>

              <el-form
                :model="ruleForm2"
                ref="ruleForm2"
                class="demo-ruleForm2"
              >
                <el-form-item>
                  <input
                    type="text"
                    style="width: 400px"
                    :value="dataTable[scope.$index].role_name"
                    @input="roleNameInput"
                  />
                </el-form-item>

                <el-form-item>
                  <input
                    type="text"
                    style="width: 400px"
                    :value="dataTable[scope.$index].role_key"
                    @input="roleKeyInput"
                  />
                </el-form-item>

                <el-form-item>
                  <input
                    type="text"
                    style="width: 400px"
                    :value="dataTable[scope.$index].role_discription"
                    @input="roleDescriptionInput"
                  />
                </el-form-item>
                <el-form-item>
                  <el-button
                    size="small"
                    type="warning"
                    @click="submitForm2('ruleForm2')"
                    style="width: 100px"
                    >Edit</el-button
                  >
                  <!-- <el-button
                    size="small"
                    @click="visible = false"
                    type="primary"
                    plain
                    >Cancel</el-button
                  > -->
                </el-form-item>
              </el-form>
            </div>
            <div><br /></div>
            <p-button
              :id="dataTable[scope.$index].id"
              :roleName="dataTable[scope.$index].role_name"
              :roleKey="dataTable[scope.$index].role_key"
              :roleDescription="dataTable[scope.$index].role_discription"
              @click.native="roleEdit"
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
import moment from "moment";
import axios from "axios";
export default {
  data() {
    return {
      visible: false,
      dataTable: [],
      name: "",
      day: "",
      idCommand: "",

      ruleForm: {
        roleName: "",
        roleDescription: "",
        roleKey: "",
      },

      rules: {
        roleName: [
          {
            required: true,
            message: "Please input role name",
            trigger: "blur",
          },
        ],
        roleKey: [
          {
            required: true,
            message: "Please input role key value",
            trigger: "blur",
          },
        ],
      },
      ruleForm2: {
        roleName2: "5555",
        roleDescription2: "",
        roleKey2: "",
      },
    };
  },
  methods: {
    roleLoad() {
      axios
        .get("http://192.168.5.75:5000/roleLoad", {
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

    submitForm3(formName3) {
      this.$refs[formName3].validate((valid) => {
        if (valid) {
          //alert("Insert reason success.");
          //console.log(this.ruleForm);

          const data = {
            roleName: this.ruleForm.roleName,
            roleDescription: this.ruleForm.roleDescription,
            roleKey: this.ruleForm.roleKey,
            createUid: this.uid,
            createDate: this.currentTimeDate,
          };
          //console.log(data);
          const headers = { "x-access-token": this.token };
          axios
            .post("http://192.168.5.75:5000/roleInsert", data, {
              headers: headers,
            })
            .then((response) => {
              console.log("Insert reason success ", response);
            });

          this.roleLoad();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm3(formName3) {
      this.$refs[formName3].resetFields();
    },
    submitForm2() {
      const data = {
        idCommand: this.idCommand2,
        roleName: this.ruleForm2.roleName2,
        roleDescription: this.ruleForm2.roleDescription2,
        roleKey: this.ruleForm2.roleKey2,
        createUid: this.uid,
        createDate: this.currentTimeDate,
      };
      console.log(data);
      const headers = { "x-access-token": this.token };
      axios
        .post("http://192.168.5.75:5000/roleUpdate", data, {
          headers: headers,
        })
        .then((response) => {
          console.log("Insert reason success ", response);
        });

      this.roleLoad();
    },

    roleEdit(e) {
      this.idCommand2 = e.target.getAttribute("id");

      this.ruleForm2.roleName2 = e.target.getAttribute("roleName");
      this.ruleForm2.roleKey2 = e.target.getAttribute("roleKey");
      this.ruleForm2.roleDescription2 =
        e.target.getAttribute("roleDescription");
    },
    roleDelete(e) {
      this.idCommand = e.target.getAttribute("id");
      //console.log(e.target.getAttribute("id"));
      const data = {
        idCommand: this.idCommand,
      };
      const headers = { "x-access-token": this.token };
      console.log(data);
      axios
        .post("http://192.168.5.75:5000/roleDelete", data, {
          headers: headers,
        })
        .then((response) => {
          console.log("Delete reason success ", response);
        });
      this.roleLoad();
    },
    roleNameInput(e) {
      this.ruleForm2.roleName2 = e.target.value;
      //console.log(this.ruleForm2.roleName2);
    },
    roleKeyInput(e) {
      this.ruleForm2.roleKey2 = e.target.value;
      //console.log(this.ruleForm2.roleKey2);
    },
    roleDescriptionInput(e) {
      this.ruleForm2.roleDescription2 = e.target.value;
      //console.log(this.ruleForm2.roleDescription2);
    },
  },
  mounted() {
    this.token = JSON.parse(localStorage.user).token;
    this.uid = JSON.parse(localStorage.user).id;
    const date = new Date();
    var currentDate = moment(date);
    this.currentTimeDate = currentDate.format(`YYYY-MM-DD h:mm:ss`);
    this.roleLoad();
  },
};
</script>

<style>
input[type="text"],
select {
  width: 100%;
  padding: 1px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  color: gray;
}
</style>
