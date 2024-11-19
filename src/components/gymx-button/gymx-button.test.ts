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
});
