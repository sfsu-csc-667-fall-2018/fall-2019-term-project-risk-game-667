const socket = new WebSocket('ws://localhost:5000');

socket.addEventListener('open', function (event) {
  console.log('Connection with server opened!');
});

socket.addEventListener('message', function (event) {
  console.log('Message from server ', event.data);
});

socket.addEventListener('close', function (event) {
  console.log('Connection with server closed!');
});