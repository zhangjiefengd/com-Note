
### Sass学习笔记 ###

----

1. 自定义变量确定css样式-$name-设置一个变量;

2. 选择器嵌套，类似与Dom的结构(设置的样式相互之间并不会影响);

3. 对其他的Sass文件的导入
```
		用`@import '';`且是优先读取,导入多个文件可用逗号隔开
```
4. 用minxin自定义代码段,主要便于css3的兼容性
```
		`@minxin Key ($vlaues){
			-webkit-Key:$vlaues;     
       		-moz-Key:$vlaues;
            Key:$vlaues;}`
```
5. 继承;通过`@extend`实现代码组合
```	
	.cssName{key:value;}
						=>.other .cssName{key:value;}
	.other{@extend .cssName;}
	或者是
	.other{@import "cssName";}
```
6. 运算可以进行一些简单的加减乘除运算;

7. 颜色的也可以进行运算，两个两个数值分别加减;

8. 在普通css中运用变量可以用`#{}`来插入他们,无论是运算还是插变量值都能用这个;

9. 在字符串操作的时候**字符串在前得到的就是字符串**，反之亦然;

10. 将`!default`添加到值的末尾，若变量已经被赋值将不会起作用，若没赋值或者是为null时生效;

