// TODO: 巨大なDOMContentLoadedなんとかする
$(function() {
  setFirstFrom();
  
	var here = new Date();
  var h = here.getHours();
  var i = here.getMinutes();
  var ext_i = '';
  if (i <= 9) {
      ext_i = '0';
  }
  //時間コンテンツ
  var now = new Date();
  var h = now.getHours();
  switch (h) {
      case 0:
          var stock = 30;
          break;
      case 1:
          var stock = 30;
          break;
      case 2:
          var stock = 28;
          break;
      case 3:
          var stock = 28;
          break;
      case 4:
          var stock = 27;
          break;
      case 5:
          var stock = 27;
          break;
      case 6:
          var stock = 26;
          break;
      case 7:
          var stock = 25;
          break;
      case 8:
          var stock = 24;
          break;
      case 9:
          var stock = 21;
          break;
      case 10:
          var stock = 20;
          break;
      case 11:
          var stock = 17;
          break;
      case 12:
          var stock = 15;
          break;
      case 13:
          var stock = 14;
          break;
      case 14:
          var stock = 13;
          break;
      case 15:
          var stock = 12;
          break;
      case 16:
          var stock = 8;
          break;
      case 17:
          var stock = 7;
          break;
      case 18:
          var stock = 6;
          break;
      case 19:
          var stock = 5;
          break;
      case 20:
          var stock = 4;
          break;
      case 21:
          var stock = 3;
          break;
      case 22:
          var stock = 2;
          break;
      case 23:
          var stock = 1;
          break;
  }
  var date_text ='外壁塗装の窓口では、システムの関係上、一日のご利用人数を制限しています。<em>ご自宅近辺の外壁塗装の適正価格を知りたくてお困りの方は、お早めに相場をチェックしてみてください。</em>(本日は残り'+stock+'名様まで）';
  $('body .date_txt').html(date_text);
	var w = $(window).width();
  var x = 640;
  $('input[name="form[mail]"]').bind("change", normalizeValue);
  if (w <= x) {
    $('.reviews').closest('.side-widget').css({
        display: 'block'
    });
  } else {
    $('#popup_hook').hover(function() {
      $("#pop").css('display', 'block');
      var h = $(window).height();
      var ph = $("#pop .inset").height();
      var hs = (h - ph) / 2;
        $("#pop .inset").css({
        position: 'relative',
        top: hs
      });
    });
    $('#close').click(function(event) {
      $("#pop").remove();
      $('#popup_hook').remove();
      $.cookie('popup_flg', 'false');
    });
  }
  var now = new Date();
  now.setDate(now.getDate() + 5);
	var d = now.getDate();
	var m = (d < 6)? now.getMonth() + 2 : now.getMonth() + 1;
  $(".shimenum").text(m+'/'+d);
  $('a[href^=#]').click(function(){
    if ($(this).hasClass('link')) {
      return false;
    } else if ($(this).hasClass('supri')) {
      var speed = 500;
      var href= $(this).attr("href");
      var target = $(href == "#" || href == "" ? 'html' : href);
      var position = target.offset().top -91;
      $("html, body").animate({scrollTop:position}, speed, "swing");
      return false;
    }
	});
	var checkflg = new Array();
	var form_id = new Array();
	var array = new Array();
	var form_id = new Array();
	var form_info = new Array();
	var formcount = $('.simpleform').length;
	for (var i = 0; i < formcount; i++) {
		var id = $('.simpleform').eq(i).attr("id");
    if (id) {
      form_info[id] = create_array(id);
      move_flg(id);
      style_change(id);  
    }
	};

  // selectタグに変更があった場合(フォーム中で選択をした場合)に赤枠が移動するための機能
	$("select").bind("change",function(){
		var parents_id = $(this).parents('.simpleform').attr("id");
		var tar_name = $(this).attr('name');
    if (parents_id && tar_name) {
      validation_flg(parents_id,tar_name);
    }
    if (parents_id) {
      move_flg(parents_id);
      style_change(parents_id);  
    }
	});

  // inputタグに変更があった場合(フォーム中で入力をした場合)に赤枠が移動するための機能
	$("input").bind("change",function(){
		var parents_id = $(this).parents('.simpleform').attr("id");
		var tar_name = $(this).attr('name');
    if (parents_id && tar_name) {
      validation_flg(parents_id,tar_name);
    } 
    if (parents_id) {
      move_flg(parents_id);
      style_change(parents_id);
    }
	});
	setInterval(function(){
		$('.arrow_animation i').css('top', '4px');
		setTimeout(function(){
			$('.arrow_animation i').css('top', '14px');
		}, 1200);
	}, 1500);

	function create_array(fid){
		var listcount = $('.simpleform#'+ fid +' .cover').length;
		for (var i = 0; i < listcount; i++) {
			var target = $('.simpleform#'+ fid +' .cover' + i + ' > input').attr('name');
			if (!target) {
				target = $('.simpleform#'+ fid +' .cover' + i + ' > select').attr('name');
			};
			if (target != 'form[mail]') {
				array[target] = 0;
			}
		};
		return array;
	}

	function validation_flg(parent_id,name){
		if ($('#'+ parent_id + ' [name="' + name +'"]').val() == '') {
			eval('form_info["'+parent_id+'"]["'+name+'"] = 0');
		}else {
			eval('form_info["'+parent_id+'"]["'+name+'"] = 1');
		}
	}

	function move_flg(parent_id){
		var num = 0;
		var gem = parent_id;
		eval('var tar = form_info["' + parent_id + '"];');
		for (var i in tar){
			var max = Object.keys(tar).length;
			if (tar[i] == 0) {
				if (num == 0) {
					$('#'+ parent_id +' .cover').removeClass('choose');
					$('#'+ parent_id +' [name="' + i +'"]').parent('.cover').addClass('choose');
					break;
				};
				$('#'+ parent_id + ' .cover').removeClass('choose');
				$('#'+ parent_id + ' [name="' + i +'"]').parent('.cover').addClass('choose');
				break;
			}
			num++;
			if (tar[i] == 1) {
				$('#'+ parent_id + ' .cover').removeClass('choose');
			}
		}
	}

	function style_change(parent_id){
		var get = parent_id;
		eval('var tari = form_info["' + parent_id + '"];');
		for (var i in tari){
			if (tari[i] == 0) {
				$('#'+ parent_id +' [name="' + i +'"]').parent('.cover').removeClass('comp');
			}else if(tari[i] == 1){
				$('#'+ parent_id +' [name="' + i +'"]').parent('.cover').addClass('comp');
			}
		}
	}

	var head_height = $("header").outerHeight();
	//金額スライドダウン
  $("#check_price").hide();
  $(".checkprice .more a").click(function(){
    if($(this).hasClass('link')){return false};
      $("#check_price").slideDown();
      return false;
  });

  function onsubmit_with_pct(param){
    var error = "";
    if($("#" + param.ID_PREF_CD + " option:selected").val() == ""){
      error += "都道府県を選択してください。\n";
    }
    if($("#" + param.ID_CITY_NAME + " option:selected").val() == ""){
      error += "市区町村を選択してください。\n";
    }
    if($("#" + param.ID_TOWN_NAME + " option:selected").val() == ""){
      error += "町字丁目を選択してください。\n";
    }
    if(error != ""){
    alert(error);
    }else{
    //	document.form_pct.submit();
    var pref = $("#" + param.ID_PREF_CD + " option:selected").val();
    var city = $("#" + param.ID_CITY_NAME + " option:selected").val();
    var town = $("#" + param.ID_TOWN_NAME + " option:selected").val();
    $("#" + param.ID_PREF_CD + " option:selected").prop("selected", "");
    PREFORM_IF.prefChanged(param);
    location.href = "https://gaiheki.yeay.jp/ci/order_form?"
      + "pref="+ encodeURIComponent(pref)
      + "&city="+ encodeURIComponent(city)
      + "&town="+ encodeURIComponent(town);
    }
  }

	function onsubmit_with_zip(form_name){
		var error = "";
		if(
			$("form[name='" + form_name + "'] input[name='zip1']").val() == ""
			|| $("form[name='" + form_name + "'] input[name='zip2']").val() == ""
		){
			error += "郵便番号を入力してください。\n";
		}
		if(error != ""){
			alert(error);
			return false;
		}else{
			return true;
		}
	}

	/*footer*/
	window.___gcfg = {lang: 'ja'};
	(function()
	{var po = document.createElement("script");
	po.type = "text/javascript"; po.async = true;po.src = "https://apis.google.com/js/plusone.js";
	var s = document.getElementsByTagName("script")[0];
	s.parentNode.insertBefore(po, s);
	})();

	(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/ja_JP/all.js#xfbml=1&appId=";
	fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));

	!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
	var yahoo_retargeting_id = 'listing1406';
	var yahoo_retargeting_label = '';
	//見出し重ねる
	$('.inner-midashi > h2').after('<h2>' + $('.inner-midashi > h2').html() + '</h2>');
	$('.compare .prise').each(function(k, v){
		$(v).after('<p class="bg prise">' + $(v).html() + '</p>');
		$(v).after('<p class="bg_w prise">' + $(v).html() + '</p>');
	});

  /* $('.customSelect').customSelect({customClass:'customSelectMode'});*/

	setInterval(function(){
		$('.arrow').css('margin', '8px 0 8px');
		setTimeout(function(){
			$('.arrow').css('margin', '16px 0 0');
		}, 1200);
	}, 1500);

	//submitボタン submitできるように
	$('.submit_under').on('click', function(e){
		e.preventDefault();
		$("#form_under").submit();
	});
	$('.submit_cta').on('click', function(e){
		e.preventDefault();
		$("#form_cta").submit();
	});
	$('.submit_side').on('click', function(e){
		e.preventDefault();
		$("#form_side").submit();
	});
	$('.submit_pop').on('click', function(e){
		e.preventDefault();
		$("#pop_form").submit();
	});
	$('.submit_chaice').on('click', function(e){
		e.preventDefault();
		$("#form_chaice").submit();
	});

  //日付処理
  var now = new Date();
  var h = now.getHours();
  var i = now.getMinutes();
  var w = $(window).width();
  var date_text =h + '時' + i + '分現在、電話が繋がりやすくなっております';
  if (h >= 9 && h < 20) {
    if(w <= 728){
      $('.teller').after('<div class="date_cover"><div class="date">' + date_text + '</div></div>');
    } else {
      $('.ridership').after('<div class="date_cover"><div class="date">' + date_text + '</div></div>');
    }
    $('.header').attr('class', 'header1');
    if(w <= 728){
      $('.button_area').before('<div class="date_cover"><div class="date">' + date_text + '</div></div>');
    }
  };

  //ポップアップフッター
	$(".popup_area").hide();
	var w = $(window).width();
	var head_height = $("header").outerHeight();
	if (w <= 728){
		var popup_height = $(".popup_area.sp").outerHeight();
	} else {
		var popup_height = $(".popup_area.pc").outerHeight();
	}

	$(window).scroll(function () {
		if ($(window).scrollTop() > head_height) {
			if (w<=728) {
				$(".popup_area.sp").fadeIn();
			} else if (w>728) {
				$(".popup_area.pc").fadeIn();
			};

		} else {
			if (w<=728) {
				$(".popup_area.sp").fadeOut();
			} else if (w>728) {
				$(".popup_area.pc").fadeOut();
			};
		}
	});
	$("body").css('padding-bottom', popup_height);

	//匿名希望にした時にアコーディオンする記述
	$('.name').css({display: "block"});
	$('#skip_to_input_name1').change(function(){
		if ($(this).is(':checked')) {
			$('.name').slideUp();
		} else {
			$('.name').slideDown();
			$('.name').css({display: "block"});
		}
	});

	$('#skip_to_input_name2').change(function(){
		if ($(this).is(':checked')) {
			$('.name').slideUp();
		} else {
			$('.name').slideDown();
			$('.name').css({display: "block"});
		}
	});
	$('#skip_to_input_name3').change(function(){
		if ($(this).is(':checked')) {
			$('.name').slideUp();
		} else {
			$('.name').slideDown();
			$('.name').css({display: "block"});
		}
	});
	$('#skip_to_input_name4').change(function(){
		if ($(this).is(':checked')) {
			$('.name').slideUp();
		} else {
			$('.name').slideDown();
			$('.name').css({display: "block"});
		}
	});
	$('#skip_to_input_name5').change(function(){
		if ($(this).is(':checked')) {
			$('.name').slideUp();
		} else {
			$('.name').slideDown();
			$('.name').css({display: "block"});
		}
	});
	$('#skip_to_input_name_under').change(function(){
		if ($(this).is(':checked')) {
			$('.name_box').slideUp();
		} else {
			$('.name_box').slideDown();
			$('.name_box').css({display: "block"});
		}
	});

	var isTouch = ('ontouchstart' in window);
	$('td p.fade').bind({
		'touchstart mouseover': function(e){
			this.touched = true;
			$(this).children('span').addClass('touch');
		},
		'touchend mouseout': function(e) {
        	$(this).children('span').removeClass('touch')
			this.touched = false;
		}
	});

	var change_required_form = function(){
		$('.form_required').on('change', function(){
			var $this = $(this);
			switch($this[0].tagName.toLowerCase()){
				case('select'):
					if($this.val()===''){
						$this.next('span').addClass('form_required-warning');
					}else{
						$this.next('span').removeClass('form_required-warning');
					}
					break;
				case('input'):
					if($this.val()===''){
						$this.addClass('form_required-warning');
					}else{
						$this.removeClass('form_required-warning');
					}
					break;
			}
		});
	};

	var image_url_change = function(){
		$('img').each(function(k, v){
			var $img = $(v);
			var src = $img.attr('src');
			src = src.replace('img/lp/001/img/', 'img/lp/001/');
			$img.attr('src', src);
		});
	};

	var form_validator = function(){
		$('[data-form="cv"], #form_cta,#pop_form, #form_side,#form_chaice').on('submit', function(e){
      e.preventDefault();
			var $form = $(this);
			var valid = validation.run($form);
			if(valid.result===false){
				validation.showError(valid.errors);
				return valid.result;
			} else {
				//診断中です
				Start_modal()
				var cl = document.getElementsByClassName("brd");
				//要素の数だけ処理を繰り返す
				for (i = 0; i < cl.length; i++) {
				//元のHTMLソースをreplaceしたものに置き換える
				document.getElementsByClassName("brd")[i].innerHTML = ''
				+ '<div class="send_success_btn">'
				+ '<div class="sk-circle">'
				+ '<div class="sk-circle1 sk-child"></div>'
				+ '<div class="sk-circle2 sk-child"></div>'
				+ '<div class="sk-circle3 sk-child"></div>'
				+ '<div class="sk-circle4 sk-child"></div>'
				+ '<div class="sk-circle5 sk-child"></div>'
				+ '<div class="sk-circle6 sk-child"></div>'
				+ '<div class="sk-circle7 sk-child"></div>'
				+ '<div class="sk-circle8 sk-child"></div>'
				+ '<div class="sk-circle9 sk-child"></div>'
				+ '<div class="sk-circle10 sk-child"></div>'
				+ '<div class="sk-circle11 sk-child"></div>'
				+ '<div class="sk-circle12 sk-child"></div>'
				+ '</div>'
				+ '</div>';
				}

				$('#' + $(this).attr('id')).children('.submitForm').children('.brd').children('a').addClass("submitted-link");
				$('#' + $(this).attr('id')).children('.submitForm').children('a').after('<div class="submit_cover"></div');
				$(".submit_cover").css({
					position: 'absolute',
					top: '0',
					bottom: '0',
					left: '0',
					right: '0',
					zIndex: '88'
				});
			}

      // フォーム送信
      setTimeout(() => {
        insertFirstFrom(this)
        insertGAClientId(this)
        submit_with_recaptcha(this);
      }, 3000)
		});
	};

	var validation = {
		pref: function($form){
			var error = "";
			var $pref = $form.find("select[name=form\\[estate_pref\\]]");
			var r = !!$pref.val();
			if(r===false)
				error = '都道府県を選択してください';
			return {result:r, error: error};
		},
		yukamenseki: function($form){
			var error = "";
			var $yukamenseki = $form.find("select[name=form\\[estate_yukamenseki\\]]");
			var r = !!$yukamenseki.val();
			if(r===false)
				error = '延べ床面積を選択してください';
			return {result:r, error: error};
		},
		currentSituation: function($form){
			var error = "";
			var $current_condition = $form.find("select[name=form\\[current_situation\\]]");
			var r = !!$current_condition.val();
			if(r===false)
				error = 'あなたの現在の状況を選択してください';
			return {result:r, error: error};
		},
		estateRepair: function($form){
			var error = "";
			var $repair = $form.find("select[name=form\\[estate_repair_parts\\]\\[\\]]");
			var r = !!$repair.val();
			if(r===false)
				error = 'ご希望の工事箇所を選択してください';
			return {result:r, error: error};
		},
		tel: function($form){
			var r = true;
			var error = "";
			var $tel = $form.find("input[name=form\\[tel\\]]");
			var v = $tel.val();
			var result = this._checkNumber(v);
			r     = result[0];
			error = result[1];
			return {result:r, error: error};
		},
		email: function($form){
			var r = true;
			var error = "";
			var $mail = $form.find("input[name=form\\[mail\\]]");
			var v = $mail.val().replace(/(^[\s　]+)|([\s　]+$)/g, "");
			var result = this._checkEmail(v);
			r     = result[0];
			error = result[1];
			return {result:r, error: error};
		},
		_checkNumber: function(target){
			var r = true;
			var error = "";
			if(!target.match(/^[0-9- ]+$/)){
				error = "電話番号を半角数字で入力してください";
				r = false;
			}else if(target.charAt(0) != '0' || target.charAt(1) == '0'){
				error = "正しい番号を入力して下さい";
				r = false;
			}else{
				var number = target.replace(/[^0-9]/g, "");
				if(number.charAt(0) == '0' && number.charAt(1) != '0' && number.charAt(2) == '0'){
					if(number.length != 11)
						r = false;
				} else {
					if(number.length != 11)
						r = false;
				}
				//ハイフンの除去
				var input_message2 = target.replace(/[━.*‐.*―.*－.*\-.*ー.*\-]/gi,'');
				//同一数字が8文字以上連続する場合
				if ( input_message2.match(/(.)\1\1\1\1\1\1\1/) ){ 
					error = "正しい番号を入力して下さい。";
					r = false;
				}
				//090の直後が0の場合
				if ( input_message2.match(/^0[9876]00/) ){
					error = "正しい番号を入力して下さい。";
					r = false;
				}
				if ( input_message2.match(/^0[98765]0/) ){
				}else{
				  error = "固定番号はご入力いただけません。";
							r = false;
				}
				//12345678の文字列を含む場合
				if ( input_message2.match(/12345678$/) ){
					error = "正しい番号を入力して下さい。";
					r = false;
				}
				//上4桁・下4桁それぞれ数値同様
				var first_num1 = input_message2.slice( -8 );
				var first_num2 = first_num1.slice( -4 );
				var first_num3 = first_num2 + first_num2;
				if ( first_num3 == first_num1){
					error = "正しい番号を入力して下さい。";
					r = false;
				}
			}
			if(r===false && error === "")
				error = '正しい番号を入力してください（11桁）';
			return [r, error];
		},
		_checkEmail: function(target){
			var r = true;
			var error = "";
      if(target !=""){//空文字メール形をチェックしない
				if(!target.match(/.+@.+\..+/)){
					error = "正しいメールアドレスの形で入力してください。";
					r = false;
				}
			}
			return [r, error];
		},
		run: function($form){
			var result = true;
			var errors = [];
			var valid = [];
			valid.push(this.pref($form));
			valid.push(this.yukamenseki($form));
			valid.push(this.currentSituation($form));
			valid.push(this.estateRepair($form));
			valid.push(this.tel($form));
			var mailInput = $form.find("input[name=form\\[mail\\]]");
			if (mailInput !== "") {
				//スペースを取り外す
				var mailParam = mailInput.val().replace(/(^[\s　]+)|([\s　]+$)/g, "");
				//書き換え
				mailInput.val(mailParam);
				valid.push(this.email($form));
			}
			$.each(valid, function(k, v){
				if(v.result===false){
					result = false;
					errors.push(v.error);
				}else{
				}
			});
			return {result: result, errors: errors};
		},
		showError: function(errors){
			alert(errors.join("\n"));
		}
	};

	var repair = {
		bind: function(target){
			switch(target){
				case('tel'):
					$('input[type=tel]').on('change', function(){repair.tel(this);});
					break;
			}
		},
		zen2han: function(str){
			var sheet = [
				[/０/g, "0"],[/１/g, "1"],[/２/g, "2"],[/３/g, "3"],
				[/４/g, "4"],[/５/g, "5"],[/６/g, "6"],[/７/g, "7"],
				[/８/g, "8"],[/９/g, "9"],[/−/g, "-"],[/ー/g, "-"],
				[/　/g, " "]
			];
			$.each(sheet, function(k, v){
				str = str.replace(v[0], v[1]);
			});
			return str;
		},
		tel : function(self){
			var $self = $(self);
			var val = repair.zen2han($self.val());
			$self.val(val);
		}
	};

	change_required_form();
	image_url_change();
	form_validator();
	repair.bind('tel');

	// -------- test --------
	var _spec = {
		repair: {
			zen2han: function(){
				var result = (repair.zen2han('１２３４５６７８９０−ー　') === '1234567890-- ') + "";
				console.log(result + ':true 指定した文字列は全て半角に変換されなければならない');
			}
		},
		validation: {
			_checkNumber: function(){
				var result, r, e = "";
				var tests = [
					['ABCDEFGH', 'false 電話番号でない場合はfalseを返さなければならない'],
					['08012345678', 'true 正しい電話番号の場合はtrueを返さなければならない'],
					['0465123456', 'true 正しい電話番号の場合はtrueを返さなければならない2'],
					['080123456780', 'false 桁数が不正な電話番号の場合はfalseを返さなければならない'],
					['0801234567', 'false 桁数が不正な電話番号の場合はfalseを返さなければならない2'],
				];
				$.each(tests, function(k, v){
					result = validation._checkNumber(v[0]);
					r = result[0]; e = result[1]; r += "";
					console.log(r + ':' + v[1]);
				});
			}
		},
		run: function(){
			this.repair.zen2han();
			this.validation._checkNumber();
		}
	};
	//aリンクスクロール
	// _spec.run();
	// -------- test -------
});

