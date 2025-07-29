<script lang="ts" setup generic="T extends string | number | boolean | Array<string | number>">
import type { GymxCheckboxProps } from './types.ts';
import { getModifierClasses } from '@/utils/css-modifier.ts';
import { computed } from 'vue';

defineOptions({
  inheritAttrs: false,
});

type CheckboxComponentProps = GymxCheckboxProps<T>;

const props = withDefaults(defineProps<CheckboxComponentProps>(), {
  inputAttributes: () => ({}),
  state: undefined,
})

const model = defineModel<T>({ required: true });

const isChecked = computed(() => {
  if (Array.isArray(model.value)) {
    return (model.value as Array<string | number>).includes(props.value as string | number)
  }
  return model.value === props.value
})

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement

  if (Array.isArray(model.value)) {
    // multi usw
    const currentArray = model.value as Array<string | number>
    const newValue = [...currentArray]
    const valueToToggle = props.value as string | number

    if (target.checked) {
      if (!newValue.includes(valueToToggle)) {
        newValue.push(valueToToggle)
      }
    } else {
      const index = newValue.indexOf(valueToToggle)
      if (index > -1) {
        newValue.splice(index, 1)
      }
    }
    model.value = newValue as T
  } else {
    // single
    model.value = (target.checked ? props.value : false) as T
  }
}
</script>
<template>
  <span class="checkbox" :class="[getModifierClasses('checkbox', props.state)]">
    <input
      class="checkbox__input"
      type="checkbox"
      v-bind="props.inputAttributes"
      :checked="isChecked"
      :value="props.value"
      @change="handleChange" />
  </span>
</template>
<style lang="scss" scoped></style>
