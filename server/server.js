const http = require('http')
// const https = require('https')
const path = require('path')
const fs = require("fs");
global.appRoot = path.resolve(__dirname)
const app = require('./app');
// const { strict } = require('joi');



// Getting port from config file strat
// const { app: { appPort } } = require(_pathConst.filesPath.configUrl);;
// const port = normalizePort(appPort || 4001);
const port = normalizePort(process.env.APP_PORT || 4001);

const server = http.createServer(app)
// const server = https.createServer(ssl_credentials,app)
/*
* Listen on provided port, on all network interfaces.
*/



// const { Server } =require("socket.io");
// global.io = require('socket.io')(server);
// const { Server } = require("socket.io");

// global.io = new Server(server, { /* options */ });
// require(_pathConst.controllersPath.chatController)(io,app)
// io.on("connection", (socket) => {
//   // ...
//   console.log("hetre")
// });

// const io = new Server(server, { /* options */ });

// io.on('connection', (socket)=>{
//   console.log('New user connected');

//   socket.on('disconnect', async () => {
//     console.log(`Disconnected: ${socket.id}`);
//   })
// });
/**
 * Event listener for HTTP server "error" event.
 */
 server.listen(port)
 server.on('error', onError)
 server.on('listening', onListening)
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }
  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}
/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  var addr = server.address()
  var bind = typeof addr === 'string' ? 'pipe ' + addr : '' + addr.port
  console.info(`Listening on : http://localhost:${bind}/`)
}
function normalizePort(val) {
  var port = parseInt(val, 10)
  if (isNaN(port)) {
    // named pipe
    return val
  }
  if (port >= 0) {
    // port number
    return port
  }
  return false
}