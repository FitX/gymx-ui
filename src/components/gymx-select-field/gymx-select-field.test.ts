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
        options: [],
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

  it('should render slot content', () => {
    const wrapper = mount(GymxSelectField, {
      slots: {
        'select-end': 'Hi from Slot',
      },
    });

    const select = wrapper.find('.select__end');
    expect(select.text()).toBe('Hi from Slot');
  });

  it('modelValue should be updated', async () => {
    const wrapper = mount(GymxSelectField, {
      attachTo: document.body,
      props: {
        modelValue: undefined,
        label: 'Test Label',
        // @ts-ignore because vue test utils only accept simple values for setValue
        options: [1, 2, 3],
      },
    });
    const select = wrapper.find('select');
    await select.setValue(2);
    const emitted = wrapper.emitted('update:modelValue');

    expect(emitted?.[0][0]).toBe(2);
  });
});
