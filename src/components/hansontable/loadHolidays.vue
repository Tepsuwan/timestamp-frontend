<template>
  <div>
    <HotTable ref="myTable" :settings="hotSettings"> </HotTable>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { HotTable } from "@handsontable/vue";
import "handsontable/dist/handsontable.full.css";
import axios from "axios";
import "handsontable/dist/handsontable.full.css";

const ExampleComponent = defineComponent({
  data() {
    return {
      data: [],
      hotSettings: {
        colHeaders: ["Holidays Name", "Holiday", "used", "Holiday remain"],
        rowHeaders: true,
        manualRowMove: true,
        contextMenu: true,
        height: "auto",
        licenseKey: "non-commercial-and-evaluation",
        stretchH: "all",
      },
    };
  },
  methods: {
    getDataAxios() {
      axios
        .get("http://192.168.5.75:5000/loadHolidays", {
          headers: {
            "x-access-token": this.token,
          },
          params: {
            uid: this.uid,
            year: this.year,
          },
        })

        .then((response) => {
          //const data = response.data.data;
          const data = response.data;
          //console.log(response.data);
          this.$refs.myTable.hotInstance.updateSettings({
            data: data,
            columns: [
              { data: "reason_name", readOnly: true },
              { data: "reason_day", readOnly: true, className: "htCenter" },
              { data: "reason_use", readOnly: true, className: "htCenter" },
              { data: "reason_balance", readOnly: true, className: "htCenter" },
            ],
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    const date = new Date();
    this.year = date.getFullYear();
    this.uid = JSON.parse(localStorage.user).id;
    this.token = JSON.parse(localStorage.user).token;
    this.getDataAxios();
  },
  components: {
    HotTable,
  },
});

export default ExampleComponent;
</script>

<style></style>
