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
    expect(wrapper.html()).contains('Demo');
  });
});
