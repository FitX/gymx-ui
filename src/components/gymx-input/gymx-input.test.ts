import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { GymxInput } from './index';
import { nextTick } from 'vue';

describe('GymxInput', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

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
      },
    });
    await wrapper.find('input').setValue('test');
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
    await wrapper.setProps({ inputAttributes: { disabled: 'disabled' } });
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
        inputAttributes: { disabled: true },
      },
    });

    const input = wrapper.find('input');
    expect(input.attributes('disabled')).toBeDefined();
  });

  it('should set disabled to true when $attrs.disabled is true', () => {
    const wrapper = mount(GymxInput, {
      props: {
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
        inputAttributes: {},
      },
    });

    const input = wrapper.find('input');
    expect(input.attributes('disabled')).toBeUndefined();
  });

  it('should display password toggle button if type is password', async () => {
    const wrapper = mount(GymxInput, {
      props: {
        type: 'password',
      },
    });

    const input = wrapper.find('input');
    const toggleButton = wrapper.find('button[aria-pressed]');
    const svg1 = wrapper.find('button[aria-pressed] svg');
    expect(input.attributes('type')).toBe('password');
    expect(toggleButton.attributes('aria-pressed')).toBe('false');

    await toggleButton.trigger('click');
    expect(toggleButton.attributes('aria-pressed')).toBe('true');
    expect(svg1).not.equal(wrapper.find('button[aria-pressed] svg'));
    expect(input.attributes('type')).toBe('text');

    vi.advanceTimersByTime(8000);
    await nextTick();
    expect(toggleButton.attributes('aria-pressed')).toBe('false');
    expect(svg1.text()).equal(wrapper.find('button[aria-pressed] svg').text());
    expect(input.attributes('type')).toBe('password');
  });
});
