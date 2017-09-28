window.onload=function(){
	var wrap=document.getElementsByClassName("wrap")[0];
	var left=wrap.getElementsByClassName("left")[0];
	var aLi=left.getElementsByTagName("li");
	var aR=wrap.getElementsByClassName("right");
	
	var aImg=[
		["images/dog1.jpg","images/dog2.jpg","images/dog3.jpg"],
		["images/cat1.jpg","images/cat2.jpg","images/cat3.jpg"],
		["images/view1.jpg","images/view2.jpg","images/view3.jpg","images/view4.jpg"],
		["images/lady1.jpg","images/lady2.jpg"]
	];
	var aTxt=[
		["笑一笑十年少","我好看吗？","我们结婚吧"],
		["主人呢？","有情况","在看我就把你喝掉！"],
		["飞去外太空","宁静小村庄","家乡美如画","聊斋缘起"],
		["她怎么这么好看","天生丽质难自弃"]
	];

	var last=0;
	for(var i=0;i<aLi.length;i++){
		aLi[i].index=i;
		aLi[i].onclick=function(){
			aLi[last].className="";
			aR[last].className="right";
			this.className="active";
			aR[this.index].className="right show";
			last=this.index;
			switchItem(aR[this.index],aImg[this.index],aTxt[this.index],this.index);	
		}
	}
	
switchItem(aR[0],aImg[0],aTxt[0],0);
	
};

function switchItem(item,aImg,aTxt,index){
	var html="";
	var old=0;
	if(index>aImg.length){
		old=aImg.length-1;
	}else{
		old=index;
	}

	for(var i=0;i<aImg.length;i++){
		html+='<span></span>';
	}
	item.innerHTML='<img>'+html;
	var oImg=item.getElementsByTagName("img")[0];
	var aSpan=item.getElementsByTagName("span");
	oImg.src=aImg[old];
	aSpan[old].className="active";
	for(var i=0;i<aSpan.length;i++){
		aSpan[i].index=i;
		aSpan[i].style.width=(600/aSpan.length)+"px";
		aSpan[i].style.left=i*(600/aSpan.length)+"px";
		aSpan[i].innerHTML=aTxt[i];
		aSpan[i].onclick=function(){
			aSpan[old].className="";
			this.className="active";
			oImg.src=aImg[this.index];
			old=this.index;
		}
	}
}
