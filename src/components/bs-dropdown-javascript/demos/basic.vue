<docs>

---
order: 0
title:
  zh-CN: 基本使用
  en-US: Basic usage
description:
  zh-CN: 调用`easyDropdown.getDropdownDirection`函数即可获取下拉菜单即将显示的位置及宽高信息
  en-US: Call `easyDropdown.getDropdownDirection` function to get the position and width and height information of the drop-down menu to be displayed
---
</docs>

<template>
  <div>
    <button type="button" class="btn btn-primary" id="referenceEl">Show custom dropdown</button>

    <ul
      id="dropdownEl"
      class="my-custom-dropdown easy-dropdown-transition">
      <li>Html</li>
      <li>Javascript</li>
      <li>Css</li>
      <li>Vue <small>(渐进式JavaScript框架)</small></li>
      <li>React <small>(构建Web和原生交互界面的库)</small></li>
      <li>Angular <small>(一个应用设计框架与开发平台)</small></li>
    </ul>
  </div>
</template>

<script setup>
import easyestDropdown from '../easyest-dropdown';

// 模拟dom loaded事件
let timer = setTimeout(function () {
  clearTimeout(timer);
  var referenceEl = document.getElementById('referenceEl');
  var dropdownEl = document.getElementById('dropdownEl');
  var isShow = false;
  referenceEl.addEventListener('click', function () {
    if (isShow) {
      dropdownEl.style.display = 'none';
      isShow = false;
      return;
    }
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
    isShow = true;
  }, false);
}, 500);

</script>

<style lang="scss" scoped>
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
.bs-button {
  margin: 0 1rem 1rem 0;
}
</style>
