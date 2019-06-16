const express = require(`express`);
const bodyParser = require(`body-parser`);
const serveStatic = require('serve-static');
const path = require('path');
const mainRouter = require('./api/routers/main.js');
const user = require('./api/routers/user.js');
const {
	dbconnect
} = require('./utils/database.js');

const app = express();

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

if (process.env.NODE_ENV !== 'development') {
	app.use(serveStatic(path.join(__dirname, '../client')));
}

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type, x-access-token');
	next();
});

app.use('/', mainRouter);
app.use('/user', user);

app.use((req, res, next) => {
	const err = new Error(`Not Found`);
	err.status = 404;
	next(err);
});

app.use((error, req, res) => {
	res.status(error.status || 500);
	res.render(`error`, {
		message: error.message,
		error: !config.IS_PRODUCTION ? error : {}
	});
});

const port = process.env.PORT || 5000;

dbconnect(async () => {
	const server = await app.listen(port, () => console.log(`Example app listening on http://localhost:${port}!`));
	const io = require('./socket').init(server);
	io.on('connection', socket => {
		console.log('Client connected');

		function log() {
			const array = [">>> "];
			for (let i = 0; i < arguments.length; i++) {
				array.push(arguments[i]);
			}
			socket.emit('log', array);
		}

		socket.on('message', message => {
			log('Got message: ', message);
			socket.broadcast.emit('message', message); // should be room only
		});

		socket.on('create or join', room => {
			const numClients = io.sockets.clients(room).length;

			log('Room ' + room + ' has ' + numClients + ' client(s)');
			log('Request to create or join room', room);

			if (numClients == 0) {
				socket.join(room);
				socket.emit('created', room);
			} else if (numClients == 1) {
				io.sockets.in(room).emit('join', room);
				socket.join(room);
				socket.emit('joined', room);
			} else { // max two clients
				socket.emit('full', room);
			}

			socket.emit('emit(): client ' + socket.id + ' joined room ' + room);
			socket.broadcast.emit('broadcast(): client ' + socket.id + ' joined room ' + room);
		});
	})
});
