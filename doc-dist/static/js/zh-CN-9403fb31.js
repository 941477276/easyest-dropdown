const n="工具组件",a="tool_component",s="原生Javascript",p=null,e="dropdown-javascript",o=`<p>智能自动定位的最基础的下拉组件，你可以用它实现任何带有下拉功能的组件.</p>
`,l=`<h2 class="api-h2" id="API_h2">API</h2>
<h3>EasyDropdown 对象</h3>
<ol>
<li>
<p><code>getDropdownDirection()</code>函数</p>
<ul>
<li>作用：获取下拉菜单定位信息</li>
<li>参数：
<ul>
<li><code>referenceEl { HTMLElement }</code>: 参照元素，必填</li>
<li><code>targetEl { HTMLElement }</code>: 目标元素，必填</li>
<li><code>direction { string }</code>: 默认方向，支持left、top、bottom、right、leftEnd、topEnd、bottomEnd、rightEnd，默认值：bottom</li>
<li><code>tryAllDirection { boolean }</code>: 当切换到direction对应的反方向目标元素也不能完全出现在视口时是否尝试切换其他方向，默认值：false</li>
<li><code>tryEndDirection { boolean }</code>: 是否尝试切换当前方向的尾部方向，默认值：true</li>
<li><code>dropdownOffset { top: number; left: number; }</code>: 下拉菜单距参照元素的偏移量</li>
</ul>
</li>
<li>返回值：<pre class="language-javascript"><code>  <span class="token keyword">interface</span> <span class="token class-name">DropdownDirection</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">bottom</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token operator">|</span>number<span class="token punctuation">;</span>
    <span class="token literal-property property">direction</span><span class="token operator">:</span> string<span class="token punctuation">;</span> <span class="token comment">// 显示方向</span>
    <span class="token literal-property property">horizontal</span><span class="token operator">:</span> boolean<span class="token punctuation">;</span> <span class="token comment">// 下拉元素在浏览器视口的水平方向是否完全可见</span>
    <span class="token literal-property property">horizontalVisibleWidth</span><span class="token operator">:</span> number<span class="token punctuation">;</span>
    <span class="token literal-property property">left</span><span class="token operator">:</span> number<span class="token punctuation">;</span>
    <span class="token literal-property property">right</span><span class="token operator">:</span> number<span class="token operator">|</span>number<span class="token punctuation">;</span>
    <span class="token literal-property property">scrollParentHorizontal</span><span class="token operator">:</span> boolean<span class="token punctuation">;</span> <span class="token comment">// 下拉元素在有滚动条的父级元素的横向区域是否完全可见</span>
    <span class="token literal-property property">scrollParentVertical</span><span class="token operator">:</span> boolean<span class="token punctuation">;</span>
    <span class="token literal-property property">top</span><span class="token operator">:</span> number<span class="token punctuation">;</span>
    <span class="token literal-property property">vertical</span><span class="token operator">:</span> boolean<span class="token punctuation">;</span> <span class="token comment">// 下拉元素在浏览器视口的垂直方向是否完全可见</span>
    <span class="token literal-property property">verticalVisibleHeight</span><span class="token operator">:</span> number<span class="token punctuation">;</span>
    isRollback<span class="token operator">?</span><span class="token operator">:</span> boolean<span class="token punctuation">;</span> <span class="token comment">// 是否为回滚到了默认方向</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre>
</li>
</ul>
</li>
<li>
<p><code>getScrollParent()</code>函数</p>
<ul>
<li>作用：获取元素有滚动条的父级元素</li>
<li>参数：
<ul>
<li><code>ele { HTMLElement }</code>: 目标元素</li>
</ul>
</li>
<li>返回值： <code>HTMLElement|undefined</code></li>
</ul>
</li>
<li>
<p><code>eleIsInFixedParents()</code>函数</p>
<ul>
<li>作用：判断dom元素是否处于fixed定位的元素中</li>
<li>参数：
<ul>
<li><code>ele { HTMLElement }</code>: 目标元素</li>
</ul>
</li>
<li>返回值： <code>boolean</code></li>
</ul>
</li>
<li>
<p><code>hasScroll()</code>函数</p>
<ul>
<li>作用：判断浏览器或dom元素是否有滚动条</li>
<li>参数：
<ul>
<li><code>ele { HTMLElement }</code>: 目标元素。可选，如果未传递参数则为判断浏览器是否有滚动条</li>
</ul>
</li>
<li>返回值：<pre class="language-javascript"><code> <span class="token keyword">interface</span> <span class="token class-name">HasScroll</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">vertical</span><span class="token operator">:</span> boolean<span class="token punctuation">;</span> <span class="token comment">// 垂直方向是否有滚动条</span>
  <span class="token literal-property property">horizontal</span><span class="token operator">:</span> boolean<span class="token punctuation">;</span>  <span class="token comment">// 水平方向是否有滚动条</span>
<span class="token punctuation">}</span>
</code></pre>
</li>
</ul>
</li>
<li>
<p><code>scrollWidth()</code>函数</p>
<ul>
<li>作用：获取元素或浏览器滚动条的宽度</li>
<li>参数：
<ul>
<li><code>ele { HTMLElement }</code>: 目标元素。可选，如果未传递参数则为获取浏览器滚动条的宽度</li>
</ul>
</li>
<li>返回值：<pre class="language-javascript"><code> <span class="token keyword">interface</span> <span class="token class-name">ScrollWidth</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">vertical</span><span class="token operator">:</span> number<span class="token punctuation">;</span> <span class="token comment">// 垂直方向滚动条的宽度</span>
  <span class="token literal-property property">horizontal</span><span class="token operator">:</span> number<span class="token punctuation">;</span>  <span class="token comment">// 水平方向滚动条的宽度</span>
<span class="token punctuation">}</span>
</code></pre>
</li>
</ul>
</li>
<li>
<p><code>offset()</code>函数</p>
<ul>
<li>作用：获取元素距浏览器最顶部及最左边的距离</li>
<li>参数：
<ul>
<li><code>ele { HTMLElement }</code>: 目标元素</li>
</ul>
</li>
<li>返回值：<pre class="language-javascript"><code> <span class="token keyword">interface</span> <span class="token class-name">OffsetInfo</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">top</span><span class="token operator">:</span> number<span class="token punctuation">;</span> 
  <span class="token literal-property property">left</span><span class="token operator">:</span> number<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre>
</li>
</ul>
</li>
<li>
<p><code>isClickOutside()</code>函数</p>
<ul>
<li>作用：判断是否点击在了指定元素外面</li>
<li>参数：
<ul>
<li><code>eventTarget { HTMLElement }</code>: 待比较的元素</li>
<li><code>eles { HTMLElement|HTMLElement[] }</code>: 目标元素</li>
</ul>
</li>
<li>返回值：<code>boolean</code></li>
</ul>
</li>
<li>
<p><code>camelCase2KebabCase()</code>函数</p>
<ul>
<li>作用：小驼峰命名转短横线命名</li>
<li>参数：
<ul>
<li><code>camelStr { string }</code>: 小驼峰字符串</li>
</ul>
</li>
<li>返回值：<code>string</code></li>
</ul>
</li>
</ol>
`,t={type:n,typeCode:a,title:s,subtitle:null,componentName:e,description:o,apiContent:l};export{l as apiContent,e as componentName,t as default,o as description,p as subtitle,s as title,n as type,a as typeCode};
