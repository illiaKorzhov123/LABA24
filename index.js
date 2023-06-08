// Подключаем модуль express и создаем приложение
var express = require("express"); 
var app = express();

// Создаем HTTP-сервер на основе приложения express
var http = require('http').Server(app);

// Подключаем модуль socket.io и привязываем его к HTTP-серверу
var io = require('socket.io')(http);

// Отдаем статические файлы из папки "public"
app.use(express.static('public'));

// Обрабатываем запрос на главную страницу
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

// Обрабатываем событие подключения нового клиента
io.on('connection', function(socket){

  // Обрабатываем событие отправки сообщения от клиента
  socket.on('send message', function(msg) {

    // Отправляем сообщение всем клиентам, включая отправителя
    io.emit('receive message', msg);
  });
});

// Запускаем сервер на порту 3000
http.listen(3000, function() {
  console.log('listening on *:3000');
});