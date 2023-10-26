---
category: Components
type: 工具组件
typeCode: tool_component
title: 原生Javascript
subtitle: 
---

智能自动定位的最基础的下拉组件，你可以用它实现任何带有下拉功能的组件.

## API

### EasyDropdown 对象

1. `getDropdownDirection()`函数
    + 作用：获取下拉菜单定位信息
    + 参数：
        +  `referenceEl { HTMLElement }`: 参照元素，必填
        +  `targetEl { HTMLElement }`: 目标元素，必填
        +  `direction { string }`: 默认方向，支持left、top、bottom、right、leftEnd、topEnd、bottomEnd、rightEnd
        +  `tryAllDirection { boolean }`: 当切换到direction对应的反方向目标元素也不能完全出现在视口时是否尝试切换其他方向，默认值：false
        +  `tryEndDirection { boolean }`: 是否尝试切换当前方向的尾部方向，默认值：true
        +  `dropdownOffset { top: number; left: number; }`: 下拉菜单距参照元素的偏移量
    + 返回值：
      ```typescript
        interface DropdownDirection {
          bottom: null|number;
          direction: string; // 显示方向
          horizontal: boolean; // 下拉元素在浏览器视口的水平方向是否完全可见
          horizontalVisibleWidth: number;
          left: number;
          right: number|number;
          scrollParentHorizontal: boolean; // 下拉元素在有滚动条的父级元素的横向区域是否完全可见
          scrollParentVertical: boolean;
          top: number;
          vertical: boolean; // 下拉元素在浏览器视口的垂直方向是否完全可见
          verticalVisibleHeight: number;
          isRollback?: boolean; // 是否为回滚到了默认方向
        };
      ```

2. `getContextmenuDirection()`函数
   + 作用：获取右键菜单定位信息
   + 参数：
      +  `virtualMouseEvt { clientX: number; clientY: number; contextElement?: HTMLElement; // 上下文元素 }`: 虚拟鼠标事件对象，必填
      +  `targetEl { HTMLElement }`: 目标元素，必填
      +  `direction { string }`: 默认方向，top、bottom、topEnd、bottomEnd
      +  `tryAllDirection { boolean }`: 当切换到direction对应的反方向目标元素也不能完全出现在视口时是否尝试切换其他方向，默认值：false
      +  `tryEndDirection { boolean }`: 是否尝试切换当前方向的尾部方向，默认值：true
      +  `dropdownOffset { top: number; left: number; }`: 下拉菜单距参照元素的偏移量
   + 返回值：
     ```typescript
       interface DropdownDirection {
         bottom: null|number;
         direction: string; // 显示方向
         horizontal: boolean; // 下拉元素在浏览器视口的水平方向是否完全可见
         horizontalVisibleWidth: number;
         left: number;
         right: number|number;
         scrollParentHorizontal: boolean; // 下拉元素在有滚动条的父级元素的横向区域是否完全可见
         scrollParentVertical: boolean;
         top: number;
         vertical: boolean; // 下拉元素在浏览器视口的垂直方向是否完全可见
         verticalVisibleHeight: number;
         isRollback?: boolean; // 是否为回滚到了默认方向
       };
     ```
      
3. `getScrollParent()`函数
    + 作用：获取元素有滚动条的父级元素
    + 参数：
      + `ele { HTMLElement }`: 目标元素
    + 返回值： `HTMLElement|undefined`

4. `eleIsInFixedParents()`函数
    + 作用：判断dom元素是否处于fixed定位的元素中
    + 参数：
        + `ele { HTMLElement }`: 目标元素
    + 返回值： `boolean`

5. `hasScroll()`函数
    + 作用：判断浏览器或dom元素是否有滚动条
    + 参数：
        + `ele { HTMLElement }`: 目标元素。可选，如果未传递参数则为判断浏览器是否有滚动条
    + 返回值：
      ```typescript
       interface HasScroll {
        vertical: boolean; // 垂直方向是否有滚动条
        horizontal: boolean;  // 水平方向是否有滚动条
      }
      ```

6. `scrollWidth()`函数
    + 作用：获取元素或浏览器滚动条的宽度
    + 参数：
        + `ele { HTMLElement }`: 目标元素。可选，如果未传递参数则为获取浏览器滚动条的宽度
    + 返回值：
      ```typescript
       interface ScrollWidth {
        vertical: number; // 垂直方向滚动条的宽度
        horizontal: number;  // 水平方向滚动条的宽度
      }
      ```

7. `offset()`函数
    + 作用：获取元素距浏览器最顶部及最左边的距离
    + 参数：
        + `ele { HTMLElement }`: 目标元素
    + 返回值：
      ```typescript
       interface OffsetInfo {
        top: number; 
        left: number;
      }
      ```

8. `isClickOutside()`函数
    + 作用：判断是否点击在了指定元素外面
    + 参数：
        + `eventTarget { HTMLElement }`: 待比较的元素
        + `eles { HTMLElement|HTMLElement[] }`: 目标元素
    + 返回值：`boolean`

9. `camelCase2KebabCase()`函数
    + 作用：小驼峰命名转短横线命名
    + 参数：
        + `camelStr { string }`: 小驼峰字符串
    + 返回值：`string`
