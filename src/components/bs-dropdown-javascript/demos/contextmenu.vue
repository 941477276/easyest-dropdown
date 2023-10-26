<docs>

---
order: 0
title:
  zh-CN: 右键菜单
  en-US: Context Menu
description:
  zh-CN: 调用`easyDropdown.getContextmenuDirection`函数即可获取右键菜单即将显示的位置及宽高信息
  en-US: Call `easyDropdown.getContextmenuDirection` function to get the position and width and height information of the contextmenu(right-menu) menu to be displayed
---
</docs>

<template>
  <div>
    <bs-form-item label="Placement">
      <bs-radio-group v-model="placement">
        <bs-radio value="top">top</bs-radio>
        <bs-radio value="top-end">top-end</bs-radio>
        <bs-radio value="bottom">bottom</bs-radio>
        <bs-radio value="bottom-end">bottom-end</bs-radio>
      </bs-radio-group>
    </bs-form-item>
    <div class="context-menu-demo" id="demoRef1">
      <bs-button type="primary" @click="allowTeleport = !allowTeleport">Dropdown content teleport to body</bs-button>
      <bs-button type="primary" @click="hideDropdown">Hide Dropdown</bs-button>

      <teleport :disabled="!allowTeleport" to="body">
        <ul id="dropdownRef1" class="my-custom-dropdown">
          <li>Html</li>
          <li>Javascript</li>
          <li>Css</li>
        </ul>
      </teleport>

      <div class="content">Right click here!</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeMount } from 'vue';
import easyestDropdown from '../easyest-dropdown';
import '../../bs-dropdown-transition/easy-dropdown-transition.scss';

let isShow = false;
let allowTeleport = ref(false);
let placement = ref('top');

const hideDropdown = function () {
  let dropdownEl = document.getElementById('dropdownRef1');
  if (dropdownEl) {
    isShow = false;
    dropdownEl.style.display = 'none';
  }
};

const contextMenuEventFunc = function (evt: MouseEvent) {
  evt.preventDefault();
  let dropdownEl = document.getElementById('dropdownRef1')!;

  let elPosition = easyestDropdown.getContextmenuDirection({
    clientX: evt.clientX,
    clientY: evt.clientY
  }, dropdownEl, placement.value, true);
  console.log('elPosition', elPosition);

  if (!isShow) {
    dropdownEl.style.display = 'block';
    isShow = true;
  }

  dropdownEl.style.left = elPosition.right == null ? (elPosition.left + 'px') : 'auto';
  dropdownEl.style.right = elPosition.right != null ? (elPosition.right + 'px') : '';
  dropdownEl.style.top = elPosition.bottom == null ? (elPosition.top + 'px') : 'auto';
  dropdownEl.style.bottom = elPosition.bottom != null ? (elPosition.bottom + 'px') : '';

  // dropdownEl.style.left = elPosition.left + 'px';
  // dropdownEl.style.top = elPosition.top + 'px';
};

onMounted(function () {
  document.documentElement.addEventListener('contextmenu', contextMenuEventFunc, false);
});

onBeforeMount(function () {
  document.documentElement.removeEventListener('contextmenu', contextMenuEventFunc, false);
});
</script>

<style lang="scss" scoped>
.context-menu-demo{
  position: relative;
  padding: 20px;
  height: 300px;
  max-width: 600px;
  border: 1px solid #ccc;
  overflow: auto;
  .content{
    width: 1200px;
    height: 600px;
    padding: 50px 0 0 100px;
    font-size: 32px;
    color: #ccc;
    background-color: #f5f5f5;
  }
}
.my-custom-dropdown{
  display: none;
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
.bs-form-item{
  margin-bottom: 1rem;
}
.bs-button {
  margin: 0 1rem 1rem 0;
}
</style>
