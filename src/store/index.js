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
    mainScore: 0,
    throwNumber: 0,
    bonus: 0,
    turkey: false,
    double: false,
    strike: false,
    spare: false,
  },
  mutations: {
    reload(state) {
      state.frames = [
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
      ];
      state.scores = [];
      state.showedPins = [
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
      ];
      state.mainScore = 0;
      state.throwNumber = 0;
      state.bonus = 0;
      state.turkey = false;
      state.double = false;
      state.strike = false;
      state.spare = false;
    },
    checkStrike(state, pins) {
      if (pins === 10 && !(state.throwNumber % 2)) {
        // setting strikes
        if (state.turkey || state.double) {
          state.turkey = true;
          state.double = false;
        } else if (state.strike) {
          state.double = true;
          state.strike = false;
        } else {
          state.strike = true;
        }
      } else if (state.spare) {
        state.strike = false;
      }
      // Can be necessary
      // else if (pins !== 10 && !state.bonus) {
      //   state.turkey = false;
      //   state.double = false;
      //   state.strike = false;
      // } 
    },
    renderInFrame(state, pins) {
      function getFrameNumber() { return parseInt(state.throwNumber / 2) }

      if (state.throwNumber < 20) {
        if (!(state.throwNumber % 2)) {
          state.frames[getFrameNumber()].throwOne = pins;
          if (pins !== 10) {
            // Hiding buttons
            state.showedPins = state.showedPins.map((it, index) => {
              if (index > (10 - pins)) {
                it = false;
              }
              return it;
            })
          }
        } else if (state.throwNumber % 2) {
          state.frames[getFrameNumber()].throwTwo = pins;
          if (pins !== 10) {
            // Checking for spare
            state.spare = (!(state.showedPins[pins + 1]));

            // Bringing buttons back
            state.showedPins = state.showedPins.map(it => {
              it = true;
              return it;
            })
            // throwNumber starts with 0 and increment after calculation
            if (state.throwNumber === 19 && !state.spare) {
              // game over
              state.showedPins = [];
            }
          }
          // Checking for spare
          else if (pins === 10) {
            state.spare = true;
          }
        }
      }
      // Additional throw
      else if (state.throwNumber === 20) {
        if (state.turkey || state.double || state.strike || state.spare) {
          state.frames[9].throwThree = pins;
        } 
        state.showedPins = [];
      } else {
        state.showedPins = [];
      }
    },
    calculate(state, pins) {
      if (state.throwNumber < 20) {

        // First throw
        if (!(state.throwNumber % 2)) {

          // Case: Strike
          if (pins === 10) {
            // getting strikes
            if (state.turkey) {
              state.mainScore += (pins + state.bonus);
              state.bonus = pins;
              state.scores.pop();
              state.scores.pop();
              state.scores.push(state.mainScore);
              state.scores.push('X');
              state.scores.push('X');
            } else if (state.double) {
              state.scores.push('X');
            } else if (state.strike && state.spare) {
              state.scores.pop();
              state.mainScore += (pins + state.bonus);
              state.scores.push(state.mainScore);
              state.scores.push('X');
            } else if (state.strike && !state.spare) {
              state.scores.push('X');
            } 
            // Test required
            // else if (state.spare && !state.strike) {
            //   state.scores.pop();
            //   state.mainScore += (pins + state.bonus);
            //   state.scores.push(state.mainScore);
            //   state.scores.push('X');
            // } 
            else {
              state.scores.push('X');
            }
          }
          // Case: Unlucky
          else if (pins < 10) {
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
        }

        // Second throw
        else if (state.throwNumber % 2) {
          state.scores.pop();
          // Check status
          if (state.turkey || state.double) {
            state.mainScore += (pins + state.bonus - 10);
            state.scores.push(state.mainScore);
            state.mainScore += (pins + state.bonus - 20);
            state.scores.push(state.mainScore);
            state.bonus = 0;
            state.turkey = false;
            state.double = false;
          } else if (state.strike && !state.spare) {
            state.mainScore += (pins + state.bonus);
            state.scores.push(state.mainScore);
            state.mainScore += (pins + state.bonus - 10);
            state.scores.push(state.mainScore);
            state.bonus = 0;
          } else if (state.strike && state.spare) {
            state.mainScore += (pins + state.bonus);
            state.scores.push(state.mainScore);
            state.scores.push('/');
            state.bonus = 10 - pins;
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
        else if (pins > 10) {
          console.log("error: pins > 10");
        }
      }
      // Additional throw if spare
      if (state.throwNumber === 20) {
        // Calculating score
        if (state.turkey || state.double) {
          state.mainScore += pins + state.bonus;
          state.scores.pop();
          state.scores.pop();
          state.scores.push(state.mainScore);
          state.mainScore += pins + state.bonus;
          state.scores.push(state.mainScore);
        }
        else if (state.spare) {
          state.scores.pop();
          state.mainScore += (pins + state.bonus);
          state.scores.push(state.mainScore);
        } 
        else {
          state.mainScore += pins;
        }
      }
      // Adding bonus
      if (state.turkey || state.double || state.strike || state.spare) {
        state.bonus += pins;
      }
    },
    changeThrows(state, pins) {
      state.throwNumber++;
      if (state.throwNumber % 2 && pins === 10) {
        state.throwNumber++;
      }
    },
  },
})
