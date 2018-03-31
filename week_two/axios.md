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
get请求：
```
axios.get('url', {
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
post请求：
```
	axios.post('url', {
			firstName: 'Fred',
			lastName: 'Flintstone'
		})
		.then(function (response) {
			console.log(response);
		})
		.catch(function(error) {
			console.log(error);
		})
```

并发请求：

```
function first () {
	return axios.get('url');
}
function second () {
	return axios.get('url');
}
axios.all([first(),decond()])
	.then(axios.spread(fucntion(acct, perms){
			//请求都将进行
		}));
```

实例创建-未完成
```
var instance = axios.creat({
		baseURL: 'url',
		timeout: 1000,
		headers: {}
	});
```

请求配置
只有url是必须的配置
```
{
	url: 'url',

	methods: 'get',//默认是get

	baseURL: '',//若url不是绝对路径将自动加在url前面

	transformRequest: [fucntion(data){
		return data;
	}],//`transformRequest`在向服务器发送前，修改数据(只能用'PUT','POST','PATCH'),后面数组只能返回字符串，ArrayBuffer，Stream

	transformResponse: [function(data){
		return data;
	}],//在then/catch前，可以修改相应数据

	headers: {'X-Requested-Width': 'XMLHttpRequest'},//发送自定义的请求头

	params: {
		ID: 123
	},`params`是与请求url一起发送的参数，但是必须是(plain object)或URLSearchParmas对象

	parmasSerializer: function (parmas) {
		return Qs.stringify(parmas, {arrayFormat: 'brackets'})
	},//负责`parmas`序列化的函数

	data: {
		firstName: 'Darrem'
	},//`data`是在请求时发送的数据('PUT','POST','PATCH'),没有设置`transformRequest`时,必须是String,plain object,ArrayBuffer,ArrayBufferView,URLSearch。游览器专属数据类型：FromDAta,File,Blob Node专属:stream


	timeout: 1000,//设置请求的最大时间（单位为毫秒）

	withCredentials: false,//默认为false，表示跨域请求时是否需要使用凭证

	adapter: function(config){

	},自定义处理请求-返回一个promise并应用一个有效时间

	auth: {
		username: 'jane',
		paddword: '1855'
	},使用http基础验证，并提供凭证，将会设置一个'Authorization'头，将会覆盖掉设置的`Authorization`
	
	responseType: 'json',//相应的数据类型

	xsrfCookieName: 'XSRF-TOKEN', //默认样式，用作xsrf token的值http的头名称
	
	onUploadProgress: function(progressEvent){
		//对原生进度时间的处理
	},//允许为上传处理进度事件

	onDownloadProgress: function(progressEvent){
		//对原生进度时间的处理
	},//允许为下载处理进度事件

	maxContentLength: 2000,//定义允许响应内容的最大的尺寸

	validateStatus: function(status){
		return status >= 200 && status < 300;//默认
	},//定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise

	maxRedirects: 5,//默认定义在node中的follow的最大重定向数目

	 httpAgent: new http.Agent({ keepAlive: true}),
	 httpsAgent: new https.Agent({ keepAlive: true}),//在node中定义在执行http和https时使用的自定义代理；`keepAlive`默认没有启用

	 proxy: {
	 	host: '127.0.0.1',
	 	port: 8080,
	 	auth: {
	 		username: 'root',
	 		password: '123456'
	 	}
	 },//定义代理服务器的主机名称和端口

	 cancelTOken: new CancelTOken(function(cancel){

	 	})

}
```

#####相应结构#####
```
{
	data: {},
	status: {},
	statusText: 'OK',
	headers: {},
	config: {}//是为请求提供的配置信息
}
用`then`将接收
axios.get('url')
	.then(function(response){
		console.log(response.data);
		/响应上面的结构
	})
```

#####全局的Axios默认值#####
```
axios.defaults.baseURL = 'url';
axios.defaults.header.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
```

#####自定义实例默认值#####

1. 在实例时设置默认的配置
```
var instance = axios.create({
	baseURL: 'url'
	});
```
2. 将实例后的值再加上默认的配置

#####配置的优先性#####

1. `lib/defaults.js`库中的默认值
2. 实例`default`的属性
3. `config`参数
**注意:后者优先于前者**
```
	//后者将覆盖前面的值
	var instance = axios.create();

	instance.defaults.timeout = 2500;

	instance.get('url',{
		timeout: 5000
	})
```

#####拦截器#####
```
//添加请求拦截
axios.interceptors.request.use(function(config){
		//再插入前做的事情
		return config;
	}, function (error){
		return Promise.reject(error);
	});
//相应拦截
axios.interceptors.response.use(function(response) {
		return response;
	}, fucntion(error) {
		return Promise.reject(error);
	});

```
移除拦截器
`axios.interceptors.request.eject(name)`name为拦截器的名字。


#####错误处理#####
```
axios.get('url')
	.catch(fucntion (error){
		if(error.reponse){
			console.log(error.reponse.data);
			console.log(error.reponse.status);
			console.log(error.reponse.headers);
		}else{
			console.log('error', error.message);
		}
		comsole.log(error.config);
	})
	//可以用`validateStatus`来定义http状态码的错误范围
```
#####取消请求#####

```
var CanselToken = axios.CancelToken;
var source = cancelToken.source();

axios.get('url',{
	CancelToken: source.token
}).catch(function(thrown){
		if(axios.isCancel(thrown)){
			console.log('Request canceled', thrown,mesage);
		}else{
			//对错误的处理
		}
	});
	取消请求
	source.cancel('')
```

传递`executor`函数到CancelToken构造函数来创建cancelToken
```
var CancelToken = axios.CancelToken;
var cancel;

axios.get('url',{
	cancelToken: new CancelToken(function executor(c){
		cancel = c;
		})
});
cancel();
```

问题：

1. Promise的几个参数(遗忘)
