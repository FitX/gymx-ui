import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { GymxChip } from './index';
import { ref } from 'vue';

type ChipValueTest = {
  value: string;
  lorem: string;
};

describe('GymxChip', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(GymxChip);
    expect(wrapper.exists()).toBeTruthy();
  });

  describe('Single Value Mode', () => {
    it('uses custom value for single chip', async () => {
      const modelValue = ref<string>('custom-value');
      const updateSpy = vi.fn((val?: string) => {
        modelValue.value = val || '';
      });

      const wrapper = mount(GymxChip<string>, {
        props: {
          modelValue: modelValue.value,
          value: 'custom-value',
          'onUpdate:modelValue': updateSpy,
        },
      });

      const button = wrapper.find('button');
      await button.trigger('click');

      expect(updateSpy).toHaveBeenCalledWith(undefined);
    });

    it('uses custom value for single chip (ChipValue Mode)', async () => {
      const modelValue = ref<ChipValueTest>();
      const wrapper = mount(GymxChip<ChipValueTest>, {
        props: {
          modelValue: modelValue.value as ChipValueTest,
          value: {
            value: 'option1',
            lorem: 'foo',
          },
        },
      });

      expect(wrapper.find('button').element.ariaPressed).toBe('false');
      const button = wrapper.find('button');
      await button.trigger('click');
      expect(wrapper.find('button').element.ariaPressed).toBe('true');
    });
  });

  describe('Array/Multiple Value Mode', () => {
    it('shows as unpressed when array is empty', () => {
      const modelValue = ref<string[]>([]);
      const wrapper = mount(GymxChip<string[]>, {
        props: {
          modelValue: modelValue.value,
          'onUpdate:modelValue': (val) => {
            modelValue.value = val || [];
          },
        },
      });

      expect(wrapper.find('button').element.ariaPressed).toBe('false');
    });

    it('shows as unpressed when value not in array', () => {
      const modelValue = ref(['option1', 'option3']);
      const wrapper = mount(GymxChip<string[]>, {
        props: {
          modelValue: modelValue.value,
          value: 'option2',
          'onUpdate:modelValue': (val?: string[]) => {
            modelValue.value = val || [];
          },
        },
      });

      expect(wrapper.find('button').element.ariaPressed).toBe('false');
    });

    it('shows as pressed when value is in array', () => {
      const modelValue = ref(['option1', 'option2']);
      const wrapper = mount(GymxChip<string[]>, {
        props: {
          modelValue: modelValue.value,
          value: 'option2',
          'onUpdate:modelValue': (val?: string[]) => {
            modelValue.value = val || [];
          },
        },
      });

      expect(wrapper.find('button').element.ariaPressed).toBe('true');
    });

    it('shows as pressed when value is in array (ChipValue Mode)', () => {
      const modelValue = ref<ChipValueTest[]>([
        {
          value: 'option1',
          lorem: 'foo',
        },
        {
          value: 'option2',
          lorem: 'bar',
        },
      ]);
      const wrapper = mount(GymxChip<ChipValueTest[]>, {
        props: {
          modelValue: modelValue.value,
          value: {
            value: 'option2',
            lorem: 'bar',
          },
        },
      });

      expect(wrapper.find('button').element.ariaPressed).toBe('true');
    });

    it('adds value to array when pressed', async () => {
      const modelValue = ref(['option1']);
      const updateSpy = vi.fn((val?: string[]) => {
        modelValue.value = val || [];
      });

      const wrapper = mount(GymxChip<string[]>, {
        props: {
          modelValue: modelValue.value,
          value: 'option2',
          'onUpdate:modelValue': updateSpy,
        },
      });

      const button = wrapper.find('button');
      await button.trigger('click');

      expect(updateSpy).toHaveBeenCalledWith(['option1', 'option2']);
    });

    it('removes value from array when unpressed', async () => {
      const modelValue = ref(['option1', 'option2', 'option3']);
      const updateSpy = vi.fn((val?: string[]) => {
        modelValue.value = val || [];
      });

      const wrapper = mount(GymxChip<string[]>, {
        props: {
          modelValue: modelValue.value,
          value: 'option2',
          'onUpdate:modelValue': updateSpy,
        },
      });

      const button = wrapper.find('button');
      await button.trigger('click');

      expect(updateSpy).toHaveBeenCalledWith(['option1', 'option3']);
    });

    it('removes value from array when unpressed (ChipValue Mode)', async () => {
      const modelValue = ref<ChipValueTest[]>([
        {
          value: 'option1',
          lorem: 'foo',
        },
        {
          value: 'option2',
          lorem: 'bar',
        },
      ]);
      const wrapper = mount(GymxChip<ChipValueTest[]>, {
        props: {
          modelValue: modelValue.value,
          value: {
            value: 'option2',
            lorem: 'bar',
          },
        },
      });

      expect(wrapper.find('button').element.ariaPressed).toBe('true');
      const button = wrapper.find('button');
      await button.trigger('click');
      expect(wrapper.find('button').element.ariaPressed).toBe('false');
    });

    it('handles numeric values in arrays', async () => {
      const modelValue = ref([1, 3]);
      const updateSpy = vi.fn((val?: number[]) => {
        modelValue.value = val || [];
      });

      const wrapper = mount(GymxChip<number[]>, {
        props: {
          modelValue: modelValue.value,
          value: 2,
          'onUpdate:modelValue': updateSpy,
        },
      });

      const button = wrapper.find('button');
      await button.trigger('click');

      expect(updateSpy).toHaveBeenCalledWith([1, 3, 2]);
    });

    it('does not add duplicate values to array', async () => {
      const modelValue = ref(['option1', 'option2']);
      const updateSpy = vi.fn((val?: string[]) => {
        modelValue.value = val || [];
      });

      const wrapper = mount(GymxChip<string[]>, {
        props: {
          modelValue: modelValue.value,
          value: 'option2',
          'onUpdate:modelValue': updateSpy,
        },
      });

      const button = wrapper.find('button');
      await button.trigger('click');

      expect(updateSpy).toHaveBeenCalledWith(['option1']);
    });
  });

  describe('Props and Attributes', () => {
    it('applies state modifier classes', () => {
      const modelValue = ref('option1');
      const wrapper = mount(GymxChip<string>, {
        props: {
          modelValue: modelValue.value,
          state: 'disabled',
          'onUpdate:modelValue': (val?: string) => {
            modelValue.value = val || '';
          },
        },
      });

      expect(wrapper.find('.chip').classes()).toContain('chip--disabled');
    });

    /* it('uses effectiveValue correctly for boolean without explicit value', () => {
      const modelValue = ref();
      const wrapper = mount(GymxChip<string>, {
        props: {
          modelValue: modelValue.value,
          'onUpdate:modelValue': (val: string) => {
            modelValue.value = val;
          },
        },
      });

      expect(wrapper.find('button').attributes('value')).toBe('');
    }); */

    /* it('uses explicit value when provided', () => {
      const modelValue = ref<string|boolean>(false);
      const wrapper = mount(GymxChip<boolean|string>, {
        props: {
          modelValue: modelValue.value,
          value: 'explicit-value',
          'onUpdate:modelValue': (val) => {
            modelValue.value = val;
          },
        },
      });

      expect(wrapper.find('button').attributes('value')).toBe('explicit-value');
    }); */
  });

  describe('Edge Cases', () => {
    it('handles empty array correctly', async () => {
      const modelValue = ref<string[]>([]);
      const updateSpy = vi.fn((val?: string[]) => {
        modelValue.value = val || [];
      });

      const wrapper = mount(GymxChip<string[]>, {
        props: {
          modelValue: modelValue.value,
          value: 'first-item',
          'onUpdate:modelValue': updateSpy,
        },
      });

      expect(wrapper.find('button').element.ariaPressed).toBe('false');

      const button = wrapper.find('button');
      await button.trigger('click');

      expect(updateSpy).toHaveBeenCalledWith(['first-item']);
    });

    it('handles disabled prop correctly', async () => {
      const modelValue = ref<string>('');
      const updateSpy = vi.fn((val?: string) => {
        modelValue.value = val || '';
      });

      const wrapper = mount(GymxChip<string>, {
        props: {
          modelValue: modelValue.value,
          value: 'first-item',
          state: 'disabled',
          'onUpdate:modelValue': updateSpy,
        },
      });

      const button = wrapper.find('button');
      await button.trigger('click');

      expect(updateSpy).toHaveBeenCalledTimes(0);
      await wrapper.setProps({ state: undefined });
      await button.trigger('click');
      expect(updateSpy).toHaveBeenCalledTimes(1);
    });

    it('handles mixed string/number values in arrays', () => {
      const modelValue = ref<(string | number)[]>(['text', 42, 'more-text']);
      const wrapper = mount(GymxChip<(string | number)[]>, {
        props: {
          modelValue: modelValue.value,
          value: 42,
          'onUpdate:modelValue': (val) => {
            modelValue.value = val || [];
          },
        },
      });

      expect(wrapper.find('button').element.ariaPressed).toBe('true');
    });

    it('does not crash with undefined/null values', () => {
      const modelValue = ref();
      expect(() => {
        mount(GymxChip<string>, {
          props: {
            modelValue: modelValue.value,
            // @ts-expect-error dont be undefined!
            value: undefined,
            'onUpdate:modelValue': (val) => {
              modelValue.value = val;
            },
          },
        });
      }).not.toThrow();
    });
  });
});
