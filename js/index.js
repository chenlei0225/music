document.addEventListener('touchstart',function(event){
	event.preventDefault();
});
(function(){
	var width = document.documentElement.clientWidth;
	var styleNode = document.createElement('style');
	styleNode.innerHTML = 'html{font-size:'+width/16+'px !important;}';
	document.head.appendChild(styleNode);
})();

(function(){
	var aNodes = document.querySelectorAll('a');
	for (var i = 0; i < aNodes.length; i++) {
		aNodes[i].addEventListener('touchstart',function(){
			window.location=this.href;
		});
	}
})();

window.onload=function(){
	menuBtnBind();
	navBind();
	changeColor();
	changeFocus();
	banBind();
	tabBind();
	contentBind();
}



function menuBtnBind(){
	var menuBtn = document.querySelector('#wrap .header .headerTop .menuBtn');
	var headerTop = document.querySelector('#wrap .header .headerTop');
	var mask = document.querySelector('#wrap .header .mask');
	var flag = true;
	headerTop.addEventListener('touchstart',function(event){
		if(flag){
			mask.style.display='block';
			removeClass(menuBtn,'menuBtnClose');
			addClass(menuBtn,'menuBtnOpen');
		}else{
			mask.style.display='none';
			removeClass(menuBtn,'menuBtnOpen');
			addClass(menuBtn,'menuBtnClose');
		}
		flag=!flag;
		event.stopPropagation();
		event.preventDefault();
	});
	document.addEventListener('touchstart',function(){
		if(!flag){
			mask.style.display='none';
			removeClass(menuBtn,'menuBtnOpen');
			addClass(menuBtn,'menuBtnClose');
			flag=!flag;
		}
	});
	mask.addEventListener('touchstart',function(event){
		event.stopPropagation();
		event.preventDefault();
	})
}


function changeFocus(){
			var inputNode = document.querySelector('#wrap .header .search input[type="text"]')
			
			//inputNode 触摸  --- 获取焦点
			inputNode.addEventListener('touchstart',function(event){
				inputNode.focus();
				
				//取消冒泡
				event.stopPropagation();
			});
			//点击页面其他区域，--- 失去焦点
			document.addEventListener('touchstart',function(){
				inputNode.blur();
			});
		};

function changeColor(){
	var lis= document.querySelectorAll('#wrap .content .navWrap .navList li');
	var isMove = false;
	for (var i = 0; i < lis.length; i++) {
		lis[i].addEventListener('touchmove',function(){
			isMove=true;
		})
		lis[i].addEventListener('touchend',function(){
			if(!isMove){
				for (var j = 0; j < lis.length; j++) {
					removeClass(lis[j],'active');
				}
				addClass(this,'active');				
			}			
			isMove = false;
		})
				
	}
	
}

