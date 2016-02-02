var $muscleBonesQuestions = [
	[ "bonemarrow",
		"This is where red blood cells are made.",
		"http://www.sciencekids.co.nz/sciencefacts/humanbody.html" ],
	[ "brain",
	 	"This organ uses over quarter of the oxegyn used by the human body",
	 	"http://www.sciencekids.co.nz/sciencefacts/humanbody.html" ],
	[ "melanin",
		"This is responsible for the color of human skin.  Low amounts result in light skin, while high amount result in dark skin.",
		"http://www.sciencekids.co.nz/sciencefacts/humanbody.html" ],
	[ "ears",
		"These continue to grow your entire life.",
		"http://www.sciencekids.co.nz/sciencefacts/humanbody.html" ],
	[ "epiglottis",
		"The flap of tissue that closes during swallowing, preventing food going down the trachea (windpipe).",
		"http://www.sciencekids.co.nz/sciencefacts/humanbody.html" ],
	[ "temporalbone",
		"The hardest bone in the human body.",
		"http://www.sciencekids.co.nz/sciencefacts/humanbody.html"  ],
	[ "optic",
		"The information our eyes receive is sent to the brain along this nerve.",
		"http://www.sciencekids.co.nz/sciencefacts/humanbody.html"]
]

var playerTurn = 1;
var length = 0;
var wrongGuess = 0;
var scorePlayer1 = 0;
var scorePlayer2 = 0;
var count = 0;
var name = $muscleBonesQuestions[count][0].toUpperCase();
var nameSplit = $muscleBonesQuestions[count][0].split("");
var fact = $muscleBonesQuestions[count][1];
var guessedLetter = $('#guessInput').val();

// Makes empty boxes with a black line at the bottom for nameSplit.length
var makeBoxes = function() {
			$('.container').html("")
			for (var i = 0; i < nameSplit.length; i++) {
				$('.container').append('<div class="card" data-value="' + nameSplit[i].toUpperCase() + '"><div class="front">*</div><div class="back">' + nameSplit[i].toUpperCase() + '</div></div>');
			}
			$('.card').flip();

			$('.hint #description').text(fact);
			$('.card').off('.flip');

		}

$(document).ready(function() {
	makeBoxes();
	count += 1;

	// Prevents cards from flipping, disables guessed letters, flips correctly guessed letters
	$('#guess').on('submit', function (e) {
		e.preventDefault();
		guessedLetter = ($('#guessInput').val());

		// Check if guessed letter matches name & checks if player has won
		if( name.indexOf(guessedLetter) !== -1 && name.length !== length) {
			
			// Flips matching cards over for guessed letter
			$(".card[data-value='" + (guessedLetter) +"'").flip(true);

			// Adds # of cards flipped to length (helps keep track of how many letters have been guessed out of the word)
			length += $(".card[data-value='" + (guessedLetter) +"'").length;

			// Checks if player has guessed all letters
			if ( length == name.length) {
				swal("You won!!", "Click the Let's Play button to move on to the next round.", "success");
			}
			//console.log($(".card[data-value='" + (guessedLetter) +"'").length);

			// Adds to player score & prints score to screen
			if (playerTurn == 1) {
				scorePlayer1 += $(".card[data-value='" + (guessedLetter) +"'").length;
				$('#p1Score').html("Player 1 score: " + scorePlayer1);
			} else {
				scorePlayer2 += $(".card[data-value='" + (guessedLetter) +"'").length;
				$('#p2Score').html("Player 2 score: " + scorePlayer2);
			}

		} else if (wrongGuess < 6) {
			wrongGuess += 1;
			console.log(wrongGuess);

			// Changes playerTurn
			if (playerTurn == 1 && wrongGuess !== 6) {
				playerTurn = 2;
				$('#playerTurn').text("Player Two's Turn");
				swal("Player Two's Turn");
			} else if (playerTurn == 2 && wrongGuess !== 6) {
				playerTurn = 1;
				$('#playerTurn').text("Player One's Turn");
				swal("Player One's Turn");
			} else if (wrongGuess == 6) {
				// Checks if the players have guessed wrong to many times.
				swal("Oh no!","You two guessed incorrect too many times. Click Let's play to play again.", "error");
				console.log("wrong guess = 6")
			}
		}

		$('#' + guessedLetter).attr("disabled", "disabled");
		$('#guessInput').val(0);
	});

	// When the letsPlay button is clicked a new game is started and the empty letter boxes appear, updates name, namesplit, count, and fact
	$('#letsPlay').on('click', function () {
		if (count < $muscleBonesQuestions.length) {
			count += 1;
			nameSplit = $muscleBonesQuestions[count][0].split("");
			name = $muscleBonesQuestions[count][0].toUpperCase();
			fact = $muscleBonesQuestions[count][1];
			makeBoxes();
			wrongGuess = 0;
			length = 0;
			$('#hint').val(0);
			$('#guessInput option').attr("disabled", false);
		} else {
			count = 0;
		}
	});

});