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
var correctGuessCount = 0;
var incorrectGuessCount = 0;
var scorePlayer1 = 0;
var scorePlayer2 = 0;
var gamePlayCount = 0;
var name;
var nameSplit;
var fact;
var onePlayer = true;

function setupHangmanWord() {
	$('.container').html("")
	for (var i = 0; i < nameSplit.length; i++) {
		$('.container').append('<div class="card" data-value="' + nameSplit[i].toUpperCase() + '"><div class="front">*</div><div class="back">' + nameSplit[i].toUpperCase() + '</div></div>');
	}

	$('.card').flip();
	$('.card').off('.flip');
	$('.hint #description').text(fact);
}

function setupGame() {
	if (gamePlayCount < $muscleBonesQuestions.length) {
		nameSplit = $muscleBonesQuestions[gamePlayCount][0].split("");
		name = $muscleBonesQuestions[gamePlayCount][0].toUpperCase();
		fact = $muscleBonesQuestions[gamePlayCount][1];
		setupHangmanWord();
		incorrectGuessCount = 0;
		correctGuessCount = 0;
		scorePlayer1 = 0;
		scorePlayer2 = 0;
		$('#hint').val(0);
		$('#guessInput option').attr("disabled", false);
		$("#hangmanFrame img").attr("src", "../images/hangmanBase.jpg");
		gamePlayCount += 1;
	} else {
		gamePlayCount = 0;
	}
}

function setHangmanImage() {
	if (incorrectGuessCount == 1) {
		$("#hangmanFrame img").attr("src", "../images/hangmanHead.jpg");
	} else if (incorrectGuessCount == 2) {
		$("#hangmanFrame img").attr("src", "../images/hangmanTorso.jpg");
	} else if (incorrectGuessCount == 3) {
		$("#hangmanFrame img").attr("src",  "../images/hangmanRLeg.jpg");
	} else if (incorrectGuessCount == 4) {
		$("#hangmanFrame img").attr("src", "../images/hangmanLLeg.jpg");
	} else if (incorrectGuessCount == 5) {
		$("#hangmanFrame img").attr("src","../images/hangmanRArm.jpg");
	} else if (incorrectGuessCount == 6) {
		$("#hangmanFrame img").attr("src", "../images/hangmanBody.jpg");
	}
}

function changePlayerTurn() {
	if (playerTurn == 1) {
		playerTurn = 2;
		$('#playerTurn').text("Player Two's Turn");
		swal("Player Two's Turn");
	} else {
		playerTurn = 1;
		$('#playerTurn').text("Player One's Turn");
		swal("Player One's Turn");
	}
}

function changePlayerScore(lettersFlipped) {
	if (playerTurn == 1) {
		scorePlayer1 += lettersFlipped;
		$('#p1Scr').html(scorePlayer1);
	} else {
		scorePlayer2 += lettersFlipped;
		$('#p2Scr').html(scorePlayer2);
		
	}
}

function resetScore() {
	scorePlayer1 = 0;
	scorePlayer2 = 0;
	$('#p1Scr').html(scorePlayer1);
	$('#p2Scr').html(scorePlayer2);
}

$(document).ready(function() {
	setupGame();
	$('#p2Score').hide();

	$('#playerMode').on('click', function() {
		if (onePlayer) {
			onePlayer = false;
			$('#playerMode').html('One Player');
			$('#p2Score').show();
			$('#playerTurn').html("Player One's Turn");
			setupGame();
		} else {
			onePlayer = true;
			$('#playerMode').html('Two Player');
			$('#p2Score').hide();
			$('#playerTurn').html("Hangman");
			setupGame();
		}
		resetScore();
	});

	$('#guess').on('submit', function(e) {
		e.preventDefault();
		var guessedLetter = ($('#guessInput').val());
		var lettersFlipped = $(".card[data-value='" + (guessedLetter) +"'").length

		// Check if guessed letter matches name & checks if player has won
		if (name.indexOf(guessedLetter) !== -1) {
			
			// Flips matching cards over for guessed letter
			$(".card[data-value='" + (guessedLetter) +"'").flip(true);

			changePlayerScore(lettersFlipped);
			correctGuessCount += lettersFlipped;

			// Checks if player has guessed all letters
			if (correctGuessCount == name.length) {
				if (onePlayer == true) {
					swal("You won!!", "Click the Let's Play button to move on to the next round.", "success");

				} else if (onePlayer == false && scorePlayer1 < scorePlayer2) {
					swal("Player 2 wins!!", "Click the Let's Play button to move on to the next round.", "success");

				} else if (onePlayer == false && scorePlayer1 > scorePlayer2) {
					swal("Player 1 wins!!", "Click the Let's Play button to move on to the next round.", "success");

				} else if (onePlayer == false && scorePlayer1 > scorePlayer2) {
					swal("It's a tie!", "Click the Let's Play button to move on to the next round.")
				}
			}

		} else {
			incorrectGuessCount += 1;
			setHangmanImage();

			if (incorrectGuessCount == 6) {
				swal("Oh no!","You guessed incorrect too many times. Click Let's play to play again.", "error");
			} else if (!onePlayer) {
				changePlayerTurn();
			}	
		}

		$('#' + guessedLetter).attr("disabled", "disabled");
		$('#guessInput').val(0);
	});

	// When the letsPlay button is clicked a new game is started and the empty letter boxes appear, updates name, namesplit, gamePlayCount, and fact
	$('#letsPlay').on('click', function () {
		setupGame();
	});

});