//obj是要移动的对象
//attr是要改变的属性
//dir是要移动的步幅(每移动一下要移动多少)
//target是要移动到的位置
//endFn是回调函数

function doMove ( obj, attr, dir, target, endFn ) {
	
	dir = parseInt(getStyle( obj, attr )) < target ? dir : -dir;//正负数决定了移动的方向，在函数内部判断，对用户更友好
	
	clearInterval( obj.timer );
	
	obj.timer = setInterval(function () {//将timer挂在obj身上，更利于封装函数
		
		var speed = parseInt(getStyle( obj, attr )) + dir;			// 步长=原始位置+要移动的步幅
		
		if ( speed > target && dir > 0 ||  speed < target && dir < 0  ) {
			speed = target;
		}
		
		obj.style[attr] = speed + 'px';
		
		if ( speed == target ) {
			clearInterval( obj.timer );
			endFn && endFn();
			
		}
		
	}, 30);
}

//做了兼容处理
function getStyle ( obj, attr ) {
 return obj.currentStyle?obj.currentStyle[attr] : getComputedStyle( obj )[attr]; 
}
