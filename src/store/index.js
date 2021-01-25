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
    scores: [],
    mainScore: 0,
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
    throwsLeft: 2,
    frameNumber: 0,
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
            if (state.turkey || state.double) {
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
            state.showedPins = state.showedPins.map((it, index) => {
              if (index > (11 - pins)) {
                it = false;
              }
              return it;
            })

            if (!state.bonus) {
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
            state.showedPins = state.showedPins.map(it => {
              it = true;
              return it;
            })
            if (state.frameNumber === 10 && !state.spare) {
              state.showedPins = [];
            }
          }
        }
      } else if (state.frameNumber === 10) {
        if (state.turkey || state.double || state.strike || state.spare) {
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
          if (state.turkey) {
            state.mainScore += (pins + state.bonus);
            state.bonus = pins;
          }

          // getting strikes
          if (state.turkey) {
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
          state.scores[state.frameNumber - 1] = '/';
        }
        // Case: first throw unlucky
        else if (pins < 10 && state.throwsLeft < 2) {
          if (state.turkey || state.double) {
            state.scores.pop();
            state.scores.pop();
            state.mainScore += (pins + state.bonus);
            state.scores.push(state.mainScore);
            state.scores.push('X');
          } else if (state.spare) {
            state.mainScore += (pins + state.bonus);
            state.scores.pop();
            state.scores.push(state.mainScore);
            state.mainScore += pins;
            state.scores.push(state.mainScore);
            state.bonus = 0;
          } else if (!state.strike) {
            state.mainScore += pins;
            state.scores.push(state.mainScore);
            state.bonus = 0;
          }
        }
        // Case: second throw
        else if (pins < 10 && state.throwsLeft === 2) {
          state.scores.pop();
          // Check status
          if (state.turkey || state.double) {
            state.mainScore += (pins + state.bonus - 10);
            state.scores.push(state.mainScore);
            state.mainScore += (pins + state.bonus - 20);
            state.scores.push(state.mainScore);
            state.bonus = 0;
          } else if (state.strike && !state.spare) {
            state.scores.pop();
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
          // Calculating score
          if (state.turkey || state.double) {
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
        if (state.turkey || state.double || state.strike || state.spare) {
          state.bonus += pins;
        }
      }
    },
  },
})