function normalizeValue(){
  var befor = new Array("ガ","ギ","グ","ゲ","ゴ","ザ","ジ","ズ","ゼ","ゾ","ダ","ヂ",
    "ヅ","デ","ド","バ","ビ","ブ","ベ","ボ","パ","ピ","プ","ペ","ポ","ヲ","ァ",
    "ィ","ゥ","ェ","ォ","ャ","ュ","ョ","ッ",
    "ー",
    "ア","イ","ウ","エ","オ","カ","キ","ク","ケ","コ",
    "サ","シ","ス","セ","ソ","タ","チ","ツ","テ","ト",
    "ナ","ニ","ヌ","ネ","ノ","ハ","ヒ","フ","ヘ","ホ",
    "マ","ミ","ム","メ","モ","ヤ","ユ","ヨ","ラ","リ","ル","レ","ロ","ワ","ン",
    'Ａ','Ｂ','Ｃ','Ｄ','Ｅ','Ｆ','Ｇ','Ｈ','Ｉ','Ｊ','Ｋ','Ｌ','Ｍ','Ｎ','Ｏ','Ｐ','Ｑ','Ｒ','Ｓ','Ｔ','Ｕ','Ｖ','Ｗ','Ｘ','Ｙ','Ｚ',
    'ａ','ｂ','ｃ','ｄ','ｅ','ｆ','ｇ','ｈ','ｉ','ｊ','ｋ','ｌ','ｍ','ｎ','ｏ','ｐ','ｑ','ｒ','ｓ','ｔ','ｕ','ｖ','ｗ','ｘ','ｙ','ｚ',
    '＠','−','０','１','２','３','４','５','６','７','８','９','．','　',
    '①','②','③','④','⑤','⑥','⑦','⑧','⑨','⑩',
    'Ⅰ','Ⅱ','Ⅲ','Ⅳ','Ⅴ','Ⅵ','Ⅶ','Ⅷ','Ⅸ','Ⅹ','〜','−','㈱','㈲','℡');
  var after = new Array("ガ","ギ","グ","ゲ","ゴ","ザ","ジ","ズ","ゼ","ゾ","ダ","ヂ",
    "ヅ","デ","ド","バ","ビ","ブ","ベ","ボ","パ","ピ","プ","ペ","ポ","ヲ","ァ",
    "ィ","ゥ","ェ","ォ","ャ","ュ","ョ","ッ",
    "ー",
    "ア","イ","ウ","エ","オ","カ","キ","ク","ケ","コ",
    "サ","シ","ス","セ","ソ","タ","チ","ツ","テ","ト",
    "ナ","ニ","ヌ","ネ","ノ","ハ","ヒ","フ","ヘ","ホ",
    "マ","ミ","ム","メ","モ","ヤ","ユ","ヨ","ラ","リ","ル","レ","ロ","ワ","ン",
    'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
    'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
    '@','-','0','1','2','3','4','5','6','7','8','9','.',' ',
    '(1)','(2)','(3)','(4)','(5)','(6)','(7)','(8)','(9)','(10)',
    'I','II','III','IV','V','VI','VII','VIII','IX','X','-','-','(株)','(有)','TEL','-');
  var i;
  var v = $(this).val();
  for(i = 0 ; i < befor.length ; i++){
    var t = v.split(befor[i]);
    v = t.join(after[i]);
  }
  $(this).val(v);
}

