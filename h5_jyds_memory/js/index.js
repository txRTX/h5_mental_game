$(function(){
	var allGrade = 0; //记录成绩
	var allclickCount = 0;
	var $alertText = $('.alertBox .text span');
	var $alertShow = $('.alertShadow , .alertBox');
	function bindEvent(){
		setTimeout(function(){
			
			$('.indexPage .indexBtn').on('touchend',function(){
				var thisP = $(this).parent('.indexPage')
				thisP.addClass('jinying').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
					thisP.removeClass('jinying').hide();
					$('.chooseGame').show().addClass('chuxian');
				});
			});
		},1500);
		
		//选择游戏按钮
		$('.chooseGame .chooseBox .game').on('touchstart',function(e){
			e.stopPropagation();
			e.preventDefault();
			$('.chooseGame .chooseBox .game').off('touchstart')
			var _this = $(this);
			_this.addClass('active').siblings().removeClass('active');
			var gameType = _this.data('type');
			setTimeout(function(){
				$('.chooseGame').hide();
				$('#blockPage'+gameType).show();
				chooseGameType(gameType);
				localStorage.currentgame = gameType;
				if(gameType == 1){
					if(localStorage.gameOne){
						currentLocalCount = localStorage.gameOne;
					}
					localStorage.gameOne = 1;
				}else if(gameType == 2){
					if(localStorage.gameTwo){
						currentLocalCount = localStorage.gameTwo;
					}
					localStorage.gameTwo = 1;
				}else if(gameType == 3){
					if(localStorage.gameThree){
						currentLocalCount = localStorage.gameThree;
					}
					localStorage.gameThree = 1;
				}else if(gameType == 4){
					if(localStorage.gameFour){
						currentLocalCount = localStorage.gameFour;
					}
					localStorage.gameFour = 1;
				}
			},500)
			
		});
	
		//活动规则
		$('.activityRule').on('touchstart',function(e){
			e.stopPropagation();
			e.preventDefault()
			$('.rules').show();
          	$('.chooseGame').hide()
			
		});
		$('.closeBtn').on('touchstart',function(e){
			e.stopPropagation();
			e.preventDefault()
			$('.rules').hide();
          	$('.chooseGame').show()
		});
		
		//选择其他
		$('.alertBox .alertBtns .chooseOthers').off('click').on('click',function(event){
			event.stopPropagation();
			event.preventDefault();
			var reloadUrl = window.location.href.split('?')[0]+'?gameAgain=gamechoose'
			location.replace(reloadUrl)
		});
		
		//领取奖励
		$('.getPrideBtn').on('touchstart',function(event){
			event.stopPropagation();
			event.preventDefault();
		});
		
		//再测一次
		$('.gameAgain').on('touchstart',function(){
			var againUrl = window.location.href.split('?')[0];
			location.replace(againUrl);
		});
		
		$('.shareBox').on('touchstart',function(){
			$(this).hide();
		})
		
	}
	//game1
	function playGame1(){
		//创建数字
		var allNumbers = [0,1,2,3,4,5,6,7,8,9];
		//随机获取当前游戏数字
		var currentNum = getRandomNum(5,allNumbers);
		
		//渲染当前数据
		for(var i = 0; i < currentNum.length; i++){
			var domNum = i+1;
			var curDom = $('.memeryBox .number'+domNum);
			curDom.attr('data-type',currentNum[i])
			//curDom.data('type',currentNum[i]);
			curDom.children('.numBack').children('img').attr('src','//file.40017.cn/tcweb/swact/170425jyds/img/number'+currentNum[i]+'.png');
		}
		
		setTimeout(function(){
			$('.memeryBox .outer .numFace').addClass('fzpaiBack').siblings().addClass('fzpaiFace');
			setTimeout(function(){
				$('.outer>p').css('transition','all 0.3s');
			},1000);
			//开始选择数字
			var clickCount = 0;
			var clickLastCount = 0;
			var youxuArr = currentNum;
			
			youxuArr = youxuArr.sort(function sortArr(a,b){
					return a-b;
			});
			$('.memeryBox .outer').off('touchstart').on('touchstart',function(){
				
				var _this = $(this);
				_this.off('touchstart');
				_this.children('.numFace').removeClass('fzpaiBack');
				_this.children('.numBack').removeClass('fzpaiFace');
				
				var currentCount = _this.attr('data-type');
				//console.log(currentCount+'...'+currentNum);
				var currentPos = youxuArr.indexOf(parseInt(currentCount));
				console.log(currentPos);
				
				if(currentPos == clickCount){
					clickCount++
					if(clickCount >=5){
						var count = Grade(localStorage.gameOne);
						if(localStorage.gameOne > localStorage.count1 && localStorage.count1){
											
							localStorage.gameOne =localStorage.count1;
						}else{
							 localStorage.count1 = localStorage.gameOne;
						}
						setTimeout(function(){
							
							$alertText.html(count);
							$alertShow.show();
							$('.memeryBox').css('opacity',0.5);
							
							caculateAllCount(count);	
						},800);
					}
					
				}else{
					$('.memeryBox .outer').off('touchstart');
					setTimeout(function(){
						$('.memeryBox').css('opacity',0.5);
						$('.failedBox').show();
					},800)
					setTimeout(function(){
						var reloadUrl = window.location.href.split('?')[0]+'?gameAgain=gameAgain'
						location.replace(reloadUrl);
						localStorage.gameOne++
						
					},1500);
					
				}
				
			})		
		},3000);
	}
	
	//game2
	function playGame2(){
		//创建牌数组
		var paiArr = ['bl','agl','sy','jjs','bhd','bl','agl','sy','jjs','bhd'];
		//得到一个随机数组
		var randomPaiArr = getRandomNum(10,paiArr);
		
		//渲染牌
		for(var i=0; i<randomPaiArr.length; i++){
			var renderCurrentAdd = randomPaiArr[i];
			$('.pai'+i+' img').attr('src','//file.40017.cn/tcweb/swact/170425jyds/img/'+renderCurrentAdd+'.png');
			$('.pai'+i).parent().data('type',renderCurrentAdd);
		}
		
		setTimeout(function(){
			$('.paiBox .paiFace').addClass('fzpaiBack').siblings().addClass('fzpaiFace');
          setTimeout(function(){
				$('.paiBox>p').css('transition','all 0.3s');
			},1100)
			//点击牌
			var flag = false; //赋值判断
			var firstClickType = '';//第一次点击值
			var secondClickType = ''; //第二次点击值
			var clickCount = 0;
			$('.paiBox').off('touchend').on('touchend',function(){
				flag = !flag;
				var _this = $(this);
				_this.children('.paiFace').removeClass('fzpaiBack');
				_this.children('.paiBack').removeClass('fzpaiFace');
			
				_this.off('touchend');
				
				var _thisType = _this.data('type');
				_this.addClass(_thisType);//为了后面隐藏
				if(flag){
					firstClickType = _thisType;
				}else{
					secondClickType = _thisType;
				}
				console.log(firstClickType+'==='+secondClickType);
				
				if(firstClickType!='' && secondClickType!=''){
					if(firstClickType == secondClickType ){
					var curPai = $('.paiBox.'+firstClickType);
						setTimeout(function(){
							curPai.css('visibility','hidden');
						},1000)
						firstClickType = '';
						secondClickType = '';
						
						clickCount++;
						if(clickCount >=5){
							var count = Grade(localStorage.gameTwo);
							if(localStorage.gameTwo > localStorage.count2 && localStorage.count2){			
								localStorage.gameTwo =localStorage.count2;
							}else{
								 localStorage.count2 = localStorage.gameTwo;
							}
							setTimeout(function(){
								$('.outBox').css('opacity',0.5);
								$alertText.html(count);
								$alertShow.show();
								//localStorage.gameTwo = 45;
								caculateAllCount(localStorage.gameTwo,count);		
							},1000);
							
						}
					}else{
						$('.paiBox').off('touchend');
						setTimeout(function(){
							$('.outBox').css('opacity',0.5);
							$('.failedBox').show();
						},800);
						setTimeout(function(){
							
							var reloadUrl = window.location.href.split('?')[0]+'?gameAgain=gameAgain'
							location.replace(reloadUrl);
							localStorage.gameTwo++
							
						},1500);
					}
				}
			
			})
		},3000);
	}
	//game3
	function playGame3(){
		//创建鱼亮的位置
		var positionArr = [0,1,2,3,4,5];
		//获取随机位置
		var RandomPositionArr = getRandomNum(4,positionArr);
		console.log(RandomPositionArr);
		var curImg = "<img src='//file.40017.cn/tcweb/swact/170425jyds/img/yu_light.png' />";
		for(var i = 0; i<RandomPositionArr.length; i++){
			var curNum = i+1;
			var curPosition = RandomPositionArr[i];
			$('.yuBox'+curNum+' span').eq(curPosition).addClass('active').html(curImg);
		}
		setTimeout(function(){
			$('.yuBox span.active img').attr('src','//file.40017.cn/tcweb/swact/170425jyds/img/yu_grey.png');
		
			//点击选择发亮的小鱼
			var clickCount = 0;
			$('.yuBox span').off('touchstart').on('touchstart',function(){
				console.log('22')
				var _this = $(this);
				var isLight = _this.hasClass('active');
				 _this.off('touchend');
				if(isLight){
					_this.children('img').attr('src','//file.40017.cn/tcweb/swact/170425jyds/img/yu_light.png');
					clickCount++
					if(clickCount>=4){
						$('.yuBox span').off('touchstart');
						var count = Grade(localStorage.gameThree);
						if(localStorage.gameThree > localStorage.count3 && localStorage.count3){			
							localStorage.gameThree =localStorage.count3;
						}else{
							 localStorage.count3 = localStorage.gameThree;
						}
						setTimeout(function(){
							$alertText.html(count);
							$alertShow.show();
							caculateAllCount(localStorage.gameThree,count);	
						},800);
					}
				}else{
					$('.yuBox span').off('touchstart');
					setTimeout(function(){
						$('.failedBox').show();
					},500)
					setTimeout(function(){
						var reloadUrl = window.location.href.split('?')[0]+'?gameAgain=gameAgain'
						location.replace(reloadUrl);
						localStorage.gameThree++
						
					},1000);
				}
				
			})	
		},3000);
	}
	//game4
	function playGame4(){
		clickCount = 0;
		setTimeout(function(){
			$('.fgBox .fgLine').css('visibility','hidden');
			
			$('.borderBox ul li').on('touchstart',function(e){
				console.log(1)
				var _thisOff  = $(this).off('touchstart');
				var _this = $(this).children('p');
				
				
				if(_this.hasClass('yuanPoint')){
					_this.css('opacity','1');
					clickCount++;
					if(clickCount>=6){
						_thisOff;
						var count = Grade(localStorage.gameFour);
						if(localStorage.gameFour > localStorage.count4 && localStorage.count4){			
							localStorage.gameFour =localStorage.count4;
						}else{
							 localStorage.count4 = localStorage.gameFour;
						}
						setTimeout(function(){
							$('.yuanPoint').css('opacity','0');
							$('.fgLine').css('visibility','visible');
						},800)
						
						setTimeout(function(){
							$alertText.html(count);
							$alertShow.show();
							caculateAllCount(localStorage.gameFour,count);
						},1200);
					}
				}else{
					_thisOff;
					setTimeout(function(){
						$('.failedBox').show();
					},100);
					setTimeout(function(){
						var reloadUrl = window.location.href.split('?')[0]+'?gameAgain=gameAgain'
						location.replace(reloadUrl);
						localStorage.gameFour++
					},1500);
				}
			})
		},4000);
	}
	
	function Grade(type){
		if(type == 1){
			return 45;
		}else if(type == 2){
			return 43;
		}else if(type == 3){
			return 40;
		}else if(type == 4 || type == 5){
			return 35;
		}else if(type == 6){
			return 30;
		}else{
			return 20;
		}
	}
	
	function getPrizeJk(userid,code){
		var uid =''
		if(code != ''){
			uid = userid;
			userid = '';
		}
		var dataParam = {'id':userid,'point':'','mobile':uid,'code':code};
		
		$.ajax({
			url:"//salesappgw.17u.cn/dsf/gw/exec",
			type:"get",
			dataType:'json',
			data:{
				'basename' : 'fCnK0eIxiTYszxMQlr6voaUfWkrnQ8PDQpwt96tBNLDr9xYu0ohfjG-Ylqe7RHwQ',
				'method' : 'getprise',
				'version' : 'WU-8GRgBcbAtFqhoDjSu2A==',
				'param':JSON.stringify(dataParam)
				
			},
			beforeSend:function(){
				$('#loading').css('display','flex').html('领取中...请耐心等待哦');
			},
			success:function(data){
				//console.log(data);
				var data = JSON.parse(data.result);
				if(data.ResCode == '0000' || data.ResCode == '0001'){
					var obj = data.Body;
					if(obj.isJoined ==1 && _tc_bridge_public.isTc){
							showtoast()
					};
					if(obj.priseType == '1'){
						$('.moviePrize .changeCode').html(obj.redeemCode);
						$('.redBag').hide();
						$('.moviePrize,.sucpage').show();
					}else if(obj.priseType == '2'){
						//领取过的
						
						var redArr = obj.redList;
						for(var i = 0; i < redArr.length; i++){
							var currentLi = $('.redBag ul li').eq(i);
							var curInfo = redArr[i];
							var first = currentLi.children('.first');
							var second = currentLi.children('.second');
							var third = currentLi.children('.useBtn');
							
							first.children('span').html(curInfo.parValue);
							second.children('.signTtl').html(curInfo.projectName);
							second.children('.dates').html(curInfo.endTime);
							second.children('#mj').html(curInfo.minConsume);
							third.children('a').attr('href',curInfo.redirectUrl);
						}
						
						
						$('.moviePrize').hide();
						$('.redBag,.sucpage').show();
					}
				}else if(data.ResCode == '1000'){
					alert('验证码不正确！')
				}
			},
			complete:function(){
				$('#loading').hide();
			},
			error:function(){
				
			}
			
		});
	}
	
	function sendCode(phoneNum){
		$.ajax({
			type:"get",
			url:"//salesappgw.17u.cn/dsf/gw/exec",
			dataType:'json',
			data:{
				'basename' : 'fCnK0eIxiTYszxMQlr6voaUfWkrnQ8PDQpwt96tBNLDWlzXz5Erkerhcp9-NcgdH',
				'method' : 'sendverificationcode',
				'version' : 'WU-8GRgBcbAtFqhoDjSu2A==',
				'param':'{"mobile":"'+phoneNum+'"}'
				
			},
			success:function(data){
				console.log(data)
			},
			error:function(){
				
			}
			
		});
	}
	//获取url参数	
	function GetQueryString(name){
	    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	    var r = window.location.search.substr(1).match(reg);
	    if(r!=null)return  unescape(r[2]); return null;
	}
	//随机获得一组数组
	function getRandomNum(count,arr){
		var randonNum = [];
		for(var i = 0; i < count; i++){
			var currentNumer = Math.floor(Math.random()*arr.length);
			randonNum.push(arr[currentNumer]);
			arr.splice(currentNumer,1);
		}
		return randonNum;
	}
	
	function chooseGameType(gameType){
		if(gameType == 1){
			playGame1()
		}else if(gameType == 2){
			playGame2()
		}else if(gameType == 3){
			playGame3();
		}else if(gameType == 4){
			playGame4()
		}                                   
	}
	function caculateAllCount(count){  
		if(localStorage.gameOne && localStorage.gameTwo && localStorage.gameThree && localStorage.gameFour){
			allGrade = Grade(parseInt(localStorage.gameOne)) + Grade(parseInt(localStorage.gameTwo)) + Grade(parseInt(localStorage.gameThree)) + Grade(parseInt(localStorage.gameFour));
			if(localStorage.allGameCount){
				if(allGrade < localStorage.allGameCount){
					allGrade = localStorage.allGameCount
				}
			}else{
				localStorage.allGameCount = allGrade;
			}
          if(!_tc_bridge_public.isTc){
            shareGame();
          }
			var decText = '';
			var starsCount = '';
			if(allGrade<=80){
				decText = '到现在还没走丢，真是有福星照耀!';
				starsCount = '★☆☆☆☆'
			}else if(allGrade>80 && allGrade<=120){
				decText = '床前明月光，一秒前忘光，说的就是你吧!';
				starsCount = '★★☆☆☆'
			}else if(allGrade>120 && allGrade<=140){
				decText = '多吃核桃多吃枣儿，加强锻炼多补脑儿!';
				starsCount = '★★★☆☆'
			}else if(allGrade>140 && allGrade<=165){
				decText = '千年一遇的记忆大师，过目不忘的本领可不能自己独享啊!';
				starsCount = '★★★☆'
			}else if(allGrade>165 && allGrade<=180){
				decText = '原来你就是传说中记忆超群的旷世奇才，世界都在你的脑中！';
				starsCount = '★★★★★'
			}	
			$('.finishBox .countText span').html(allGrade);
			$('.stars span').html(starsCount)
			$('.derector').html(decText);
			$('alertShadow,.finishBox').show();	
			$('.alertBox').hide();	
		}
	}
	
	//游戏结束，点击领奖按钮
	function getPrize(){
		var isMember = '';
		$('.getPrideBtn').off('touchstart').on('touchstart',function(){
			if(_tc_bridge_public.isTc){//在同程内部
				_tc_bridge_user.get_device_info({
				    param:{
				    },
				    callback: function (data) {
				        // alert("callback:" + JSON.stringify(data));
				        isMember = JSON.parse(data.CBData).memberInfo.memberId;
				        if(isMember){
				        	//调取领礼包接口
				        	getPrizeJk(isMember,'');
				        	//$('#blockPage1,#blockPage2,#blockPage3,#blockPage4').hide();
				       		$('.finishBox').hide();
				       		 $('.alertShadow').hide();
				        }else{
					       	_tc_bridge_user.user_login({
							    param:{
							    },
							    callback: function (data) {
							        //alert("callback:" + JSON.stringify(data));
							        
							        isMember = JSON.parse(data.CBData).memberInfo.memberId;
							        if(isMember){
							        	//alert(isMember)
								       	getPrizeJk(isMember,'');
								        //调取领礼包接口
								        $('.finishBox').hide();
								        $('.alertShadow').hide();
							        }else{
							        	return;
							        }
							        
							    }
							})
				        }
				    }
				})
			}else{
				$('.finishBox').hide();
			    $('.alertShadow').hide();
			    $('.prizePage').show();
			}
		});
		
		$('.pkFriend').on('touchstart',function(event){
			event.preventDefault();
			event.stopPropagation();
			if(!_tc_bridge_public.isTc){
				$('.shareBox').show();
				
			}
			shareGame();
			})
			_tc_bridge_bar.set_navbar({
				 "param": {
			         'center': [{'tagname': "tag_title", 'value': '记忆大师'}],
			        "right": [{"tagname": "tag_click_city", "icon_type": "",'icon':'i_share'}]
			    },
				'callback':function(data){
					shareGame();
				}
			})
		
	}
	
	//在其他平台调取接口
	function wxClickPrize(){
		$('.getPrizeBtn').off('touchstart').on('touchstart',function(){
			var telVal = $('#tel').val();
			var codeval = $('#yzm').val();
			if(telVal == ''){
				alert('手机号不能为空！');
			}else if(telVal.length != 11){
				alert('手机号输入错误！');
			}else{
				//调用领取红包接口
				getPrizeJk(telVal,codeval);
			}
			
		});
	}
	
	function getYzm(){
		$('#yzBtn').off('touchstart').on('touchstart',function(){
			var phonenumer = $('#tel').val();
			if(phonenumer == ''){
				alert('请输入手机号');
			}else if(phonenumer.length !=11){
				alert('输入手机号错误');
			}else{
				sendCode(phonenumer);
				var timer = null;
				var timeCount = 60;
				var _this = $(this)
				_this.off('touchstart');
				timer = setInterval(function(){
					timeCount--;
					_this.html(timeCount+'s')
					if(timeCount<0){
						_this.html('重新获取');
						clearInterval(timer);
						getYzm();
					}
					
				},1000)
			}
			
		})
	}
	function writeInput(){
		$('#yzm').bind('input propertychange', function() {
		    var yzmVal = $(this).val();
		    var getBtn = $('.getPrizeBtn');
		    if(yzmVal.length == 6){
		    	getBtn.addClass('active');
		    }else{
		    	getBtn.removeClass('active');
		    }
		    if(getBtn.hasClass('active')){
		    	wxClickPrize()
		    }else{
		    	$('.getPrizeBtn').off('touchstart')
		    }
		});
	}
	
	function shareGame(){
		var shareImage ="http://file.40017.cn/tcweb/swact/170425jyds/img/fenxian.jpg";
		var shareTitle ='听说智商高的人脑洞里能装下整个世界，然而我……';
		var shareContent ='';
		if(allGrade == 0){
			shareContent = '好了，我要带着脑子去环球世界了…… '
		}else{
			shareContent = "脑力值"+allGrade+"分的我赢得了旅游礼包，我赌五毛，你赢不了我";
		}	
		var shareUrl = window.location.href.split('?')[0];
		
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
  
	
	function init(){
      
     	var docWidth = $(window).width()
		var docHeight =  $(window).height();
		if((docWidth/docHeight)>0.63){
			$('.pageBg,.rules,.alertShadow,.failedBox,.shareBox').css('padding-bottom','20%');
			
		}
      
       var a = new Date();
          a = a.getTime();
          $('.indexCon img').attr('src','//file.40017.cn/tcweb/swact/170425jyds/img/index_conG.gif?'+a);

          setTimeout(function(){
              $('.indexConPng,.indexBtn').addClass('chuxian');
          },2000)
      
		var gameAgain = GetQueryString('gameAgain');
		
		if(gameAgain && gameAgain =='gameAgain' ){
			if(localStorage.currentgame){
			var gameCount = localStorage.currentgame;
				chooseGameType(gameCount);
				$('.indexPage,.chooseGame').hide();
				$('#blockPage'+gameCount).show();
			
			}else{
				localStorage.clear();
				$('.indexPage').show();
			}
			
		}else if(gameAgain && gameAgain =='gamechoose' ){
			localStorage.removeItem('currentgame');
			var someCount = 0;
			if(localStorage.gameOne){
				someCount+= Grade(parseInt(localStorage.gameOne));
			}
			if(localStorage.gameTwo){
				someCount+= Grade(parseInt(localStorage.gameTwo));
			}
			if(localStorage.gameThree){
				someCount+= Grade(parseInt(localStorage.gameThree));
			}
			if(localStorage.gameFour){
				someCount+= Grade(parseInt(localStorage.gameFour));
			}
			
			$('.indexPage').hide();
			$('.chooseGame').show();
			$('.grade').html(someCount)
		}else{
			localStorage.clear();
			$('.indexPage').show();	
		}
		getPrize();
		if(!_tc_bridge_public.isTc){
			shareGame();
		}
      	
		getYzm();
		writeInput();
		bindEvent()
		
	}
	init();
})
