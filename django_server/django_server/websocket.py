async def websocket_application(scope, receive, send):
	while True:
		event = await receive()

		if event['type'] == 'websocket.connect':
			await send({
				'type': 'websocket.accept'
			})

		if event['type'] == 'websocket.disconnect':
			print("Client disconnected.")
			break

		if event['type'] == 'websocket.receive':
			stream = event['text']
			await send({
				'type': 'websocket.send',
				'text': stream
			})

		if event['type'] == 'websocket.send':
			print("Data sent.")