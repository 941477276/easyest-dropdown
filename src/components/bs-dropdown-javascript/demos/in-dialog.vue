<docs>
---
order: 0
title:
  zh-CN: 在弹窗中
  en-US: In the popup
description:
  zh-CN:
    `easyest-dropdown`组件在弹窗中也能正确的显示
  en-US:
    The `easyest-dropdown` component can also be displayed correctly in the popup window
---
</docs>

<template>
  <div>
    <bs-button type="primary" @click="modalVisible2 = true">Show Modal</bs-button>

    <bs-modal title="A bts-vue modal" v-model:visible="modalVisible2" scrollable @open="handleOpen">
      <p>modal content!</p>
      <p>modal content!</p>
      <p>modal content!</p>
      <p>modal content!</p>
      <p>modalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodal</p>
      <p>modal content!</p>
      <p>modal content!</p>
      <p>modal content!</p>
      <p>modal content!</p>
      <p>modal content!</p>
      <p>modal content!</p>
      <p>modal content!</p>
      <p>modal content!</p>
      <bs-button id="referenceEl3" type="primary" style="margin-left: 10rem">Show custom dropdown</bs-button>
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

      <ul
        id="dropdownEl3"
        class="my-custom-dropdown easy-dropdown-transition">
        <li>Html</li>
        <li>Javascript</li>
        <li>Css</li>
        <li>Vue</li>
        <li>React</li>
      </ul>
    </bs-modal>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import easyestDropdown from '../easyest-dropdown';

let modalVisible2 = ref(false);

let dropdownInInited = false;
const initDropdown = function () {
  if (dropdownInInited) {
    return;
  }
  var referenceEl = document.getElementById('referenceEl3');
  var dropdownEl = document.getElementById('dropdownEl3');
  var isShow = false;
  // 刷新定位
  var refresh = function () {
    var dropdownPosition = easyestDropdown.getDropdownDirection(referenceEl, dropdownEl, 'bottom', true);
    console.log('dropdownPosition', dropdownPosition);
    dropdownEl.style.left = dropdownPosition.right == null ? (dropdownPosition.left + 'px') : 'auto';
    dropdownEl.style.right = dropdownPosition.right != null ? (dropdownPosition.right + 'px') : '';
    dropdownEl.style.top = dropdownPosition.bottom == null ? (dropdownPosition.top + 'px') : 'auto';
    dropdownEl.style.bottom = dropdownPosition.bottom != null ? (dropdownPosition.bottom + 'px') : '';
    dropdownEl.style.display = 'block';
    var classNameArr = dropdownEl.className.split(' ');
    var placementClassName = classNameArr.find(function (className) {
      return className.startsWith('easy-placement-');
    });
    if (placementClassName) {
      dropdownEl.classList.remove(placementClassName);
    }
    dropdownEl.classList.add('easy-placement-' + easyestDropdown.camelCase2KebabCase(dropdownPosition.direction));
  };

  var documentNodeNames = ['HTML', 'BODY'];
  var referenceScrollParent;
  console.log('referenceEl', referenceEl);
  referenceEl.addEventListener('click', function () {
    console.log(111111);
    if (isShow) {
      dropdownEl.style.display = 'none';
      isShow = false;
      if (referenceScrollParent) {
        referenceScrollParent.removeEventListener('scroll', refresh, false);
      }
      window.removeEventListener('scroll', refresh, false);
      window.removeEventListener('resize', refresh, false);
      referenceScrollParent = null;
      return;
    }

    refresh();
    isShow = true;
    referenceScrollParent = easyestDropdown.getScrollParent(referenceEl);
    var nodeName = referenceScrollParent?.nodeName || '';

    // 如果参照元素有有滚动条的父级节点且不为body，则给该父级节点绑定scroll事件，在容器滚动的时候刷新下拉位置
    if (referenceScrollParent && !documentNodeNames.includes(nodeName)) {
      referenceScrollParent.addEventListener('scroll', refresh, false);
    }
    window.addEventListener('scroll', refresh, false);
    window.addEventListener('resize', refresh, false);
  }, false);
  dropdownInInited = true;
};

const handleOpen = function () {
  let timer = setTimeout(function () {
    clearTimeout(timer);
    initDropdown();
  }, 500);
};
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
