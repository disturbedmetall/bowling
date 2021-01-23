<template>
  <div class="frames">
    <div class="frames__row">
      <div class="frame" v-for="(frame, index) in frames" :key="index">
        <p class="frame__number">{{ index + 1 }}</p>
        <div class="frame__info">
          <div class="frame__throws">
            <div class="frame__throw frame__throw--one">
              {{ frame.throwOne }}
            </div>
            <div class="frame__throw frame__throw--two">
              {{ frame.throwTwo }}
            </div>
            <div class="frame__throw frame__throw--three" v-show="index === 9">
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
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "BowlingFrames",
  computed: {
    ...mapState([
      "frames",
      "scores",
      "mainScore",
    ]),
  },
};
</script>

<style lang="scss" scoped>
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
    text-align: center;
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
</style>
