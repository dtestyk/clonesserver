var WebSocketServer = new require('ws');

var random_int = function(a){
  return Math.floor(Math.random()*a);
}

var take_random_letter_key = function(alphabet){
  var alphabet_keys = Object.keys(alphabet);
  var i = random_int(alphabet_keys.length);
  return alphabet_keys[i];
}

var take_random_letter = function(alphabet){
  var key = take_random_letter_key(alphabet);
  return alphabet[key];
}

var clients = {};
var webSocketServer = new WebSocketServer.Server({port: 80});

webSocketServer.on('connection', function(ws) {

  var id = Math.random();
  clients[id] = ws;
  //console.log("new connection " + id);

  ws.on('message', function(message) {
    //console.log('receive message ' + message);
    var next_client = take_random_letter(clients);
    next_client.send(message);
  });

  ws.on('close', function() {
    //console.log('connection close ' + id);
    delete clients[id];
  });

});
