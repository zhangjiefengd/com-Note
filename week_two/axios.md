###Axios###
----

####引入方式####

---

1. 直接引入 
```
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```
2. 在本地安装
```
npm install axios --save
```

####语法####

----

```
axios.get("地址", {
		params: {
			userId: "999"
		},
		header: {
			token: "jack"
		},
	})
	.then(res->{
		this.msg = res.msg;
		});
	.catch(function (error) {
			console.log("error init." + error)
		});
```