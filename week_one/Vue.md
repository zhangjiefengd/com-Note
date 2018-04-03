### Vue ###
---

v-if 为 false是不在Dome节点中;
v-show 为false时是display为none值;

---
组件
---
props: (数组或字符串)
		接受父组件给子组件的变量或方法

父元素
		<p slot="username"></p>
子元素
		<slot name="username"></slot>

子元素的name等于父元素的slot;
子元素将接受父元素插进来的信息

---
在过渡的元素中若是相同的标签名，需要用key来区分才能产生动画


---
命名视图
给不同的视图不同的组件

---
重定向
```
routes: [
	{
		path: '/',
		redirect: '/a'
	}
]
//将路径为/时跳转到/a;

<keeplive>
</keeplive>
//将会保存内存
````
