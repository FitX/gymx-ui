
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { useTimeoutFn } from '@vueuse/core';
import { GymxToast } from './index';
import { ref } from 'vue';

vi.mock('@vueuse/core', () => ({
  useTimeoutFn: vi.fn().mockImplementation((cb, interval, options) => {
    const immediate = ref(options.immediate);
    const start = () => {
      immediate.value = true;
      setTimeout(() => {
        cb();
        immediate.value = false;
      }, interval)
    }
    return {
      start,
    }
  })
}));

describe('GymxToast', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(GymxToast);
    expect(wrapper.exists()).toBeTruthy();
  });

  /**
   * type?: 'info' | 'success' | 'warning' | 'error';
   *   icon?: Component;
   *   text: string;
   *   closeText?: string;
   *   duration?: number,
   */
  it('defaults works correctly', () => {
    const wrapper = mount(GymxToast);
    expect(wrapper.find('[role="status"]').exists()).toBe(true);
    expect(wrapper.find('[aria-label="Close"]').exists()).toBe(true);
  });

  it('closeText text works correctly', () => {
    const wrapper = mount(GymxToast, {
      props: {
        closeText: 'Schliessen',
      }
    });
    expect(wrapper.find('[aria-label="Schliessen"]').exists()).toBe(true);
  });

  it('Role by status works correctly', () => {
    const wrapper = mount(GymxToast, {
      props: {
        type: 'error',
      }
    });
    expect(wrapper.find('[role="alert"]').exists()).toBe(true);
  });

  it('Rendered Text', () => {
    const wrapper = mount(GymxToast, {
      props: {
        text: 'A Message from dev.',
      }
    });
    expect(wrapper.text()).contains('A Message from dev.');
  });

  it('Rendered Text', () => {
    const wrapper = mount(GymxToast, {
      props: {
        icon: '🐨'
      }
    });
    expect(wrapper.html()).contains('🐨');
  });

  it('Close Button works', () => {
    const wrapper = mount(GymxToast, {});
    wrapper.find('.toast__btn-close').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('close')
  });

  it('Close Event by Duration', () => {
    vi.useFakeTimers();
    const wrapper = mount(GymxToast, {
      props: {
        duration: 50000,
      }
    });

    vi.runAllTimers();
    expect(wrapper.emitted()).toHaveProperty('close');
    vi.useRealTimers();
  });

  it('No close Event by missing Duration', () => {
    vi.useFakeTimers();
    const wrapper = mount(GymxToast, {
      props: {
        duration: undefined,
      }
    });

    vi.runAllTimers();
    expect(wrapper.emitted()).not.toHaveProperty('close');
    vi.useRealTimers();
  });
});
