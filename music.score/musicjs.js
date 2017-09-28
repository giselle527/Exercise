window.onload=function(){
	var oList=document.getElementsByClassName("list")[0];
	var aLi=oList.getElementsByTagName("li");
	var aInp=oList.getElementsByTagName("input");
	var oCheckall=document.getElementsByClassName("checkall")[0];
	
	everyOtherLiColor(aLi);//隔行变色
	checkboxAll();
	for(var i=0;i<aLi.length;i++){
		aLi[i].index=i;
		aLi[i].bColor=aLi[i].style.backgroundColor;

		aLi[i].onmouseover=function(){
			changeLiColor(this);
		};

		aLi[i].onmouseout=function(){	
			if(!aInp[this.index].checked){
				cancelLiColor(this,this.bColor);
			};
		};
	};

	for(var i=0;i<aInp.length;i++){
		aInp[i].index=i;

		aInp[i].onclick=function(){
			if(this.checked){
				changeLiColor(aLi[this.index]);
			}else{
				cancelLiColor(aLi[this.index],aLi[this.index].bColor);
			}
			checkboxAll();		
		}
	};

	oCheckall.onclick=function(){
		if(oCheckall.checked){
			for(var i=0;i<aInp.length;i++){
				if(!aInp[i].checked){
					aInp[i].checked=true;
					changeLiColor(aLi[i]);
				}else{
					continue;
				}
			}
		}else{
			for(var i=0;i<aInp.length;i++){
				if(aInp[i].checked){
					aInp[i].checked=false;
					cancelLiColor(aLi[i],aLi[i].bColor);
				}else{
					continue;
				}
			}
			
		}
	}

}

function changeLiColor(item){
	item.style.background="#b81916";
	item.style.color="white";
}
function cancelLiColor(item,bColor){
	item.style.background=bColor;
	item.style.color="black";
}

function everyOtherLiColor(arrLi){
	var i=0;
	while(i<arrLi.length){
		if(i%2){
			arrLi[i].style.background="#c3bac2";
		}else{
			arrLi[i].style.background="#fadae5";
		};
		i++;
		
	}
}

function checkboxAll(){
	var oList=document.getElementsByClassName("list")[0];
	var aInp=oList.getElementsByTagName("input");
	var oCheckall=document.getElementsByClassName("checkall")[0];
	for(var i=0;i<aInp.length;i++){
		if(!aInp[i].checked){
			oCheckall.checked=false;
			break;
		}else{
			oCheckall.checked=true;
		}
	}
}
