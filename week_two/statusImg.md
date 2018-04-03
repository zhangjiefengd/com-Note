#### 静态路径的处理 ####

##### 第一种： #####

```
	<img  v-for='item in imgArray' :src="item.src" alt="">

	export default{
		data () {
			return {
				imgArray: [
					{
						src: require('../assets/img')
					},{
						src: require('../assets/img')
					}
				]
			}
		}
	}
```

##### 第二种 #####

在src中建立json文件，在src同级中建立static文件将图片存放在新建文件img中。
json文件中存储图片的方式为：
```
	{
		"LinkImg": [{
				"src": "./static/img/twitter.png",
				"webUrl": "",
				"goWeb": true
			},{
				"src": "./static/img/wenxin.png",
				"webUrl": "",
				"goWeb": true
			}
			]
	}
```
