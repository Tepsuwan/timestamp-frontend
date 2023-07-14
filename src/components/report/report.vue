<template>
  <div>
    <div class="card">
      <div class="col-md-9">
        <br />
        <div class="row d-flex justify-content-right">
          <div class="col-md-2">
            <p-button type="info" block @click.native="active = 1"
              >Holidays</p-button
            >
          </div>
          <div class="col-md-2">
            <p-button type="info" block @click.native="active = 2"
              >Summarry report</p-button
            >
          </div>
        </div>
        <br />
      </div>
    </div>

    <div v-if="active == 1"><holidays /></div>
    <div v-if="active == 2"><summarys /></div>
  </div>
</template>

<script>
import holidays from "./holidays.vue";
import summarys from "./summary.vue";
export default {
  data() {
    return {
      active: "",
    };
  },
  mounted() {},
  components: {
    holidays,
    summarys,
  },
};
</script>
<style></style>
