<docs>
---
order: 0
title:
  zh-CN: 在弹窗中
  en-US: In the popup
description:
  zh-CN:
    `easy-dropdown-transition`组件在弹窗中也能正确的显示
  en-US:
    The `easy-dropdown-transition` component can also be displayed correctly in the popup window
---
</docs>

<template>
  <div>
    <bs-button type="primary" @click="modalVisible = true" style="margin-right: 1rem;">Show Modal</bs-button>
    <bs-button type="primary" @click="modalVisible2 = true">Show Modal2</bs-button>

    <bs-modal class="modal1" title="A bts-vue modal" v-model:visible="modalVisible">
      <p>modal content!</p>
      <p>modal content!</p>
      <p>modal content!</p>
      <p>modal content!</p>
      <p>modal content!</p>
      <p>modal content!</p>
      <p>modal content!</p>
      <!--<p>modalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodal</p>-->
      <p>modal content!</p>
      <p>modal content!</p>
      <p>modal content!</p>
      <p>modal content!</p>
      <p>modal content!</p>
      <p>modal content!</p>
      <bs-button ref="referenceRef" type="primary" @click="showDropdown" style="margin-left: 10rem;margin-right: 1rem;">{{ show ? 'Hide' : 'Show' }} custom dropdown</bs-button>
      <bs-button type="primary" @click="allowTeleport = !allowTeleport">Teleport to body</bs-button>
      <p>modal content!</p>
      <p>modal content!</p>
      <p>modal content!</p>
      <p>modal content!</p>
      <p>modal content!</p>
      <p>modal content!</p>
      <p>modal content!</p>
      <p>modal content!</p>
      <p>modal content!</p>
      <p>modal content!</p>
      <p>modal content!</p>
      <p>modal content!</p>
      <p>modal content!</p>

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
          </ul>
        </easyest-dropdown-transition>
      </teleport>
    </bs-modal>

    <bs-modal title="A bts-vue modal" v-model:visible="modalVisible2" scrollable>
      <p>modal content!</p>
      <p>modal content!</p>
      <p>modal content!</p>
      <p>modal content!</p>
      <p>modal content!</p>
      <p>modal content!</p>
      <p>modal content!</p>
      <p>modal content!</p>
      <p>modalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodal</p>
      <p>modal content!</p>
      <p>modal content!</p>
      <p>modal content!</p>
      <p>modal content!</p>
      <p>modal content!</p>
      <bs-button ref="referenceRef2" type="primary" @click="showDropdown2" style="margin-left: 10rem;">{{ show2 ? 'Hide' : 'Show' }} custom dropdown</bs-button>
      <p>modal content!</p>
      <p>modal content!</p>
      <p>modal content!</p>
      <p>modal content!</p>
      <p>modal content!</p>
      <p>modal content!</p>
      <p>modal content!</p>
      <p>modal content!</p>
      <p>modal content!</p>
      <p>modal content!</p>
      <p>modal content!</p>
      <p>modal content!</p>
      <p>modal content!</p>

      <teleport :disabled="!allowTeleport2" to="body">
        <easyest-dropdown-transition
          data-placement="top"
          :will-visible="willVisible2"
          :reference-ref="referenceRef2">
          <ul
            ref="dropdownRef2"
            v-show="show2"
            class="my-custom-dropdown">
            <li>Html</li>
            <li>Javascript</li>
            <li>Css</li>
            <li>Vue</li>
            <li>React</li>
          </ul>
        </easyest-dropdown-transition>
      </teleport>
    </bs-modal>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import EasyestDropdownTransition from '../BsDropdownTransition.vue';
import { useClickOutside } from '../../../hooks/useClickOutside';
import '../easy-dropdown-transition.scss';

let modalVisible = ref(false);
let modalVisible2 = ref(false);

let willVisible = ref(false);
let willVisible2 = ref(false);

let show = ref(false);
let show2 = ref(false);
let allowTeleport = ref(false);
let allowTeleport2 = ref(false);

let referenceRef = ref();
let referenceRef2 = ref();
let dropdownRef = ref();
let dropdownRef2 = ref();
let showDropdown = function () {
  // willVisible必须比show先行，这样才能确保<easy-dropdown-transition>组件正确的计算过渡动画名称
  willVisible.value = !willVisible.value;
  let timer = setTimeout(function () {
    clearTimeout(timer);
    show.value = !show.value;
  }, 60);
};

let showDropdown2 = function () {
  // willVisible必须比show先行，这样才能确保<easy-dropdown-transition>组件正确的计算过渡动画名称
  willVisible2.value = !willVisible2.value;
  let timer = setTimeout(function () {
    clearTimeout(timer);
    show2.value = !show2.value;
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
.my-custom-dropdown{
  position: absolute;
  padding: 0;
  //margin: 0;
  z-index: 2500;
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
