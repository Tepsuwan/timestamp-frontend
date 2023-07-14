<template>
  <div>
    <WorkTableVue></WorkTableVue>
    <!--  -->
    <div class="card">
      <div class="col-md-9">
        <br />
        <div class="row d-flex justify-content-right">
          <div class="col-md-2">
            <p-button type="info" block @click.native="active = 1"
              >Floor plan</p-button
            >
          </div>
          <div class="col-md-2">
            <p-button type="info" block @click.native="active = 2"
              >Photo edit</p-button
            >
          </div>
          <div class="col-md-2">
            <p-button type="info" block @click.native="active = 3">SU</p-button>
          </div>
        </div>
        <br />
      </div>
    </div>
    <div v-if="active == 1"><fp /></div>
    <div v-if="active == 2"><pe /></div>
    <div v-if="active == 3"><su /></div>
    <!-- <pe />
    <fp />
    <su /> -->
  </div>
</template>

<script>
import WorkTableVue from "../WorkTable.vue";
import pe from "./photoEdit.vue";
import fp from "./floorPlane.vue";
import su from "./su.vue";

export default {
  data() {
    return {
      active: "",
    };
  },
  methods: {},
  components: {
    WorkTableVue,
    pe,
    fp,
    su,
  },
};
</script>

<style></style>
