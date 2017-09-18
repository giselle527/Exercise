window.onload=function(){
	var aImg=["images1/dog1.jpg","images1/dog2.jpg","images1/dog3.jpg","images1/cat1.jpg","images1/cat2.jpg","images1/cat3.jpg","images1/view1.jpg","images1/view2.jpg","images1/view3.jpg","images1/view4.jpg","images1/lady1.jpg","images1/lady2.jpg"];

	var wrap=document.getElementsByClassName("wrap")[0];
	var aLi=wrap.getElementsByTagName("li");
	var oImg=wrap.getElementsByTagName("img")[0];

	var length = aImg.length;
	var index = 0;
	var delta = 1;

	var timer = null;

	activeItem(0,0);
	startTimer();
	document.onclick=stopTimer;

	for(var i=0;i<aLi.length;i++){
		aLi[i].index=i;
		aLi[i].onmouseover=function(){
			aLi[index].className="";
			aLi[this.index].className="active";
			index=this.index;
			stopTimer();
		};
		aLi[i].onmouseout=startTimer;
	}

	function nextFrame(){
		index += delta;
		if(index >= length){
			index = length - 1 - 1;
			delta = -1;
			// console.log("down"+index);
		}else if(index <= 0){
			index = 0;
			delta = 1;
			// console.log("up"+index);
		}
		// console.log(index+"&"+delta);
		activeItem(index,delta);
	}

	function activeItem(index,delta){
	// console.log(index+"&"+delta+" aLi[index-delta]:"+(index-delta));
		if(index-delta==-1){
			aLi[1].className="";
		}else{
			aLi[index-delta].className="";
		}		
		aLi[index].className="active";
	};

	function startTimer(){
		timer = setInterval(nextFrame, 1000);
	}
	function stopTimer(){
		clearInterval(timer);
		timer = null;
	}
};

