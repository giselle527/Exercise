// 经验：
// 1.函数要尽量封闭，参数就是函数的变数，最好不要与外界再有其他联系。若一定要有联系，将联系减到最少并将逻辑放到函数外。
// 2.函数的功能尽量单一。
// 
window.onload=function(){
	var aStar=document.getElementsByClassName("star");
	var clicknum=-1;

	var i=0;
	while(i<aStar.length){
		aStar[i].index=i;
		aStar[i].onmouseover=function(){
			turnToComment(this.index);
			cancelStarColor();
			changeStarColor(this.index);
		};
		aStar[i].onclick=function(){
			changeStarColor(this.index);
			clicknum=this.index;
		};
		aStar[i].onmouseout=function(){
			if(clicknum == -1){
				turnToTip();
				cancelStarColor();
			}else{
				turnToComment(clicknum);
				cancelStarColor();
				changeStarColor(clicknum);
			}
		};
		i++;
	}

	function turnToComment(num){
		var oSp=document.getElementsByClassName("sp")[0];
		var aTxt=["很差","较差","一般","推荐","力荐"];
		oSp.className="sp comment";
		oSp.innerHTML=aTxt[num];
	};

	function turnToTip(){
		var oSp=document.getElementsByClassName("sp")[0];
		oSp.className="sp tip";
		oSp.innerHTML="";
		
	};

	function changeStarColor(num){
		for(var i=0;i<=num;i++){
			if(num<2){
				aStar[i].style.backgroundPosition="-19px";
			}else{
				aStar[i].style.backgroundPosition="0px";
			}
		}
	};

	function cancelStarColor(){
		for(var i=0;i<aStar.length;i++){
			aStar[i].style.backgroundPosition="-38px";
		}
	};
};

