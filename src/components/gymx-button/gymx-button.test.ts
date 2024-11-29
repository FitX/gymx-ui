import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { GymxButton } from './index';

describe('GymxButton', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(GymxButton);
    expect(wrapper.exists()).toBeTruthy();
  });

  it('renders with icon slot', () => {
    const wrapper = mount(GymxButton, {
      slots: {
        'icon-start': '🚀',
        default: 'Hallo',
        'icon-end': '🐨',
      },
    });
    expect(wrapper.find('.btn__start').html()).toContain('🚀');
    expect(wrapper.find('.btn__content').html()).toContain('Hallo');
    expect(wrapper.find('.btn__end').html()).toContain('🐨');
  });

  it('respect different tags', () => {
    const wrapper = mount(GymxButton, {
      props: {
        tag: 'a',
      },
    });
    expect(wrapper.element.tagName.toLowerCase()).toBe('a');
  });

  it('should display loading indicator when isLoading is true', () => {
    const wrapper = mount(GymxButton, {
      props: {
        isLoading: true,
      },
      slots: {
        default: 'Hallo',
      },
    });

    expect(wrapper.classes()).toContain('btn--is-loading');

    const loadingIndicator = wrapper.find('.loading-indicator');
    expect(loadingIndicator.exists()).toBe(true);
  });

  it('should not display loading indicator when isLoading is false', () => {
    const wrapper = mount(GymxButton, {
      props: {
        isLoading: false,
      },
      slots: {
        default: 'Hallo',
      },
    });

    expect(wrapper.classes()).not.toContain('btn--is-loading');

    const loadingIndicator = wrapper.find('.loading-indicator');

    expect(loadingIndicator.exists()).toBe(false);
    expect(wrapper.text()).toContain('Hallo');
  });

  it('should set aria-disabled and aria-label attributes when isLoading is true', () => {
    const wrapper = mount(GymxButton, {
      props: {
        isLoading: true,
        loadingText: 'Please wait',
      },
    });

    expect(wrapper.attributes('aria-disabled')).toBe('true');
    expect(wrapper.attributes('aria-label')).toBe('Please wait');
  });

  it('should render loading-end slot when isLoading is true', () => {
    const wrapper = mount(GymxButton, {
      props: {
        isLoading: true,
      },
      slots: {
        'loading-end': '<span class="custom-loading-end">Loading...</span>',
      },
    });

    const customLoadingEnd = wrapper.find('.custom-loading-end');
    expect(customLoadingEnd.exists()).toBe(true);
    expect(customLoadingEnd.text()).toBe('Loading...');
  });
});
