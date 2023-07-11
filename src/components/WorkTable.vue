<template>
  <div>
    <card>
      <paper-table :data="users" type="hover">
        <template slot="columns">
          <th>NAME</th>
          <th>WORK SHIFT</th>
          <th>TEAM</th>
          <th>EMAIL</th>
          <th>OFFICE</th>
        </template>
        <template slot-scope="{ row }">
          <td>{{ row.name }}</td>
          <td>{{ row.workshift }}</td>
          <td>{{ row.team }}</td>
          <td>{{ row.email }}</td>
          <td>{{ row.office }}</td>
        </template>
      </paper-table>
    </card>
  </div>
</template>

<script>
import axios from "axios";
import { PaperTable } from "@/components";

export default {
  components: {
    PaperTable,
  },
  data() {
    return {
      users: [],
      user: [],
    };
  },
  methods: {
    userData() {
      axios
        .get("http://192.168.5.75:5000/userDatas", {
          params: {
            uid: this.uid,
          },
        })
        .then((response) => {
          this.user = response.data;
          this.name = response.data.data.name;
          console.log("user : ", this.users);
          //console.log("userName:" + this.name);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  mounted() {
    this.uid = JSON.parse(localStorage.user).id;
    this.token = JSON.parse(localStorage.user).token;
    //this.usersData();
    axios
      .get("http://192.168.5.75:5000/userDatas", {
        headers: {
          "x-access-token": this.token,
        },
        params: {
          uid: this.uid,
        },
      })
      .then((response) => {
        this.users = response.data;
        //console.log("user : ", this.users);
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
</script>
