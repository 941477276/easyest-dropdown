<docs>

---
order: 0
title:
  zh-CN: 智能定位
  en-US: Smart positioning
description:
  zh-CN: 通过给浏览器绑定`resize`事件、父级滚动容器绑定`scroll`事件并在事件中调用`easyestDropdown.getDropdownDirection`函数即可实现智能定位功能
  en-US: The smart positioning function can be realized by binding the `resize` event to the browser, binding the `scroll` event to the parent scrolling container, and calling the `easyestDropdown.getDropdownDirection` function in the event
---
</docs>

<template>
  <div class="auto-placement-demo-box">
    <div class="auto-placement-demo-content">
      <button type="button" class="btn btn-primary reference-btn" id="referenceEl2">Show custom dropdown</button>
      <ul
        id="dropdownEl2"
        class="my-custom-dropdown easy-dropdown-transition">
        <li>Html</li>
        <li>Javascript</li>
        <li>Css</li>
        <li>Vue</li>
        <li>React</li>
        <li>Angular</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import easyestDropdown from '../easyest-dropdown';

// 模拟dom loaded事件
let timer = setTimeout(function () {
  clearTimeout(timer);
  var referenceEl = document.getElementById('referenceEl2');
  var dropdownEl = document.getElementById('dropdownEl2');
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
  referenceEl.addEventListener('click', function () {
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
}, 500);

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
  display: none;
  position: absolute;
  padding: 0;
  //margin: 0;
  z-index: 1999;
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
