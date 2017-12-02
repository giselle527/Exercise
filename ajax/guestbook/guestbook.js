window.onload = function() {
	
	/*
	检测用户名
		方式: request
		请求地址:guestbook/index.php
		发送数据:
			m : index  ps: 感觉m对应的是要请求的后端文档名index.php
			a : verifyUserName  ps: a对应的是后端文档IndexController.class.php里的函数名
			username : 要验证的用户名
		返回:
			{
				code : 返回的信息代码 0 = 没有错误，1 = 有错误
				message : 返回的信息 具体返回信息
			}
	*/

	//检测用户名
	
	var oUsername1 = document.getElementById('username1');
	var oVerifyUserNameMsg = document.getElementById('verifyUserNameMsg');
	
	oUsername1.onblur = function() {//当oUsername1失去焦点时就开始检测用户名
		
		ajax('get', 'guestbook/index.php', 'm=index&a=verifyUserName&username=' + this.value, function(data) {
			// alert(data);  //这里弹出的是字符串
			// {"code":1,"message":"\u7528\u6237\u540d\u957f\u5ea6\u4e0d\u80fd\u5c0f\u4e8e3\u4e2a\u6216\u5927\u4e8e16\u4e2a\u5b57\u7b26\uff01"}
			var d = JSON.parse(data);
			// alert(d);  //这里弹出的是对象
			//Object {code: 1, message: "用户名长度不能小于3个或大于16个字符！"}
			oVerifyUserNameMsg.innerHTML = d.message;

			if(d.code){
				// d.code不为0时,提示错误
				oVerifyUserNameMsg.style.color = "red";
			}else{
				// d.code为0时,可以注册
				oVerifyUserNameMsg.style.color = "green";
			}
			
		});
	};

	/*
	用户注册
		方式: request
		请求地址:guestbook/index.php
		发送数据:
			m : index
			a : reg
			username : 要验证的用户名
			password : 要验证的密码
		返回:
			{
				code : 返回的信息代码 0 = 没有错误，1 = 有错误
				message : 返回的信息 具体返回信息
			}
	*/

	// 用户注册
	var oBtnReg = document.getElementById('btnReg');
	var oPassword1 = document.getElementById('password1');
	
	oBtnReg.onclick = function(){
		ajax('post', 'guestbook/index.php', 'm=index&a=reg&username=' + oUsername1.value + '&password='+oPassword1.value, function(data){
			// console.log(data);  //{"code":0,"message":"\u6ce8\u518c\u6210\u529f\uff01"}
			 var d = JSON.parse(data);
			 alert(d.message);
		});
	};

	/*
	用户登录
		方式: request
		请求地址:guestbook/index.php
		发送数据:
			m : index
			a : login
			username : 要验证的用户名
			password : 要验证的密码
		返回:
			{
				code : 返回的信息代码 0 = 没有错误，1 = 有错误
				message : 返回的信息 具体返回信息
			}
	*/

	// 用户登录
	var oUsername2 = document.getElementById('username2');
	var oPassword2 = document.getElementById('password2');
	var oBtnLogin = document.getElementById('btnLogin');
	// 用户登录成功就会在cookie里写入数据,例: uid=8; username=leo
	// 可以根据cookie修改页面显示内容
	oBtnLogin.onclick = function(){
		ajax('post', 'guestbook/index.php', 'm=index&a=login&username=' + oUsername2.value + '&password='+oPassword2.value, function(data){
			// console.log(data); //{"code":1,"message":"\u767b\u9646\u5931\u8d25\uff01"}
			 var d = JSON.parse(data);
			 alert(d.message);
			 if(!d.code){//如果登录成功,就修改页面显示内容
			 	updateUserStatus();
			 }
		})
	};

	var oUser = document.getElementById('user');
	var oReg = document.getElementById('reg');
	var oLogin = document.getElementById('login');
	var oUsername2 = document.getElementById('username2');
	var oUserinfo = document.getElementById('userinfo');

	// console.log("document.cookie: "+document.cookie);
	// 初始化页面信息
	updateUserStatus();
	//根据cookie来显示页面,已登录,显示用户信息栏,隐藏登录和注册栏;未登录,反之
	function updateUserStatus(){
		var uid = getCookie("uid");
		var username = getCookie("username");
		/*
		登出状态:
		document.cookie: username=leo
		uid: undefined
		username: leo
		登录状态:
		document.cookie: uid=9; username=abc
		uid: 9
		username: abc
		所以只能用uid来判断是登录还是登出状态

		*/

		if( uid ){
			oUserinfo.innerHTML = username;
			oUser.style.display = "block";
			oReg.style.display = "none";
			oLogin.style.display = "none";
		}else{
			oUser.style.display = "none";
			oReg.style.display = "block";
			oLogin.style.display = "block";
		}
	}

	function getCookie(key){
		var arr1 = document.cookie.split("; ");
		for(var i=0;i<arr1.length;i++){
			var arr2 = arr1[i].split("=");
			if( arr2[0] == key ){
				return arr2[1];
			}
		}
	}

	/*
	用户退出
		方式: request(未指定发送方式,get和post都行)
		请求地址:guestbook/index.php
		发送数据:
			m : index
			a : logout
		返回:
			{
				code : 返回的信息代码 0 = 没有错误，1 = 有错误
				message : 返回的信息 具体返回信息
			}
	*/

	//用户退出
	var oLogout = document.getElementById('logout');

	oLogout.onclick = function(){
		ajax("post","guestbook/index.php","m=index&a=logout",function(data){
			var d=JSON.parse(data);
			alert(d.message);
			if(!d.code){
				updateUserStatus();
			}

		});
		return false;//阻止a标签的默认行为
	}

	/*
	获取留言列表
		方式: request
		请求地址:guestbook/index.php
		发送数据:
			m : index
			a : getList
			page : 获取的留言的列数
			n : 每页条数
		返回
			{
				code : 返回的信息代码 0 = 没有错误，1 = 有错误
				data : 返回成功的留言的详细信息
				{
					count : 6
					pages : 3
					page : 1
					n : 2
					list : {
						cid : 留言id
						content : 留言内容
						uid : 留言人的id
						username : 留言的用户名
						dataline : 留言的时间戳(秒)
						support : 顶数
						oppose : 踩数
					}
				}
				message : 返回的信息 具体返回信息
			}
	*/

	// 获取留言列表
	var oList = document.getElementById('list');
	var oShowMore = document.getElementById('showMore');
	var oPage = 1;
	var b = true; 

	// 初始化 获取留言列表
	showList();

	function showList(){//将留言信息渲染到浏览器页面
		// console.log("oPage: "+oPage);
		ajax("post","guestbook/index.php","m=index&a=getList&n=2&page="+oPage,function(data){
			var d = JSON.parse(data);
			if(!d.code){//d.code为0时说明有数据
				var list = d.data.list;
				for( var i=0;i<list.length;i++ ){
					loadList(list[i],true);
				}
				oShowMore.style.display = "block";
				oShowMore.innerHTML = "显示更多...";
			}else{
				if(oPage==1){
					oShowMore.innerHTML = "现在还没有留言...";
				}
				oShowMore.style.display = "none";
			}
			
		});
	}
	//点击 显示更多 添加留言列表
	oShowMore.onclick = function(){
		oPage++;
		showList();
	}

	/*
	添加留言内容
		方式: post
		请求地址:guestbook/index.php
		发送数据:
			m : index
			a : send
			content : 留言内容
		返回:
			{
				code : 返回的信息代码 0 = 没有错误，1 = 有错误
				data : 返回成功的留言的详细信息
				{
					cid : 留言id
					content : 留言内容
					uid : 留言人的id
					username : 留言的用户名
					dataline : 留言的时间戳(秒)
					support : 顶数
					oppose : 踩数
				}
				message : 返回的信息 具体返回信息
			}
	*/

	// 点击oBtnPost添加留言内容
	var oBtnPost = document.getElementById('btnPost');
	var oContent = document.getElementById('content');
	var oList = document.getElementById('list');

	oBtnPost.onclick = function(){
		ajax("post","guestbook/index.php","m=index&a=send&content="+oContent.value,function(data){
			var d=JSON.parse(data);
			alert(d.message);
			if(!d.code){
				var d=d.data;
				loadList(d,false);
				oShowMore.innerHTML = "显示更多...";
				
			};
		});

	};

	function loadList(d,b){//d是每条数据,b是布尔值,来控制是往页面最后加数据还是最前加数据
		if(b){
			oList.innerHTML += '<dl><dt><strong>'+d.username+'</strong> 说 :</dt><dd>'+d.content+'</dd><dd class="t"><a href="javascript:;" id="support">顶(<span>'+d.support+'</span>)</a>|<a href="javascript:;" id="oppose">踩(<span>'+d.oppose+'</span>)</a></dd></dl>';
		}else{
			oList.innerHTML = '<dl><dt><strong>'+d.username+'</strong> 说 :</dt><dd>'+d.content+'</dd><dd class="t"><a href="javascript:;" id="support">顶(<span>'+d.support+'</span>)</a>|<a href="javascript:;" id="oppose">踩(<span>'+d.oppose+'</span>)</a></dd></dl>'+oList.innerHTML;
		}
	}

	
};	