import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { GymxRadio } from './index';
import { ref } from 'vue';

describe('GymxRadio', () => {
  it('renders correctly with boolean model', () => {
    const modelValue = ref(false);
    const wrapper = mount(GymxRadio<boolean>, {
      props: {
        modelValue: modelValue.value,
        'onUpdate:modelValue': (val: boolean) => {
          modelValue.value = val;
        },
      },
    });

    expect(wrapper.find('input[type="radio"]').exists()).toBe(true);
    expect(wrapper.find('input').element.checked).toBe(false);
  });

  it('shows as checked when modelValue is true', () => {
    const modelValue = ref(true);
    const wrapper = mount(GymxRadio<boolean>, {
      props: {
        modelValue: modelValue.value,
        value: true,
        'onUpdate:modelValue': (val: boolean) => {
          modelValue.value = val;
        },
      },
    });

    expect(wrapper.find('input').element.checked).toBe(true);
  });

  it('emits update:modelValue when clicked (boolean)', async () => {
    const modelValue = ref(false);
    const updateSpy = vi.fn((val: boolean) => {
      modelValue.value = val;
    });

    const wrapper = mount(GymxRadio<boolean>, {
      props: {
        modelValue: modelValue.value,
        value: true,
        'onUpdate:modelValue': updateSpy,
      },
    });

    const input = wrapper.find('input');
    // Simulate checking the radio
    input.element.checked = true;
    await input.trigger('change');

    expect(updateSpy).toHaveBeenCalledWith(true);
  });

  it('uses custom value for single radio', async () => {
    const modelValue = ref<string | boolean>('');
    const updateSpy = vi.fn((val: string | boolean) => {
      modelValue.value = val;
    });

    const wrapper = mount(GymxRadio<string | boolean>, {
      props: {
        modelValue: modelValue.value,
        value: 'custom-value',
        'onUpdate:modelValue': updateSpy,
      },
    });

    const input = wrapper.find('input');
    input.element.checked = true;
    await input.trigger('change');

    expect(updateSpy).toHaveBeenCalledWith('custom-value');
  });

  it('unchecks single radio correctly', async () => {
    const modelValue = ref<string | boolean>('active');
    const updateSpy = vi.fn((val: string | boolean) => {
      modelValue.value = val;
    });

    const wrapper = mount(GymxRadio<boolean | string>, {
      props: {
        modelValue: modelValue.value,
        value: 'active',
        'onUpdate:modelValue': updateSpy,
      },
    });

    expect(wrapper.find('input').element.checked).toBe(true);

    const input = wrapper.find('input');
    input.element.checked = false;
    await input.trigger('change');

    expect(updateSpy).toHaveBeenCalledWith(false);
  });

  describe('Props and Attributes', () => {
    it('applies inputAttributes correctly', () => {
      const modelValue = ref(false);
      const wrapper = mount(GymxRadio<boolean>, {
        props: {
          modelValue: modelValue.value,
          id: 'custom-id',
          inputAttributes: {
            name: 'radio-name',
            disabled: true,
            'data-testid': 'my-radio',
          },
          'onUpdate:modelValue': (val: boolean) => {
            modelValue.value = val;
          },
        },
      });

      const input = wrapper.find('input');
      expect(input.attributes('id')).toBe('custom-id');
      expect(input.attributes('name')).toBe('radio-name');
      expect(input.attributes('disabled')).toBeDefined();
      expect(input.attributes('data-testid')).toBe('my-radio');
    });

    it('applies state modifier classes', () => {
      const modelValue = ref(false);
      const wrapper = mount(GymxRadio<boolean>, {
        props: {
          modelValue: modelValue.value,
          state: 'disabled',
          'onUpdate:modelValue': (val: boolean) => {
            modelValue.value = val;
          },
        },
      });

      expect(wrapper.find('.radio').classes()).toContain('radio--disabled');
    });

    it('uses explicit value when provided', () => {
      const modelValue = ref<string | boolean>(false);
      const wrapper = mount(GymxRadio<boolean | string>, {
        props: {
          modelValue: modelValue.value,
          value: 'explicit-value',
          'onUpdate:modelValue': (val) => {
            modelValue.value = val;
          },
        },
      });

      expect(wrapper.find('input').attributes('value')).toBe('explicit-value');
    });
  });

  describe('Edge Cases', () => {
    it('does not crash with undefined/null values', () => {
      const modelValue = ref(false);
      expect(() => {
        mount(GymxRadio<boolean>, {
          props: {
            modelValue: modelValue.value,
            value: undefined,
            'onUpdate:modelValue': (val) => {
              modelValue.value = val;
            },
          },
        });
      }).not.toThrow();
    });
  });

  describe('Accessibility', () => {
    it('generates unique IDs when none provided', () => {
      const modelValue1 = ref(false);
      const modelValue2 = ref(false);

      const wrapper1 = mount(GymxRadio<boolean>, {
        props: {
          modelValue: modelValue1.value,
          'onUpdate:modelValue': (val: boolean) => {
            modelValue1.value = val;
          },
        },
      });

      const wrapper2 = mount(GymxRadio<boolean>, {
        props: {
          modelValue: modelValue2.value,
          'onUpdate:modelValue': (val) => {
            modelValue2.value = val;
          },
        },
      });

      const id1 = wrapper1.find('input').attributes('id');
      const id2 = wrapper2.find('input').attributes('id');

      expect(id1).toBeDefined();
      expect(id2).toBeDefined();
      expect(id1).not.toBe(id2);
    });

    it('respects custom ID', () => {
      const modelValue = ref<boolean>(false);
      const wrapper = mount(GymxRadio<boolean>, {
        props: {
          modelValue: modelValue.value,
          id: 'my-custom-id',
          'onUpdate:modelValue': (val) => {
            modelValue.value = val;
          },
        },
      });

      expect(wrapper.find('input').attributes('id')).toBe('my-custom-id');
    });
  });
});
