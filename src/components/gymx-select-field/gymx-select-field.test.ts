
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { GymxSelectField } from './index';

describe('GymxSelectField', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(GymxSelectField);
    expect(wrapper.exists()).toBeTruthy();
  });

  it('generates a random id if not provided', () => {
    const wrapper = mount(GymxSelectField, {
      props: {
        label: 'Test Label',
      },
    });

    const inputWrapper = wrapper.findComponent({ name: 'GymxSelect' });
    const label = wrapper.findComponent({ name: 'GymxLabel' });
    const input = wrapper.find('select');

    expect(inputWrapper.exists()).toBe(true);
    expect(label.exists()).toBe(true);

    expect(input.attributes('id')).toBeDefined();
    expect(label.attributes('for')).toBe(input.attributes('id'));
  });
});
