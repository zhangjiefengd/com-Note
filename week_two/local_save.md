###localStorage###

---

#####基本语法#####

1. 保存数据: localStorage.setItem(key, value);
2. 读取数据: localStorage.getItem(key);
3. 删除单个数据: localStorage.removeItem(key);
4. 删除所有数据: localStorage.clear();
5. 得到某个索引的key: localStorage.key(index);

**列子1-对用户名的**
```
//保存数据
function save () {
	var getKey = document.getElementById("A").value;
	var getValue = document.getElementById("B").value;

	localStorage.setItem(getKey, getValue);
}

```

以**字符串**的形式存储,且存储后若不手动删除将一直保存。保存的文件大小为**5M**。不同游览器间无法共享其保存的信息，相同游览器的不同页面可以共享localStorage的信息(页面属于相同的域名和端口)。

###sessionstorage###

seesionstorage和localStorage具有相同的API
都只能以**字符串**的形式保存。

```
var user = {
	name: 'Darren',
	age: 22
};
//存储只能以字符串的形式
sessionstorage.setItem('user1', JSON.stringify(user));

var userStr = sessionstorage.getItem('user1');
//转换为json数据
user = JSON.parse(userStr);

```

###Web SQL###

支持：
	在最新的Safari,Chrome,Opera游览器;

API:
	1. openDatabase();用先用的数据库或新建数据库
	2. transaction();控制一个事务，或执行提交回滚;
	3. executeSql();执行实际的Sql语句.

```
var db = openDatabase('baseName','baseVersions','decrition','baseSize',callBack);

db.transaction(function(tx){
	//建表
	tx.excuteSql('creat table if not exists win (id unique, name)');
	//插入数据
	tx.excuteSql('insert into win (id, name) values ( 1, "Darren")')
	//读取数据
	tx.excuteSql('select * from win',[], function(tx, results){
		var len = results.rows.length,i;
		msg = "<p>查询的条数：" + len + "</p>";
		
		var Str = [];
		for ( i = 0; i < len; i++){
			Str = results.rows.item(i).name;
		}

		return msg,Str;
	})
});

//兼容性差
```

###IndexeDB###

详细[API]: (https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)

----
`objectStore` -> "储存对象";
`objectStore.add()` -> 向数据库添加数据;
`objecStore.delete()` -> 删除数据;
`objectStore.clear()` -> 清空数据库;
`objectStore.put()` -> 替换数据;
更多操作[API]: (https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore)
```
objectStore.createIndex(indexName, KeyPath, objectParamters);

/* indexName 创建索引名称(可为空);
 * KeyPath 索引使用的关键路径可为数组或为空
 * objectParameters 可选参数，常用参数`unique`,
*/
```

操作：
```
var db;
var DBOpenRequest = window.indexeDB.open(dbName, version);

//成功打开数据库
DBOpenRequest.onsuccess = function (event) {
	db = DBOpenRequest.result;
};

//执行于首次创建版本或传递的版本当前保存的版本要高；
DBOpenRequest.onupgradeneeded = function(event){
	db = event.target.result;
	
	//创建数据库储存对象
	var objectStore = db.createobjectStore(dbName, {
		keyPath: 'id',
		autoIncrement: ture
	});

	//储存对象的数据项
	objectStore.createIndex('id', 'id', {
		unique: true
	});
	objectStore.createIndex('name', 'name');
	objectStore.createIndex('begin', 'begin');
	objectStore.createIndex('end', 'end');

};
```

事务操作
```
var transaction = db.transaction(dbName, "readwrite");

var objectStore = transaction.objectStore('dbName');

objectStore.add(newItem);

or 

db.transaction(dbName, "readwrite").objectStore('project').add(newItem);

/*newItem*/
{
	"name": "第一次",
	"begin": "2018.4.1",
	"end": "2020.5.20"
}

```

数据库的编辑
```
function edit(id, data){
	var transaction = db.transaction('project', "readwrite");
	var objectStore = transaction.objectStore('project');

	//获取储存对应键的存储对象
	var objectStoreRequest = objectSore.get(id);

	objectStoreRequest.onsuccess = function (event) {
		//成功后获取到的当前的数据
		var myRecord = objectStoreRequest.result;

		for(var key in data ) {
			if (typeof myRecord[key] != 'undefined') {
				myRecord[key] = data[key];
			}
		}

		objectStore.put(myRecord);
	};
}
```
删除
```
db.transaction('project',"readwrite").objectStore('project').delete(id);//id表示需要删除行id对应的数据

```

数据库的获取
1. 游标API
`openCursor()` -> 打开游标
```
var objectStore = db.transaction(dbName).objectStore(dbName);

objectStore.openCursor().onsuccess = fucntion (event) {
	var cursor = event.target.result;
	if (cursor) {
		//cursor.value是数据对象 ,未遍历完，继续
		/*cursor.value数据
		{
			"name": "第一次",
			"begin": "2018.4.1",
			"end": "2020.5.20"
		}
		*/
		cursor.continue();
	}else{
		//遍历结束
	}
}
```
2. 光标API
`bound()` -> 范围内,`only()` -> 仅仅是,`lowerBound()` -> 小于某值,`upperBound()` -> 大于某值
```
//确定打开游标的主键范围,后面两个参数表示是否包括边界值
var keyRangeValue = IDBKeyRange.bound(4,10, true, true);

//打开范围的游标

var objectStore = db.transaction(dbName).objectStore(dbName);

objectStore.openCursor(keyRangeValue).onsuccess = function(event) {
	var cursor = event.target.result;
}
```

