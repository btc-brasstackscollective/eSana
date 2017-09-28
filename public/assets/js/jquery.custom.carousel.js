(function($)
{
	var carouselPosition = 0;
	var carouselTotalWidth = 0;
	var carouselItemIndex = 0;
	var resizeTimer;

	$.customCarousel = function(element, options)
	{
		var defaults = {
			itemsPerSlide_Large: 5,
			itemsPerSlide_Small: 4,
			itemsPerSlide_Xsmall: 2,
			slideType: 'variable',
			slideSpeed: '500ms'
		};
		
		var carousel = this;
		
		carousel.settings = {};
		
		var $element = jQuery(element), element = element;
		var carouselItemCount;
		var carouselItemsPerSlide;
		var carouselState = 'default';
		var mediumDevice = 992;
		var smallDevice = 768;
		var slideItemWidth;
		
		carousel.init = function()
		{
			carousel.settings = jQuery.extend({}, defaults, options);
			
			carousel.buildCarousel();
			carousel.buildControls();
		}
		
		carousel.buildCarousel = function()
		{
			carouselItemCount = $element.find('.character_item').length;
			
			for(var i = 0; i < carouselItemCount; i++)
			{
				carousel.buildSlideItem($element.find('.character_item').eq(i));
			}
			
			carousel.setCarouselWidth();
		}
		
		carousel.setCarouselWidth = function()
		{
			if(window.innerWidth >= mediumDevice)
			{
				carouselItemsPerSlide = carousel.settings.itemsPerSlide_Large;
			}
			
			else if(window.innerWidth < mediumDevice && window.innerWidth >= smallDevice)
			{
				carouselItemsPerSlide = carousel.settings.itemsPerSlide_Small;
			}
			
			else if(window.innerWidth < smallDevice)
			{
				carouselItemsPerSlide = carousel.settings.itemsPerSlide_Xsmall;
			}
			
			slideItemWidth = parseFloat(window.innerWidth / carouselItemsPerSlide);
			$element.find('.character_item').width(slideItemWidth+'px');
			
			carouselTotalWidth = slideItemWidth * carouselItemCount;
			$element.find('.custom_carousel_inner_wrapper').width(carouselTotalWidth);
			
			$element.find('.custom_carousel_inner_wrapper').css(
			{
				'-webkit-transform': 'translateX(0px)',
				'-o-transform': 'translateX(0px)',
				'-moz-transform': 'translateX(0px)',
				'transform': 'translateX(0px)'
			});
		}
		
		carousel.buildSlideItem = function($item)
		{
			var topGradient = $item.data('top-gradient');
			var btmGradient = $item.data('btm-gradient');
			var leftPos = $item.data('left');
			var topPos = $item.data('top');
			var scalePos = $item.data('scale');
			
			$item.css(
			{
				'background': '-webkit-linear-gradient('+topGradient+', '+btmGradient+')',
				'background': '-o-linear-gradient('+topGradient+', '+btmGradient+')',
				'background': '-moz-linear-gradient('+topGradient+', '+btmGradient+')',
				'background': 'linear-gradient('+topGradient+', '+btmGradient+')'	
			});
			
			$item.find('.slider_item img').css(
			{
				'-webkit-transform': 'translate('+leftPos+'%, '+topPos+'%) scale('+scalePos+')',
				'-o-transform': 'translate('+leftPos+'%, '+topPos+'%) scale('+scalePos+')',
				'-moz-transform': 'translate('+leftPos+'%, '+topPos+'%) scale('+scalePos+')',
				'transform': 'translate('+leftPos+'%, '+topPos+'%) scale('+scalePos+')'
			});
		}
		
		carousel.initDetails = function(slideItem)
		{
			carouselItemIndex = slideItem.index();
			
			if(!$('#carousel_details_overlay_background').length)
				$('#carousel_details_overlay').after('<div id="carousel_details_overlay_background"></div>');
				
			carousel.buildDetailsOverlay();
		}
		
		carousel.buildDetailsOverlay = function()
		{			
			carousel.setCarouselDetailOverlay(carouselItemIndex);
			
			carousel.buildDetailControls();
		}
		
		carousel.setCarouselDetailOverlay = function(index)
		{
			slideItem = $element.find('.character_item').eq(index);
			
			topGradient = slideItem.data('top-gradient');
			btmGradient = slideItem.data('btm-gradient');
			detailCharImgTopPos = slideItem.find('.slider_detail').data('img-top');
			
			$('#carousel_details_overlay').find('#details_character_image img').attr('src', slideItem.data('img'));
			$('#carousel_details_overlay').find('#details_character_content').html(slideItem.find('.slider_detail').html());
			
			$('#carousel_details_overlay').css(
			{
				'background': '-webkit-linear-gradient('+topGradient+', '+btmGradient+')',
				'background': '-o-linear-gradient('+topGradient+', '+btmGradient+')',
				'background': '-moz-linear-gradient('+topGradient+', '+btmGradient+')',
				'background': 'linear-gradient('+topGradient+', '+btmGradient+')'	
			});
			
			if(window.innerWidth > 768)
			{
				$('#details_character_image').css(
				{
					'left': 0,
					'-webkit-transform': 'translateY('+detailCharImgTopPos+'%)',
					'-o-transform': 'translateY('+detailCharImgTopPos+'%)',
					'-moz-transform': 'translateY('+detailCharImgTopPos+'%)',
					'transform': 'translateY('+detailCharImgTopPos+'%)'
				});
			}
			
			else if(window.innerWidth <= 768 && window.innerHeight <= 1024)
			{
				var charImageScale = .8;
				var contentHeight = $('#details_character_content').height() - (($('#details_character_image').height() * (1 - charImageScale)) / 2) + 20;
				
				$('#details_character_image').css(
				{
					'left': '50%',
					'-webkit-transform': 'translate(-50%, '+contentHeight+'px) scale('+charImageScale+')',
					'-o-transform': 'translate(-50%, '+contentHeight+'px) scale('+charImageScale+')',
					'-moz-transform': 'translate(-50%, '+contentHeight+'px) scale('+charImageScale+')',
					'transform': 'translate(-50%, '+contentHeight+'px) scale('+charImageScale+')'
				});
			}
			
			else
			{
				detailCharImgTopPos = slideItem.find('.slider_detail').data('img-mobile-top');
				detailCharImgLeftPos = slideItem.find('.slider_detail').data('img-mobile-left');
				detailCharImgScale = slideItem.find('.slider_detail').data('img-mobile-scale');
				
				$('#details_character_image').css(
				{
					'-webkit-transform': 'translate('+detailCharImgLeftPos+'%, '+detailCharImgTopPos+'%) scale('+detailCharImgScale+')',
					'-o-transform': 'translate('+detailCharImgLeftPos+'%, '+detailCharImgTopPos+'%) scale('+detailCharImgScale+')',
					'-moz-transform': 'translate('+detailCharImgLeftPos+'%, '+detailCharImgTopPos+'%) scale('+detailCharImgScale+')',
					'transform': 'translate('+detailCharImgLeftPos+'%, '+detailCharImgTopPos+'%) scale('+detailCharImgScale+')'
				});
			}

			$('#carousel_details_overlay').addClass('showDetails');
			
			$('#carousel_details_overlay').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e)
    		{
	    		if($('#carousel_details_overlay').hasClass('showDetails'))
					$('#carousel_details_overlay_background').addClass('showDetails');
			});
		}
		
		carousel.buildDetailControls = function()
		{
			controlIndexPrev = 0;
			controlIndexNext = 0;
			
			if(carouselItemIndex == 0)
			{
				controlIndexPrev = (carouselItemCount - 1);
				controlIndexNext = carouselItemIndex + 1;
			}

			else if(carouselItemIndex == (carouselItemCount - 1))
			{
				controlIndexPrev = carouselItemIndex - 1;
				controlIndexNext = 0;
			}
			
			else
			{
				controlIndexPrev = carouselItemIndex - 1
				controlIndexNext = carouselItemIndex + 1;
			}

			var prevItem = $element.find('.character_item').eq(controlIndexPrev);
			var nextItem = $element.find('.character_item').eq(controlIndexNext);
			
			prevItemTopGradient = prevItem.data('top-gradient');
			prevItemBtmGradient = prevItem.data('btm-gradient');
			prevItemImg = prevItem.data('img');
			
			nextItemTopGradient = nextItem.data('top-gradient');
			nextItemBtmGradient = nextItem.data('btm-gradient');
			nextItemImg = nextItem.data('img');
			
			$('#custom_carousel_left_arrow').css(
			{
				'background-image': 'url('+prevItemImg+'), -webkit-linear-gradient('+prevItemTopGradient+', '+prevItemBtmGradient+')',
				'background-image': 'url('+prevItemImg+'), -o-linear-gradient('+prevItemTopGradient+', '+prevItemBtmGradient+')',
				'background-image': 'url('+prevItemImg+'), -moz-linear-gradient('+prevItemTopGradient+', '+prevItemBtmGradient+')',
				'background-image': 'url('+prevItemImg+'), linear-gradient('+prevItemTopGradient+', '+prevItemBtmGradient+')',
			});
			
			$('#custom_carousel_right_arrow').css(
			{
				'background-image': 'url('+nextItemImg+'), -webkit-linear-gradient('+nextItemTopGradient+', '+nextItemBtmGradient+')',
				'background-image': 'url('+nextItemImg+'), -o-linear-gradient('+nextItemTopGradient+', '+nextItemBtmGradient+')',
				'background-image': 'url('+nextItemImg+'), -moz-linear-gradient('+nextItemTopGradient+', '+nextItemBtmGradient+')',
				'background-image': 'url('+nextItemImg+'), linear-gradient('+nextItemTopGradient+', '+nextItemBtmGradient+')',
			});
		}
		
		carousel.buildControls = function()
		{
			$('<div/>', {
				id: 'custom_carousel_left_arrow',
				class: 'custom_carousel_arrow'
			}).click(function()
			{
				carousel.movePrev();
				
			}).appendTo($element);
			
			$('<div/>', {
				id: 'custom_carousel_right_arrow',
				class: 'custom_carousel_arrow'
			}).click(function()
			{
				carousel.moveNext();
					
			}).appendTo($element);
		}
		
		carousel.moveNext = function()
		{	
			if(carouselState == 'default')
			{
				var maxWidth = -(carouselTotalWidth - window.innerWidth);

				if(carousel.settings.slideType == 'single')
				{
					carouselPosition = (carouselPosition <= maxWidth) ? 0 : carouselPosition -= slideItemWidth;
				}
				
				else if(carousel.settings.slideType == 'variable')
				{
					if(carouselItemCount % carouselItemsPerSlide === 0)
						carouselPosition = (carouselPosition <= maxWidth) ? 0 : carouselPosition -= window.innerWidth;
						
					else
						carouselPosition = (carouselPosition <= maxWidth) ? 0 : carouselPosition -= slideItemWidth;	
				}
				
				else
				{
					carouselPosition = (carouselPosition <= maxWidth) ? 0 : carouselPosition -= window.innerWidth;
				}
				
				$element.find('.custom_carousel_inner_wrapper').css(
				{
					'-webkit-transform': 'translateX('+carouselPosition+'px)',
					'-o-transform': 'translateX('+carouselPosition+'px)',
					'-moz-transform': 'translateX('+carouselPosition+'px)',
					'transform': 'translateX('+carouselPosition+'px)'
				});
			}
			
			else
			{
				if(carouselItemIndex == (carouselItemCount - 1))
				{
					carouselItemIndex = 0;
				}
				
				else
				{
					carouselItemIndex++;
				}
				
				carousel.detailsSlideChange();
			}
		}
		
		carousel.movePrev = function()
		{	
			if(carouselState == 'default')
			{		
				if(carousel.settings.slideType == 'single')
					carouselPosition = (carouselPosition == 0) ? 0 : carouselPosition += slideItemWidth;
				
				else if(carousel.settings.slideType == 'variable')
				{
					if(carouselItemCount % carouselItemsPerSlide === 0)
						carouselPosition = (carouselPosition == 0) ? 0 : carouselPosition += window.innerWidth;
						
					else
						carouselPosition = (carouselPosition == 0) ? 0 : carouselPosition += slideItemWidth;
				}

					
				else
					carouselPosition = (carouselPosition == 0) ? 0 : carouselPosition += window.innerWidth;

				
				$element.find('.custom_carousel_inner_wrapper').css(
				{
					'-webkit-transform': 'translateX('+carouselPosition+'px)',
					'-o-transform': 'translateX('+carouselPosition+'px)',
					'-moz-transform': 'translateX('+carouselPosition+'px)',
					'transform': 'translateX('+carouselPosition+'px)'
				});
			}
			
			else
			{				
				if(carouselItemIndex == 0)
				{
					carouselItemIndex = carouselItemCount - 1;
				}
				
				else
				{
					carouselItemIndex--;
				}
				
				carousel.detailsSlideChange();
			}
		}
		
		carousel.init();
				
		$(window).on('resize', function(e) {
		  	clearTimeout(resizeTimer);
		  	resizeTimer = setTimeout(function() {
	        	carousel.setCarouselWidth();
	        	
	        	if(carouselState == 'details')
	        		carousel.buildDetailsOverlay();
		  	}, 250);
		});
		
		$element.find('.character_item').on('click', function()
		{
			carousel.initDetails($(this));
			carouselState = 'details';
		});
		
		$('#carousel_details_overlay').find('#carousel_details_closebtn').on('click', function()
		{
			$('#carousel_details_overlay').removeClass('showDetails');
			$('#carousel_details_overlay_background').removeClass('showDetails');
			carouselState = 'default';
			
			$('.custom_carousel_arrow').css('background', 'none');

			return false;
		});
	}
	
	$.fn.customCarousel = function(options)
	{
		return this.each(function() {
			if(undefined == $(this).data('customCarousel')) {
				var customCarousel = new $.customCarousel(this, options);
				
				$(this).data('customCarousel', customCarousel);
			}
		});
	};
})(jQuery);