<template>
  <div>
    <div class="card">
      <div class="col-md-12">
        <br />
        <div class="row d-flex justify-content-right">
          <div class="col-md-1">
            <p-button type="info" block @click.native="active = 1"
              >All</p-button
            >
          </div>
          <div class="col-md-1">
            <p-button type="info" block @click.native="active = 2">PE</p-button>
          </div>
          <div class="col-md-1">
            <p-button type="info" block @click.native="active = 3">FP</p-button>
          </div>
          <div class="col-md-1">
            <p-button type="info" block @click.native="active = 4"
              >WEB</p-button
            >
          </div>
          <div class="col-md-1">
            <p-button type="info" block @click.native="active = 5">3D</p-button>
          </div>
          <div class="col-md-1">
            <p-button type="info" block @click.native="active = 6"
              >CAD</p-button
            >
          </div>
          <div class="col-md-1">
            <p-button type="info" block @click.native="active = 7">SU</p-button>
          </div>
        </div>
        <br />
      </div>
    </div>

    <div v-if="active == 1"><all /></div>
    <div v-if="active == 2"><photoEdit /></div>
    <div v-if="active == 3"><floorplan /></div>
    <div v-if="active == 4"><web /></div>
    <div v-if="active == 5"><cad /></div>
    <div v-if="active == 6"><threeD /></div>
    <div v-if="active == 7"><su /></div>
    <!--  -->
  </div>
</template>

<script>
import all from "./all.vue";
import photoEdit from "./photoEdit.vue";
import floorplan from "./floorplan.vue";
import web from "./web.vue";
import threeD from "./threeD.vue";
import su from "./su.vue";
import cad from "./cad.vue";

export default {
  data() {
    return {
      active: "1",
    };
  },
  components: {
    all,
    photoEdit,
    floorplan,
    web,
    threeD,
    cad,
    su,
  },
};
</script>
<style></style>
