---
category: Components
type: tool component
typeCode: tool_component
title: Native Javascript
subtitle:
---

The most basic drop-down component for intelligent automatic positioning, you can use it to implement any component with drop-down function.

## API

### EasyDropdown object

1. `getDropdownDirection()` function
    + Function: Get the positioning information of the drop-down menu
    + parameters:
        + `referenceEl { HTMLElement }`: reference element, required
        + `targetEl { HTMLElement }`: target element, required
        + `direction { string }`: default direction, support left, top, bottom, right, leftEnd, topEnd, bottomEnd, rightEnd, default value: bottom
        + `tryAllDirection { boolean }`: Whether to try to switch to other directions when the target element in the opposite direction corresponding to the direction cannot fully appear in the viewport, default value: false
        + `tryEndDirection { boolean }`: whether to try to switch the end direction of the current direction, default value: true
        + `dropdownOffset { top: number; left: number; }`: the offset of the dropdown menu from the reference element
    + return value:
      ```javascript
        interface DropdownDirection {
          bottom: null|number;
          direction: string; // display direction
          horizontal: boolean; // Whether the drop-down element is fully visible in the horizontal direction of the browser viewport
          horizontalVisibleWidth: number;
          left: number;
          right: number|number;
          scrollParentHorizontal: boolean; // Whether the drop-down element is fully visible in the horizontal area of the parent element with scroll bars
          scrollParentVertical: boolean;
          top: number;
          vertical: boolean; // Whether the drop-down element is fully visible in the vertical direction of the browser viewport
          verticalVisibleHeight: number;
          isRollback?: boolean; // Whether to roll back to the default direction
        };
      ```

2. `getScrollParent()` function
    + Function: Get the parent element of the element with a scroll bar
    + parameters:
        + `ele { HTMLElement }`: target element
    + Return value: `HTMLElement|undefined`

3. `eleIsInFixedParents()` function
    + Function: to determine whether the dom element is in the fixed positioned element
    + parameters:
        + `ele { HTMLElement }`: target element
    + return value: `boolean`

4. `hasScroll()` function
    + Role: determine whether the browser or dom element has a scroll bar
    + parameters:
        + `ele { HTMLElement }`: target element. Optional, if no parameters are passed, it is to determine whether the browser has scroll bars
    + return value:
      ```javascript
       interface HasScroll {
        vertical: boolean; // Whether there is a scroll bar in the vertical direction
        horizontal: boolean; // Whether there is a scroll bar in the horizontal direction
      }
      ```

5. `scrollWidth()` function
    + Function: Get the width of the element or browser scroll bar
    + parameters:
        + `ele { HTMLElement }`: target element. Optional, if no parameter is passed, it will get the width of the browser scroll bar
    + return value:
      ```javascript
       interface ScrollWidth {
        vertical: number; // The width of the vertical scroll bar
        horizontal: number; // The width of the horizontal scroll bar
      }
      ```

6. `offset()` function
    + Function: Get the distance between the element and the topmost and leftmost of the browser
    + parameters:
        + `ele { HTMLElement }`: target element
    + return value:
      ```javascript
       interface OffsetInfo {
        top: number;
        left: number;
      }
      ```

7. The `isClickOutside()` function
    + Function: determine whether the click is outside the specified element
    + parameters:
        + `eventTarget { HTMLElement }`: element to be compared
        + `eles { HTMLElement|HTMLElement[] }`: target element
    + return value: `boolean`

8. `camelCase2KebabCase()` function
    + Function: Name changed from small hump to dash name
    + parameters:
        + `camelStr { string }`: small camel case string
    + return value: `string`
