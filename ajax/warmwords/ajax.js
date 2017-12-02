function ajax( method,url,data,fn ){
	var xhr = null;
	try {
		xhr = new XMLHttpRequest();
	} catch (e) {
		xhr = new ActiveXObject('Microsoft.XMLHTTP');
	}
	// 注意get方式下的url
	if( method=="get" && data ){
		url+="?"+data;
	}
	
	xhr.open(method,url,true);
	
	if( method=="get" ){
		xhr.send();
	}else{
		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		xhr.send(data);
	}

	xhr.onreadystatechange = function(){
		if( xhr.readyState == 4 ){
			if( xhr.status == 200 ){
				fn && fn( xhr.responseText );					
			}else{
				alert("wrong,Err: "+xhr.status);
			}

		}
	}
}

function success(data){
	var data = JSON.parse( data );
	var oUl = document.getElementsByTagName("ul")[0];
	var html = "";
	for(var i=0;i<data.length;i++){
		html += '<li>'+data[i].content+'<span>['+data[i].date+']</span></li>';
	}
	oUl.innerHTML = html;
}
