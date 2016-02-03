$(document).ready(function () {
	var instructions = 0;
	$('#instructionsContainer').hide();

	$('#instructions').on('click', function() {
		if(instructions == 0) {
			$('#instructionsContainer').show();
			instructions = 1;
		} else {
			$('#instructionsContainer').hide();
			instructions = 0;
		}
		
	})	
})