/**
 * 最初の訪問元を記録する
 * - リファラだとサイト内の回遊が記録されるため
 * - フォーム送信したらリセット
 */
function setFirstFrom() {
  const referrer = document.referrer !== ""
    ? new URL(document.referrer).origin
    : "";
  const origin = location.origin;
  if(!referrer && !origin) { return }

  /**
   * Same Originなら何もしない
   * - originの「完全一致」で比較する
   * - "*.jp.com"みたいな文字列での、前方一致を防ぐ
   * - https://github.com/doors-inc/gaiheki.support/pull/205#discussion_r837066128
   */
  const origin_escaped = origin.replace(/[.]/g, '\\.');
  const regex = new RegExp('^' + origin_escaped + '$');
  if(regex.test(referrer)) { return }

  localStorage.setItem('first_from', referrer);
}

/**
 * formに訪問サイトを含める
 * - CVしたら初期化する
 */
function insertFirstFrom(form) {
  const first_from = localStorage.getItem("first_from");
  if(!first_from || !form) return;

  const hidden = document.createElement('input');
  hidden.name = 'first_from';
  hidden.type = 'hidden';
  hidden.value = first_from;

  form.appendChild(hidden);

  // init
  localStorage.removeItem('first_from');
}

/**
 * ga_client_id を含める
 * 
 * dataLayer には client_id の値が入るように設定してあるので、
 * そちらを取得し、フォームに含めるようにしている
 */
function insertGAClientId(form) {
  const ga_client_id = google_tag_manager['GTM-KR8FGRT']?.
    dataLayer.get('gtagApiResult.client_id');

  if(!ga_client_id || !form) return;

  const hidden = document.createElement('input');
  hidden.name = 'ga_client_id';
  hidden.type = 'hidden';
  hidden.value = ga_client_id;

  form.appendChild(hidden);
}

/**
 * 送信前にtokenを仕込む
 * - https://developers.google.com/recaptcha/docs/v3
 * - おそらく非同期で取得するので、完了を待ってsubmitしないといけない
 * - form.submit()では、submit イベントは**生成されない**ので注意
 */
function submit_with_recaptcha(form) {
  if(!form) return;

  grecaptcha.ready(function () {
    grecaptcha.execute('6LcvcZ4UAAAAAGCOLAojkg7zbviImCCqW5DJQWGc', { action: 'contact' }).then(function (token) {
      var hidden = document.createElement('input');
      hidden.name = 'form[recaptchaToken]';
      hidden.type = 'hidden';
      hidden.value = token;
      form.appendChild(hidden);
      form.submit()
    });
  });
}
