import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { GymxSelect } from './index';

describe('GymxSelect', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(GymxSelect, { props: { options: [] } });
    expect(wrapper.exists()).toBeTruthy();
  });

  it('disabled works', async () => {
    const wrapper = mount(GymxSelect, {
      props: {
        modelValue: { text: 'foo' },
        options: [],
        state: 'disabled',
      },
    });
    expect(wrapper.html()).toContain('select--disabled');
    await wrapper.setProps({ state: undefined });
    expect(wrapper.html()).not.toContain('select--disabled');
    await wrapper.setProps({ inputAttributes: { disabled: 'disabled' } });
    expect(wrapper.html()).toContain('select--disabled');
  });

  it('should set disabled to true when props.state is disabled', () => {
    const wrapper = mount(GymxSelect, {
      props: {
        state: 'disabled',
        options: [],
        inputAttributes: {},
      },
    });

    const select = wrapper.find('select');
    expect(select.attributes('disabled')).toBeDefined();
  });

  it('should set disabled to true when $attrs.disabled is true', () => {
    const wrapper = mount(GymxSelect, {
      props: {
        // @ts-expect-error
        state: 'active',
        options: [],
        selectAttributes: {},
      },
      attrs: {
        disabled: true,
      },
    });

    const select = wrapper.find('select');
    expect(select.attributes('disabled')).toBeDefined();
  });

  it('should not set disabled when neither props.state nor $attrs.disabled are true', () => {
    const wrapper = mount(GymxSelect, {
      props: {
        // @ts-expect-error
        state: 'active',
        options: [],
        selectAttributes: {},
      },
    });

    const select = wrapper.find('select');
    expect(select.attributes('disabled')).toBeUndefined();
  });

  it('should render slot content', () => {
    const wrapper = mount(GymxSelect, {
      props: {
        options: [],
      },
      slots: {
        'select-end': 'Hi from Slot',
        option: '',
      },
    });

    const select = wrapper.find('.select__end');
    expect(select.text()).toBe('Hi from Slot');
  });

  it('modelValue should be updated', async () => {
    const wrapper = mount(GymxSelect, {
      attachTo: document.body,
      props: {
        modelValue: undefined,
        // @ts-ignore because vue test utils only accept simple values for setValue
        options: [1, 2, 3],
      },
    });
    const select = wrapper.find('select');
    await select.setValue(2);
    const emitted = await wrapper.emitted('update:modelValue');

    expect(emitted?.[0][0]).toBe(2);
  });
});