function navBind(){
	var navWrap = document.querySelector('#wrap .content .navWrap');
	var navList = document.querySelector('#wrap .content .navWrap .navList');
	transformCss(navList,'translateZ',0.01);
	
	var stratX = 0;
	var stratY = 0;
	var eleX = 0;
	var translateX=0;
	var isFirst=true;
	var isX=true;
	
	var t1=0;
	var t2=0;
	var disT=0.1;
	var s1=0;
	var s2=0;
	var disS=0;
	
	
	navWrap.addEventListener('touchstart',function(event){
		stratX=event.changedTouches[0].clientX;
		stratY=event.changedTouches[0].clientY;
		eleX=transformCss(navList,'translateX');
		navList.style.transition='none';
		s1=eleX;
		t1 = new Date().getTime();
		isFirst=true;
	    isX=true;
	    disS=0;
	});
	
	navWrap.addEventListener('touchmove',function(event){
		if(!isX){
			return;
		}
		endX=event.changedTouches[0].clientX;
		endY=event.changedTouches[0].clientY;
		var disX = endX-stratX;
		var disY = endY-stratY;
		translateX = disX+eleX;
		if(translateX>0){
			var a = -1/(4*document.documentElement.clientWidth);
			var b = 1/2;
			translateX=a*translateX*translateX+b*translateX;
		}else if(translateX<document.documentElement.clientWidth-navList.offsetWidth){
			var a = 1/(4*document.documentElement.clientWidth);
			var b = 1/2;
			var c = document.documentElement.clientWidth-navList.offsetWidth;
			var x = navList.offsetWidth-document.documentElement.clientWidth+translateX;
			translateX=a*x*x+b*x+c;
		}
		if(isFirst){
			isFirst=false;
			if(Math.abs(disX)<Math.abs(disY)){
				isX=false;
				
				return;
			}
		}
		transformCss(navList,'translateX',translateX);
		s2=translateX;
		t2=new Date().getTime();
		disS=s2-s1;
		disT=t2-t1;
	});
	
	navWrap.addEventListener('touchend',function(event){
		
		var speed = disS/disT;
		var target = transformCss(navList,'translateX')+speed*100;
		var bezier = '';
		if(target>0){
			target=0;
			bezier = 'cubic-bezier(.15,1.68,.82,1.51)';
		}else if(target<document.documentElement.clientWidth-navList.offsetWidth){
			target=document.documentElement.clientWidth-navList.offsetWidth;
			bezier = 'cubic-bezier(.15,1.68,.82,1.51)';
		}
		navList.style.transition='1s '+bezier;
		transformCss(navList,'translateX',target);
		
	});
	

			
}
	
function banBind(){
	var banWrap = document.querySelector('#wrap .content .banWrap');
	var banList = document.querySelector('#wrap .content .banWrap .banList');
	var lis = document.querySelectorAll('#wrap .content .banWrap .banList li');
	var lis1 = document.querySelectorAll('#wrap .content .banWrap .list li');
	
	var styleNode = document.createElement('style');
	var width = document.documentElement.clientWidth;
	styleNode.innerHTML='#wrap .content .banWrap .banList{width:'+lis.length+'00%;}';
	styleNode.innerHTML+='#wrap .content .banWrap .banList li{width:'+100/lis.length+'%;}';
	document.head.appendChild(styleNode);
	
	
	var eleX = 0;
	var startX = 0;
	var startY = 0;
	var now = 0;
	var isFirst=true;
	var isX=true;
	
	banWrap.addEventListener('touchstart',function(event){
		clearInterval(timer);
		banList.style.transition='none';
		startX=event.changedTouches[0].clientX;
		startY=event.changedTouches[0].clientY;
		if(now==0){
			now=lis1.length;
			tranlateX=-now*document.documentElement.clientWidth;
			transformCss(banList,'translateX',tranlateX);
		}else if(now==lis.length-1){
			now=lis1.length-1;
			tranlateX=-now*document.documentElement.clientWidth;
			transformCss(banList,'translateX',tranlateX);
		}
		eleX=transformCss(banList,'translateX');
		isFirst=true;
	    isX=true;
	});
	banWrap.addEventListener('touchmove',function(event){
		var endX=event.changedTouches[0].clientX;
		var endY=event.changedTouches[0].clientY;
		if(!isX){
			return;
		}
		var disX=endX-startX;
		var disY=endY-startY;
		if(isFirst){
			isFirst=false;
			if(Math.abs(disX)<Math.abs(disY)){
				isX=false;
				
				return;
			}
		}
		
		tranlateX=disX+eleX;
		transformCss(banList,'translateX',tranlateX);
	});
	banWrap.addEventListener('touchend',function(event){
		now=Math.round(-tranlateX/document.documentElement.clientWidth);
		tranlateX=-now*document.documentElement.clientWidth;
		banList.style.transition='.5s';
		transformCss(banList,'translateX',tranlateX);
		for (var i = 0; i < lis1.length; i++) {
			removeClass(lis1[i],'active');
			addClass(lis1[now%lis1.length],'active');
		}
		openTimer();
	});
	
	var timer = null;
	openTimer();
	function openTimer(){
		timer = setInterval(function(){
			
			if(now==lis.length-1){
				now=lis1.length-1;
				banList.style.transition='none';
				tranlateX=-now*document.documentElement.clientWidth;
				transformCss(banList,'translateX',tranlateX);
			}
			setTimeout(function(){
				now++;
				banList.style.transition='.5s';
				tranlateX=-now*document.documentElement.clientWidth;
				transformCss(banList,'translateX',tranlateX);
				for (var i = 0; i < lis1.length; i++) {
					removeClass(lis1[i],'active');
					addClass(lis1[now%lis1.length],'active');
				}
			},20);
			
		},1000);
	}
}

