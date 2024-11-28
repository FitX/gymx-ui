
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
// import { GymxGymxToggleSwitch } from './index';
import { GymxToggleSwitch } from '@/components'

describe('GymxToggleSwitch', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(GymxToggleSwitch);
    expect(wrapper.exists()).toBeTruthy();
  });

  it('renders the label correctly', () => {
    const wrapper = mount(GymxToggleSwitch, {
      props: {
        label: 'Test Label',
        state: 'active',
        modelValue: false
      }
    })
    const label = wrapper.find('.toggle-switch__label')
    expect(label.text()).toBe('Test Label')
  })

  it('applies the correct classes based on the state and modelValue', () => {
    const wrapper = mount(GymxToggleSwitch, {
      props: {
        modelValue: true
      }
    })
    expect(wrapper.classes()).toContain('toggle-switch')
    expect(wrapper.classes()).toContain('toggle-switch--on')
    expect(wrapper.classes()).not.toContain('toggle-switch--off')
  })

  it('applies the disabled attribute when state is "disabled"', async () => {
    const wrapper = mount(GymxToggleSwitch, {
      props: {
        state: 'disabled',
        modelValue: false
      }
    })
    const input = wrapper.find('input[type="checkbox"]')
    expect(input.attributes('disabled')).toBeDefined()
  })

  it('does not apply the disabled attribute when state is not "disabled"', async () => {
    const wrapper = mount(GymxToggleSwitch, {
      props: {
        modelValue: false
      }
    })
    const input = wrapper.find('input[type="checkbox"]')
    expect(input.attributes('disabled')).toBeUndefined()
  })

  it('toggles modelValue when the checkbox is clicked', async () => {
    const wrapper = mount(GymxToggleSwitch, {
      props: {
        modelValue: false
      }
    })

    const input = wrapper.find('input[type="checkbox"]')
    await input.setValue(true)

    expect(wrapper.emitted()['update:modelValue']).toBeTruthy()
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([true])
  })

  it('renders the slot content in the thumb', () => {
    const wrapper = mount(GymxToggleSwitch, {
      props: {
        modelValue: false
      },
      slots: {
        thumb: '<span class="custom-thumb-content">Custom Thumb</span>'
      }
    })

    const thumbSlotContent = wrapper.find('.custom-thumb-content')
    expect(thumbSlotContent.exists()).toBe(true)
    expect(thumbSlotContent.text()).toBe('Custom Thumb')
  })
});
