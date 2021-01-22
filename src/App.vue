<template>
  <div id="app">
    <BowlingComponent />
  </div>
</template>

<script>
import BowlingComponent from "./components/BowlingComponent.vue";

export default {
  name: "App",
  components: {
    BowlingComponent,
  },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
html,
body {
  width: 100%;
  margin: 0;
  padding: 0;
  font-size: 100%;
  font-family: "Lato", Helvetica, sans-serif;
  line-height: 1.5;
}
p {
  margin: 0;
}
</style>
