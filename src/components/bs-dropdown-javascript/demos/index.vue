<template>
  <div class="demo-index">
    <Basic></Basic>
    <Intelligent></Intelligent>
    <InDialog></InDialog>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Basic from './basic.vue';
import Intelligent from './intelligent.vue';
import InDialog from './in-dialog.vue';

export default defineComponent({
  name: 'DemoIndex',
  components: {
    Basic,
    Intelligent,
    InDialog
  }
});
</script>
