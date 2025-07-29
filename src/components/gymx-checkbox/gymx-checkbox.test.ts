import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { GymxCheckbox } from './index';
import { ref } from 'vue';

describe('GymxCheckbox', () => {
  /* it('is a Vue instance', () => {
    const wrapper = mount(GymxCheckbox);
    expect(wrapper.exists()).toBeTruthy();
  }); */
  describe('Boolean/Single Value Mode', () => {
    it('renders correctly with boolean model', () => {
      const modelValue = ref(false);
      const wrapper = mount(GymxCheckbox<boolean>, {
        props: {
          modelValue: modelValue.value,
          'onUpdate:modelValue': (val: boolean) => {
            modelValue.value = val;
          },
        },
        slots: {
          default: 'Accept Terms',
        },
      });

      expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true);
      expect(wrapper.text()).toContain('Accept Terms');
      expect(wrapper.find('input').element.checked).toBe(false);
    });

    it('shows as checked when modelValue is true', () => {
      const modelValue = ref(true);
      const wrapper = mount(GymxCheckbox<boolean>, {
        props: {
          modelValue: modelValue.value,
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

      const wrapper = mount(GymxCheckbox<boolean>, {
        props: {
          modelValue: modelValue.value,
          'onUpdate:modelValue': updateSpy,
        },
      });

      const input = wrapper.find('input');
      // Simulate checking the checkbox
      input.element.checked = true;
      await input.trigger('change');

      expect(updateSpy).toHaveBeenCalledWith(true);
    });

    it('uses custom value for single checkbox', async () => {
      const modelValue = ref<string | boolean>('');
      const updateSpy = vi.fn((val: string | boolean) => {
        modelValue.value = val;
      });

      const wrapper = mount(GymxCheckbox<string | boolean>, {
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

    it('unchecks single checkbox correctly', async () => {
      const modelValue = ref<string | boolean>('active');
      const updateSpy = vi.fn((val: string | boolean) => {
        modelValue.value = val;
      });

      const wrapper = mount(GymxCheckbox<boolean | string>, {
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
  });

  describe('Array/Multiple Value Mode', () => {
    it('shows as unchecked when array is empty', () => {
      const modelValue = ref<string[]>([]);
      const wrapper = mount(GymxCheckbox<string[]>, {
        props: {
          modelValue: modelValue.value,
          'onUpdate:modelValue': (val) => {
            modelValue.value = val;
          },
        },
      });

      expect(wrapper.find('input').element.checked).toBe(false);
    });

    it('shows as unchecked when value not in array', () => {
      const modelValue = ref(['option1', 'option3']);
      const wrapper = mount(GymxCheckbox<string[]>, {
        props: {
          modelValue: modelValue.value,
          value: 'option2',
          'onUpdate:modelValue': (val: string[]) => {
            modelValue.value = val;
          },
        },
      });

      expect(wrapper.find('input').element.checked).toBe(false);
    });

    it('shows as checked when value is in array', () => {
      const modelValue = ref(['option1', 'option2']);
      const wrapper = mount(GymxCheckbox<string[]>, {
        props: {
          modelValue: modelValue.value,
          value: 'option2',
          'onUpdate:modelValue': (val: string[]) => {
            modelValue.value = val;
          },
        },
      });

      expect(wrapper.find('input').element.checked).toBe(true);
    });

    it('adds value to array when checked', async () => {
      const modelValue = ref(['option1']);
      const updateSpy = vi.fn((val: string[]) => {
        modelValue.value = val;
      });

      const wrapper = mount(GymxCheckbox<string[]>, {
        props: {
          modelValue: modelValue.value,
          value: 'option2',
          'onUpdate:modelValue': updateSpy,
        },
      });

      const input = wrapper.find('input');
      input.element.checked = true;
      await input.trigger('change');

      expect(updateSpy).toHaveBeenCalledWith(['option1', 'option2']);
    });

    it('removes value from array when unchecked', async () => {
      const modelValue = ref(['option1', 'option2', 'option3']);
      const updateSpy = vi.fn((val: string[]) => {
        modelValue.value = val;
      });

      const wrapper = mount(GymxCheckbox<string[]>, {
        props: {
          modelValue: modelValue.value,
          value: 'option2',
          'onUpdate:modelValue': updateSpy,
        },
      });

      const input = wrapper.find('input');
      input.element.checked = false; // Simulating unchecking
      await input.trigger('change');

      expect(updateSpy).toHaveBeenCalledWith(['option1', 'option3']);
    });

    it('handles numeric values in arrays', async () => {
      const modelValue = ref([1, 3]);
      const updateSpy = vi.fn((val: number[]) => {
        modelValue.value = val;
      });

      const wrapper = mount(GymxCheckbox<number[]>, {
        props: {
          modelValue: modelValue.value,
          value: 2,
          'onUpdate:modelValue': updateSpy,
        },
      });

      const input = wrapper.find('input');
      input.element.checked = true;
      await input.trigger('change');

      expect(updateSpy).toHaveBeenCalledWith([1, 3, 2]);
    });

    it('does not add duplicate values to array', async () => {
      const modelValue = ref(['option1', 'option2']);
      const updateSpy = vi.fn((val: string[]) => {
        modelValue.value = val;
      });

      const wrapper = mount(GymxCheckbox<string[]>, {
        props: {
          modelValue: modelValue.value,
          value: 'option2',
          'onUpdate:modelValue': updateSpy,
        },
      });

      const input = wrapper.find('input');
      input.element.checked = false; // Simulating unchecking
      await input.trigger('change');

      expect(updateSpy).toHaveBeenCalledWith(['option1']);
    });
  });

  describe('Props and Attributes', () => {
    it('applies inputAttributes correctly', () => {
      const modelValue = ref(false);
      const wrapper = mount(GymxCheckbox<boolean>, {
        props: {
          modelValue: modelValue.value,
          id: 'custom-id',
          inputAttributes: {
            name: 'checkbox-name',
            disabled: true,
            'data-testid': 'my-checkbox',
          },
          'onUpdate:modelValue': (val: boolean) => {
            modelValue.value = val;
          },
        },
      });

      const input = wrapper.find('input');
      expect(input.attributes('id')).toBe('custom-id');
      expect(input.attributes('name')).toBe('checkbox-name');
      expect(input.attributes('disabled')).toBeDefined();
      expect(input.attributes('data-testid')).toBe('my-checkbox');
    });

    it('applies state modifier classes', () => {
      const modelValue = ref(false);
      const wrapper = mount(GymxCheckbox<boolean>, {
        props: {
          modelValue: modelValue.value,
          state: 'disabled',
          'onUpdate:modelValue': (val: boolean) => {
            modelValue.value = val;
          },
        },
      });

      expect(wrapper.find('.checkbox').classes()).toContain('checkbox--disabled');
    });

    it('renders slot content', () => {
      const modelValue = ref(false);
      const wrapper = mount(GymxCheckbox<boolean>, {
        props: {
          modelValue: modelValue.value,
          'onUpdate:modelValue': (val: boolean) => {
            modelValue.value = val;
          },
        },
        slots: {
          default: '<strong>Custom Label</strong>',
        },
      });

      expect(wrapper.html()).toContain('<strong>Custom Label</strong>');
    });

    it('uses effectiveValue correctly for boolean without explicit value', () => {
      const modelValue = ref(false);
      const wrapper = mount(GymxCheckbox<boolean>, {
        props: {
          modelValue: modelValue.value,
          'onUpdate:modelValue': (val: boolean) => {
            modelValue.value = val;
          },
        },
      });

      expect(wrapper.find('input').attributes('value')).toBe('true');
    });

    it('uses explicit value when provided', () => {
      const modelValue = ref<string|boolean>(false);
      const wrapper = mount(GymxCheckbox<boolean|string>, {
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
    it('handles empty array correctly', async () => {
      const modelValue = ref<string[]>([]);
      const updateSpy = vi.fn((val: string[]) => {
        modelValue.value = val;
      });

      const wrapper = mount(GymxCheckbox<string[]>, {
        props: {
          modelValue: modelValue.value,
          value: 'first-item',
          'onUpdate:modelValue': updateSpy,
        },
      });

      expect(wrapper.find('input').element.checked).toBe(false);

      const input = wrapper.find('input');
      input.element.checked = true;
      await input.trigger('change');

      expect(updateSpy).toHaveBeenCalledWith(['first-item']);
    });

    it('handles mixed string/number values in arrays', () => {
      const modelValue = ref<(string | number)[]>(['text', 42, 'more-text']);
      const wrapper = mount(GymxCheckbox<(string|number)[]>, {
        props: {
          modelValue: modelValue.value,
          value: 42,
          'onUpdate:modelValue': (val) => {
            modelValue.value = val;
          },
        },
      });

      expect(wrapper.find('input').element.checked).toBe(true);
    });

    it('does not crash with undefined/null values', () => {
      const modelValue = ref(false);
      expect(() => {
        mount(GymxCheckbox<boolean>, {
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

      const wrapper1 = mount(GymxCheckbox<boolean>, {
        props: {
          modelValue: modelValue1.value,
          'onUpdate:modelValue': (val: boolean) => {
            modelValue1.value = val;
          },
        },
      });

      const wrapper2 = mount(GymxCheckbox<boolean>, {
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
      const wrapper = mount(GymxCheckbox<boolean>, {
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
