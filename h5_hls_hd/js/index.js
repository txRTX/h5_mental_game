$(function(){
	//全局参数
	var pageH  = $('.page').height();
	var pageWidth = 10500/1334*pageH;		
	var page1 = 1300/1334*pageH;
	var page2 = 3792/1334*pageH;
	var zhaiwu = 4900/1334*pageH;
	var page3 = 6639/1334*pageH;
	var page4 = 9013/1334*pageH;
	var docW = $(document).width();
	var docH  = $(document).height();
	var lastposition = 0;
	var $showBox = $('.showBox');
	var $showImg = $('.showBox .showImg');
	var $showSrcImg = $('.showBox .showImg img');
	
	//设定page页宽度,主
	$('.page').width(pageWidth);
	if((docW/docH)>0.63){
		$('.logo').css('bottom','auto');
	}
	var cartimer = null;
	function bindEvent(){	
		//开始旅途
		$('.enterBtn').on('touchstart',function(){
			var timerType = $('.chooseBox p.active').attr('data-type');
			$('.rqqBox img').attr('src','//file.40017.cn/tcweb/swact/20170518hls/img/'+timerType+'_rqq.png');
			if(cartimer){
				clearInterval(cartimer)
			}
			var flag = true;
			cartimer = setInterval(function(){
				flag = !flag
				if(flag){
					$('.car img').attr('src','//file.40017.cn/tcweb/swact/20170518hls/img/'+timerType+'_car1.png')
				}else{
					$('.car img').attr('src','//file.40017.cn/tcweb/swact/20170518hls/img/'+timerType+'_car2.png')
				}
			},300)
			$('.indexPage').hide()
			$('.mainCon').css('opacity','1');
			console.log(pageWidth+'=='+docW)
			new pageMove(-(pageWidth-docW),50,500)
		});
		choosePeo('peo1','peo1');
		$('.chooseBox p').on('touchstart',function(){
			$(this).addClass('active').siblings().removeClass('active');
			var peoType = $(this).attr('data-type');
			clearInterval(curtimer);
			choosePeo(peoType,peoType);
			
		});
		$('.shareBtn').on('touchstart',function(){
			if(!_tc_bridge_public.isTc){
				$('.shareBox').show();	
			}
			shareGame();
		});
		$('.gameAgain').on('touchstart',function(){
			$('.indexPage').show()
			$('.mainCon').css('opacity','0').show();
			$('.mainCon .car').show().css({'width':'34','bottom':'11%','transform':'rotate(0deg)','-webkit-transform':'rotate(0deg)','left':'0'});
			$('.sucpage').hide();
			$('.page').css({'transform':'translate3d(0px,0px,0)','-webkit-transform':'translate3d(0px,0px,0)'});
			$('.addspeedBtn,.papoBtn').hide()
		})
	}
	function getPrizeJk(memberid,phonenumber){
		$.ajax({
			url:"//m.ly.com/biz/api/RedPakage/GetRedPakage/",
			type:"POST",
			dataType:'json',
			data:{
				'ActivityFlag' : '518hls',
				'MemberId' : memberid,
				'Mobile' : phonenumber
				
			},
			success:function(data){
				var obj = JSON.parse(data)
				console.log(obj)
				if(obj.code == 200 || obj.code == 501){
					var reabagList = '';
					if(obj.result.NewRedPackageList.length>0){
						reabagList = obj.result.NewRedPackageList;
					}else{
						reabagList = obj.result.OldRedPackageList;
					}
					
					for(var i = 0;i<reabagList.length;i++){
						
						var currentLi = $('.redBag ul li').eq(i);
						var curInfo = reabagList[i];
						var first = currentLi.children('.first');
						var second = currentLi.children('.second');
						var third = currentLi.children('.useBtn');
						
						first.children('span').html(curInfo.ParValue);
						second.children('.signTtl').html(curInfo.ProjectName);
						second.children('.dates').html(curInfo.EndTime);
						second.children('#mj').html(curInfo.MinConsume);
						third.children('a').attr('href',curInfo.RedirectUrl);
					}
				}
				
				
			},
			complete:function(){
				$('.getredBag').hide();
				$('.sucpage').show()
			},
			error:function(){
				alert('出错啦，请重试！')
			}
			
		});
		
	}
	
	function getPrize(){
		var isMember = '';
		$('.redBagBtn').off('touchstart').on('touchstart',function(){
			if(_tc_bridge_public.isTc){//在同程内部
				_tc_bridge_user.get_device_info({
				    param:{
				    },
				    callback: function (data) {
				        isMember = JSON.parse(data.CBData).memberInfo.memberId;
				        if(isMember){
				        	alert(isMember)
				        	getPrizeJk(isMember,'');
				        	
				        }else{
					       	_tc_bridge_user.user_login({
							    param:{
							    },
							    callback: function (data) {
							        isMember = JSON.parse(data.CBData).memberInfo.memberId;
							        if(isMember){
							        	//接口对接
								       	getPrizeJk(isMember,'');
							        }else{
							        	return;
							        }
							        
							    }
							})
				        }
				    }
				})
			}else{
				var phoneNum = $('.phoneNumber').val();
				if(phoneNum == ''){
					alert('手机号不能为空！');
				}else if(phoneNum.length != 11){
					alert('手机号输入错误！');
				}else{
					getPrizeJk('',phoneNum)
				}
				
			}
		});
	}
	
	var curtimer = null
	function choosePeo(peoType,timeType,lastTime){
		change = 0;
		curtimer = setInterval(function(){
			change++
			if(change > 2){
				change = 1
			}
			$('.chooseBox p.active .light').attr('src','//file.40017.cn/tcweb/swact/20170518hls/img/'+peoType+'_light'+change+'.png')
		},300)
	}
	//画条直线
	function drawLine(thisObj){
		var startX = 0; 
		var startY = 0;
		var moveX = 0; 
		var moveY = 0;
		var lineX =0;
		var str='';
		
		$showImg.on('touchstart',function(e){
			var touch = e.touches[0];
			startX = touch.pageX;
		　　 startY = touch.pageY;
		})
		$showImg.on('touchmove',function(e){
			var touch = e.touches[0];
			moveX = touch.pageX;
		　　 moveY = touch.pageY;
		})
		$showImg.on('touchend',function(){
			if( moveY < startY && moveY !=0){
				$showBox.hide();
				$showImg.off('touchstart touchend touchmove');
				thisObj.moveX += -docW*1.2
				$('.page').css({'transform':'translate3d('+thisObj.moveX+'px,0px,0)','-webkit-transform':'translate3d('+thisObj.moveX+'px,0px,0)'});
				setTimeout(function(){
					thisObj.moveHb();
					$('.rqqBox').show();
					$('.yun').show().addClass('fly');
					$('.yun2').show().addClass('yunfly');
				},800)
				
				$('.mainCon .car').hide();
				
			}
		})
	}
	function moveCar(thisObj){
		
		var counts = 0;
		
		$('.stone').on('touchstart',function(){
			counts++
			if(counts>=3){
				$('.stone').off('touchstart');
				thisObj.moveHb();
			}
			$(this).hide()
		})
	}
	
	
	function addSpeed(thisObj){
		var speedX = 0;
		var clickcount = 0;
		var distanceP4 = page4 + thisObj.moveX
		var singleDis = -distanceP4/4
		
		$('.addspeedBtn').on('touchstart',function(){
			
			clickcount++;
			thisObj.moveX += singleDis
			$('.car').css({'bottom':'11%','left':'20%','top':'auto','width':'30%'})
			$('.page').css({'transform':'translate3d('+thisObj.moveX+'px,0px,0)','-webkit-transform':'translate3d('+thisObj.moveX+'px,0px,0)'});
			lastposition = thisObj.moveX;
			console.log(clickcount)
			if(clickcount >=4){
				$('.addspeedBtn').off('touchstart');
				setTimeout(function(){
					$showSrcImg.attr('src','//file.40017.cn/tcweb/swact/20170518hls/img/show_img4.png');
					$showImg.css({'top':'71%','width':'39%'});
					 $showBox.show();
					$('.addspeedBtn').hide();
					$('.showImg').on('touchstart',function(){
						$('.showImg').off('touchstart');
						 $showBox.hide();
						$showImg.css('width','42%');
						$('.papoBtn').show();
						new StoneMove(11,20,6,6,0,thisObj);
					})
				},1000)
			}
			
		
			
		});
		
	}
	
	//小车爬坡
	function StoneMove(initPosT,initPosL,speed1,speed2,count,carObj){
		this.initPos = {'top':initPosT,'left':initPosL};
		this.stoneY = initPosT;
		this.stoneX = initPosL;
		this.speed2 = speed2;
		this.speed1 = speed1;
		this.count = count;
		this.timer = null;
		this.bindTime(carObj);
		this.flag = true;
		var that = this;
		var topY = 86-docW/docH*45;
		$('.papoBtn').on('touchstart',function(){
			that.stoneY += speed1;
			that.stoneX -=5;
			if(that.flag){
				that.flag = false
				$('.car').css({'transform':'rotate(-40deg)','-webkit-transform':'rotate(-40deg)'})
			}
			that.count++;
			if(that.stoneX<5){
				that.stoneX = 5;
			}
			$('.car').css({'bottom':that.stoneY+'%','left':that.stoneX+'%'});
			carObj.moveX += -50;
			//到达边界判断
			var carBot = $('.car').css('bottom');
			
			if(carObj.moveX <= carObj.pageW){
				
				carObj.moveX = carObj.pageW
	
				if(that.stoneY > topY){
					console.log(that.stoneY +'=='+topY);
					
					console.log('carObj.moveX'+carObj.moveX+'=='+carObj.pageW)
					$('.papoBtn').off('touchend');
					$('.car').css('bottom','63%');
					$('.papoBtn').unbind('touchstart touchend');
					clearInterval(that.timer)
					setTimeout(function(){
						$('.alertBox').show();
						$('.alertBox .alertBtn').on('touchstart',function(){
							$('.alertBox').hide();
							$('.mainCon').hide();
							$('.getredBag').show();
							if(_tc_bridge_public.isTc){
							$('.phoneNumber').hide()
							}else{
								$('.phoneNumber').show()
							}
						})
					},1500)
				}	
			}
			$('.page').css({'transform':'translate3d('+carObj.moveX+'px,0px,0)','-webkit-transform':'translate3d('+carObj.moveX+'px,0px,0)'});
			clearInterval(that.timer)
		});
		$('.papoBtn').on('touchend',function(){
			that.bindTime(carObj)
		})
	}
	
	StoneMove.prototype = {
		bindTime:function(carObj){
			var _this = this;
			
			_this.timer = setInterval(function(){		
				_this.stoneY -= _this.speed2;
				_this.stoneX +=  5;
				carObj.moveX += 50;
				if(_this.stoneY <=  _this.initPos.top){
					 _this.stoneY  =  _this.initPos.top;
					 _this.stoneX =  _this.initPos.left;
					 carObj.moveX = lastposition
						_this.flag = true
						$('.car').css({'transform':'rotate(0deg)','-webkit-transform':'rotate(0deg)'})
					
					clearInterval(_this.timer)
				}
				_this.count--
				
				$('.page').css({'transform':'translate3d('+carObj.moveX+'px,0px,0)','-webkit-transform':'translate3d('+carObj.moveX+'px,0px,0)'});
				$('.car').css({'bottom':_this.stoneY+'%','left':_this.stoneX+'%'});
			},500)
			
		}
	}
	//构造移动背景
	function pageMove(pageW,speed,moveTime){
		this.timer = null;
		this.moveX = 0;
		this.pageW  = pageW;
		this.speed = speed;
		this.moveTime = moveTime;
		this.moveHb();
		this.signState = [true,true,true,true,true];
		console.log(page1)
	}
	pageMove.prototype = {
		moveHb : function(){
			var _this = this;
			_this.timer = setInterval(function(){
			_this.moveX -=_this.speed
				
				if(_this.moveX < -(page1-docW) && _this.signState[0]){
					_this.signState[0] = false;
					clearInterval(_this.timer);
					_this.moveX = -(page1-docW);
				
					setTimeout(function(){
						$showSrcImg.attr('src','//file.40017.cn/tcweb/swact/20170518hls/img/show_img1.png')
						 $showBox.show();
						$showImg.css('top','20%');
						drawLine(_this);
					},1000)
					
				}
				if(_this.moveX < -(page2-docW) && _this.signState[1]){
					_this.signState[1] = false;
					_this.moveX = -(page2-docW);
					
					setTimeout(function(){
						$('.mainCon .car').show().css('bottom','8%');
						$('.rqqBox').hide();
						$('.yun').hide().removeClass('fly');
						$('.yun2').removeClass('yunfly').addClass('yunhide');
					},3000)
				}
				if(_this.moveX < -(zhaiwu-docW) && _this.signState[2]){
					_this.signState[2] = false;
					clearInterval(_this.timer);
					_this.moveX = -(zhaiwu-docW);
					setTimeout(function(){
						$showSrcImg.attr('src','//file.40017.cn/tcweb/swact/20170518hls/img/show_img2.png');
						$showImg.css('top','71%');
						$('.stone').show();
						 $showBox.show();
						$('.showImg').on('touchstart',function(){
							$('.showImg').off('touchstart');
							$showBox.hide();
						})
					},1000)
					moveCar(_this)
					
				}
				
				if(_this.moveX < -(page3-docW) && _this.signState[3]){
					_this.signState[3] = false;
					clearInterval(_this.timer);
					_this.moveX = -(page3-docW);
					setTimeout(function(){
						$showSrcImg.attr('src','//file.40017.cn/tcweb/swact/20170518hls/img/show_img3.png');
						$showImg.css({'top':'71%'});
						 $showBox.show();
						$('.showImg').on('touchstart',function(){
							$('.showImg').off('touchstart');
							 $showBox.hide();
							$('.addspeedBtn').show();
						})
					},1000)
					addSpeed(_this)
				}
				if(_this.moveX < -(page4-docW) && _this.signState[4]){
					_this.signState[4] = false;
					_this.moveX = -(page4-docW)
				}
				if(_this.moveX < _this.pageW){
					clearInterval(_this.timer);
					_this.moveX = -(pageWidth-docW)
				}
				//console.log(_this.signState)
					$('.page').css({'transform':'translate3d('+_this.moveX+'px,0px,0)','-webkit-transform':'translate3d('+_this.moveX+'px,0px,0)'});
			},_this.moveTime);
		},
		clickBtn : function(){
			var _this = this
			$('.page').on('touchstart',function(){
				$('.page').off('touchstart')
				_this.moveHb();
				console.log(_this)
			})
		}
	}

	//分享
	function shareGame(){
		var shareImage ="http://file.40017.cn/tcweb/swact/20170518hls/img/share.jpg";
		var shareTitle ='【欢乐颂】当你选择为爱前行时，那一定是最勇敢的自己……';
		var shareContent ='用心出发，世界都在你的脚下';
		var shareUrl = window.location.href+'?redfid=305753413';
		
		if(_tc_bridge_public.isTc){
			
			_tc_bridge_bar.shareInfoFromH5({
			    param: {
			        "tcsharetxt": shareTitle,
			        "tcsharedesc": shareContent,
			        "tcshareurl": shareUrl,
			        "tcshareimg": shareImage
			    },
			    callback: function (data) {// 仅微信单独的分享才有回调信息。
			        alert("callback:" + JSON.stringify(data));
			    }
			})
		}else{
			fed_wxshare.config({
			   // jsApiList: [],//非必传；需要使用的JS接口列表，参数为数组类型，默认为['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo'];
			    shareImg: shareImage,//必传
			    shareUrl: shareUrl,//必传
			    shareTitle: shareTitle,//非必传
			    shareDesc: shareContent//非必传
			})
		}
	}
	
	function getImgArr(){
		var allImg = ['https://file.40017.cn/tcweb/swact/20170518hls/img/bg-02.jpg','https://file.40017.cn/tcweb/swact/20170518hls/img/index_bg.jpg','https://file.40017.cn/tcweb/swact/20170518hls/img/get_redbag_bg.jpg'];
		var peoArr = [];
		var imgStr = '';
		for(var i= 1;i < 6; i++ ){
			imgStr += 'https://file.40017.cn/tcweb/swact/20170518hls/img/peo'+i+'.png'+','+'https://file.40017.cn/tcweb/swact/20170518hls/img/peo'+i+'_car1.png'+','+'https://file.40017.cn/tcweb/swact/20170518hls/img/peo'+i+'_car1.png'+','+'https://file.40017.cn/tcweb/swact/20170518hls/img/peo'+i+'_light1.png'+','+'https://file.40017.cn/tcweb/swact/20170518hls/img/peo'+i+'_light2.png'+',';
			
			peoArr = imgStr.split(',')
		}
		peoArr.concat(allImg);
		peoArr.splice(peoArr.length-1,1)
		console.log(peoArr)
		return peoArr;
	}
	
	function getLoader(){
		var loader = new resLoader({
			resources: getImgArr(),
			onStart: function(total) {
				console.log('start:' + total);
			},
			onProgress: function(current, total) {
				var total = parseInt(current/total*100);
				$('.loading .loadText').html(total+'%')
			},
			onComplete: function(total) {
				$('.loading').hide();
				$('.indexPage').show();
				
			}
	});
		return loader;
	};	
	
	
	function init(){
		if(!_tc_bridge_public.isTc){
			shareGame();
		}
		_tc_bridge_bar.set_navbar({
			 "param": {
		         'center': [{'tagname': "tag_title", 'value': '欢乐颂'}],
		        "right": [{"tagname": "tag_click_city", "icon_type": "",'icon':'i_share'}]
		    },
			'callback':function(data){
				alert(data)
				shareGame();
			}
		})
		$('.shareBox').on('touchstart',function(){
			$(this).hide();
		})
		
		
		getLoader().start();
		bindEvent();
		getPrize();
	}
	init();
	
})
