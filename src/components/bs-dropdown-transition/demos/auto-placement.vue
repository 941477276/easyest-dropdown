<docs>

---
order: 0
title:
  zh-CN: 自动调整位置
  en-US: Auto-adjust placement
description:
  zh-CN: 自动调整位置
  en-US: auto-adjust placement
---
</docs>

<template>
  <div class="auto-placement-demo-box">
    <bs-button type="primary" @click="allowTeleport = true">Teleport to body</bs-button>

    <div class="auto-placement-demo-content">
      <bs-button class="reference-btn" ref="referenceRef" type="primary" @click="showDropdown">{{ show ? 'Hide' : 'Show' }} custom dropdown</bs-button>

      <teleport :disabled="!allowTeleport" to="body">
        <easyest-dropdown-transition
          :will-visible="willVisible"
          :reference-ref="referenceRef">
          <ul
            ref="dropdownRef"
            v-show="show"
            class="my-custom-dropdown">
            <li>Html</li>
            <li>Javascript</li>
            <li>Css</li>
            <li>Vue</li>
            <li>React</li>
            <li>Angular</li>
          </ul>
        </easyest-dropdown-transition>
      </teleport>
    </div>
  </div>
</template>

<script setup lang="ts">
import EasyestDropdownTransition from '../BsDropdownTransition.vue';
import { ref } from 'vue';
import { useClickOutside } from '../../../hooks/useClickOutside';
import '../easy-dropdown-transition.scss';

let willVisible = ref(false);
let show = ref(false);
let allowTeleport = ref(false);

let referenceRef = ref();
let dropdownRef = ref();
let showDropdown = function () {
  // willVisible必须比show先行，这样才能确保<easy-dropdown-transition>组件正确的计算过渡动画名称
  willVisible.value = !willVisible.value;
  let timer = setTimeout(function () {
    clearTimeout(timer);
    show.value = !show.value;
  }, 60);
};

// 鼠标点击下拉菜单外面后立即隐藏下拉菜单
useClickOutside([referenceRef, dropdownRef], function (isClickOutside) {
  console.log('isClickOutside', isClickOutside);
  if (isClickOutside) {
    show.value = false;
    willVisible.value = false;
  }
});
</script>

<style lang="scss" scoped>
.auto-placement-demo-box{
  max-width: 400px;
  max-height: 400px;
  border: 1px solid #ccc;
  overflow: auto;
}
.auto-placement-demo-content{
  width: 1400px;
  height: 1400px;
}
.reference-btn{
  margin: 15rem 20rem;
}
.my-custom-dropdown{
  position: absolute;
  padding: 0;
  //margin: 0;
  z-index: 999;
  border: 1px solid #f0f0f0;
  background-color: #fff;
  box-shadow: 0 0 8px rgba(0,0,0,0.1);
  list-style: none;
  li{
    height: 2rem;
    line-height: 2rem;
    padding: 0 1rem;
    border-bottom: 1px solid #f0f0f0;
    cursor: pointer;
    transition: all .3s;
    &:last-child{
      border-bottom: 0;
    }
    &:hover{
      color: #fff;
      background-color: var(--primary);
    }
  }
}
</style>
