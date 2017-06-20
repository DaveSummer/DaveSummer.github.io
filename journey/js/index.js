/*封装一个通过ID属性获取元素的方法*/
function byId(id){
	return typeof(id) === "string"?document.getElementById(id):id;
}

/*==========================点击导航栏变色===================================*/

//获取元素
var navList = byId('nav_list');

var lists = navList.children;

//遍历数组
for(var i = 0; i < lists.length; i++){

	//获取当前元素在数组中的位置
	lists[i].index = i;

	//绑定点击事件
	lists[i].onclick = function(){

		//给当前元素添加一个class属性
		this.className = 'current';

		//再次遍历
		for(var j = 0; j < lists.length; j++){

			//这个判断是为了排除每一个li是否是当前点击的这个this，如果不是，则将每一个li的className变为空值
			if(lists[j] != this){

		    	lists[j].className = "";

		    }
		}
	}
}



/*===============================图片轮播========================================*/

//获取元素
var bannerWrap = byId('bannerWrap');

var bannerList = byId('bannerList');

var prev = byId('prev');

var next = byId('next');

var timer;

//定义一个函数实现图片的无缝切换
function animate(offset){

	var newLeft = parseInt(bannerList.style.left) + offset;

	bannerList.style.left = newLeft + 'px';

	//判断left是否超出或者小于图片所在区域
	if(newLeft > -1127){
		bannerList.style.left = -4508 + 'px';
	}
	if(newLeft < -4508){
		bannerList.style.left = -1127 +'px';
	}
}


//自动播放
function play(){
    timer = setTimeout(function(){
    next.onclick();
    play();
    }, 3000);
}

function stop() {
    clearTimeout(timer);
}
//绑定点击事件
next.onclick = function(){
	animate(-1127);
}

prev.onclick = function(){
	animate(1127); 
}

bannerWrap.onmouseover = stop;

bannerWrap.onmouseout = play;

play();


/*===========================================回到顶部========================================*/

//页面加载完毕后调用
window.onload = function(){

	//获取到回到顶部的元素
	var toTop = byId('toTop');

	//定义一个定时器
	var timer = null;

	//定义一个布尔值，用来判断是否到达顶部
	var isTop = true;

	//绑定一个滚动条滚动事件
	window.onscroll = function(){

		//获取滚动条的滚动高度，注意兼容性问题
		var osTop = document.documentElement.scrollTop || document.body.scrollTop;

		//如果滚动高度大于200，则显示回到顶部的按钮;否则的话隐藏
		if(osTop >= 200){

			//改变按钮的display属性
			toTop.style.display = 'block';
		}else{
			toTop.style.display = 'none';
		}

		//主要用于判断当 点击回到顶部按钮后 滚动条在回滚过程中，若手动滚动滚动条，则清除定时器
        if(!isTop){

            clearInterval(timer);
        }
        isTop = false;

	}

	//给按钮绑定一个点击事件
	toTop.onclick = function(){

		//设置一个定时器
		timer = setInterval(function(){

			//获取滚动条的高度
			var osTop = document.documentElement.scrollTop || document.body.scrollTop;

			//设置一个速度差，产生缓慢移动的效果
			var speed = Math.floor(-osTop/6);

			document.documentElement.scrollTop = document.body.scrollTop = osTop + speed;

			//阻止滚动事件清除定时器
			isTop =true; 

			//当滚动条高度为0时清除定时器
			if(osTop == 0){
               clearInterval(timer);
            }
		},50);
	}
}



/*=====================================选项卡切换=====================================*/

//获取元素
var tabs = byId('tabs');

var tabList = byId('tabList').getElementsByTagName('li');

var tabCon = byId('tabCon').getElementsByClassName('tab_wrap');

//定义一个定时器
var timer = null;

//遍历数组
for(var i = 0; i < tabList.length; i++){

	//获取当前元素的下标
	tabList[i].index = i;

	//绑定一个点击事件
	tabList[i].onclick = function(){

		//调用show函数
		show(this.index);
	}
}


//定义一个函数
function show(a){

	//将上面获取到的元素下标赋值给参数a
	index = a;

	//定义一个变量并赋值为0
	var alpha = 0;

	//再次遍历
	for(var j = 0; j < tabList.length; j++){

		//先将所有的类名置为空，让容器的透明度为0

		tabList[j].className = "";

		tabCon[j].className = "tab_wrap";

		tabCon[j].style.opacity = 0;

		tabCon[j].style.filter = "alpha(opacity=" + alpha + ")";
	}

	tabList[index].className = "cur_li";

	//清除定时器
	clearInterval(timer);

	//设置一个定时器
	timer = setInterval(function(){

		alpha += 2;

		alpha > 100 && (alpha = 100);

		tabCon[index].style.opacity = alpha / 100;

		tabCon[index].style.filter = "alpha(opacity=" + alpha + ")";

		alpha == 100 && clearInterval(timer);

	},5)
}






/*=====================================表单验证======================================*/

//获取元素
var email = byId('email');

var error = byId('error');

//绑定获取焦点事件
email.onfocus = function(){
	email.value = "";
}

//绑定失去焦点事件
email.onblur = function(){

	//获取输入框中的内容
	var emailValue = email.value;

	//正则表达式(邮箱格式)
	var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

	//判断输入框的内容是否为空
	if(emailValue == "" || emailValue == null){

		//如果为空则还原默认的value
		email.value = 'email address';

		//并改变而error元素的高度
		error.style.height = 20 + 'px';
	}else{
		
		//判断邮箱格式
		if(myreg.test(emailValue)) {
			error.style.height = 0 + 'px';	
		}
		else{
			error.style.height = 20 + 'px';
		}
	}
}

