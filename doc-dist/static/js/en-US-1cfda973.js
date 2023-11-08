const n="tool component",e="tool_component",t="Native Javascript",l=null,s="dropdown-javascript",a=`<p>The most basic drop-down component for intelligent automatic positioning, you can use it to implement any component with drop-down function.</p>
`,o=`<h2 class="api-h2" id="API_h2">API</h2>
<h3>EasyDropdown object</h3>
<ol>
<li>
<p><code>getDropdownDirection()</code> function</p>
<ul>
<li>Function: Get the positioning information of the drop-down menu</li>
<li>parameters:
<ul>
<li><code>referenceEl { HTMLElement }</code>: reference element, required</li>
<li><code>targetEl { HTMLElement }</code>: target element, required</li>
<li><code>direction { string }</code>: default direction, support left, top, bottom, right, leftEnd, topEnd, bottomEnd, rightEnd, default value: bottom</li>
<li><code>tryAllDirection { boolean }</code>: Whether to try to switch to other directions when the target element in the opposite direction corresponding to the direction cannot fully appear in the viewport, default value: false</li>
<li><code>tryEndDirection { boolean }</code>: whether to try to switch the end direction of the current direction, default value: true</li>
<li><code>dropdownOffset { top: number; left: number; }</code>: the offset of the dropdown menu from the reference element</li>
</ul>
</li>
<li>return value:<pre class="language-typescript"><code>  <span class="token keyword">interface</span> <span class="token class-name">DropdownDirection</span> <span class="token punctuation">{</span>
    bottom<span class="token operator">:</span> <span class="token keyword">null</span><span class="token operator">|</span><span class="token builtin">number</span><span class="token punctuation">;</span>
    direction<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span> <span class="token comment">// display direction</span>
    horizontal<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span> <span class="token comment">// Whether the drop-down element is fully visible in the horizontal direction of the browser viewport</span>
    horizontalVisibleWidth<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
    left<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
    right<span class="token operator">:</span> <span class="token builtin">number</span><span class="token operator">|</span><span class="token builtin">number</span><span class="token punctuation">;</span>
    scrollParentHorizontal<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span> <span class="token comment">// Whether the drop-down element is fully visible in the horizontal area of the parent element with scroll bars</span>
    scrollParentVertical<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>
    top<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
    vertical<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span> <span class="token comment">// Whether the drop-down element is fully visible in the vertical direction of the browser viewport</span>
    verticalVisibleHeight<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
    isRollback<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span> <span class="token comment">// Whether to roll back to the default direction</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre>
</li>
</ul>
</li>
<li>
<p><code>getContextmenuDirection()</code> function</p>
<ul>
<li>Function: Get the positioning information of the context-menu(right-menu) menu</li>
<li>parameters:
<ul>
<li><code>virtualMouseEvt { clientX: number; clientY: number; contextElement?: HTMLElement; }</code>: virtual mouse event object, required</li>
<li><code>targetEl { HTMLElement }</code>: target element, required</li>
<li><code>direction { string }</code>: default direction, support left, top, bottom, right, leftEnd, topEnd, bottomEnd, rightEnd, default value: bottom</li>
<li><code>tryAllDirection { boolean }</code>: Whether to try to switch to other directions when the target element in the opposite direction corresponding to the direction cannot fully appear in the viewport, default value: false</li>
<li><code>tryEndDirection { boolean }</code>: whether to try to switch the end direction of the current direction, default value: true</li>
<li><code>dropdownOffset { top: number; left: number; }</code>: the offset of the dropdown menu from the reference element</li>
</ul>
</li>
<li>return value:<pre class="language-typescript"><code>  <span class="token keyword">interface</span> <span class="token class-name">DropdownDirection</span> <span class="token punctuation">{</span>
    bottom<span class="token operator">:</span> <span class="token keyword">null</span><span class="token operator">|</span><span class="token builtin">number</span><span class="token punctuation">;</span>
    direction<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span> <span class="token comment">// display direction</span>
    horizontal<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span> <span class="token comment">// Whether the drop-down element is fully visible in the horizontal direction of the browser viewport</span>
    horizontalVisibleWidth<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
    left<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
    right<span class="token operator">:</span> <span class="token builtin">number</span><span class="token operator">|</span><span class="token builtin">number</span><span class="token punctuation">;</span>
    scrollParentHorizontal<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span> <span class="token comment">// Whether the drop-down element is fully visible in the horizontal area of the parent element with scroll bars</span>
    scrollParentVertical<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>
    top<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
    vertical<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span> <span class="token comment">// Whether the drop-down element is fully visible in the vertical direction of the browser viewport</span>
    verticalVisibleHeight<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
    isRollback<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span> <span class="token comment">// Whether to roll back to the default direction</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre>
</li>
</ul>
</li>
<li>
<p><code>getScrollParent()</code> function</p>
<ul>
<li>Function: Get the parent element of the element with a scroll bar</li>
<li>parameters:
<ul>
<li><code>ele { HTMLElement }</code>: target element</li>
</ul>
</li>
<li>Return value: <code>HTMLElement|undefined</code></li>
</ul>
</li>
<li>
<p><code>eleIsInFixedParents()</code> function</p>
<ul>
<li>Function: to determine whether the dom element is in the fixed positioned element</li>
<li>parameters:
<ul>
<li><code>ele { HTMLElement }</code>: target element</li>
</ul>
</li>
<li>return value: <code>boolean</code></li>
</ul>
</li>
<li>
<p><code>hasScroll()</code> function</p>
<ul>
<li>Role: determine whether the browser or dom element has a scroll bar</li>
<li>parameters:
<ul>
<li><code>ele { HTMLElement }</code>: target element. Optional, if no parameters are passed, it is to determine whether the browser has scroll bars</li>
</ul>
</li>
<li>return value:<pre class="language-typescript"><code> <span class="token keyword">interface</span> <span class="token class-name">HasScroll</span> <span class="token punctuation">{</span>
  vertical<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span> <span class="token comment">// Whether there is a scroll bar in the vertical direction</span>
  horizontal<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span> <span class="token comment">// Whether there is a scroll bar in the horizontal direction</span>
<span class="token punctuation">}</span>
</code></pre>
</li>
</ul>
</li>
<li>
<p><code>scrollWidth()</code> function</p>
<ul>
<li>Function: Get the width of the element or browser scroll bar</li>
<li>parameters:
<ul>
<li><code>ele { HTMLElement }</code>: target element. Optional, if no parameter is passed, it will get the width of the browser scroll bar</li>
</ul>
</li>
<li>return value:<pre class="language-typescript"><code> <span class="token keyword">interface</span> <span class="token class-name">ScrollWidth</span> <span class="token punctuation">{</span>
  vertical<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span> <span class="token comment">// The width of the vertical scroll bar</span>
  horizontal<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span> <span class="token comment">// The width of the horizontal scroll bar</span>
<span class="token punctuation">}</span>
</code></pre>
</li>
</ul>
</li>
<li>
<p><code>offset()</code> function</p>
<ul>
<li>Function: Get the distance between the element and the topmost and leftmost of the browser</li>
<li>parameters:
<ul>
<li><code>ele { HTMLElement }</code>: target element</li>
</ul>
</li>
<li>return value:<pre class="language-typescript"><code> <span class="token keyword">interface</span> <span class="token class-name">OffsetInfo</span> <span class="token punctuation">{</span>
  top<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
  left<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre>
</li>
</ul>
</li>
<li>
<p>The <code>isClickOutside()</code> function</p>
<ul>
<li>Function: determine whether the click is outside the specified element</li>
<li>parameters:
<ul>
<li><code>eventTarget { HTMLElement }</code>: element to be compared</li>
<li><code>eles { HTMLElement|HTMLElement[] }</code>: target element</li>
</ul>
</li>
<li>return value: <code>boolean</code></li>
</ul>
</li>
<li>
<p><code>camelCase2KebabCase()</code> function</p>
<ul>
<li>Function: Name changed from small hump to dash name</li>
<li>parameters:
<ul>
<li><code>camelStr { string }</code>: small camel case string</li>
</ul>
</li>
<li>return value: <code>string</code></li>
</ul>
</li>
</ol>
`,i={type:n,typeCode:e,title:t,subtitle:null,componentName:s,description:a,apiContent:o};export{o as apiContent,s as componentName,i as default,a as description,l as subtitle,t as title,n as type,e as typeCode};