function tabBind(){
	var tabWrapAll = document.querySelectorAll('#wrap .content .tab .tabWrap');
	for (var i = 0; i < tabWrapAll.length; i++) {
		tabWrap(tabWrapAll[i]);
	}
	function tabWrap(tabWrap){
		var listNode = tabWrap.querySelector('ul');
		var loadingNodes = tabWrap.querySelectorAll('.tabLoading');
		var tabNav=tabWrap.previousElementSibling;
		var smallGreen=tabNav.querySelector('.smallGreen');
		transformCss(tabWrap,'translateX',-listNode.offsetWidth);
		transformCss(tabWrap,'translateZ',0.01);
		transformCss(smallGreen,'translateZ',0.01);
		
		var eleX = 0;
		var startX = 0;
		var startY = 0;
		var now = 0;
		var isFirst=true;
		var isX=true;
		var timer=null;
		var isH=false;
		var nows=0;
		
		tabWrap.addEventListener('touchstart',function(event){
			startX=event.changedTouches[0].clientX;
			startY=event.changedTouches[0].clientY;
			eleX=transformCss(tabWrap,'translateX');
			isFirst=true;
		    isX=true;
		    isH=false;
		    tabWrap.style.transition='none';
		});
		tabWrap.addEventListener('touchmove',function(event){
			var endX=event.changedTouches[0].clientX;
			var endY=event.changedTouches[0].clientY;
			if(!isX){
				return;
			}
			if(isH){
				return;
			}
			var disX=endX-startX;
			var disY=endY-startY;
			if(isFirst){
				isFirst=false;
				if(Math.abs(disX)<Math.abs(disY)){
					isX=false;
					
					return;
				}
			}			
			tranlateX=disX+eleX;
			if(tranlateX>-listNode.offsetWidth*0.5||tranlateX<-listNode.offsetWidth*1.5){
				isH=true;
				if(tranlateX>-listNode.offsetWidth*0.5){
					nows--;
					if(nows<0){
						nows=5;
					}
					smallGreen.style.transition='.5s';
					transformCss(smallGreen,'translateX',nows*smallGreen.offsetWidth);
				}else if(tranlateX<-listNode.offsetWidth*1.5){
					nows++;
					if(nows>5){
						nows=0;
					}
					smallGreen.style.transition='.5s';
					transformCss(smallGreen,'translateX',nows*smallGreen.offsetWidth);
				}
				now=Math.round(-tranlateX/listNode.offsetWidth);
				tranlateX=-now*listNode.offsetWidth;
				tabWrap.style.transition='.5s';
				transformCss(tabWrap,'translateX',tranlateX);
				tabWrap.addEventListener('transitionend',function(){
					for (var i = 0; i < loadingNodes.length; i++) {
						loadingNodes[i].style.opacity='1';
					}
					setTimeout(function(){						
						tabWrap.style.transition='none';
						transformCss(tabWrap,'translateX',-listNode.offsetWidth);
						for (var i = 0; i < loadingNodes.length; i++) {
							loadingNodes[i].style.opacity='0';
						}
					},1000);
				});
				
			}
			transformCss(tabWrap,'translateX',tranlateX);
		});
		tabWrap.addEventListener('touchend',function(event){
			tranlateX=transformCss(tabWrap,'translateX');
			if(tranlateX<-listNode.offsetWidth*0.5&&tranlateX>-listNode.offsetWidth*1.5){
				now=Math.round(-tranlateX/listNode.offsetWidth);
				tranlateX=-now*listNode.offsetWidth;
				tabWrap.style.transition='.5s';
				transformCss(tabWrap,'translateX',tranlateX);
			}
		});
	}
	
}

