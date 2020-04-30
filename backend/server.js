const Koa = require('koa');
const http = require('http');
const socket = require('socket.io');

const app = new Koa();  
const server = http.createServer(app.callback());
const io = socket(server);


io.on('connection', (socket) => {
    
    console.log(`[IO] Connection => has a new connection, id: ${socket.id}`);
    
    socket.on('sendMessage', (data) =>{ //data é os valores q recebo do frontend
        console.log('[SOCKET] sendMessage =>', data);
        io.emit('sendMessage', data); //para emitir a todos
    });

    socket.on('disconnect', () => {
        console.log('[SOCKET] Disconnect => a user disconnected');
    })
});


server.listen(3333, () => {
    console.log("run..");
});

