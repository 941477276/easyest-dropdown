<docs>

---
order: 0
title:
  zh-CN: 基本使用
  en-US: Basic usage
description:
  zh-CN: 需给`easy-dropdown-transition`传递一个`reference-ref`属性，该属性的值可以是一个`组件`、`dom节点`
  en-US: A `reference-ref` attribute needs to be passed to `easy-dropdown-transition`, and the value of this attribute can be a `component`, `dom node`
---
</docs>

<template>
  <div>
    <bs-button ref="referenceRef" type="primary" @click="showDropdown">{{ show ? 'Hide' : 'Show' }} custom dropdown</bs-button>
    <bs-button type="primary" @click="allowTeleport = true">Teleport to body</bs-button>

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
          <li>Vue <small>(渐进式JavaScript框架)</small></li>
          <li>React <small>(构建Web和原生交互界面的库)</small></li>
          <li>Angular <small>(一个应用设计框架与开发平台)</small></li>
        </ul>
      </easyest-dropdown-transition>
    </teleport>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useClickOutside } from '../../../hooks/useClickOutside';
import EasyestDropdownTransition from '../BsDropdownTransition.vue';
import '../easy-dropdown-transition.scss';

let willVisible = ref(false);
let show = ref(false);
let allowTeleport = ref(false);

let referenceRef = ref();
let dropdownRef = ref();
let showDropdown = function () {
  console.log(111);
  // willVisible必须比show先行，这样才能确保<easy-dropdown-transition>组件正确的计算过渡动画名称
  willVisible.value = !willVisible.value;
  let timer = setTimeout(function () {
    clearTimeout(timer);
    show.value = !show.value;
  }, 60);
};

// 鼠标点击下拉菜单外面后立即隐藏下拉菜单
useClickOutside([referenceRef, dropdownRef], function (isClickOutside) {
  if (isClickOutside) {
    console.log('isClickOutside111', isClickOutside);
    show.value = false;
    willVisible.value = false;
  }
});
</script>

<style lang="scss" scoped>
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
.bs-button {
  margin: 0 1rem 1rem 0;
}
</style>
