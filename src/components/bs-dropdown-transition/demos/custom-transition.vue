<docs>

---
order: 0
title:
  zh-CN: 自定义过渡名称
  en-US: Custom transition name
description:
  zh-CN: 设置`custom-transition-name`属性可自定义过渡名称，它接收一个`Function`，该函数需返回一个`string`类型的名称
  en-US: Set the `custom-transition-name` attribute to customize the transition name, which receives a `Function`, which needs to return a name of type `string`
---
</docs>

<template>
  <div>
    <bs-button ref="referenceRef" type="primary" @click="showDropdown">
      {{ show ? 'Hide' : 'Show' }}
      <strong style="font-size: 1.2em;">my-zoom</strong>
      transition dropdown
    </bs-button>

    <teleport :disabled="!allowTeleport" to="body">
      <easyest-dropdown-transition
        :will-visible="willVisible"
        :reference-ref="referenceRef"
        :custom-transition-name="getTransitionName"
        :custom-style="getStyle"
        :offset="{ top: 5.36, left: 5.36 }">
        <ul
          v-show="show"
          ref="dropdownRef"
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
  // willVisible必须比show先行，这样才能确保<dropdown-transition>组件正确的计算过渡动画名称
  willVisible.value = !willVisible.value;
  let timer = setTimeout(function () {
    clearTimeout(timer);
    show.value = !show.value;
  }, 60);
};
let getTransitionName = function (positionInfo) {
  // 定位信息
  console.log('positionInfo', positionInfo);
  return 'my-zoom';
};
let getStyle = function (positionInfo) {
  // 定位信息
  console.log('positionInfo', positionInfo);
  let direction = positionInfo.direction;
  let origin = '';
  if (direction.startsWith('top')) {
    origin = 'center bottom';
  } else if (direction.startsWith('bottom')) {
    origin = 'center top';
  }
  if (origin) {
    return {
      'transform-origin': origin,
      '-ms-transform-origin': origin,
      '-webkit-transform-origin': origin
    };
  }
  return null;
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
.my-custom-dropdown{
  position: absolute;
  padding: 0;
  //margin: 0;
  list-style: none;
  z-index: 999;
  border: 1px solid #f0f0f0;
  box-shadow: 0 0 8px rgba(0,0,0,0.1);
  background-color: #fff;
  &.my-zoom-enter-active,
  &.my-zoom-leave-active{
    transition: transform .2s, opacity .2s;
  }
  &.my-zoom-enter-from,
  &.my-zoom-leave-to{
    transform: scale(0.2);
    //transform-origin: 100% 100%;
    opacity: 0.2;
  }
  &.my-zoom-enter-to,
  &.my-zoom-leave-from{
    transform: scale(1);
    //transform-origin: 100% 100%;
    opacity: 1;
  }
  li{
    height: 2rem;
    line-height: 2rem;
    padding: 0 1rem;
    border-bottom: 1px solid #f0f0f0;
    cursor: pointer;
    transition: all .3s;
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
