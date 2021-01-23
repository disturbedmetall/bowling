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
          state.bonus += pin;
        }
        // Case strike
        if (pin === 10 && state.throwsLeft === 2) {
          state.frames[state.frameNumber].throwOne = pin;
          state.frameNumber++;

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
            state.mainScore += pin;
            state.mainScore += state.bonus;
            state.scores.push(state.mainScore);
            state.scores.push('X');
          } else {
            state.strike = true;
            state.scores.push('X');
          }
        }
        // Case spare by second throw
        else if (pin === 10 && state.throwsLeft < 2) {
          state.frames[state.frameNumber].throwOne = pin;
          state.frameNumber++;
          state.throwsLeft++;
          state.scores[state.frameNumber - 1] = '/';

          state.strike = false;
          state.spare = 'true';
        } 
        // Case: first throw unlucky
        else if (pin < 10 && state.throwsLeft === 2) {
          // Calculate score
          
          // Check strike / spare
          if (!state.strike && !state.spare) {
            state.mainScore += pin;
            state.mainScore += state.bonus;
            state.scores.push(state.mainScore);
          } else if (state.spare) {
            state.bonus += pin;
            state.mainScore += state.bonus;
            state.scores.pop();
            state.scores.push(state.mainScore);
            state.mainScore += pin;
            state.scores.push(state.mainScore);
            state.bonus = 0;
          } 

          state.frames[state.frameNumber].throwOne = pin;
          state.throwsLeft--;
          state.hiddenPins = state.showedPins.slice(11 - pin);
          state.showedPins = state.showedPins.slice(pin);

          state.fourBagger = false;
          state.turkey = false;
          state.double = false;
        } 
        // Case: second throw
        else if (pin < 10 && state.throwsLeft < 2) {
          // Checking for spare
          state.spare = (state.showedPins.length - pin == 1);
          
          if (state.strike) {
            state.mainScore += 10;
            state.mainScore += state.bonus;
            state.scores.pop();
            state.scores.push(state.mainScore); 
            state.mainScore += state.bonus;
            state.scores.push(state.mainScore); 
            state.bonus = 0;
          } else if (state.spare) {
            state.scores.pop();
            state.scores.push('/'); 
            state.bonus += pin;
          } else {
            state.mainScore += pin;
            state.scores.pop();
            state.scores.push(state.mainScore); 
          }
          state.strike = false;
          
          state.frames[state.frameNumber].throwTwo = pin;
          state.frameNumber++;
          state.throwsLeft++;
          state.showedPins = state.showedPins.concat(state.hiddenPins);

        } else if (pin > 12) {
          console.log("error: pin > 12");
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
