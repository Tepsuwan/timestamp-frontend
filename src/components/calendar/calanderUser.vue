<template>
  <div>
    <div class="row d-flex justify-content-center">
      <div class="row">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <draggable
          class="dragArea list-group"
          :list="list1"
          :group="{ name: 'people', pull: 'clone', put: false }"
          @change="log"
        >
          <div
            class="list-group-item"
            v-for="element in calendarUser"
            :key="element.name"
          >
            {{ element.name }}
          </div>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import draggable from "vuedraggable";
export default {
  name: "clone",
  display: "Clone",
  order: 2,
  components: {
    draggable,
  },
  data() {
    return {
      uid: "",
      calendarUser: "",
      list1: [
        { name: "John", id: 1 },
        { name: "Joao", id: 2 },
        { name: "Jean", id: 3 },
        { name: "Gerard", id: 4 },
      ],
      list2: [
        { name: "Juan", id: 5 },
        { name: "Edgard", id: 6 },
        { name: "Johnson", id: 7 },
      ],
    };
  },
  methods: {
    log: function (evt) {
      window.console.log(evt);
    },
    WorkShift() {
      axios
        .get("http://192.168.5.75:5000/calendarUser", {
          params: {
            uid: this.uid,
          },
        })
        .then((response) => {
          this.calendarUser = response.data.data;
          //console.log(this.calendarUser);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },

  mounted() {
    this.uid = "00012";
    console.log(this.uid);
    this.WorkShift();
  },
};
</script>
<style scoped></style>
