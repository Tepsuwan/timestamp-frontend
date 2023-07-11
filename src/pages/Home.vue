<template>
  <main class="home-page">
    <div class="col-12">
      <loadstamps />
    </div>
  </main>
</template>

<script>
import loadstamps from "../components/hansontable/loadstamp.vue";

export default {
  components: {
    loadstamps,
  },
};
</script>

<style>
button {
  font-weight: bold;
}
</style>
