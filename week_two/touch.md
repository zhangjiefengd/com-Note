#### 事件绑定 ####

```
touch.on( element, type, callback);
```

`element` -> 事件绑定的元素或选择器
`type`: -> 可接受多事件以空格分开
`callback` -> 事件处理函数

#### 解除事件代理 ####

```
touch.off( delegateElement, types, selector, callback)
```

`selector`代理子元素选择器;(可选，没有就是解除事件绑定)

#### 触发事件 ####
```
touch.trigger(element, type);
```

		pinchstart  ---  缩放手势起点
		pinchend  	---  缩放手势终点
		pinch		---  缩放手势
		pinchin     ---  收缩
		pinchout    ---  放大
		rotateleft  ---  向左旋转
		rotateright ---  向右旋转
		rotate      ---  旋转
		swipestart  ---  滑动手势起点
		swiping     ---  滑动中
		swipeend	---  滑动手势终点
		swipeleft	---  向左滑动
		swiperight	---  向右滑动
		swipeup		---  向上滑动
		swipedown	---  向下滑动
		swipe		---  滑动
		dragstart	---  拖动屏幕
		drag		---  拖动手势
		dragend		---  拖动屏幕
		hold		---  长按屏幕
		tap			---  单击屏幕
		doubletap   ---  双击屏幕



