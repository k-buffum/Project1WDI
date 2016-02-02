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

var length = 0;
var wrongGuess = 0;
var score = 0;
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
		if( name.indexOf(guessedLetter) !== -1 && name.length !== length) {
			$(".card[data-value='" + (guessedLetter) +"'").flip(true);
			length += $(".card[data-value='" + (guessedLetter) +"'").length;
			console.log(length);
			console.log(name.length);
			if ( length == name.length) {
				score += 1;
				$('#score').html("Score: " + score);
				alert("You won, press Let's play to play again!");
			}
			//console.log($(".card[data-value='" + (guessedLetter) +"'").length);
			// console.log(guessedLetter);
		} else if (wrongGuess < 6) {
			wrongGuess += 1;
			console.log('hi');
			console.log(guessedLetter);
		} else {
			alert("You guessed incorrect too many times, press Let's play to play again.")
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
		} else {
			count = 0;
		}
	});

});