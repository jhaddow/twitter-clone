$(document).ready(function(){
	$('#tweet-controls').hide();			//hide tweet controls on page load
	$('.tweet-actions').addClass('noShow');//hides tweet actions, stats, and reply on page load.
	$('.tweet').find('.stats').hide(); 
	$('.tweet').find('.reply').hide();	
	
	$('#tweet-content > .tweet-compose').on('focus', function(){  //enlarges the tweet compose box when it contains the cursor
		var height = 2.5;
		$(this).css({'height': height*2 +'em'});
		$('#tweet-controls').show();

	});
	$('#tweet-content > .tweet-compose').on('blur', function(){ //resets the tweet compose box if nothing is in it
		if(!$(this).val()){										//and it is click out of
			$(this).removeAttr('style');
			$('#tweet-controls').hide();
			$('#char-count').text(140);
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
				//this function takes in an element from the DOM (or in this case, a copy of the previous .tweet div)
				//and edits the element using the appropriate new values.
				var fullName = $('#profile-summary').find('.fullname').text();
				var userName = $('#profile-summary').find('.username').text();
				var avatar = $('#profile-summary').find('img').attr('src');
				var tweetText = $('#tweet-content > .tweet-compose').val();
				element.find('.fullname').text(fullName);
				element.find('.username').text(userName);
				element.find('.tweet-text').text(tweetText);
				element.find('.avatar').attr('src', avatar);			
				
			};		
			var newTweet = $('.tweet').first().clone(true); //create a clone of the latest tweet.
			$('#stream').prepend(newTweet); //insert a clone of the first tweet before the first tweet.
			editNewTweet(newTweet); //edits the clone that was just put on top of the tweet divs.

			$('#tweet-content > .tweet-compose').val("");  //reset the tweet-compose div
			$('#tweet-content > .tweet-compose').trigger('blur'); //trigger blur event

	});

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
	
	

	
}); 