import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { GymxIconButton } from './index';

describe('GymxIconButton', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(GymxIconButton, { props: { text: '' }});
    expect(wrapper.exists()).toBeTruthy();
  });

  it('renders with icon slot', () => {
    const wrapper = mount(GymxIconButton, {
      props: {
        text: 'Unit Test',
      },
      slots: {
        default: '🚀',
      },
    });
    expect(wrapper.html()).toContain('🚀');
  });

  it('respect different tags', () => {
    const wrapper = mount(GymxIconButton, {
      props: {
        tag: 'a',
        text: 'Unit Test',
      },
      slots: {
        default: '🚀',
      },
    });
    expect(wrapper.element.tagName.toLowerCase()).toBe('a');
  });

  it('should display loading indicator when isLoading is true', () => {
    const wrapper = mount(GymxIconButton, {
      props: {
        isLoading: true,
        text: 'Unit Test',
      },
      slots: {
        default: '🚀',
      },
    });

    expect(wrapper.classes()).toContain('icon-btn--is-loading');

    const loadingIndicator = wrapper.find('.loading-indicator');
    expect(loadingIndicator.exists()).toBe(true);
  });

  it('should not display loading indicator when isLoading is false', () => {
    const wrapper = mount(GymxIconButton, {
      props: {
        isLoading: false,
        text: 'Unit Test',
      },
      slots: {
        default: '🚀',
      },
    });

    expect(wrapper.classes()).not.toContain('icon-btn--is-loading');

    const loadingIndicator = wrapper.find('.loading-indicator');

    expect(loadingIndicator.exists()).toBe(false);
    expect(wrapper.text()).toContain('🚀');
  });

  it('should set aria-disabled and aria-label attributes when isLoading is true', () => {
    const wrapper = mount(GymxIconButton, {
      props: {
        isLoading: true,
        text: 'Unit Test',
        loadingText: 'Please wait',
      },
    });

    expect(wrapper.attributes('aria-disabled')).toBe('true');
    expect(wrapper.attributes('aria-label')).toBe('Please wait');
  });

  it('should render loading-end slot when isLoading is true', () => {
    const wrapper = mount(GymxIconButton, {
      props: {
        isLoading: true,
        text: 'Unit Test',
      },
      slots: {
        loading: '<span class="custom-loading-end">Loading...</span>',
      },
    });

    const customLoadingEnd = wrapper.find('.custom-loading-end');
    expect(customLoadingEnd.exists()).toBe(true);
    expect(customLoadingEnd.text()).toBe('Loading...');
  });
});
