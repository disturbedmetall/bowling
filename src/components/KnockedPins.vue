<template>
  <div class="knocked-pins">
    <h3 class="knocked-pins__description">Pins knocked:</h3>
    <transition-group class="knocked-pins" name="flip" mode="out-in">
      <div
        class="knocked-pins__ammount"
        v-for="pin in 11"
        :key="pin"
        v-show="showedPins[pin - 1]"
      >
        <button class="knocked-pins__button" v-on:click="getPin(pin - 1)">
          {{ pin - 1 }}
        </button>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "KnockedPins",
  methods: {
    ...mapMutations(["getPin"]),
  },
  computed: {
    ...mapState(["showedPins"]),
  },
};
</script>

<style lang="scss" scoped>
.knocked-pins {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1rem;

  // &__description {
  //   margin-right: 1rem;
  // }

  &__ammount {
    margin: 0.25rem;
    width: 48px;
    height: 96px;

    &.hidden {
      opacity: 0;
    }
  }

  &__button {
    border: 0;
    border-radius: 0.25rem;
    background: #006db3;
    color: white;
    font-size: 1rem;
    line-height: 1.2;
    white-space: nowrap;
    text-decoration: none;
    padding: 0.25rem 0.5rem;
    width: 48px;
    height: 48px;
    cursor: pointer;
  }
}
// animation
.flip-enter-active {
  transition: opacity 0.2s linear, transform 0.6s linear;
}
.flip-leave-active {
  transition: opacity 0.2s linear, transform 0.2s linear;
}
.flip-enter {
  opacity: 0;
  transform: translateY(-20px);
}
.flip-leave-to {
  opacity: 0;
  transform: perspective(400px) rotateX(90deg);
}
// end of animation
</style>
