<template>
  <component :is="route.meta.layout || 'main'">
    <router-view></router-view>
  </component>
</template>

<script>
import { useRoute } from './use/core';

export default {
  name: 'App',

  setup() {
    return {
      route: useRoute(),
    };
  },
};
</script>
