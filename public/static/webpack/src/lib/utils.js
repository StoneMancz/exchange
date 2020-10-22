let localUtils = {  //公共方法和属性
	phone_reg : /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\\d{8}$/ig,
	trim : function (val) { return val.replace(/\s/g,'')},
	host:'http://185.251.249.72/',
	laravel_api: 'http://185.251.249.72/api/',
	node_api: 'http://185.251.249.72:3000/',
	socket_api: 'http://185.251.249.72:2120/',
	theme:function(type,lod){
		var head = document.querySelector('head');
		var link = document.querySelector('link#whiteTheme');
		// var theme = window.localStorage.getItem('theme') || 'dark';
		// if (theme != type && type!='') {
			window.localStorage.setItem('theme', type);
		// }
		if(type=='dark'){
			if(link == null || link == ''){
				return;
			}else{
				head.removeChild(link); 
				if(lod){
					// location.reload();
				}
			}
		}else{
			if(link == null || link == ''){
				link = document.createElement('link');
				link.id = 'whiteTheme';
				link.rel = 'stylesheet';
				link.href = './static/theme/white.css';
				head.appendChild(link);
				if(lod){
					// location.reload();
				}
			}
			
		}
    },
};

export default {
	install: function (vm) {
		vm.prototype.$utils = localUtils
	}
}



// WEBPACK FOOTER //
// ./src/lib/utils.js