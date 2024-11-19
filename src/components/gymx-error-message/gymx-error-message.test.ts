import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { GymxErrorMessage } from '@/index';

describe('GymxErrorMessage', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(GymxErrorMessage);
    expect(wrapper.exists()).toBeTruthy();
  });

  it('renders error message with icon', () => {
    const wrapper = mount(GymxErrorMessage);
    expect(wrapper.html()).toContain('error-message__icon');
  });

  it('renders error message with text slot', () => {
    const wrapper = mount(GymxErrorMessage, {
      slots: {
        default: '<span>custom text</span>',
      },
    });
    expect(wrapper.html()).toContain('<span>custom text</span>');
  });

  it('renders error message with pre-icon slot', () => {
    const wrapper = mount(GymxErrorMessage, {
      slots: {
        'icon-start': '<span>custom icon</span>',
      },
    });
    expect(wrapper.html()).toContain('<span>custom icon</span>');
  });
});
