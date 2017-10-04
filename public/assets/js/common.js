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
		
		// Contact Us Form Submit
		$('#contact_us_form').on('submit', function(e)
		{
			e.preventDefault();
			
			$.ajax({
				type:'POST',
				url:'/contact-submit',
				data:$(this).serialize()
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