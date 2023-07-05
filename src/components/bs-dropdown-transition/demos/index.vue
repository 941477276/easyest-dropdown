<template>
<div class="demo-index">
  <Basic></Basic>
  <Align></Align>
  <AutoPlacement></AutoPlacement>
  <InDialog></InDialog>
  <CustomTransition></CustomTransition>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Basic from './basic.vue';
import CustomTransition from './custom-transition.vue';
import Align from './aligns.vue';
import AutoPlacement from './auto-placement.vue';
import InDialog from './in-dialog.vue';

export default defineComponent({
  name: 'DemoIndex',
  components: {
    Basic,
    CustomTransition,
    Align,
    AutoPlacement,
    InDialog
  }
});
</script>
