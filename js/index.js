//弹出视频
(function () {
	var playBtn = document.querySelector('#section1 .play'),
		dialog = document.querySelector('.dialog'),
		shadow = document.querySelector('.shadow'),
		closeBtn = document.querySelector('.closeBtn'),
		movie = document.querySelector('.movie');

	var movieInner = movie.innerHTML; //存储了一下视频

	playBtn.onclick = function () {
		dialog.style.display = shadow.style.display = 'block';
		movie.innerHTML = movieInner;
	}
	closeBtn.onclick = function () {
		dialog.style.display = shadow.style.display = 'none';
		movie.innerHTML = '';
	}
})();

(function () { //选项卡
	function tab(btn, content) {
		var btns = btn.children; //选项按钮
		var cons = content.children; //选项内容

		for (var i = 0; i < btns.length; i++) {
			btns[i].index = i; //给每个btn身上添加一条索引属性
			btns[i].onclick = function () {
				for (var i = 0; i < btns.length; i++) {
					btns[i].classList.remove('active');
					cons[i].classList.remove('active');
				}

				this.classList.add('active');
				cons[this.index].classList.add('active');
			}
		}
	}

	var tabBtns = document.querySelectorAll('.tabBtn'); //取到页面里所有的选项
	var tabContents = document.querySelectorAll('.tabContent'); //取到页面里所有的选项内容

	for (var i = 0; i < tabBtns.length; i++) {
		tab(tabBtns[i], tabContents[i]); //把页面里所有的选项卡都调用一下
	}
})();

(function () { //轮播图
	function carousel(id) {
		var wrap = document.querySelector(id + ' .wrap'),
			ul = document.querySelector(id + ' ul'),
			btns = document.querySelectorAll(id + ' .btn'),
			circles = document.querySelectorAll(id + ' .circle span'),
			boxWidth = wrap.offsetWidth, //一个li的宽度
			timer = null,
			canClick = true; //这个变量决定用户是否可以进行下一次的点击true:可以;false:不可以

		//复制一份
		ul.innerHTML += ul.innerHTML;
		var len = ul.children.length; //子元素的数量
		ul.style.width = len * boxWidth + 'px';
		ul.style.transform = 'translateX(0)'; //初始化一个位置

		var cn = 0; //当前li的索引
		var ln = 0; //上一个li的索引

		function move() {
			canClick = false; //运动的时候不能点击
			ul.style.transition = '.3s';
			ul.style.transform = 'translateX(' + -cn * boxWidth + 'px)';

			/*
				cn:0 1 2 3 4 5 6 
				hn:0 1 2 3 0 1 2 3
			 */

			var hn = cn % (len / 2);
			circles[ln].className = '';
			circles[hn].className = 'active';

			ln = hn; //当前次的点击相对于下一次的点击就是上一个
		}

		ul.addEventListener('transitionend', function () { //当运动走到位置的时候就会触发
			// console.log(1);
			if (cn == len / 2) {
				cn = 0;
				ul.style.transition = '';
				ul.style.transform = 'translateX(0)';
			}

			canClick = true; //走到位置后可以进行下次点击
		});

		//下一张
		btns[1].onclick = function () {
			if (!canClick) {
				return; //这个条件成立说明不能点击
			}

			cn++;
			move();
		};

		//上一张
		btns[0].onclick = function () {
			if (!canClick) {
				return; //这个条件成立说明不能点击
			}

			if (cn == 0) {
				cn = len / 2;
				ul.style.transition = '';
				ul.style.transform = 'translateX(' + -cn * boxWidth + 'px)';
			}
			//move();
			setTimeout(function () {
				//如果直接调用move的话，move里的transition会把if里的transition覆盖掉，所以就会有过渡的效果。用定时器是把代码变成了异步，代码就不会同时执行
				cn--;
				move();
			});
		};

		timer = setInterval(btns[1].onclick, 3000);


		//圆点点击
		for (var i = 0; i < circles.length; i++) {
			circles[i].index = i;
			circles[i].onclick = function () {
				if (!canClick) {
					return; //这个条件成立说明不能点击
				}

				cn = this.index; //把cn的值变成自己对应的索引
				move();
			}
		}
	}

	carousel('#section3');
	carousel('#section5');
})();

(function () { //新增场景
	var section4 = document.querySelector('#section4');
	var lis = document.querySelectorAll('#section4 li');
	var bottom = document.querySelector('#section4 .bottom'); //选项内容

	for (var i = 0; i < lis.length; i++) {
		lis[i].index = i; //给每个btn身上添加一条索引属性
		lis[i].onclick = function () {
			for (var i = 0; i < lis.length; i++) {
				lis[i].classList.remove('active');

			}
			this.classList.add('active');

			section4.style.background = 'url(images/section4_big_0' + (this.index + 1) + '.png) no-repeat center top'
			bottom.style.background = 'url(images/section4_big_0' + (this.index + 1) + '_bottom.png) no-repeat center top'
		}
	}
})();

(function () { //手风琴
	var lis = document.querySelectorAll('#section7 li');

	for (var i = 0; i < lis.length; i++) {
		lis[i].index = i; //给每个btn身上添加一条索引属性
		lis[i].onclick = function () {
			for (var i = 0; i < lis.length; i++) {
				lis[i].classList.remove('active');

			}
			this.classList.add('active');
		}
	}
})();

(function () {
	var ul = document.querySelector('#section8 ul'),
		lis = ul.children,
		btns = document.querySelectorAll('#section8 .btn'),
		spans = document.querySelectorAll('#section8 .circle span'),
		ln = 0,
		cn = 0;

	btns[1].onclick = function () {
		cn++;
		cn %= lis.length;

		ul.appendChild(lis[0]);

		spans[ln].className = '';
		spans[cn].className = 'active';

		ln = cn;
	}

	btns[0].onclick = function () {
		cn--;
		if (cn < 0) {
			cn = lis.length - 1;
		}

		//insertBefore方法会阻止transition
		ul.insertBefore(lis[lis.length - 1], lis[0]);

		spans[ln].className = '';
		spans[cn].className = 'active';

		ln = cn;
	}
	/*
		[ {l:0,t:10}, {l:0,t:10}, {l:0,t:10}, {l:0,t:10}, ] 
		[li, li, li, li] 
	 */

	//https://violentmonkey.github.io/
	//http://music.vaiwan.com/
})();