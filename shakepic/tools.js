
//做了兼容处理
function getStyle ( obj, attr ) {
 return obj.currentStyle?obj.currentStyle[attr] : getComputedStyle( obj )[attr]; 
}

//抖动函数
//obj是要抖动的对象
//attr是要抖动的属性
//endFn是回调函数
function shake ( obj, attr, endFn ) {
	if(obj.shake !== undefined){//obj.shake未赋值时是undefined
		return;
	}
	var pos = parseInt( getStyle(obj, attr) );//有隐患的，去掉上面的判断可看隐患
	// console.log("pos :"+pos);

	var arr = [];	
	var num = 0;
		
	for ( var i=20; i>0; i-=2 ) {
		arr.push( i, -i );
	}
	arr.push(0);
	//至此，arr里的数值为20, -20, 18, -18 ..... 0，决定了抖动的幅度
	
	obj.shake = setInterval(function (){
		var p = pos + arr[num] + 'px';
		obj.style[attr] = p;
		num++;
		if ( num === arr.length ) {
			clearInterval( obj.shake );
			obj.shake=undefined;
			endFn && endFn();
		}
	}, 50);
}
