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
    renderInFrame(state, pins) {
      if (state.frameNumber < 10) {
        if (state.throwsLeft === 2) {
          state.frames[state.frameNumber].throwOne = pins;
          if (pins === 10) {
            state.frameNumber++;
            // setting strikes
            if (state.fourBagger || state.turkey) {
              state.fourBagger = true;
              state.turkey = false;
            } else if (state.double) {
              state.turkey = true;
              state.double = false;
            } else if (state.strike) {
              state.double = true;
              state.strike = false;
            } else {
              state.strike = true;
              state.spare = false;
            }
          } else {
            state.throwsLeft--;
            // Hiding buttons
            state.hiddenPins = state.showedPins.slice(11 - pins);
            state.showedPins = state.showedPins.slice(pins);
            if (!state.bonus) {
              state.fourBagger = false;
              state.turkey = false;
              state.double = false;
              state.strike = false;
            }
          }
        } else if (state.throwsLeft < 2) {
          state.frames[state.frameNumber].throwTwo = pins;
          state.frameNumber++;
          state.throwsLeft++;
          if (pins === 10) {
            state.strike = false;
            state.spare = 'true';
          } else {
            // Checking for spare
            state.spare = (state.showedPins.length - pins == 1);
            // Bringing buttons back
            state.showedPins = state.showedPins.concat(state.hiddenPins);
            if (state.frameNumber === 10 && !state.spare) {
              state.showedPins = [];
            }
          }
        }
      } else if (state.frameNumber === 10) {
        if (state.fourBagger || state.turkey || state.double || state.strike || state.spare) {
          state.frames[9].throwThree = pins;
        }
        state.frameNumber++;
        state.showedPins = [];
      } else {
        state.frameNumber++;
        state.showedPins = [];
        console.log("game over");
      }
    },
    calculate(state, pins) {

      if (state.frameNumber < 12) {
        // Case strike
        if (pins === 10 && state.throwsLeft === 2) {
          console.log('strike');
          if (state.fourBagger || state.turkey) {
            state.mainScore += (pins + state.bonus);
            state.bonus = pins;
          }

          // getting strikes
          if (state.fourBagger || state.turkey) {
            state.scores.pop();
            state.scores.pop();
            state.scores.push(state.mainScore);
            state.scores.push('X');
            state.scores.push('X');
          } else if (state.double) {
            state.scores.push('X');
          } else if (state.strike) {
            state.scores.push('X');
          } else if (state.spare) {
            state.scores.pop();
            state.mainScore += (pins + state.bonus);
            state.scores.push(state.mainScore);
            state.scores.push('X');
          } else {
            state.scores.push('X');
          }
        }
        // Case spare by second throw
        else if (pins === 10 && state.throwsLeft < 2) {
          console.log('spare by second');
          state.scores[state.frameNumber - 1] = '/';
        }
        // Case: first throw unlucky
        else if (pins < 10 && state.throwsLeft < 2) {
          console.log('unluky');
          if (state.fourBagger || state.turkey || state.double) {
            state.scores.pop();
            state.scores.pop();
            state.mainScore += (pins + state.bonus);
            state.scores.push(state.mainScore);
            state.scores.push('X');
          } else if (state.strike) {
            // state.scores.pop();
            // state.mainScore += (pins + state.bonus);
            // state.scores.push(state.mainScore);
            // state.mainScore += pins;
            // state.scores.push(state.mainScore);
            // state.bonus = 0;
          } else if (state.spare) {
            state.mainScore += (pins + state.bonus);
            state.scores.pop();
            state.scores.push(state.mainScore);
            state.mainScore += pins;
            state.scores.push(state.mainScore);
            state.bonus = 0;
          } else {
            state.mainScore += pins;
            state.scores.push(state.mainScore);
            state.bonus = 0;
          }
        }
        // Case: second throw
        else if (pins < 10 && state.throwsLeft === 2) {
          console.log('second throw');
          state.scores.pop();
          // Check status
          if (state.fourBagger || state.turkey || state.double) {
            state.mainScore += (pins + state.bonus - 10);
            state.scores.push(state.mainScore);
            state.mainScore += (pins + state.bonus - 20);
            state.scores.push(state.mainScore);
            state.bonus = 0;
          } else if (state.strike && !state.spare) {
            state.mainScore += (pins + state.bonus);
            state.scores.push(state.mainScore);
            state.mainScore += (pins + state.bonus - 10);
            state.scores.push(state.mainScore);
            state.bonus = 0;
          } else if (state.spare) {
            state.scores.push('/');
            state.bonus = 0;
          } else {
            state.mainScore += pins;
            state.scores.push(state.mainScore);
            state.bonus = 0;
          }
        }
        // Error case
        else if (pins > 12) {
          console.log("error: pins > 12");
        }

        // Additional throw
        if (state.frameNumber === 11) {
          console.log('additional throw');
          // Calculating score
          if (state.fourBagger || state.turkey || state.double) {
            state.mainScore += (pins + state.bonus + 10);
            state.scores.pop();
            state.scores.pop();
            state.scores.push(state.mainScore);
          } else if (state.strike) {
            state.bonus = pins;
          } else if (state.spare) {
            state.scores.pop();
            state.bonus = pins;
            state.mainScore += (pins + state.bonus);
            state.scores.push(state.mainScore);
          } else {
            state.mainScore += pins;
          }
        }

        // Adding bonus
        if (state.fourBagger || state.turkey || state.double || state.strike || state.spare) {
          state.bonus += pins;
        }
      }
    },
  },
})
