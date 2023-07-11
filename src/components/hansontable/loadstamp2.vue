<template>
  <div>
    <div class="row">
      <p>From</p>
      <VueDatePicker
        v-model="startDate"
        @onChange="showConsoleMessage('{startDate:},{{ startDate }}')"
        format="YYYY-MM-DD"
      />

      <br />
      <p>To</p>
      <VueDatePicker v-model="endDate" format="YYYY-MM-DD" />
    </div>
    <br />
    <hot-table :data="hotData" ref="myTable" :settings="settings">
      <hot-column
        :settings="secondColumnDate"
        read-only="true"
        data="stamp_date"
      >
      </hot-column>
      <hot-column
        :settings="secondColumnStart"
        read-only="true"
        data="stamp_start"
      >
      </hot-column>
      <hot-column
        :settings="secondColumnStop"
        read-only="true"
        data="stamp_stop"
      >
      </hot-column>
      <hot-column :settings="secondColumnReason" data="reason_id"> </hot-column>
      <hot-column :settings="secondColumnNote" data="stamp_note"> </hot-column>
    </hot-table>
  </div>
</template>

<script>
import { VueDatePicker } from "@mathieustan/vue-datepicker";
import "@mathieustan/vue-datepicker/dist/vue-datepicker.min.css";
import { defineComponent } from "vue";
import { HotTable, HotColumn } from "@handsontable/vue";
import { registerAllModules } from "handsontable/registry";
import "handsontable/dist/handsontable.full.css";

import axios from "axios";

registerAllModules();
const ExampleComponent = defineComponent({
  data() {
    return {
      date: new Date(),
      startDate: "2023-05-01",
      endDate: "2023-05-31",
      hotData: [],
      secondColumnDate: {
        title: "Date",
      },
      secondColumnStart: {
        title: "Start",
      },
      secondColumnStop: {
        title: "Stop",
      },
      secondColumnReason: {
        title: "Reason",
        type: "dropdown",

        source: function (query, process) {
          console.log("Query : ", query);
          console.log("process : ", process);
          axios.get("http://192.168.5.75:5000/reasonname").then((response) => {
            console.log("respppp", response);
            process(response.data);
          });
        },
      },
      secondColumnNote: {
        title: "Note",
      },
      settings: {
        height: "auto",
        licenseKey: "non-commercial-and-evaluation",
        stretchH: "all",
        rowHeaders: true,
        className: "htCenter",

        afterChange: (itemodificado, accionHanson) => {
          if (!this.$refs.myTable.hotInstance) return;
          const my_instance = this.$refs.myTable.hotInstance;
          //console.log(my_instance.getSourceData());

          if (accionHanson != "loadData") {
            if (itemodificado) {
              itemodificado.forEach((element) => {
                var fila = my_instance.getSourceData()[element[0]];
                console.log(fila);
                axios
                  .post("http://192.168.5.75:5000/stampnote", fila)
                  .then((response) => {
                    console.log(response);
                    this.$refs.myTable.table.render();
                  });
              });
            }
          }
        },
      },
    };
  },
  mointed: function () {
    this.fetchCatFacts();
  },

  methods: {
    async fetchCatFacts() {
      console.log("startdate : ", this.startDate);
      const scatFactsResponse = await axios.get(
        "http://192.168.5.75:5000/loadstamp",
        {
          params: {
            uid: "00101",
            start: this.startDate,
            end: "2023-05-31",
          },
        }
      );

      let array = scatFactsResponse.data.data;

      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        console.log("element : ", element);
        this.hotData.push(element);
      }
    },
    showConsoleMessage(message) {
      console.log(this.startDate);
      console.log(message);
      this.fetchCatFacts();
    },
  },
  async mounted() {
    await this.fetchCatFacts();
  },
  components: {
    HotTable,
    HotColumn,
    VueDatePicker,
  },
});

export default ExampleComponent;
</script>

<style>
.handsontable .selected-td {
  background-color: red !important;
}
</style>
