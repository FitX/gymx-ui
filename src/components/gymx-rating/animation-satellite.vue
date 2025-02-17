
<script lang="ts" setup>
const props = defineProps<{ animation: boolean }>();
</script>
<template>
  <div
    :class="{ 'animation' : props.animation }"
    class="satellite">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:math";
$satellite-size: 0.625rem;
$satellite-move: $satellite-size * 7;
.satellite {
  position: absolute;
  left: 50%; top: 50%;
  width: ($satellite-size * 4);
  height: ($satellite-size * 4);
  margin-left: (($satellite-size * 2) * -1);
  margin-top: (($satellite-size * 2) * -1);
  pointer-events: none;
  span {
    position: absolute;
    width: $satellite-size;
    height: $satellite-size;
    border-radius: 50%;
    margin-top: math.div(($satellite-size * -1), 2);
    margin-left: math.div(($satellite-size * -1), 2);
    transition: all ease .5s;
    transition-delay: var(--delay);
    transform-origin: center 0;
    transform: translate(0,0) scale(0);
    animation-timing-function: cubic-bezier(0.165, 0.840, 0.440, 1.000);
    animation-duration: 1.5s;
    animation-fill-mode: forwards;
    animation-delay: var(--delay);
  }
  &.animation {
    span {
      background: var(--gymx-color-primary);
      &:nth-child(1) {
        top: 0; left: 50%;
        animation-name: satellite-top;
      }
      &:nth-child(2) {
        top: 25%; left: 100%;
        animation-name: satellite-top-right;
      }
      &:nth-child(3) {
        top: 75%; left: 100%;
        animation-name: satellite-bottom-right;
      }
      &:nth-child(4) {
        top: 100%; left: 50%;
        animation-name: satellite-bottom;
      }
      &:nth-child(5) {
        top: 75%; left: 0;
        animation-name: satellite-bottom-left;
      }
      &:nth-child(6) {
        top: 25%; left: 0;
        animation-name: satellite-top-left;
      }
    }
  }
}
@keyframes satellite-top-left {
  0% {
    transform: scale(1) translate(0,0);
  }
  100% {
    transform:
      scale(0)
      translate(math.div(-2*$satellite-move, 2.236), math.div($satellite-move * -1, 2.236));
  }
}
@keyframes satellite-top {
  0% {
    transform: scale(1) translate(0,0);
  }
  100% {
    transform: scale(0) translate(0, -$satellite-move);
  }
}
@keyframes satellite-top-right {
  0% {
    transform: scale(1) translate(0,0);
  }
  100% {
    transform:
      scale(0)
      translate(math.div(2*$satellite-move, 2.236), math.div(-$satellite-move, 2.236));
  }
}
@keyframes satellite-bottom-right {
  0% {
    transform: scale(1) translate(0,0);
  }
  100% {
    transform:
      scale(0)
      translate(math.div(2*$satellite-move, 2.236), math.div($satellite-move, 2.236));
  }
}
@keyframes satellite-bottom {
  0% {
    transform: scale(1) translate(0,0);
  }
  100% {
    transform: scale(0) translate(0, $satellite-move);
  }
}
@keyframes satellite-bottom-left {
  0% {
    transform: scale(1) translate(0,0);
  }
  100% {
    transform:
      scale(0)
      translate(math.div(-2*$satellite-move, 2.236), math.div($satellite-move, 2.236));
  }
}
</style>
