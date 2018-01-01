(function( $ ) {
	$(document).ready(function()
	{
		$.fn.serializeObject = function()
		{
		   	var o = {};
		   	var a = this.serializeArray();
		   	$.each(a, function() {
		       	if (o[this.name]) {
		           	if (!o[this.name].push) {
		               o[this.name] = [o[this.name]];
					}
		           
					o[this.name].push(this.value || '');
		       } else {
		           o[this.name] = this.value || '';
		       }
			});
			
			return o;
		};

		if($('#esana_health_contact_form').length)
		{
			var $contactForm = $('#esana_health_contact_form'),
				url = 'https://script.google.com/a/brasstackscollective.com/macros/s/AKfycbyyZ0wjITbpHIG3FD4bReWm0yvp_NJiiHRYclYQA4QnpHH0pDwH/exec';
				
			$('#esana_health_contact_form_submit').on('click', function(e)
			{
				e.preventDefault();
				
				if($contactForm.find('input[name="esana_health_first_name"]').val() != '')
				{
					// Google Sheets update
					var jqxhr = $.ajax(
					{
						url: url,
						method: 'GET',
						dataType: 'json',
						data: $contactForm.serializeObject()
					});
					
					// Email Notfication to eSana Team
					var request = $.ajax({
						type:'POST',
						url:'/inquiry-contact-submit',
						data:$contactForm.serialize(),
						dataType:'text'
					});
					
					request.done(function(msg)
					{
						$('.contact_us_form_message p').addClass('success').text('Thank you. Your message has been sent.').parent().fadeIn();
						$('#esana_health_contact_form').fadeOut();
					});
					
					request.fail(function(jqXHR, textStatus)
					{
						$('.contact_us_form_message p').addClass('fail').text('There seems to have been an error. Please try sending your message again at a later time.').parent().fadeIn().delay(5000).fadeOut();
					});
				}
			});
		}
	});
	
})( jQuery );