# easyest-dropdown

`easyest-dropdown` is the most basic drop-down component that can be positioned intelligently. You can use it to implement any component with drop-down functions, such as custom select, date and time selector, multi-level menu, auto-fill input box, etc.

The intelligent positioning of `easyest-dropdown` is reflected in:
1. When the drop-down pop-up window cannot be fully displayed in the browser viewport or the visible area of the scrolling container, it will be automatically adjusted to the best display position.
2. The drop-down pop-up window is preferentially positioned with `right` and `bottom`, which can ensure that the width and height of the drop-down pop-up window are dynamically modified after the pop-up window is displayed, and the display position of the drop-down pop-up window is still normal

`easyest-dropdown` does not have any external dependencies, so you can use it in projects like `native JavaScript`, `vue`, `react`, `angular`, etc.

**Effect：**

![easyest-dropdown effect](./imgs/easyest-dropdown.gif "easyest-dropdown effect")

## Install
1. Install using `npm`
```bash
npm install easyest-dropdown -S
```
[Document and demo](https://941477276.github.io/easyest-dropdown/doc-dist/)

[中文文档](./README-CN.md)

## use
### 1. Traditional projects
If your project is a traditional project, you need to download the `dist/easyest-dropdown.js` file and put it in your project, and then import `easyest-dropdown.js` through the browser `<script>` tag.
```html
<head>
  <!--If you don't use the css that comes with easyest-dropdown, then you don't need to import it-->
  <!--<link rel="stylesheet" href="./easyest-dropdown.css">-->
  <script src="./easyest-dropdown.js"></script>
</head>

<body>
    <button type="button" class="btn btn-primary" id="referenceEl">Show custom dropdown</button>
    
    <ul id="dropdownEl" class="my-custom-dropdown easyest-dropdown-transition">
      <li>Html</li>
      <li>Javascript</li>
      <li>Css</li>
      <li>Vue <small>(渐进式JavaScript框架)</small></li>
      <li>React <small>(构建Web和原生交互界面的库)</small></li>
      <li>Angular <small>(一个应用设计框架与开发平台)</small></li>
    </ul>
    <script>
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
          return className.startsWith('easyest-placement-');
        });
        if (placementClassName) {
          dropdownEl.classList.remove(placementClassName);
        }
        dropdownEl.classList.add('easyest-placement-' + easyestDropdown.camelCase2KebabCase(dropdownPosition.direction));
        isShow = true;
      }, false);
    </script>
</body>
```

### 2. vue3
**Method 1: Global Registration**(main.js)
```js
import { createApp } from 'vue';
import EasyestDropdownTransition from 'easyest-dropdown/vue3/es';
import 'easyest-dropdown/vue3/es/easyest-dropdown.css';


const app = createApp(...);
app.use(EasyestDropdownTransition);
app.mount('#app');
```

**Method 2: Partial Registration**
```js
import EasyestDropdownTransition from 'easyest-dropdown/vue3/es';
import 'easyest-dropdown/vue3/es/easyest-dropdown.css';

export default defineComponent({
   name: 'ATestComponent',
   components: {
      EasyestDropdownTransition
   }
});
```

**Usage：**
```html
<template>
  <bs-button ref="referenceRef" type="primary" @click="showDropdown">{{ show ? 'Hide' : 'Show' }} custom dropdown</bs-button>
  <bs-button type="primary" @click="allowTeleport = true">Teleport to body</bs-button>

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
        <li>Vue <small>(渐进式JavaScript框架)</small></li>
        <li>React <small>(构建Web和原生交互界面的库)</small></li>
        <li>Angular <small>(一个应用设计框架与开发平台)</small></li>
      </ul>
    </easyest-dropdown-transition>
  </teleport>
</template>

<script>
  import EasyestDropdownTransition from 'easyest-dropdown/vue3/es';
  import 'easyest-dropdown/vue3/es/easyest-dropdown.css';

  export default defineComponent({
    name: 'ATestComponent',
    components: {
       EasyestDropdownTransition
    },
    setup () {
      let willVisible = ref(false);
      let show = ref(false);
      let allowTeleport = ref(false);

      let referenceRef = ref();
      let dropdownRef = ref();
      let showDropdown = function () {
        // willVisible must precede show to ensure that the <easyest-dropdown-transition> component correctly calculates the transition animation name
        willVisible.value = !willVisible.value;
        let timer = setTimeout(function () {
          clearTimeout(timer);
          show.value = !show.value;
        }, 60);
      };

      // Hide the drop-down menu immediately after the mouse clicks outside the drop-down menu
      useClickOutside([referenceRef, dropdownRef], function (isClickOutside) {
        if (isClickOutside) {
          show.value = false;
          willVisible.value = false;
        }
      });
      return {
        willVisible,
        show,
        allowTeleport,
        referenceRef,
        dropdownRef,
        showDropdown
      };
    }
  });
</script>
```

3. Modular development

    If you use a modular development mode (applicable to `vue`, `react`, `angular`), you need to import easyest-dropdown, and then use it like a traditional mode:

```javascript
import easyDropdown from 'easyest-dropdown';
// If you don't use the css that comes with easyest-dropdown, then you don't need to import it
// import 'easyest-dropdown/dist/easyest-dropdown.css';

var dropdownPosition = easyDropdown.getDropdownDirection(referenceEl, dropdownEl, 'bottom', true);
console.log('dropdownPosition', dropdownPosition);
```
