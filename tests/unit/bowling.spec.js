import { mount, shallow, shallowMount, createLocalVue } from '@vue/test-utils'
// import store from '@/store'  
import knockedPins from '@/components/knockedPins.vue'
import Vuex from 'vuex'

describe('store', () => {
  it('throwsLeft = 2', () => {
    expect(store.state.throwsLeft).toBe(2);
  })
})

const localVue = createLocalVue();
localVue.use(Vuex);


const mockMutations = {
  calculate: mutations.calculate()
}
const store = new Vuex.Store({
  state: {},
  mutations: mockMutations
})

localVue.use(Vuex)

const wrapper = shallow(knockedPins, {
	localVue,
	store
})

describe('knockedPins test', () => {
  
  it('check test', () => {
    
    const test = wrapper.vm.items
    console.log(test);
  })
})
