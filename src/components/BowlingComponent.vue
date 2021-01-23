<template>
  <div class="container">
    <div class="heading">
      <h1>Bowling Calculator</h1>
      <svg
        class="heading__reload"
        v-on:click="reload()"
        height="30"
        width="30"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 0C8.92 0 0 8.92 0 20v60c0 11.08 8.92 20 20 20h60c11.08 0 20-8.92 20-20V20c0-11.08-8.92-20-20-20H20zm28.637 14.227c12.252 0 23 6.562 28.947 16.345l7.023-4.265.372 23.529L64.22 38.688l7.457-4.528c-4.709-7.791-13.24-12.992-23.041-12.992-11.452 0-21.188 7.025-25.094 17.066-.087.269-.146.535-.283.848-.964 2.14-3.17 3.237-4.93 2.45-1.153-.52-1.874-1.756-1.883-3.233.016-.705.278-1.543.592-2.371 4.903-12.677 17.22-21.701 31.598-21.701zM15.02 50.164L35.78 61.312l-7.457 4.528c4.709 7.791 13.24 12.992 23.041 12.992 11.452 0 21.188-7.025 25.094-17.066.087-.269.146-.535.283-.848.964-2.14 3.17-3.237 4.93-2.45 1.153.52 1.874 1.756 1.883 3.233-.016.705-.278 1.543-.592 2.371-4.903 12.677-17.22 21.701-31.598 21.701-12.252 0-23-6.562-28.947-16.345l-7.023 4.265-.372-23.529z"
          fill="#006db3"
        />
      </svg>
    </div>

    <div class="frames">
      <div class="frames__row">
        <div
          class="frame"
          v-for="(frame, index) in frames"
          :key="index"
        >
          <p class="frame__number">{{ index + 1 }}</p>
          <div class="frame__info">
            <div class="frame__throws">
              <div class="frame__throw frame__throw--one">
                {{ frame.throwOne }}
              </div>
              <div class="frame__throw frame__throw--two">
                {{ frame.throwTwo }}
              </div>
              <div
                class="frame__throw frame__throw--three"
                v-show="index === 9"
              >
                {{ frame.throwThree }}
              </div>
            </div>
            <div class="frame__score">
              {{ scores[index] }}
            </div>
          </div>
        </div>
      </div>
      <div class="main-score">
        <p class="main-score__description">Main score</p>
        <div class="main-score__number">
          <h2>{{ mainScore }}</h2>
        </div>
      </div>
    </div>

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
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: "BowlingComponent",
  methods: {
    ...mapMutations([
      'reload',
      'getPin'
    ])
  },
  computed: {
    ...mapState([
      'frames',
      'showedPins',
      'hiddenPins',
      'throwsLeft',
      'frameNumber',
      'scores',
      'mainScore',
      'fourBagger',
      'turkey',
      'double',
      'strike',
      'spare',
      'bonus',
    ])
  }
};
</script>

<style lang="scss">
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
.heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
  color: #006db3;

  &__reload {
    cursor: pointer;
  }
}
.frames {
  display: flex;
  border-radius: 0.5rem;
  background-color: #63ccff;
  margin-bottom: 2rem;
  padding: 1rem;

  &__row {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    width: calc(100% - 100px);
  }
}
.frame {
  flex-basis: 10%;
  margin: 0.5rem 0;
  min-height: 0.125rem;

  &__info {
    color: white;
  }

  &__number {
    margin-bottom: 1rem;
  }

  &__throws {
    background-color: #039be5;
    border-left: 1px solid #006db3;
    border-top: 1px solid #006db3;
    border-right: 1px solid #006db3;
    display: flex;
    height: 40px;
  }

  &__throw {
    flex-basis: 50%;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;

    &--two {
      border-left: 1px solid #006db3;
      border-bottom: 1px solid #006db3;
    }
    &--three {
      border-left: 1px solid #006db3;
      border-bottom: 1px solid #006db3;
    }
  }

  &__score {
    background-color: #039be5;
    border-left: 1px solid #006db3;
    border-right: 1px solid #006db3;
    border-bottom: 1px solid #006db3;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    height: 40px;
  }
}
.main-score {
  width: 100px;
  height: 100%;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;

  &__description {
    margin-bottom: 1rem;
  }

  &__number {
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    color: #006db3;
    height: 80px;
  }
}
.knocked-pins {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1rem;

  &__description {
    margin-right: 1rem;
  }

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
