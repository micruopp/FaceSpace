/*
 * Copyright 2020 Mic Ruopp. All rights reserved.
 */

window.onload = app;

function app() {
	let player1 = document.querySelector('#video-space-1');
	let player2 = document.querySelector('#video-space-2');

	if (window.isSecureContext) { 
		console.log("Context is secure.");

		let constraints = { audio: true, video: true };

		navigator.mediaDevices.getUserMedia(constraints)
			.then(function(stream) {
			  /* use the stream */
			  console.log("Got stream.");
			  console.log(stream);

			  player1.srcObject = stream;
			  player2.srcObject = stream;
			  player1.onloadedmetadata = function(e) {
			    player1.play();
			  };
			  player2.onloadedmetadata = function(e) {
			  	player2.classList.remove('hidden');
			    player2.play();
			  };


			})
			.catch(function(err) {
			  /* handle the error */
			  console.log("Uh-oh...");
			  console.log(err);
			});

	} else {
		console.log("Run!");
	}
}