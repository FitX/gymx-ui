
<script lang="ts" setup>
import {
  IconVote1,
  IconVote2,
  IconVote3,
  IconVote4,
  IconVote5
} from '../icons';
import AnimationSatellite from './animation-satellite.vue';
import type { GymxRatingProps } from '@/components/gymx-rating/types.ts';
import { computed } from 'vue';

const titles = [
  'nicht so gut',
  'naja',
  'ok',
  'gut',
  'sehr gut',
] as const

const icons = [
  IconVote1,
  IconVote2,
  IconVote3,
  IconVote4,
  IconVote5,
];

const props = withDefaults(defineProps<GymxRatingProps>(), {
  multipleVotes: false,
  direction: 'row',
  numberOfVotes: 5,
});

const vote = defineModel<number>();
const componentsByVoteCount = computed(() => {
  const votes = Array.from(Array(5).keys()).map((index) => ({ vote: (index + 1), title: titles[index], component: icons[index]}));
  if (props.numberOfVotes < 5) {
    return votes.filter((_, index) => index % 2 === 0);
  }
  return votes;
});

const saveVote = (_vote: number) => {
  if (!props.multipleVotes && !!vote.value) return
  vote.value = _vote;
}
</script>
<template>
  <div
    class="rating"
    role="region"
    :aria-label="`${numberOfVotes} möglichkeiten zur Bewertungs`"
    :style="{
      '--gymx-rating-votes': numberOfVotes,
      '--gymx-rating-direction' : direction,
    }">
    <button
      v-for="icon in componentsByVoteCount"
      :key="icon.vote"
      :class="[
        { 'animation' : vote === icon.vote },
        { 'vote--inactive' : vote && vote !== icon.vote },
        `vote--${icon.vote}`
      ]"
      :aria-disabled="!props.multipleVotes && !!vote"
      :aria-pressed="vote === icon.vote"
      class="vote"
      :data-test="`vote-${icon.vote}`"
      :aria-label="`Bewerte mit ${icon.title}`"
      @click="saveVote(icon.vote)">
      <component
        :is="icon.component"
        class="rating__icon"
      ></component>
      <animation-satellite
        data-test="animation-wrapper"
        v-if="vote === icon.vote"
        :animation="true" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
// @use currently only with dart-sass
// @use '~@/assets/styles/mixins.scss' as mixin;
// @import '@/assets/styles/mixin-reset.scss';

.rating {
  --icon-fill: var(--gymx-rating-icon-fill, var(--gymx-color-gray-12));
  --icon-size: var(--gymx-rating-icon-size, var(--gymx-size-3));
  --_gymx-rating-icon-fill-active: var(--gymx-rating-icon-fill-active, var(--gymx-color-primary));
  --_gymx-rating-icon-fill-disabled: var(--gymx-rating-icon-fill-disabled, var(--gymx-color-gray-8));

  display: inline-flex;
  flex-wrap: wrap;
  place-content: center;
  flex-direction: var(--gymx-rating-direction, row);
  font-size: var(--voting-font-size);
  gap: var(--gymx-rating-gap, var(--gymx-size-1));

  &__icon {
    --icon-width: var(--icon-size);
    --icon-height: auto;
  }
}
.vote {
  // @include btn-reset();
  padding: 0;
  position: relative;
  border: none;
  background: none;
  display: inline-flex;
  place-items: center;
  outline: none;
  aspect-ratio: 1;
  &:is(:focus-visible),  &:is(:hover):not([aria-disabled=true], .animation) {
    --icon-fill: var(--_gymx-rating-icon-fill-disabled);
  }
  &.animation {
    animation:
      icon-animation cubic-bezier(0.165, 0.840, 0.440, 1.000) 800ms;
  }
  &.animation {
    --icon-fill: var(--_gymx-rating-icon-fill-active);
  }
}
@keyframes icon-animation {
  0% {
    transform: scale(0.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
