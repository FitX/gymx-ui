import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { GymxLabel } from './index';

describe('GymxLabel', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(GymxLabel);
    expect(wrapper.exists()).toBeTruthy();
  });

  it('renders with text slot', () => {
    const wrapper = mount(GymxLabel, {
      slots: {
        default: '<span>custom label</span>',
      },
    });
    expect(wrapper.html()).toContain('<span>custom label</span>');
  });

  it('have auto generated for prop', () => {
    const wrapper = mount(GymxLabel, {
      props: {
        text: 'label',
      },
    });
    expect(wrapper.attributes('for')).toBeDefined();
  });
});
