var cache = null;
var search = document.getElementById('search');
var searchWord = document.getElementById('searchWord');
var login = document.querySelector('[href="\login"]');
var result = document.getElementById('result');
var eleArr = [];
var update = function(data){
	result.innerHTML = '';
	if(data !== '0'){
		data = JSON.parse(data).dataList;
		data.forEach(function(ele){
			//name  address phone intro picUrl
			var div = document.createElement('div');
			var name = document.createElement('h2');
			var intro = document.createElement('p');
			var address = document.createElement('p');
			var picUrl = document.createElement('a');
			if(typeof ele.name !== 'undefined'){
				name.innerHTML ='Name: '+ ele.name;
			}else{
				name.innerHTML = 'Name: no information about name';
				name.style['color'] = 'gray';
			}
			div.append(name);
			if(typeof ele.intro !== 'undefined'){
				intro.innerHTML = 'Introduce: ' + ele.intro;
			}else{
				intro.innerHTML = 'Introduce:  no information about introduce';
				intro.style['color'] = 'gray';
			}
			div.append(intro);
			if(typeof ele.address !== 'undefined'){
				address.innerHTML = 'Address: ' + ele.address;
			}else{
				address.innerHTML = 'Address:  no information about introduce';
				address.style['color'] = 'gray';
			}
			div.append(address);
			if(typeof ele.picUrl !== 'undefined'){
				picUrl.setAttribute('href',ele.picUrl);
				div.append(picUrl);
			}
				result.appendChild(div);
		});	
	}
}
//������()��
var searchInf = function(city,pn){
	//if loaded just now ,asign city 'start'
	var num = 0;
	if(arguments.length === 2){
		 num = pn;
	}
	var url = '/search/'+num;
		if(arguments.length === 0 || cache === null){
			cache = searchWord.value;
		}
		if(cache !== null){
			ajaxFunctions.ajaxRequest('get',url,update);
		}	
	}