<template>
  <div id="app" class="container">
    <Heading />
    <BowlingFrames />
    <KnockedPins />
  </div>
</template>

<script>
import Heading from './components/Heading.vue';
import BowlingFrames from './components/BowlingFrames.vue';
import KnockedPins from './components/KnockedPins.vue';

export default {
  name: "App",
  components: {
    Heading,
    BowlingFrames,
    KnockedPins,
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
.container {
  width: 90%;
  margin-left: auto;
  margin-right: auto;

  @media only screen and (min-width: 540px) {
    width: 80%;
  }

  @media only screen and (min-width: 960px) {
    width: 75%;
    max-width: 60rem;
  }
}
</style>
