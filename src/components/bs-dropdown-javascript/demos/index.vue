<template>
  <div class="demo-index">
    <Basic></Basic>
    <Intelligent></Intelligent>
    <InDialog></InDialog>
    <Contextmenu></Contextmenu>
    <ContextmenuContextElement></ContextmenuContextElement>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Basic from './basic.vue';
import Intelligent from './intelligent.vue';
import InDialog from './in-dialog.vue';
import Contextmenu from './contextmenu.vue';
import ContextmenuContextElement from './contextmenu-context-element.vue';

export default defineComponent({
  name: 'DemoIndex',
  components: {
    Basic,
    Intelligent,
    InDialog,
    Contextmenu,
    ContextmenuContextElement
  }
});
</script>