function contentBind(){
	var eleY = 0;
	var startX = 0;
	var startY = 0;
	var isFirst=true;
	var isX=true;
	var isH=false;
	var translateY=0;
	var timer = null;
	
	var content = document.querySelector('#wrap .content');
	transformCss(content,'translateZ',0.01)
	var scrollBar = document.getElementById('scrollBar');
	var scale = document.documentElement.clientHeight/content.offsetHeight;
	scrollBar.style.height=scale*document.documentElement.clientHeight+'px';
	var t1=0;
	var t2=0;
	var disT=0.1;
	var s1=0;
	var s2=0;
	var s3=0;
	var s4=0;
	var disS=0;
	var disS1=0;
	
	content.addEventListener('touchstart',function(event){
		stratX=event.changedTouches[0].clientX;
		stratY=event.changedTouches[0].clientY;
		eleY=transformCss(content,'translateY');
		content.style.transition='none';
		scrollBar.style.transition='none';
		s1=eleY;
		s3=transformCss(scrollBar,'translateY')
		t1 = new Date().getTime();
		isFirst=true;
	    isX=true;
	    disS=0;
	    disS1=0;
	    scrollBar.style.display='block';
	    clearTimeout(timer);
	});
	
	content.addEventListener('touchmove',function(event){
		if(!isX){
			return;
		}
		endX=event.changedTouches[0].clientX;
		endY=event.changedTouches[0].clientY;
		var disX = endX-stratX;
		var disY = endY-stratY;
		translateY = disY+eleY;
		if(translateY>0){
			var a = -1/(4*document.documentElement.clientHeight);
			var b = 1/2;
			translateY=a*translateY*translateY+b*translateY;
		}else if(translateY<document.documentElement.clientHeight-content.offsetHeight){
			var a = 1/(4*document.documentElement.clientHeight);
			var b = 1/2;
			var c = document.documentElement.clientHeight-content.offsetHeight;
			var x = content.offsetHeight-document.documentElement.clientHeight+translateY;
			translateY=a*x*x+b*x+c;
		}
		if(isFirst){
			isFirst=false;
			if(Math.abs(disY)<Math.abs(disX)){
				isX=false;
				
				return;
			}
		}
		transformCss(content,'translateY',translateY);
		transformCss(scrollBar,'translateY',-translateY*scale);
		s2=translateY;
		s4=-translateY*scale;
		t2=new Date().getTime();
		disS=s2-s1;
		disS1=s4-s3;
		disT=t2-t1;
	});
	
	content.addEventListener('touchend',function(event){
		
		var speed = disS/disT;
		var speed1 = disS1/disT;
		var target = transformCss(content,'translateY')+speed*100;
		var targetB = transformCss(scrollBar,'translateY')+speed1*100;
		var bezier = '';
		if(target>0){
			target=0;
			bezier = 'cubic-bezier(.15,1.68,.82,1.51)';
			targetB = 0;
		}else if(target<document.documentElement.clientHeight-content.offsetHeight){
			target=document.documentElement.clientHeight-content.offsetHeight;
			targetB=document.documentElement.clientHeight-scrollBar.offsetHeight;
			bezier = 'cubic-bezier(.15,1.68,.82,1.51)';
		}
		content.style.transition='1s '+bezier;
		scrollBar.style.transition='1s '+bezier;
		transformCss(content,'translateY',target);
		transformCss(scrollBar,'translateY',targetB);
		timer=setTimeout(function(){
			scrollBar.style.display='none';
		},1000);
	});
}
