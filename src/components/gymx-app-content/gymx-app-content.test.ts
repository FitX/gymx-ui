import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { GymxAppContent } from './index';

describe('GymxAppContent', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(GymxAppContent);
    expect(wrapper.exists()).toBeTruthy();
  });

  it('default layout class rendered', () => {
    const wrapper = mount(GymxAppContent);
    expect(wrapper.classes()).toContain('app-content--default');
  });

  it('centered layout class rendered', () => {
    const wrapper = mount(GymxAppContent, { props: { layout: 'centered' } });
    expect(wrapper.classes()).toContain('app-content--centered');
  });
});
