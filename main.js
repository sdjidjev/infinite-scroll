$(document).ready(function(){
	var fillInterval;
	var min_pic = 0;
	var max_pic = 81;
	var lst = {};
	var repeat = true;
	resetLst();

	function resetLst(){
		for (var i = min_pic; i <= max_pic; i++){
			lst[String(String(i))] = "not used";
		}
	}

	function usedLst(){
		return count >= max_pic;
	}

	var count = 0;
	fillBeginningWindow();

	function fillBeginningWindow(){
		fillInterval = setInterval(appendImage,100);
	}

	function getRandomInt(min, max) { // max is exclusive
		if (usedLst()) {
			resetLst();
			count = 0;
		}
		var num = Math.floor(Math.random() * (max - min)) + min;
		while (lst[num] === "used"){
			num = Math.floor(Math.random() * (max - min)) + min;
		}
		count++;
		lst[num] = "used"
	    return num;
	}

	function imageGenerator(){
		return $('<img class="col-xs-12" src="img/'+String(getRandomInt(min_pic,max_pic))+'.jpg">');
	}

	function appendImage(){
		if (Math.min($('.left-image-container').height(),
						$('.right-image-container').height(),
						$('.middle-image-container').height()) == $('.left-image-container').height()){
			imageGenerator().hide().appendTo('.left-image-container').fadeIn(500);
		}
		else if (Math.min($('.left-image-container').height(),
						$('.right-image-container').height(),
						$('.middle-image-container').height()) == $('.middle-image-container').height()){
			imageGenerator().hide().appendTo('.middle-image-container').fadeIn(500);
		}
		else {
			imageGenerator().hide().appendTo('.right-image-container').fadeIn(500);
		}
		if ($(window).height() != $(document).height()) {
			clearInterval(fillInterval)
		}
	}

	$(window).scroll(function() {
	   if($(window).scrollTop() + $(window).height() >= $(document).height() - 200) {
	    	appendImage();
	   }
	});

	setInterval(function(){
		if($(window).scrollTop() + $(window).height() >= $(document).height() - 200) {
	    	appendImage();
	   }
	},1000);
});

// var $image = $('<img class="col-sm-12" src="img/0.jpg">');
// 	setTimeout(function(){
// 		$('.left-image-container').append($image);
// 	},200); why