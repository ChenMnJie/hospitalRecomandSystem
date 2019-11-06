<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import store from "./vuex/store.js";

export default {
  name: "app",
  data() {
    return {};
  },
  store,
  beforeMount() {},
  mounted() {},
  watch: {}
};
</script>

<style lang="scss">
</style>
