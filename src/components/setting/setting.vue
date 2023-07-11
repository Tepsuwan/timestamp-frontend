<template>
  <div>
    <div v-if="active == 1"><pe /></div>
    <div v-if="active == 2"><fp /></div>
    <div v-if="active == 3"><su /></div>
    <div class="card">
      <br />
      <div class="col-md-12">
        <div class="places-buttons">
          <el-button type="primary" v-on:click="command = 1"
            >Staff Setting</el-button
          >
          &#160;
          <el-dropdown @command="handleCommand">
            <el-button type="primary">
              Configulation<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="2">Reason</el-dropdown-item>
              <el-dropdown-item command="3">Work Shift</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          &#160; &#160;
          <el-dropdown @command="handleCommand">
            <el-button type="primary">
              Admin Setting<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="4">Sync User</el-dropdown-item>
              <el-dropdown-item command="5">User</el-dropdown-item>
              <el-dropdown-item command="6">Role</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          &#160;
          <el-button type="primary" v-on:click="command = 7">Bin</el-button>
          <!-- <el-button type="primary" v-on:click="command = 8"
            >Log Out</el-button
          > -->
        </div>
      </div>
      <br />
    </div>
    <div class="card">
      <div v-if="command == 1"><staff /></div>
      <div v-if="command == 7"><bin /></div>
      <div v-if="command == 8"><logOut /></div>

      <div v-if="command == '2'"><reason /></div>
      <div v-if="command == '3'"><workShift /></div>
      <div v-if="command == '4'"><synncUser /></div>
      <div v-if="command == '5'"><user /></div>
      <div v-if="command == '6'"><role /></div>
    </div>
  </div>
</template>

<script>
import staff from "./staff.vue";
import bin from "./bin.vue";
import logOut from "./logOut.vue";
import reason from "./reason.vue";
import workShift from "./workShift.vue";
import synncUser from "./synncUser.vue";
import user from "./user.vue";
import role from "./role.vue";
export default {
  data() {
    return {
      command: "5",
    };
  },
  methods: {
    handleCommand(command) {
      //this.$message("click on item " + command);
      this.command = command;
      //console.log(command);
    },
  },
  mounted() {},
  components: {
    staff,
    bin,
    logOut,
    reason,
    workShift,
    synncUser,
    user,
    role,
  },
};
</script>

<style></style>
