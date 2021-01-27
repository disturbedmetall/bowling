import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import realStore from '@/store'
import knockedPins from '@/components/knockedPins.vue'
import Vuex from 'vuex'

const localVue = createLocalVue();
localVue.use(Vuex);

const store = new Vuex.Store({
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
    throwNumber: 0,
    turkey: false,
    double: false,
    strike: false,
    spare: false,
    bonus: 0,
  },
  mutations: {
    reload() { },
    renderInFrame(state, pins) { },
    checkStrike(state, pins) { },
    calculate(state, pins) { },
    checkSpare(state, pins) { },
    changeThrows(state, pins) { }
  },
})

localVue.use(Vuex)

const wrapper = shallowMount(knockedPins, {
  localVue,
  store
})

describe('knockedPins', () => {
  it('Call calculate on click', () => {
    const spy = spyOn(wrapper.vm, 'calculate')
    const button = wrapper.findAll('.knocked-pins__button').at(-1);
    button.trigger('click');
    expect(wrapper.vm.calculate).toBeCalled()
  })
})
describe('Calculate', () => {
  it('Strike plus 2 plus 2 equal 18', () => {
      realStore.commit('renderInFrame', 10)
      realStore.commit('checkStrike', 10)
      realStore.commit('calculate', 10)
      realStore.commit('checkSpare', 10)
      realStore.commit('changeThrows', 10)

      realStore.commit('renderInFrame', 2)
      realStore.commit('checkStrike', 2)
      realStore.commit('calculate', 2)
      realStore.commit('checkSpare', 2)
      realStore.commit('changeThrows', 2)

      realStore.commit('renderInFrame', 2)
      realStore.commit('checkStrike', 2)
      realStore.commit('calculate', 2)
      realStore.commit('checkSpare', 2)
      realStore.commit('changeThrows', 2)
    expect(realStore.state.mainScore).toBe(18);
    realStore.commit('reload')
  })
})
describe('Calculate', () => {
  it('Spare plus 2 equal 14', () => {
      realStore.commit('renderInFrame', 4)
      realStore.commit('checkStrike', 4)
      realStore.commit('calculate', 4)
      realStore.commit('checkSpare', 4)
      realStore.commit('changeThrows', 4)

      realStore.commit('renderInFrame', 6)
      realStore.commit('checkStrike', 6)
      realStore.commit('calculate', 6)
      realStore.commit('checkSpare', 6)
      realStore.commit('changeThrows', 6)

      realStore.commit('renderInFrame', 2)
      realStore.commit('checkStrike', 2)
      realStore.commit('calculate', 2)
      realStore.commit('checkSpare', 2)
      realStore.commit('changeThrows', 2)
    expect(realStore.state.mainScore).toBe(14);
    realStore.commit('reload')
  })
})
describe('Calculate', () => {
  it('Perfect serie equal 300', () => {
    for (let index = 0; index < 11; index++) {
      realStore.commit('renderInFrame', 10)
      realStore.commit('checkStrike', 10)
      realStore.commit('calculate', 10)
      realStore.commit('checkSpare', 10)
      realStore.commit('changeThrows', 10)
    }
    expect(realStore.state.mainScore).toBe(300);
    realStore.commit('reload')
  })
})
describe('Calculate', () => {
  it('all spares equal 150', () => {
    for (let index = 0; index < 21; index++) {
      realStore.commit('renderInFrame', 5)
      realStore.commit('checkStrike', 5)
      realStore.commit('calculate', 5)
      realStore.commit('checkSpare', 5)
      realStore.commit('changeThrows', 5)
    }
    expect(realStore.state.mainScore).toBe(150);
    realStore.commit('reload')
  })
})
describe('Calculate', () => {
  it('4|0 should give the output 40', () => {
    for (let index = 0; index < 10; index++) {
      realStore.commit('renderInFrame', 4)
      realStore.commit('checkStrike', 4)
      realStore.commit('calculate', 4)
      realStore.commit('checkSpare', 4)
      realStore.commit('changeThrows', 4)

      realStore.commit('renderInFrame', 0)
      realStore.commit('checkStrike', 0)
      realStore.commit('calculate', 0)
      realStore.commit('checkSpare', 0)
      realStore.commit('changeThrows', 0)
    }
    expect(realStore.state.mainScore).toBe(40);
    realStore.commit('reload')
  })
})