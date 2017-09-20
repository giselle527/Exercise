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

	//用两个函数分别处理li有active和没active的情况
	function activeItem(index){
		aLi[index].className="active";
	}
	function deactiveItem(index){
		aLi[index].className="";
	}

	function nextFrame(){
		deactiveItem(index);//没有改变index前去掉active

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
		activeItem(index);//改变index后加上active
	}

	function startTimer(){
		timer = setInterval(nextFrame, 1000);
	}
	function stopTimer(){
		clearInterval(timer);
		timer = null;
	}
};

