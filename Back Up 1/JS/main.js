$(document).ready(function () {
	"use strict"; // start of use strict

	/*==============================
	Header
	==============================*/
	var mainHeader = $('.header--hidden');
	var scrolling = false,
	previousTop = 0,
	currentTop = 0,
	scrollDelta = 10,
	scrollOffset = 140;

	var scrolling = false;
	$(window).on('scroll', function(){
		if( !scrolling ) {
			scrolling = true;
			(!window.requestAnimationFrame)
				? setTimeout(autoHideHeader, 250)
				: requestAnimationFrame(autoHideHeader);
		}
	});
	$(window).trigger('scroll');

	function autoHideHeader() {
		var currentTop = $(window).scrollTop();
		checkSimpleNavigation(currentTop);
		previousTop = currentTop;
		scrolling = false;
	}

	function checkSimpleNavigation(currentTop) {
		if (previousTop - currentTop > scrollDelta) {
			mainHeader.removeClass('header--scroll');
		} else if (currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
			mainHeader.addClass('header--scroll');
		}
	}
	function disableScrolling(){
		var x=window.scrollX;
		var y=window.scrollY;
		window.onscroll=function(){window.scrollTo(x, y);};
	}

	function enableScrolling(){
		window.onscroll=function(){};
	}

	$('.header__menu').on('click', function() {
		$('.header__menu').toggleClass('header__menu--active');
		$('.header').toggleClass('header--menu');
		$('.header__nav').toggleClass('header__nav--active');

		if( $('.header__nav').hasClass('header__nav--active') ) {
			disableScrolling();
		} else {
			enableScrolling();
		}
	});

	$('.header__search, .header__form-close').on('click', function() {
		$('.header__form').toggleClass('header__form--active');
	});

	$(window).on('scroll', function () {
		if ( $(window).scrollTop() > 0 ) {
			$('.header--fixed').addClass('header--active');
		} else {
			$('.header--fixed').removeClass('header--active');
		}
	});
	$(window).trigger('scroll');

	/*==============================
	Multi level dropdowns
	==============================*/
	$('ul.dropdown-menu [data-toggle="dropdown"]').on('click', function(event) {
		event.preventDefault();
		event.stopPropagation();

		$(this).siblings().toggleClass('show');
	});

	$(document).on('click', function (e) {
		$('.dropdown-menu').removeClass('show');
	});

	/*==============================
	Select
	==============================*/
	$('.catalog__select').select2({
		minimumResultsForSearch: Infinity
	});

	/*==============================
	Bg
	==============================*/
	$('.section--full-bg').each( function() {
		if ($(this).attr("data-bg")){
			$(this).css({
				'background': 'url(' + $(this).data('bg') + ')',
				'background-position': 'center center',
				'background-repeat': 'no-repeat',
				'background-size': 'cover'
			});
		}
	});

	$('.section__bg').each( function() {
		if ($(this).attr("data-bg")){
			$(this).css({
				'background': 'url(' + $(this).data('bg') + ')',
				'background-position': 'top center',
				'background-repeat': 'no-repeat',
				'background-size': 'cover'
			});
		}
	});

	/*==============================
	Player
	==============================*/
	function initializePlayer() {
		if ($('#player').length) {
			const player = new Plyr('#player');
		} else {
			return false;
		}
		return false;
	}
	$(window).on('load', initializePlayer());

	/*==============================
	Modal
	==============================*/
	$('.open-video').magnificPopup({
		disableOn: 500,
		fixedContentPos: true,
		type: 'iframe',
		preloader: false,
		removalDelay: 300,
		mainClass: 'mfp-fade',
		callbacks: {
			open: function() {
				if ($(window).width() > 1200) {
					$('.header').css('margin-left', "-" + (getScrollBarWidth()/2) + "px");
				}
			},
			close: function() {
				if ($(window).width() > 1200) {
					$('.header').css('margin-left', 0);
				}
			}
		}
	});

	$('.open-modal').magnificPopup({
		fixedContentPos: true,
		fixedBgPos: true,
		overflowY: 'auto',
		type: 'inline',
		preloader: false,
		focus: '#username',
		modal: false,
		removalDelay: 300,
		mainClass: 'my-mfp-zoom-in',
	});

	$('.modal__close').on('click', function (e) {
		e.preventDefault();
		$.magnificPopup.close();
	});

	function getScrollBarWidth () {
		var $outer = $('<div>').css({visibility: 'hidden', width: 100, overflow: 'scroll'}).appendTo('body'),
			widthWithScroll = $('<div>').css({width: '100%'}).appendTo($outer).outerWidth();
		$outer.remove();
		return 100 - widthWithScroll;
	};

	/*==============================
	Scrollbar
	==============================*/
	var Scrollbar = window.Scrollbar;

	if ($('.header__nav-menu--scroll').length) {
		Scrollbar.init(document.querySelector('.header__nav-menu--scroll'), {
			damping: 0.1,
			renderByPixels: true,
			alwaysShowTracks: true,
			continuousScrolling: true
		});
	}

	if ($('.dashbox__table-wrap--1').length) {
		Scrollbar.init(document.querySelector('.dashbox__table-wrap--1'), {
			damping: 0.1,
			renderByPixels: true,
			alwaysShowTracks: true,
			continuousScrolling: true
		});
	}

	if ($('.dashbox__table-wrap--2').length) {
		Scrollbar.init(document.querySelector('.dashbox__table-wrap--2'), {
			damping: 0.1,
			renderByPixels: true,
			alwaysShowTracks: true,
			continuousScrolling: true
		});
	}


});