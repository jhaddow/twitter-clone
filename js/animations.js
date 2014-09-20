$(document).ready(function(){
	$('#tweet-controls').hide();			//hide tweet controls on page load
	$('.tweet').hover(function () {         //hover removes and adds class instead of using show()/hide()
			if($(this).find('.tweet-actions').hasClass('noShow')){
			$(this).find('.tweet-actions').removeClass('noShow');
		}
	}, function(){
		if(!$(this).find('.tweet-actions').hasClass('noShow')){
			$(this).find('.tweet-actions').addClass('noShow');
		}
	});
	
		

	$('.tweet').on('click', function(){             //slide toggles the stats and reply bar when the tweet is clicked
		$(this).find('.stats').slideToggle(900);
		$(this).find('.reply').slideToggle(1000);
	});
	
	$('#tweet-content > .tweet-compose').on('focus', function(){  //enlarges the tweet compose box when it contains the cursor
		var height = 2.5;
		$(this).css({'height': height*2.5+'em'});
		$('#tweet-controls').show();

	});
	$('#tweet-content > .tweet-compose').on('blur', function(){ //resets the tweet compose box if nothing is in it
		if(!$(this).val()){										//and it is click out of
			$(this).removeAttr('style');
			$('#tweet-controls').hide();
		}
	});
	$('#tweet-content > .tweet-compose').on('keyup', function(){  //keeps track of character count.

		var charCount = 140 - $(this).val().length;
				
		$('#char-count').text(charCount);
		if(charCount <= 10){
			$('#char-count').css({'color':'red', 'font-weight':'bold'});
		}
		else{
			$('#char-count').removeAttr('style');
		}
		if(charCount < 0){
			$('#tweet-submit').prop('disabled', true);
		}
		else{
			$('#tweet-submit').prop('disabled', false);
		}

	});
	$('#tweet-submit').on('click', function() {  //clones the last tweet, edits it, and enters the new tweet into stream
			
			var editNewTweet = function(element){
				//this function takes in a DOM (or in this case, a copy of the previous .tweet div)
				//and edits the DOM using the appropriate new values.
				var fullName = $('#profile-summary').find('.fullname').text();
				var userName = $('#profile-summary').find('.username').text();
				var avatar = $('#profile-summary').find('img').attr('src');
				var tweetText = $('#tweet-content > .tweet-compose').val();
				$(element).find('.fullname').text(fullName);
				$(element).find('.username').text(userName);
				$(element).find('.tweet-text').text(tweetText);
				$(element).find('.avatar').attr('src', avatar);
				
				
			}			
			$('.tweet').first().clone(true).insertBefore($('.tweet').first()); //insert a clone of the first tweet before the first tweet.
			editNewTweet($('.tweet').first()); //edits the clone that was just put on top of the tweet divs.

			$('#tweet-content > .tweet-compose').val("");  //reset the tweet-compose div
			$('#tweet-content > .tweet-compose').trigger('blur');



			
			


	});
	$(document).on('click', '.action-favorite', function(e) {
		e.preventDefault();
		if($(this).attr('color') !== 'yellow'){
		$(this).css({'color': 'yellow'});
		}
		else{
			$(this).removeAttr('style');
		}

	});
	$('.tweet-actions').addClass('noShow');//hides tweet actions, stats, and reply on page load.
	$('.tweet').find('.stats').hide(); 
	$('.tweet').find('.reply').hide();

	
}); 