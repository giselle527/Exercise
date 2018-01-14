
//参数：
//obj→要运动的元素,
//str→要改变的属性,
//dir→每一个时间间隔要运动的距离,
//target→要运动到的位置,
//t→定时器的时间间隔,
//endFn→回调函数
function doMove(obj,str,dir,target,t,endFn){//利用定时器改变style属性的运动函数
	dir= pureStyle(obj,str) <target ? (Math.abs(dir)) : (-Math.abs(dir)) ;//根据元素的初始位置和目标位置判断运动方向(正负号表示)
	clearInterval(obj.timer);//为了不在函数外设一个变量timer，将其挂在元素身上
	obj.timer=setInterval(function(){
		var speed=pureStyle(obj,str)+dir;//相当于步长，每运行一次函数，pureStyle(obj,str)的值都在变
		console.log("dir"+dir);
		console.log("speed"+speed);
		if(speed>target&&dir>0||speed<target&&dir<0){
			speed=target;
		}	
		obj.style[str]=speed+"px";
		if(speed==target){
			clearInterval(obj.timer); 
			endFn && endFn();
		}
	},t);
}

//参数：
//obj元素
//str属性名，是字符串
function getStyle(obj,str){//获取元素的属性值
	return obj.currentStyle?obj.currentStyle[str]:getComputedStyle(obj)[str];
}

//参数：
//obj元素
//str属性名，是字符串
function pureStyle(obj,str){//获取元素的属性值，去掉px单位版
	return parseInt(obj.currentStyle?obj.currentStyle[str]:getComputedStyle(obj)[str]);
}

//已知斜边 iR 和角度 iDeg，求对边(left值)和邻边(top值)长度
//角度转弧度公式： 角度/180 x π
function countLT( iR,iDeg ){
	var iLeft = Math.round( Math.sin( iDeg/180*Math.PI )*iR );
	var iTop = Math.round( Math.cos( iDeg/180*Math.PI )*iR );
	return { l:iLeft,t:iTop };
}

// transition执行后，有启用过渡完成事件和删除过渡完成事件transitionend事件的方法，以下是兼容写法：
// 启用过渡完成事件transition end事件
function addEnd( obj,fn ){
    obj.addEventListener('webkitTransitionEnd',fn,false);//兼容chrome
    obj.addEventListener('transitionend',fn,false);//标准下
}

// 删除过渡完成事件transitionend事件
function removeEnd( obj,fn ){
    obj.removeEventListener('webkitTransitionEnd',fn,false);//兼容chrome
    obj.removeEventListener('transitionend',fn,false);//标准下
}

//简易拖拽函数
function drag( obj ){
	obj.onmousedown = function( ev ){

		var ev = ev || event;
		var disX = ev.clientX - this.offsetLeft;
		var disY = ev.clientY - this.offsetTop;

		document.onmousemove = function( ev ){
			var ev = ev || event;
			obj.style.left = ev.clientX - disX + "px";
			obj.style.top = ev.clientY - disY + "px";
		};

		document.onmouseup = function(){
			document.onmousemove = null;
		};
		return false;
	}
};

// 去除文中空格
function trim( str ){
	return str.replace(/\s/gi,'');
}

// 查看一个元素的所有属性和方法
function showProp( obj ){
	var msg = "";
	for( var attr in obj ){
		msg += attr + ": " + obj[attr] + "<br>";
	}
	return msg;
}

//找到名为key的cookie对应的值
function getCookie( key ){
	var arr1 = document.cookie.split(";");
	for(var i=0;i<arr1.length;i++){
		var arr2 = arr1[i].split("=");
		if( arr2[0] == key ){
			return arr2[1];
		}
	}
}

//写入cookie
//参数：cookie名key，cookie值value，多长时间后删除time
function setCookie(key,value,time){
	var t = new Date();
	t.setDate( t.getDate()+time );
	document.cookie = key+"="+value+"; expires="+t.toGMTString();//注意时间要转成字符串
} 

//获取cookie
//参数：cookie名key
function getCookie( key ){
	var arr1 = document.cookie.split("; ");//注意分隔符是;+空格
	for(var i=0;i<arr1.length;i++){
		var arr2 = arr1[i].split("=");
		if( arr2[0] == key ){
			return arr2[1];
		}
	}
}

//删除cookie
//参数：cookie名key
function removeCookie( key ){
	setCookie( key,"",-1 );
}

//解决IE不能使用getElementsByClassName的问题
if(!document.getElementsByClassName){
	document.getElementsByClassName = function(className, element){
		var children = (element || document).getElementsByTagName('*');
		var elements = new Array();
		//定义一个空数组,用来存放所有class名为className的元素
		for (var i=0; i<children.length; i++){
			var child = children[i];
			// console.log(child.className);//字符串：例"cont box"
			var classNames = child.className.split(' ');
			for (var j=0; j<classNames.length; j++){
				if (classNames[j] == className){ 
					elements.push(child);
					break;
				}
			}
		} 
		return elements;
	};
}

// 参数：
// method: "get" / "post"
// url: 请求的数据地址
// data: 是不是发送数据
// fn: 收到数据后执行的函数
function ajax(method,url,data,fn){
	var xhr = null;
	try{
		xhr = new XMLHttpRequest();
	} catch (e){
		xhr = new ActiveXObject("Microsoft.XMLHTTP"); //兼容IE6以下的浏览器
	}

	//当请求方式为get时，数据是写在search值?后面的
	if( method=="get" && data ){
		url+="?"+data;
	}

	xhr.open( method,url,true );

	//当请求方式为post时，数据是作为send的参数的，并且要写请求头
	if( method=="get"){
		xhr.send();
	}else{
		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		xhr.send(data);
	}

	xhr.onreadystatechange = function(){
		if( xhr.readyState == 4 ){
			if( xhr.status == 200 ){//根据http状态码判断是否请求成功
				fn && fn(xhr.responseText);
				//1.可以按f12调出调试工具，在Network页面点击请求的文档，通过右侧栏的preview预览返回的数据
				//2.当数据为json格式时，记得转换数据，即：var data = JSON.parse(data);
			}else{
				alert("Wrong, Err: "+xhr.status);
			}
		}
	}
}