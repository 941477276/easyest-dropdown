<docs>

---
order: 0
title:
  zh-CN: 弹出位置
  en-US: Placements
description:
  zh-CN:
    `easy-dropdown-transition`组件共有`top`、`topCenter`、`topRight`、`bottom`、`bottomCenter`、`bottomRight`、`left`、`leftCenter`、`leftBottom`、`right`、`rightCenter`、`rightBottom`12个弹窗位置。
    并它们可以根据下拉内容和视口宽高自行调整至最佳弹出位置
  en-US:
    The `easy-dropdown-transition` component has a total of `top`, `topCenter`, `topRight`, `bottom`, `bottomCenter`, `bottomRight`, `left`, `leftCenter`, `leftBottom`, `right`, `rightCenter`, `rightBottom` 12 pop-up positions.
    And they can adjust themselves to the best pop-up position according to the drop-down content and viewport width and height
---
</docs>

<template>
  <div>
    <ul class="placement-list">
      <li
        v-for="placement in vertical"
        :key="placement">
        <bs-button :ref="el => setRef(placement, el, 'vertical')" type="primary" @click="showDropdown(placement, 'vertical')">{{ placement }}</bs-button>

        <teleport to="body">
          <easyest-dropdown-transition
            :placement="placement"
            :will-visible="verticalVisibles[placement].willVisible"
            :reference-ref="verticalRefs[placement]">
            <ul
              ref="dropdownRef"
              v-show="verticalVisibles[placement].visible"
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
      </li>
    </ul>

    <ul class="placement-list">
      <li
        v-for="placement in horizontal"
        :key="placement">
        <bs-button :ref="el => setRef(placement, el, 'horizontal')" type="primary" @click="showDropdown(placement, 'horizontal')">{{ placement }}</bs-button>

        <teleport to="body">
          <easyest-dropdown-transition
            :placement="placement"
            :will-visible="horizontalVisibles[placement].willVisible"
            :reference-ref="horizontalRefs[placement]">
            <ul
              ref="dropdownRef"
              v-show="horizontalVisibles[placement].visible"
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
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import EasyestDropdownTransition from '../BsDropdownTransition.vue';
import '../easy-dropdown-transition.scss';

let vertical = ref(['top', 'topCenter', 'topEnd', 'bottom', 'bottomCenter', 'bottomEnd']);
let horizontal = ref(['left', 'leftCenter', 'leftEnd', 'right', 'rightCenter', 'rightEnd']);

let verticalRefs = reactive({});
let horizontalRefs = reactive({});
let setRef = function (key, el, type) {
  // console.log('setRef', key, el, type);
  let refs = type == 'vertical' ? verticalRefs : horizontalRefs;
  refs[key] = el;
};

let verticalVisibles = reactive(vertical.value.reduce(function (result, item) {
  result[item] = {
    visible: false,
    willVisible: false
  };
  return result;
}, {}));
let horizontalVisibles = reactive(horizontal.value.reduce(function (result, item) {
  result[item] = {
    visible: false,
    willVisible: false
  };
  return result;
}, {}));

// 显示下拉框
let showDropdown = function (placement, type) {
  let visibles = type == 'vertical' ? verticalVisibles : horizontalVisibles;
  let visibleVar = visibles[placement];

  if (visibleVar.visible) {
    visibleVar.willVisible = false;
    visibleVar.visible = false;
    return;
  }
  // willVisible必须比show先行，这样才能确保<easy-dropdown-transition>组件正确的计算过渡动画名称
  visibleVar.willVisible = true;
  let timer = setTimeout(function () {
    clearTimeout(timer);
    visibleVar.visible = true;
  }, 60);
};
</script>

<style lang="scss" scoped>
.placement-list{
  list-style: none;
  li{
    display: inline-block;
    margin: 10px;
  }
}
.my-custom-dropdown{
  position: absolute;
  padding: 0;
  //margin: 0;
  z-index: 2000;
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
