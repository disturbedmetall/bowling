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
    calculate(state, pins) {

      if (state.frameNumber < 10) {
        // Adding bonus
        if (state.fourBagger || state.turkey || state.double || state.strike || state.spare) {
          state.bonus += pins;
        }

        // Case strike
        if (pins === 10 && state.throwsLeft === 2) {
          state.frames[state.frameNumber].throwOne = pins;
          state.frameNumber++;

          if (state.fourBagger || state.turkey || state.double) {
            state.mainScore += (pins + state.bonus);
            state.bonus = pins;
          }

          // setting strikes
          if (state.fourBagger) {
            state.scores.push(state.mainScore);
          } else if (state.turkey) {
            state.fourBagger = true;
            state.turkey = false;
            state.scores.push(state.mainScore);
          } else if (state.double) {
            state.turkey = true;
            state.double = false;
            state.scores.pop();
            state.scores.pop();
            state.scores.push(state.mainScore);
          } else if (state.strike) {
            state.double = true;
            state.strike = false;
            state.scores.push('X');
          } else if (state.spare) {
            state.scores.pop();
            state.mainScore += (pins + state.bonus);
            state.scores.push(state.mainScore);
            state.scores.push('X');
          } else {
            state.strike = true;
            state.scores.push('X');
          }
        }
        // Case spare by second throw
        else if (pins === 10 && state.throwsLeft < 2) {
          state.frames[state.frameNumber].throwOne = pins;
          state.frameNumber++;
          state.throwsLeft++;
          state.scores[state.frameNumber - 1] = '/';

          state.strike = false;
          state.spare = 'true';
        }
        // Case: first throw unlucky
        else if (pins < 10 && state.throwsLeft === 2) {
          // Check status
          if (state.fourBagger || state.turkey || state.double) {
            state.mainScore += (10 + state.bonus);
            state.scores.push(state.mainScore);
            state.scores.push('X');
          } else if (!state.strike && !state.spare) {
            state.mainScore += (pins + state.bonus);
            state.scores.push(state.mainScore);
          } else if (state.spare) {
            state.mainScore += state.bonus;
            state.scores.pop();
            state.scores.push(state.mainScore);
            state.mainScore += pins;
            state.scores.push(state.mainScore);
            state.bonus = 0;
          }

          state.frames[state.frameNumber].throwOne = pins;
          state.throwsLeft--;
          state.hiddenPins = state.showedPins.slice(11 - pins);
          state.showedPins = state.showedPins.slice(pins);
        }
        // Case: second throw
        else if (pins < 10 && state.throwsLeft < 2) {
          state.scores.pop();

          // Checking for spare
          state.spare = (state.showedPins.length - pins == 1);

          if (state.fourBagger || state.turkey || state.double) {
            state.mainScore += state.bonus;
            state.scores.push(state.mainScore);
            state.mainScore += (state.bonus - 10);
            state.scores.push(state.mainScore);
            state.bonus = 0;
          } else if (state.strike) {
            state.mainScore += (10 + state.bonus);
            state.scores.push(state.mainScore);
            state.mainScore += state.bonus;
            state.scores.push(state.mainScore);
            state.bonus = 0;
          } else if (state.spare) {
            state.scores.push('/');
            state.bonus = pins;
          } else {
            state.mainScore += pins;
            state.scores.push(state.mainScore);
          }
          state.fourBagger = false;
          state.turkey = false;
          state.double = false;
          state.strike = false;

          state.frames[state.frameNumber].throwTwo = pins;
          state.throwsLeft++;
          state.showedPins = state.showedPins.concat(state.hiddenPins);
          
          if (state.frameNumber === 9 && !state.spare) {
            state.showedPins = [];
            state.frameNumber++;
          }
          state.frameNumber++;
          
        } else if (pins > 12) {
          console.log("error: pins > 12");
        }

      // Additional throw
      } else if (state.frameNumber === 10) {
          // Calculate score
        if (state.fourBagger || state.turkey || state.double) {
          state.bonus = pins * 2;
          state.mainScore += (pins + state.bonus);
          state.frameNumber++;
          state.scores.push(state.mainScore);
        } else if (state.strike) {
          state.bonus = pins;
          state.frameNumber++;
        } else if (state.spare) {
          state.bonus = pins;
          state.scores.pop();
          state.frameNumber++;
        } else {
          state.showedPins = []
          state.mainScore += pins;
          state.frameNumber += 2;
        }

        state.frames[9].throwThree = pins;
        // Score asignment
        state.mainScore += (pins + state.bonus);
        state.scores.push(state.mainScore);
        state.frameNumber++;
        state.showedPins = []
      } else {
        console.log("game over");
      }
    },
  },
})
