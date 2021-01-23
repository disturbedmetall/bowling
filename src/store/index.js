import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    frames: [
      {
        throwOne: "",
        throwTwo: "",
      },
      {
        throwOne: "",
        throwTwo: "",
      },
      {
        throwOne: "",
        throwTwo: "",
      },
      {
        throwOne: "",
        throwTwo: "",
      },
      {
        throwOne: "",
        throwTwo: "",
      },
      {
        throwOne: "",
        throwTwo: "",
      },
      {
        throwOne: "",
        throwTwo: "",
      },
      {
        throwOne: "",
        throwTwo: "",
      },
      {
        throwOne: "",
        throwTwo: "",
      },
      {
        throwOne: "",
        throwTwo: "",
        throwThree: "",
      },
    ],
    showedPins: [
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
    ],
    hiddenPins: [],
    throwsLeft: 2,
    frameNumber: 0,
    scores: [],
    mainScore: 0,
    fourBagger: false,
    turkey: false,
    double: false,
    strike: false,
    spare: false,
    bonus: 0,
  },
  mutations: {
    reload() {
      location.reload();
    },
    getPin(state, pin) {
      if (state.frameNumber < 10) {
        // Case strike
        if (pin === 10 && state.throwsLeft === 2) {
          state.frames[
            state.frameNumber
          ].throwOne = pin;
          state.frameNumber++;
          // setting strikes
          if (state.fourBagger) {
            state.scores.push(state.mainScore);
          } else if (state.turkey) {
            state.fourBagger = true;
            state.turkey = false;
            state.scores.push(state.mainScore);
          } else if (state.double) {
            state.scores.push(state.mainScore);
            state.turkey = true;
            state.double = false;
          } else if (state.strike) {
            state.double = true;
            state.strike = false;
          } else {
            state.strike = true;
          }
        }
        // Case spare by second throw
        else if (pin === 10 && state.throwsLeft < 2) {
          state.frames[
            state.frameNumber
          ].throwOne = pin;
          state.frameNumber++;
          state.throwsLeft++;
          state.scores[state.frameNumber - 1] = pin;
          state.spare = 'true';
        } 
        // Case: first throw unlucky
        else if (pin < 10 && state.throwsLeft === 2) {
          // Calculate score
          state.mainScore += pin;
          state.mainScore += state.bonus;
          state.scores.push(state.mainScore);

          state.frames[
            state.frameNumber
          ].throwOne = pin;
          state.throwsLeft--;
          state.hiddenPins = state.showedPins.slice(
            11 - pin
          );
          state.showedPins = state.showedPins.slice(
            pin
          );
          state.strike = false;
        } 
        // Case: second throw
        else if (pin < 10 && state.throwsLeft < 2) {
          // Calculating score
          state.mainScore += pin;
          state.scores.pop();
          state.scores.push(state.mainScore);

          state.frames[
            state.frameNumber
          ].throwTwo = pin;
          state.frameNumber++;
          state.throwsLeft++;
          state.showedPins = state.showedPins.concat(
            state.hiddenPins
          );
          // Checking for spare
          state.strike = false;
          if (state.showedPins - pin != 1) {
            state.spare = false;
          } else {
            state.spare = true;
          }
        } else if (pin > 12) {
          console.log("error: pin > 10");
        }
        // Calculate score
        if (state.fourBagger) {
          state.bonus = pin * 2;
          state.mainScore += pin;
          state.mainScore += state.bonus;
        } else if (state.turkey) {
          state.bonus = pin * 2;
          state.mainScore += pin;
          state.mainScore += state.bonus;
        } else if (state.double) {
          state.bonus = pin * 2;
          state.mainScore += pin;
          state.mainScore += state.bonus;
        } else if (state.strike) {
          state.bonus = pin;
        } else if (state.spare) {
          state.bonus = pin;
        }
      } else if (state.frameNumber === 10) {
        if (pin !== 10 && state.throwsLeft === 2) {
          state.frameNumber += 2;
        } else {
          state.frameNumber++;
          // Calculate score
          if (state.fourBagger) {
            state.bonus = pin * 2;
            state.mainScore += pin;
            state.mainScore += state.bonus;
          } else if (state.turkey) {
            state.bonus = pin * 2;
            state.mainScore += pin;
            state.mainScore += state.bonus;
          } else if (state.double) {
            state.bonus = pin * 2;
            state.mainScore += pin;
            state.mainScore += state.bonus;
          } else if (state.strike) {
            state.bonus = pin;
          } else if (state.spare) {
            state.bonus = pin;
          } else {
            state.mainScore += pin;
          }
          //
        }
        state.frames[9].throwTwo = pin;
        state.scores.push(state.mainScore);
      } else if (state.frameNumber === 11) {
        //  Calculate score
          if (state.fourBagger) {
            state.bonus = pin * 2;
            state.mainScore += pin;
            state.mainScore += state.bonus;
          } else if (state.turkey) {
            state.bonus = pin * 2;
            state.mainScore += pin;
            state.mainScore += state.bonus;
          } else if (state.double) {
            state.bonus = pin * 2;
            state.mainScore += pin;
            state.mainScore += state.bonus;
          } else if (state.strike) {
            state.bonus = pin;
          } else if (state.spare) {
            state.bonus = pin;
          } else {
            state.mainScore += pin;
          }
          // 
        state.frames[9].throwThree = pin;
        state.scores.push(state.mainScore);
        state.frameNumber++;
      } else {
        console.log("game over");
      }
    },
  },
})
