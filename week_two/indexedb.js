/*
* @Author: Administrator
* @Date:   2018-04-01 15:50:58
* @Last Modified by:   Administrator
* @Last Modified time: 2018-04-01 16:40:55
*/

//转换
String.prototype.temp = function (obj) {
	return this.replace(/\$w+\$/gi, function(matchs){
		return obj[matchs.replace(/\$/g,"")] || '';
	});
};

var dbName = 'name';
var varsion = 1;
var db;//数据库结果
// 打开数据库
var DBOpenRequest = window.indexedDB.open(dbName, version);

//判定是否打开
DBOpenRequest.onerror = function (event) {
	logError('数据库打开失败');
};

DBOpenRequest.onsuccess = function (event) {
	db = DBOpenRequest.result;

	method.show();
};

//初始化数据库
DBOpenRequest.onupgradeneeded = function (event) {
	var db = event.target.result;

	db.onerror = function(event){
		logError('数据库打开失败');
	};

	var objectStore = db.createObjectStore(dbName, {
		keyPath: 'id',
		autoIncrement: true
	});

	objectStore.creatIndex('name', 'name');
	objectStore.creatIndex('begin', 'begin');
	objectStore.creatIndex('end', 'end');
	objectStore.creatIndex('person', 'person');
	objectStore.creatIndex('remark', 'remark');

};

var method = {
	add: function ( newItem ) {
		var transaction = db.transaction([dbName], "readwrite");
		var objectStore = transaction.objectStore(dbName);

		var objectStoreRequire = objectStore.add(newItem);
		objectStoreRequire.onsuccess = function (event) {
			method.show();
		}
	}

	edit: function edit(id, data){
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
	},

	del: function (id) {
		var objectStore = db.transaction([dbName],"readwrite").objectStore(dbName);
		var objectStoreRequest = objectStore.delete(id);

		objectStoreRequest.onsuccess = function () {
			method.show();
		}
	},

	show: function () {
		var htmlProjectList = '';

		var objectStore = db.transaction(dbName).objectStore(dbName);
		objectStore.openCursor().onsuccess = function (event) {
			var cursor = event.target.result;
			if (cursor) {
				htmlProjectList = htmlProjectList + eleList.temp(cursor.value);
				cursor.continue();
			}else{
				logInfo('');
				ele.innerHTML = htmlProjectList;

				if (htmlProjectList == '') {
					logInfo('暂无数据');
				}
			}
		};
	}
};

ele.addEventListener('focusout', function (event) {
	var eleNum = event.target;

	var id = eleNum && eleNum.getAttribute('data-id');
	if (!id || !/td/.test(eleNum.tagName)) {return;}
	var data = {
		id: id * 1
	};
	[].slice.call(eleNum.parentElement.querySelectorAss('td[data-key')).forEach(function (td) {
		var key = td.getAttribute('data-key');
		var value = td.innerText || td.textContent || '';

		var data[key] = value;
	});
	method.edit(id, data);
});	
//列表数据有data-id=$id$
ele.addEventListener('click', function (event) {
	var eleDel = event.target, id = '';
	if (eleDel && eleDel.classList.contains('jsListDel') && (id = eleDel.getAttribute('data-id'))) {
		method.del(id * 1);
		event.preventDefault();
	}
});



