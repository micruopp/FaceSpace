/*
 * Copyright 2020 Mic Ruopp. All rights reserved.
 */


window.onload = app;

function app() {
	let selfplayer = document.querySelector('#selfplayer');
	let streamplayer = document.querySelector('#streamplayer');

	let addr = 'wss://micsmac.local:8000';
	let ws = new WebSocket(addr);
	ws.onmessage = function(event) {
		streamplayer.srcObject = event;
		streamplayer.play();
	};

	if (window.isSecureContext) { 
		let constraints = { audio: false, video: true };

		navigator.mediaDevices.getUserMedia(constraints)
			.then(function(stream) {
			  selfplayer.srcObject = stream;
			  selfplayer.onloadedmetadata = function(e) {
			    selfplayer.play();
			    ws.send(stream);
			  };

			})
			.catch(function(err) {
			  console.log(err);
			});

	} else {
		console.log("Not a secure context.");
	}
}