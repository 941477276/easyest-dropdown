import {
  offset,
  eleIsInFixedParents,
  getScrollParent,
  hasScroll,
  scrollWidth,
  elementContains,
  camelCase2KebabCase
} from '../../utils/bs-util';
import { getDropdownDirection } from '../bs-dropdown-transition/useDropdownDirection';
import version from '../../../src/version';

export interface DropdownOffset {
  top?: number;
  left?: number;
  // bottom?: number;
  // right?: number;
}

export interface DropdownDirection {
  bottom: null|number;
  direction: string;
  horizontal: boolean;
  horizontalVisibleWidth: number;
  left: number;
  right: number|number;
  scrollParentHorizontal: boolean;
  scrollParentVertical: boolean;
  top: number;
  vertical: boolean;
  verticalVisibleHeight: number;
  isRollback?: boolean; // 是否为回滚到了默认方向
};

export interface EasyestDropdown {
  version:string;
  getDropdownDirection: (referenceEl: HTMLElement, targetEl: HTMLElement, direction: string, tryAllDirection?: boolean, tryEndDirection?: boolean, dropdownOffset?: DropdownOffset) => DropdownDirection;
  eleIsInFixedParents: (ele: HTMLElement) => boolean;
  getScrollParent: (ele: HTMLElement) => HTMLElement|undefined;
  hasScroll: (ele?: HTMLElement) => { vertical: boolean; horizontal: boolean; };
  scrollWidth: (ele?: HTMLElement) => { vertical: boolean; horizontal: boolean; };
  offset: (ele: HTMLElement) => { top: number; left: number; };
  camelCase2KebabCase: (camelStr: string) => string;
}

function EasyDropdown () {
  // @ts-ignore
  this.version = version;
};
EasyDropdown.prototype.getDropdownDirection = getDropdownDirection;
EasyDropdown.prototype.eleIsInFixedParents = eleIsInFixedParents;
EasyDropdown.prototype.getScrollParent = getScrollParent;
EasyDropdown.prototype.hasScroll = hasScroll;
EasyDropdown.prototype.scrollWidth = scrollWidth;
EasyDropdown.prototype.offset = offset;
EasyDropdown.prototype.camelCase2KebabCase = camelCase2KebabCase;
/**
 * 判断是否点击在了指定元素外面
 * @param eventTarget 鼠标当前点击的元素
 * @param eles 需监听的目标元素
 */
EasyDropdown.prototype.isClickOutside = function (eventTarget: HTMLElement, eles: HTMLElement|HTMLElement[]) {
  let target = eventTarget;
  let flag = false;
  if (Array.isArray(eles)) {
    flag = !eles.some(function (refItem) {
      // 点击的元素与参照元素一样，则不算点击在了外面
      if (refItem === target) {
        return true;
      }
      return elementContains(refItem, target);
    });
  } else {
    if (eles === target) {
      flag = false;
    } else {
      flag = !elementContains(eles, target);
    }
  }
  return flag;
};

// @ts-ignore
const easyDropdown = new EasyDropdown();

export default easyDropdown;
