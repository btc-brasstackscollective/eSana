(function( $ ) {
	$(document).ready(function()
	{
		var resizeTimer;
		
		// Home Page Hero Panel
		if($('#home_hero_container').length)
			$('#home_hero_container').customPanel();
			
		// Mobile Navigation :: Setup
		$('#main_navigation').after($('<div id="navbar-height-col"></div>'));
	
	    // Enter your ids or classes
	    var toggler = '.navbar-toggle';
	    var navigationwrapper = '.navbar-header';
	
		$("#main_navigation").on("click load", toggler, function (e)
		{
	        var selected = $(this).hasClass('slide-active');
	
	    	$(this).toggleClass('slide-active', !selected);
	    	$('#navbar-height-col, .utility_nav').toggleClass('slide-active');
	
	    	$(navigationwrapper+', .navbar, body').toggleClass('slide-active');
		});
		
		if($('.saving_calculator_container').length)
		{
			// Savings Calculator Knob
			$('.saving_calulator_knob').knob();
		}
		
		// Contact Us Form Submit
		$('#contact_us_form').on('submit', function(e)
		{
			e.preventDefault();
			
			var request = $.ajax({
				type:'POST',
				url:'/contact-submit',
				data:$(this).serialize(),
				dataType:'text'
			});
			
			request.done(function(msg)
			{
				$('.contact_us_form_message p').addClass('success').text('Thank you. Your message has been sent.').parent().fadeIn().delay(5000).fadeOut();
			});
			
			request.fail(function(jqXHR, textStatus)
			{
				$('.contact_us_form_message p').addClass('fail').text('There seems to have been an error. Please try sending your message again at a later time.').parent().fadeIn().delay(5000).fadeOut();
			});
		});
		
		$(window).on('resize', function(e)
	   	{
		  	clearTimeout(resizeTimer);
		  	
		  	resizeTimer = setTimeout(function()
		  	{
	        	windowResize();
		  	}, 250);
		});
	
		var windowResize = function()
		{
			if(window.innerWidth <= 769)
			{
			}
		}
	});
})( jQuery );