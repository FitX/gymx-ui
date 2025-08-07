import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { GymxBadge } from './index';

describe('GymxBadge', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(GymxBadge);
    expect(wrapper.exists()).toBeTruthy();
  });

  it('is a Vue instance', () => {
    const wrapper = mount(GymxBadge, {
      props: { text: 'Demo' },
    });
    expect(wrapper.find('span').text()).contains('Demo');
  });

  it('it has button element', () => {
    const wrapper = mount(GymxBadge, {
      props: { text: 'Demo', tag: 'button' },
    });
    expect(wrapper.find('button').text()).contains('Demo');
  });
});
