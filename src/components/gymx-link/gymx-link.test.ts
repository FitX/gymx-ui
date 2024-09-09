import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { GymxLink } from './index';

describe('GymxLink', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(GymxLink);
    expect(wrapper.exists()).toBeTruthy();
  });

  it('renders with icon slot', () => {
    const wrapper = mount(GymxLink, {
      slots: {
        'icon-start': '🚀',
        default: 'Hallo',
        'icon-end': '🐨',
      },
    });
    expect(wrapper.find('.link__start').html()).toContain('🚀');
    expect(wrapper.find('.link__content').html()).toContain('Hallo');
    expect(wrapper.find('.link__end').html()).toContain('🐨');
  });

  it('respect different tags', () => {
    const wrapper = mount(GymxLink, {
      props: {
        tag: 'span',
      },
    });
    expect(wrapper.element.tagName.toLowerCase()).toBe('span');
  });
});
