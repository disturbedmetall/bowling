import { mount, shallow, shallowMount, createLocalVue } from '@vue/test-utils'
import store from '@/store'  
// import knockedPins from '@/components/knockedPins.vue'

describe('store', () => {
  it('throwsLeft = 2', () => {
    expect(store.state.throwsLeft).toBe(2);
  })
})


