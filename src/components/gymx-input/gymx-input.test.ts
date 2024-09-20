
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { GymxInput } from './index';
import { GymxButton } from '@/components';

describe('GymxInput', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(GymxInput);
    expect(wrapper.exists()).toBeTruthy();
  });

  it('renders with icon slot', () => {
    const wrapper = mount(GymxInput, {
      slots: {
        'input-start': '🚀',
        'input-end': '🐨',
      },
    });
    expect(wrapper.find('.input__start').html()).toContain('🚀');
    expect(wrapper.find('.input__end').html()).toContain('🐨');
  });

  it('update event works', async () => {
    const wrapper = mount(GymxInput, {
      props: {
        modelValue: 'foo',
        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
      }
    });
    await wrapper.find('input').setValue('test')
    expect(wrapper.props('modelValue')).toBe('test');
  });

  it('disabled works', async () => {
    const wrapper = mount(GymxInput, {
      props: {
        modelValue: 'foo',
        state: 'disabled',
      },
    });
    expect(wrapper.html()).toContain('input--disabled');
    await wrapper.setProps({ state: undefined });
    expect(wrapper.html()).not.toContain('input--disabled');
    await wrapper.setProps({ inputAttributes: { disabled: 'disabled'} });
    expect(wrapper.html()).toContain('input--disabled');
  });
});
