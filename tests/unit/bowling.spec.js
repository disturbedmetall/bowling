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
  it('2 + 2 = 4', () => {
    realStore.commit('calculate', 2)
    realStore.commit('calculate', 2)
    expect(realStore.state.mainScore).toBe(4);
  })
})