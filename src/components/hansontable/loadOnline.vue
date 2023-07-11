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
import moment from "moment";
import Handsontable from "handsontable";

function firstRowRenderer(instance, td) {
  Handsontable.renderers.TextRenderer.apply(this, arguments);
  //td.style.fontWeight = "bold";
  //td.style.color = "green";
  td.style.background = "#f6685e";
}

function negativeValueRenderer() {
  Handsontable.renderers.TextRenderer.apply(this, arguments);
}
Handsontable.renderers.registerRenderer(
  "negativeValueRenderer",
  negativeValueRenderer
);
Handsontable.renderers.registerRenderer(
  "customStylesRenderer",
  (hotInstance, TD, ...rest) => {
    Handsontable.renderers.TextRenderer(hotInstance, TD, ...rest);

    TD.style.fontWeight = "bold";
    TD.style.color = "green";
    TD.style.background = "#d7f1e1";
  }
);

const ExampleComponent = defineComponent({
  data() {
    return {
      from: {
        start: "",
        end: "",
        uid: "",
      },
      data: [],
      hotSettings: {
        colHeaders: [
          "Name",
          "Date",
          "Start",
          "Stop",
          "Start IP",
          "Stop IP",
          "Reason",
          "Note",
        ],
        rowHeaders: true,
        manualRowMove: true,
        contextMenu: true,
        height: "auto",
        licenseKey: "non-commercial-and-evaluation",
        stretchH: "all",
        cell: [],
      },
    };
  },
  methods: {
    getDataAxios() {
      this.token = JSON.parse(localStorage.user).token;
      axios
        .get("http://192.168.5.75:5000/loadOnline", {
          headers: {
            "x-access-token": this.token,
            // "x-access-token":
            //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODg0NjA5NDksImV4cCI6MTY4ODQ2NDU0OX0.cSFRozeKUX438utz8fkVnqWLdFohfUs4zMLxIjaYAho",
          },
          params: {
            fDate: this.fDate,
            tDate: this.tDate,
          },
        })

        .then((response) => {
          const data = response.data;

          this.$refs.myTable.hotInstance.updateSettings({
            data: data,
            cells(row) {
              const cellProperties = {};
              if (this.instance.getDataAtCell(row, 1) === "07/06/2023") {
                //No Color
              } else {
                cellProperties.renderer = firstRowRenderer;
              }
              return cellProperties;
            },
            columns: [
              { data: "stamp_uid", readOnly: true },
              {
                data: "stamp_date",
                readOnly: true,
                className: "htCenter",
              },
              { data: "stamp_start", readOnly: true, className: "htCenter" },
              { data: "stamp_stop", readOnly: true, className: "htCenter" },
              { data: "stamp_start_ip", readOnly: true, className: "htCenter" },
              { data: "stamp_stop_ip", readOnly: true, className: "htCenter" },
              { data: "stamp_note", readOnly: true, className: "htCenter" },
              { data: "reason_id", readOnly: true, className: "htCenter" },
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
    var fDate = moment(date);
    var tDate = moment(date);
    this.fDate = fDate.format(`YYYY-MM-DD`);
    this.tDate = tDate.format(`YYYY-MM-DD`);
    this.getDataAxios();

    this.from.uid = JSON.parse(localStorage.user).id;
  },
  components: {
    HotTable,
  },
});

export default ExampleComponent;
</script>

<style></style>
