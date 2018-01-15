
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
		// console.log("dir: "+dir);
		// console.log("speed: "+speed);
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
function getStyle(obj,attr){//获取元素的属性值
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj,false)[attr];
	//加false是为了兼容老版本的火狐
}

//参数：
//obj元素
//str属性名，是字符串
function pureStyle(obj,str){//获取元素的属性值，去掉px单位版
	return parseInt(obj.currentStyle?obj.currentStyle[str]:getComputedStyle(obj)[str]);
}

// startMove是运动函数，json是参数，包括:
// {
// 	obj:"oBox", //必填：要运动的对象 
// 	attrs:{opacity: 0.5}, //必填：要改变的属性
// 	step:15, //选填：每一步所花的时间，控制走速，值越大，运动速度越慢
// 	time:100, //选填：控制定时器的时间
// 	callback:function(){} //选填：回调函数
// }
function startMove( json ){

		var settings = { //默认值
			obj:"oBox", 
			attrs:{opacity: 0.5}, 
			step:8, 
			time:30,
			callback:function(){} 
		}

		//用传进来的实参json覆盖默认值settings
		for( var attr in json ){
			settings[attr] = json[attr];
		}

		var obj = settings.obj;
		var attrs = settings.attrs;
		var step = settings.step;
		var t = settings.time;
		var cb = settings.callback;
	
		clearInterval(obj.timer);
		
		obj.timer = setInterval(function(){
			
			var bBtn = true; //开关，当iCur没有到达目标点时为false，到达时为true
			
			for(var attr in attrs){
				//iCur是当前运动对象的属性值
				var iCur = 0;						
			
				if(attr == 'opacity'){							
					iCur = Math.round(parseFloat(getStyle(obj,attr))*100);		
				}
				else{
					iCur = parseInt(getStyle(obj,attr)) || 0; 
				}
				
				// attrs[attr]-iCur是要运动的距离，step是每一步所花的时间，iSpeed是每一步的速度。step的值越大，iSpeed值越小
				
				if(attr == "opacity"){ 
					var iSpeed = (attrs[attr]*100 - iCur)/step;
					//将iSpeed变成整数
					iSpeed = iSpeed >0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

					if(iCur!=attrs[attr]*100){
						bBtn = false;
					}

				}else{
					var iSpeed = (attrs[attr] - iCur)/step;
					iSpeed = iSpeed >0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
					if(iCur!=attrs[attr]){
						bBtn = false;
					}
				}
				
				if(attr == 'opacity'){
					obj.style.filter = 'alpha(opacity=' +(iCur + iSpeed)+ ')';
					obj.style.opacity = (iCur + iSpeed)/100;
					
				}
				else{
					obj.style[attr] = iCur + iSpeed + 'px';
				}
				
				
			}
			
			if(bBtn){
				clearInterval(obj.timer);
				
				if(cb){
					cb.call(obj);
				}
			}
			
		},t);
	
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

//return的是元素距离body的高度(top累加值)
//原理：元素的offsetTop值累加有定位的祖先元素的offsetTop值，一直向上递推到body
//说明：body的margin,padding都为0，body.offsetTop为0，body.offsetParent为null
//参数：元素
function getTop( obj ){
	var iTop = 0;
	while(obj){
		iTop += obj.offsetTop;
		obj = obj.offsetParent;
	}
	return iTop;
}

//常用的正则
var jsonRe = {
	"zh":new RegExp("[\u4e00-\u9fa5]"),                      //匹配中文
	"trim":new RegExp("^\s+|\s+$","g"),                      //行首行尾空格
	"email":new RegExp("^\\w+@[a-z0-9]+(\\.[a-z]+){1,3}$"),    //email
	"web":new RegExp("[a-zA-z]+://[^\s]*"),                  //网址
	"qq":new RegExp("^[1-9][0-9]{4,9}$"),                      //qq
	"zipcode":new RegExp("[1-9]\d{5}"),                      //邮政编码
	"id":new RegExp("[1-9]\d{14}|[1-9]\d{17}|[1-9]\d{16}x"), //身份证
	"tel":new RegExp("^0\d{2,3}-?\d{7,8}$"),                 //座机

}
//email：注意\w和\.要转义，在字面量形式的正则里“/”要转义，在构造函数传参形式里的正则“\”要转义
//座机规则：区号+号码，区号以0开头，3位或4位，号码为7-8位数字,连接符-可有可无
//

//extend函数主要解决将复杂类型的数据赋值给另一个数据时，赋值的是引用地址的问题
//例：var a = {x:1}; var b=a; 这里将a赋值给b时，就是传递的引用地址，当修改b的内容后，a也会随之改变
//思路：不赋值Object类型(其中函数不能修改，只能重新赋值)的数据，而是通过for in将键值（基本类型数据）赋给新对象相应的键名（for in继承的方式叫拷贝继承）
//obj0是要复制的对象
//obj1是被复制的对象
function extend(obj0, obj1){
	for(var attr in obj1){
		obj0[attr] = obj1[attr];
	}
}
//eg：extend(Star.prototype, Person.prototype); 子类Star就继承了父类Person的原型数据
//属性继承记得要用call调用父类，并且要改变this指向

//可视区宽
function viewWidth(){
	return document.documentElement.clientWidth;
}

//可视区高
function viewHeight(){
	return document.documentElement.clientHeight;
}

//通过函数为对象绑定事件处理函数
function bindEv(obj,evname,fn){
	if(obj.addEventListener){
		obj.addEventListener(evname,fn,false);
	}else{
		obj.attachEvent("on"+evname,function(){
			fn.call(obj);
		});
	}
}

//用函数的方式绑定事件
function bindEv(obj,events,fn){

	obj.listeners = obj.listeners || {};
	obj.listeners[events] = obj.listeners[events] || [];
	obj.listeners[events].push(fn);

	//以下是为了兼容DOM元素
	if(obj.nodeType){
		if(obj.addEventListener){
			obj.addEventListener(events,fn,false);
		}else{
			obj.attachEvent("on"+events,function(){
				fn.call(obj);
			});
		}
	}
}

//调用用函数方式绑定的事件
function fireEv(obj,events){
	//如果没有为对象绑定事件，obj.listeners就为undefined；如果事件下没有函数，obj.listeners[events]也会为undefined，undefined是没有.length属性的，因此要做判断
	if( obj.listeners && obj.listeners[events] ){
		for(var i=0;i<obj.listeners[events].length;i++){
			obj.listeners[events][i]();
		}
	}
}