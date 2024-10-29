import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { GymxTextField } from './index';

describe('GymxTextField', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(GymxTextField);
    expect(wrapper.exists()).toBeTruthy();
  });

  it('renders label with correct props', () => {
    const wrapper = mount(GymxTextField, {
      props: {
        label: 'Test Label',
        inputAttributes: { placeholder: 'Enter text' },
      },
    });

    const label = wrapper.findComponent({ name: 'GymxLabel' });
    expect(label.exists()).toBe(true);
    expect(label.props('text')).toBe('Test Label');
  });

  it('binds v-model correctly', async () => {
    const wrapper = mount(GymxTextField, {
      props: {
        label: 'Test Label',
        modelValue: 'Initial Value',
        inputAttributes: { placeholder: 'Enter text' },
      },
    });

    const input = wrapper.find('input');
    expect(input.exists()).toBe(true);

    expect(input.element.value).toBe('Initial Value');

    await input.setValue('New Value');

    await wrapper.vm.$emit('update:modelValue', 'New Value');

    expect(input.element.value).toBe('New Value');
  });

  it('renders input-start and input-end slots', () => {
    const wrapper = mount(GymxTextField, {
      props: {
        label: 'Test Label',
      },
      slots: {
        'input-start': '<div class="start">Start</div>',
        'input-end': '<div class="end">End</div>',
      },
    });

    expect(wrapper.html()).toContain('<div class="start">Start</div>');

    expect(wrapper.html()).toContain('<div class="end">End</div>');
  });

  it('generates a random id if not provided', () => {
    const wrapper = mount(GymxTextField, {
      props: {
        label: 'Test Label',
      },
    });

    const inputWrapper = wrapper.findComponent({ name: 'GymxInput' });
    const label = wrapper.findComponent({ name: 'GymxLabel' });
    const input = wrapper.find('input');

    expect(inputWrapper.exists()).toBe(true);
    expect(label.exists()).toBe(true);

    expect(input.attributes('id')).toBeDefined();
    expect(label.attributes('for')).toBe(input.attributes('id'));
  });
});
