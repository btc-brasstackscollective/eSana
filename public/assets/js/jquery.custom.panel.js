(function($)
{
	var currentPanelIndex = 0;
	var panelItemCount = 0;
	var resizeTimer;
	var heroPanelInterval;

	$.customPanel = function(element, options)
	{
		var defaults = {
			slideItemSelector: '.hero_panel_item',
			panelControlsSelector: '.hero_panel_controls',
			panelControlItemSelector: '.home_hero_panel_control_item',
			slideDelay: '5000',
			slideSpeed: '500'
		};
		
		var panel = this;
		
		panel.settings = {};
		
		var $element = jQuery(element), element = element;
		
		panel.init = function()
		{
			panel.settings = jQuery.extend({}, defaults, options);
			panelItemCount = $element.find('.hero_left_content_container '+panel.settings.slideItemSelector).length;
			panel.buildControls();
			//panel.setPanelHeight();
			currentPanelIndex = 0;
			panel.changePanel();
			//panel.autoPanelChange();
		}
		
		panel.setSideImageSize = function()
		{
			var leftSideHeight = parseFloat($('.hero_left_content_container').outerHeight());

			if($('.hero_right_container .hero_panel_item.active').hasClass('img_container'))
			$('.hero_right_container .hero_panel_item.active').css('height', leftSideHeight);
		}
		
		panel.setPanelHeight = function()
		{
			var maxHeight = 0;
			
			for(var i = 0; i < panelItemCount; i++)
			{
				var leftContainerItemHeight = parseFloat($element.find('.hero_left_content_container '+panel.settings.slideItemSelector+':eq('+i+')').height());
				var rightContainerItemHeight = parseFloat($element.find('.hero_left_content_container '+panel.settings.slideItemSelector+':eq('+i+')').height());
				
				var innerMaxHeight = 0;
				
				if(leftContainerItemHeight > rightContainerItemHeight)
					innerMaxHeight = leftContainerItemHeight;
					
				else if(rightContainerItemHeight > leftContainerItemHeight)
					innerMaxHeight = rightContainerItemHeight;
					
				else
					innerMaxHeight = leftContainerItemHeight;
					
				
				if(innerMaxHeight > maxHeight)
					maxHeight = innerMaxHeight;
			}
			
			var contentContainerTopPadding = parseFloat($('#home_hero_container .hero_left_content_container').css('padding-top'));
			var contentContainerBottomPadding = parseFloat($('#home_hero_container .hero_left_content_container').css('padding-bottom'));
			var contentPanelControlsHeight = parseFloat($('#home_hero_container .hero_left_content_container .hero_panel_controls').outerHeight(true));
			
			var totalHeight = maxHeight + contentContainerTopPadding + contentContainerBottomPadding + contentPanelControlsHeight;
			
			$('#home_hero_container .content_container').height(totalHeight);
		}
		
		panel.buildControls = function()
		{
			for(var i = 0; i < panelItemCount; i++)
			{
				$('<div/>', {
					class: 'home_hero_panel_control_item'
				}).appendTo($(panel.settings.panelControlsSelector));
			}
		}
		
		panel.autoPanelChange = function()
		{
			panel.cancelAutoPanelChange();
			
			heroPanelInterval = setInterval(function()
			{
				if(currentPanelIndex < (panelItemCount - 1))
					currentPanelIndex++;
					
				else
					currentPanelIndex = 0;
					
				panel.changePanel();
				
			}, panel.settings.slideDelay);
		}
		
		panel.cancelAutoPanelChange = function()
		{
			clearTimeout(heroPanelInterval);
		}
		
		panel.changePanel = function()
		{
			$('.hero_left_content_container '+panel.settings.slideItemSelector).removeClass('active').eq(currentPanelIndex).addClass('active');
			$('.hero_right_container '+panel.settings.slideItemSelector).removeClass('active').eq(currentPanelIndex).addClass('active');
			
			panel.setSideImageSize();
			panel.updatePanelControlItem();
		}
		
		panel.updatePanelControlItem = function()
		{
			$('.hero_left_content_container '+panel.settings.panelControlItemSelector).removeClass('active').eq(currentPanelIndex).addClass('active');
		}
		
		panel.init();
		
		// Panel Indicator click
		$(panel.settings.panelControlItemSelector).on('click', function()
		{
			currentPanelIndex = $(panel.settings.panelControlItemSelector).index($(this));
			
			panel.changePanel();
			panel.cancelAutoPanelChange();
		});
		
		// Panel Item Hover to pause auto change
		$(panel.settings.slideItemSelector).on({
		    mouseenter: function () {
		        panel.cancelAutoPanelChange();
		    },
		    mouseleave: function () {
		        //panel.autoPanelChange();
		    }
		});
	}
	
	$.fn.customPanel = function(options)
	{
		return this.each(function() {
			if(undefined == $(this).data('customPanel')) {
				var customPanel = new $.customPanel(this, options);
				
				$(this).data('customPanel', customPanel);
			}
		});
	};
})(jQuery);