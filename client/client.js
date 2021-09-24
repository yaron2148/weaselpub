// FILE /client/chat.js
// IMPORTANT! By default, socket.io() connects to the host that
// served the page, so we dont have to pass the server url
var socket = io.connect();
socket.on('tmunat-matzav', (tmutza) => {
  console.log('tmunat-matzav from server', tmutza);
});

socket.on('clients-list', clids => {
  document.getElementById('kuzma').innerHTML = `Total: ${clids.length}` + clids.map(clid => `<div>${clid}</div>`).join('');
});
