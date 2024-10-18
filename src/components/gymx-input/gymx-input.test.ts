
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { GymxInput } from './index';

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

  it('should set disabled to true when props.state is disabled', () => {
    const wrapper = mount(GymxInput, {
      props: {
        state: 'disabled',
        inputAttributes: {},
      },
    });

    const input = wrapper.find('input');
    expect(input.attributes('disabled')).toBeDefined();
  });

  it('should set disabled to true when inputAttributes.disabled is true', () => {
    const wrapper = mount(GymxInput, {
      props: {
        state: 'active', // active or any other state that's not 'disabled'
        inputAttributes: { disabled: true },
      },
    });

    const input = wrapper.find('input');
    expect(input.attributes('disabled')).toBeDefined();
  });

  it('should set disabled to true when $attrs.disabled is true', () => {
    const wrapper = mount(GymxInput, {
      props: {
        state: 'active',
        inputAttributes: {},
      },
      attrs: {
        disabled: true,
      },
    });

    const input = wrapper.find('input');
    expect(input.attributes('disabled')).toBeDefined();
  });

  it('should not set disabled when neither props.state nor $attrs.disabled are true', () => {
    const wrapper = mount(GymxInput, {
      props: {
        state: 'active',
        inputAttributes: {},
      },
    });

    const input = wrapper.find('input');
    expect(input.attributes('disabled')).toBeUndefined();
  });
});
