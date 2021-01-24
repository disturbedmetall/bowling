import { mount } from '@vue/test-utils'
import Heading from '@/components/Heading.vue'

describe('test', () => {
  it('just find div', () => {
    const wrapper = mount(Heading)
    expect(wrapper.contains('div')).toBe(true)
  })
})


