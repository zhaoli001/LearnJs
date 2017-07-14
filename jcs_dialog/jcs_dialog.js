function Loading (){
	this.ele = '<div class="jcs_dialog"><div class="j_inner"><img src="../jcs_dialog/cai.png" alt="">'+
				'<span class="j_move"></span></div></div>';
	this.timerj = null;
	this.startH = 0;
	this.createLink();
}
Loading.prototype = {
	openL: function (){
		var that = this;
		$('html').append($(this.ele))
		if($('.jcs_dialog').length>1){
			return;
		}			
		this.timerj=setInterval(function(){
			that.startH++;
			if(that.startH>=76){that.startH=0}
			document.querySelector('.j_move').style.height=that.startH+'px';
			document.querySelector('.j_move').style.backgroundPosition='0 '+(-76+that.startH)+'px';
		},15);
		this.clickClose();
	},
	closeL: function (){
		var that = this;
		setTimeout(function(){
			$('.jcs_dialog').remove();
			clearInterval(that.timerj);
			that.startH = 0;
			that.timerj = null;			
		},50)
		
	},
	clickClose: function(){
		var that = this;
		$('.jcs_dialog').click(function(){
			that.closeL();
		})
	},
	createLink: function (){
		$('head').append('<link rel="stylesheet" href="../jcs_dialog/jcs_dialog.css">')
	}
}
var DialogZ = {
		init:function(opt){
			var defaults = {
				msg: "您确认要执行此操作吗？",
				btn: ['确定','取消'],
				trueCallback:null,
				falseCallback:null,
				position: 'bottom'
			};
			this.settings = $.extend({},defaults,opt);
			this.addDom();
			this.addEvent();
		},
		addDom:function(){
			this.ele='<div class="maskz"></div>',
			this.inele='<div class="jcs_decision '+this.settings.position+'"><p class="jcs_decision_tit">'+this.settings.msg+'</p>'+
						'<p class="jcs_decision_true">'+this.settings.btn[0]+'</p>'+
						'<p class="jcs_decision_false" >'+this.settings.btn[1]+'</p></div>'
				that = this;
			if($('.maskz').length>=1){
				return;
			}else{
				this.createLink();
				$('body').append($(this.ele).append($(this.inele)));
			}
		},
		addEvent:function(){
			var that = this;
			$('.jcs_decision').on('click',function(event){
				var e = event || window.event;
				var trg = $(e.target);
				if(trg.hasClass('jcs_decision_true')){
					that.settings.trueCallback();
					that.remoDom();
				}else if(trg.hasClass('jcs_decision_false')){
					that.settings.falseCallback();
					that.remoDom();
				}
			})
		},
		remoDom:function(){
			$('.maskz').remove();
		},
		createLink: function (){
			$('head').append('<link rel="stylesheet" href="../jcs_dialog/jcs_dialog.css">')
		}
}

DialogZ.reg = {
	init:function(opt){
		var defaults = {			
			tit: '欢迎注册',
			placeholder:{
				tel:'请输入手机号',
				nickname:'请创建昵称',
				pwd:'设置密码',
				pwdtoo:'确认密码'
			},
			btnMsg:'注册',
			logpic: 'cai2.png',
			submitCallback:null,
			move:true
		};
		this.settings = $.extend({},defaults,opt);
		console.log(this.settings)
		this.renderDom();
		this.on_submit();
		this.dragMove();
		this.addEvent();
	},
	renderDom:function(){
		this.ele='<div class="maskz"></div>';
		this.inHtml =  '<div class="jcs_decision jcs_register">'+
						'<div class="tit"><img class="log" src="cai2.png" alt=""><span>'+this.settings.tit+'</span><span class="reg-exit">×</span></div>';
		for(let i in this.settings.placeholder){
			this.inHtml +='<p class="y-msg"><input type="text" name="'+i+'" id="'+i+'" placeholder="'+this.settings.placeholder[i]+'"><span class="clean">×</span></p>'
		}								
		this.inHtml +='<p class="jcs_decision_submit">'+this.settings.btnMsg+'</p></div>';
		if($('.maskz').length>=1){
			return;			
		}else{
			DialogZ.createLink();
			$('body').append($(this.ele).append($(this.inHtml)));
		}
	},
	on_submit:function(){
		var that = this;
		$('.jcs_decision_submit').on('click',function(){
			that.settings.submitCallback();
		})
	},
	addEvent:function(){
		$('.jcs_register').on('click',function(e){
			var e = e || window.event;
			if($(e.target).hasClass('reg-exit')){
				$('.maskz').remove();
			}else if($(e.target).hasClass('clean')){
				$(e.target).parent().find('input').val('');
			}
		})
	},
	dragMove:function(){
		var oDiv=$('.jcs_register .tit')[0];
		var oDiv2=$('.jcs_register')[0];
			oDiv.onmousedown=function(ev){
				var oEvent=ev||event;
				var x=0;
				var y=0;
				x=oEvent.clientX-oDiv2.offsetLeft;
				y=oEvent.clientY-oDiv2.offsetTop;
				console.log(x+':'+y)
				document.onmousemove=function(ev){
					var oEvent=ev||event;
					var out1=oEvent.clientX-x;
					var out2=oEvent.clientY-y;
					
					var oWidth=document.documentElement.clientWidth-oDiv2.offsetWidth/2;
					var oHeight=document.documentElement.clientHeight-oDiv2.offsetHeight/2;
					if(out1<oDiv2.offsetWidth/2){
						out1=oDiv2.offsetWidth/2;
					}else if (out1>oWidth){
						out1=oWidth;
					}
					if(out2<oDiv2.offsetHeight/2){
						out2=oDiv2.offsetHeight/2;
					}else if (out2>oHeight){
						out2=oHeight;
					}					
					oDiv2.style.left=out1+'px';
					oDiv2.style.top=out2+'px';
				}
				document.onmouseup=function(){
					document.onmousemove=null;
					document.onmouseup=null;	
				}
				return false;//解决firefox低版本的bug问题
			}
	}
}