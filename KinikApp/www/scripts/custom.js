$(function() {
	
	'use strict';

	/* ==============================================
	** Navbar
	 ==============================================*/

	$('.show-search').on('click', function() {
		$(this).toggleClass('active');
		$('.searchbar').toggleClass('show');
		return false;
	});

	/* ==============================================
	** Sidebar
	 ==============================================*/

	$('.open-sidenav').on('click', function() {
		$('.sidenav').sidenav('open');
		$(this).addClass('hide');
		$('.navright .show-search').addClass('hide');
		$('.navright .close-sidenav').addClass('show');
		return false;
	});

	$('.close-sidenav').on('click', function() {
		$('.sidenav').sidenav('close');
		$('.open-sidenav').removeClass('hide');
		$('.navright .show-search').removeClass('hide');
		$(this).removeClass('show');
		return false;
	});
	
	$('.sidenav').sidenav();

	$('#main-menu > ul > li.has-sub').prepend('<span class="arrow-icon"><i class="fa fa-chevron-right"></i></span>');
	$('#main-menu > ul > li.has-sub > ul > li.has-sub > a').append('<span class="fa fa-angle-double-right"></span>');

	$('#main-menu li.has-sub > .arrow-icon, #main-menu li.has-sub.direct-dropdown > a').on('click', function(){
		$(this).removeAttr('href');
		var element = $(this).parent('li');
		if (element.hasClass('open')) {
			element.removeClass('open');
			element.find('li').removeClass('open');
			element.find('ul').slideUp();
		} else {
			element.addClass('open');
			element.children('ul').slideDown();
			element.siblings('li').children('ul').slideUp();
			element.siblings('li').removeClass('open');
			element.siblings('li').find('li').removeClass('open');
			element.siblings('li').find('ul').slideUp();
		}
	});
	/*------------------------------------------------------*/

	$('.comment-list > .has_child > .content .reply').on('click', function() {
		var elem = $(this).closest('li');
		elem.find('ul').toggleClass('show');
		elem.find('textarea').focus();
	});
	$('.comment-list > .has_child > ul .reply').on('click', function() {
		var elem = $(this).closest('ul');
		elem.find('textarea').focus();
	});
	$('.comment-list li .love').on('click', function() {
		$(this).toggleClass('loved self');
	});
	
	/* ==============================================
	** Slick Slider
	 ==============================================*/
	//$('.home-slider, .home-slider2, .gallery-page-slider, .entry-thumb.gallery-slider, .gallery-slider').slick({
	//	dots: true,
	//	arrows: false,
	//});

	/* ==============================================
	** Material Components
	 ==============================================*/

	/* Accordion ----------------------------------*/
	$('.collapsible').collapsible();
	$('.collapsible.expandable').collapsible({
		accordion: false
	});

	/* Modal --------------------------------------*/
	$('.modal').modal();

	/* Dropdown -----------------------------------*/
	$('.dropdown-trigger').dropdown();

	/* Form select --------------------------------*/
	$('select').formSelect();

	/* Date & time pickers ------------------------*/
	$('.datepicker').datepicker();
	$('.timepicker').timepicker();

	
	/* ==============================================
	** Swipebox
	 ==============================================*/
	$(document).swipebox({ selector: '.swipebox' });

	/* ==============================================
	** Scroll top
	 ==============================================*/
	var winScroll = $(window).scrollTop();
	$(window).on("scroll",function(){
		winScroll = $(window).scrollTop();

		if (winScroll > 1) {
			$('#to-top').css({opacity:1,bottom:"60px"});
		} else {
			$('#to-top').css({opacity:0,bottom:"60px"});
		}
	});
	$('#to-top').on("click", function() {
		$('html, body').animate({scrollTop: '0px'}, 800);
		return false;
	});
	/*------------------------------------------------------*/
    var loginform;
    var user = localStorage.getItem('login');
    if (user) {
        loginform = ` <div class="thumb">
                        <img src="images/no-img.jpg" alt="">
                    </div>
                    <div class="caption">
                        <span>Merhaba,</span>
                        <h4 class="name">${user.toLocaleLowerCase()}</h4>
                    </div>
                    <div class="btn-nav">
                        <a href="#!" class="btn" id="singout">Singout</a>
                    </div>`;
        $('.top-left-nav').html('');
        $('.top-left-nav').append(loginform);
    } else {
        loginform = ` <div class="thumb">
                        <img src="images/no-img.jpg" alt="">
                    </div>
                    <div class="caption">
                        <span>Merhaba,</span>
                        <h4 class="name">Misafir</h4>
                    </div>
                    <div class="btn-nav">
                        <a href="membership_login.html" class="btn">Login</a>
                    </div>`;
        $('.top-left-nav').html('');
        $('.top-left-nav').append(loginform);
    }
    $('#singout').on('click',
        function(e) {
            e.preventDefault();
            localStorage.removeItem('login');
            loginform = ` <div class="thumb">
                        <img src="images/no-img.jpg" alt="">
                    </div>
                    <div class="caption">
                        <span>Merhaba,</span>
                        <h4 class="name">Misafir</h4>
                    </div>
                    <div class="btn-nav">
                        <a href="membership_login.html" class="btn">Login</a>
                    </div>`;
            $('.top-left-nav').html('');
            $('.top-left-nav').append(loginform);
        });

});

