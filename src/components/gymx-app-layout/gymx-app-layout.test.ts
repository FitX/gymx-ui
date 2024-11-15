
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { GymxAppLayout } from './index';

describe('GymxAppLayout', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(GymxAppLayout);
    expect(wrapper.exists()).toBeTruthy();
  });
  it('slots rendered', () => {
    const wrapper = mount(GymxAppLayout, { slots: {
      header: '<h1>Header</h1>',
      main: '<h1>Main</h1>',
      footer: '<p>Footer</p>',
      } });
    const appWrapper = wrapper.find('.app-layout');
    const header = wrapper.find('.app-layout__header');
    const main = wrapper.find('.app-layout__main');
    const footer = wrapper.find('.app-layout__footer');
    expect(appWrapper.exists()).toBeTruthy();
    expect(header.html()).contains('<h1>Header</h1>');
    expect(main.html()).contains('<h1>Main</h1>');
    expect(footer.html()).contains('<p>Footer</p>');
  });
});
