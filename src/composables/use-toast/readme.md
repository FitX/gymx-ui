# useToast Documentation

## Table of Contents

- [Introduction](#introduction)
- [Toast Interface](#toast-interface)
- [Default Values](#default-values)
- [Error Handling](#error-handling)
- [Composable Structure](#composable-structure)
  - [State](#state)
  - [Methods](#methods)
    - [addToast](#addToast)
    - [removeToast](#removeToast)
- [Usage Example](#usage-example)
- [Accessibility](#accessibility-example-with-live-regions)
- [Use Cases](#use-cases)

## Introduction

The `useToast` composable provides a simple way to manage toast notifications.
It allows adding and removing toast notifications with different types and optional durations.
[Take a look at the toast component](/docs/components-toast--docs).

## Toast Interface

The `Toast` interface defines the structure of a toast notification:

```ts
interface Toast {
  id: number;
  type: GymxToastProps['type'];
  msg: string;
  duration?: number;
}
```

- **id**: A unique number that is automatically generated to identify each toast notification.
- **type**: The type of the toast notification. Defined by `GymxToastProps['type']` and can have different styles or icons ('info' | 'success' | 'warning' | 'error').
- **msg**: The actual message that will be displayed in the toast. This value is required.
- **duration**: Optional. The time in milliseconds for which the toast stays visible before being automatically removed. If no value is passed, a default duration is used (except for error messages, which need to be dismissed manually).

## Composable Structure

### Default Values

**DEFAULT_DURATION**: If no `duration` is specified for the toast notification,
it will stay visible for 6000 ms (6 seconds).
Toast notifications of type `error` do not have an automatic time limit and must be manually dismissed.

### Error Handling

If a toast notification is added without a `msg`, an error is thrown: `Message is required`.

### State

`toasts`: A `ref<Toast[]>` array that stores the list of current toast notifications.

### Methods

#### addToast

`addToast(toastContent: Omit<Toast, 'id' | 'type'>): void`
Adds a new toast notification.

**Parameters:**
`toastContent`: An object containing the message (`msg`) and optionally the duration (`duration`) of the toast. The `id` are generated automatically, `type` has a Fallback to 'info'.

**Example:**

```ts
addToast({
  msg: 'This is a success message',
  duration: 5000,
});
```

#### removeToast

`removeToast(id: number): void`
Removes a toast notification by its `id`.

**Parameters:**
`id`: The unique ID of the toast notification to be removed.

**Example:**
`removeToast(1);`

## Usage Example

```ts
import { useToast } from '@fitx/gymx-ui';
const { toasts, addToast, removeToast } = useToast();

addToast({ msg: 'New message added!' });
removeToast(1);
```

## Accessibility: Example with Live Regions

Each toast message is assigned an appropriate role to ensure screen reader users are informed effectively:

- Error messages (with type `"error"`) are assigned the role `alert`, indicating that the message should be announced immediately by screen readers.
- Non-error messages are assigned the role `status`, which conveys less urgency and is announced more passively.

### Focus on Accessibility

The component should be used with live regions, as shown in the following example,
to ensure accessibility and provide real-time updates to users relying on assistive technologies.
Error messages are prioritized immediately using the `alert` role and assertive live regions,
while non-critical messages are handled with `status` roles and polite live regions.
To provide more flexibility, the live region implementation is neither in the composable nor in the component itself.

```vue
<script lang="ts" setup>
import { computed } from 'vue';
import { useToast } from '@fitx/gymx-ui';
const { toasts, addToast, removeToast } = useToast();

const success = () =>
  addToast({
    msg: 'your message has been received.',
    type: 'success',
  });

const warning = () =>
  addToast({
    msg: 'If you are inactive for another minute you will be logged out.',
    type: 'warning',
  });

const info = () =>
  addToast({
    msg: 'You have 3 new messages.',
  });

const error = () =>
  addToast({
    msg: 'Message cannot be sent. Please log in again.',
    type: 'error',
  });

const alertMessage = computed(() => toasts.value.find((t) => t.type === 'error')?.msg);
const statusMessage = computed(() => toasts.value.find((t) => t.type !== 'error')?.msg);

return {
  toasts,
  removeToast,
  alertMessage,
  statusMessage,
  success,
  warning,
  error,
  info,
};
</script>
<template>
  <gymx-toast
    v-for="toast in toasts"
    :key="toast.id"
    :text="toast.msg"
    :type="toast.type"
    :duration="toast.duration"
    @close="removeToast(toast.id)" />

  <div
    id="alert-live-region"
    aria-live="assertive"
    aria-atomic="false"
    class="sr-only">
    {{ alertMessage }}
  </div>

  <div
    id="status-live-region"
    aria-live="polite"
    aria-atomic="false"
    class="sr-only">
    {{ statusMessage }}
  </div>
</template>
```

## Use Cases

- Displaying notifications after a successful user action.
- Showing error messages when something goes wrong.
- Informing the user of important status changes.

## Additional Resources

- [MDN Live Region](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions)
