import express from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';
import cors from 'cors';
import { config } from 'dotenv';
import { loginuser, registerUser } from './controllers/authentication';
import { errorHandler } from './middlewares/error-handler';
import { RequestError } from './utils/errors/request-error';
import cookieSession from 'cookie-session';
import { getUser } from './controllers/user';
import { currentUser } from './middlewares/get-user';
import { createStore, updateStore } from './controllers/store';

config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(
	cookieSession({
		secret: process.env.SESSION_SECRET,
		signed: false,
		// secure: true,
		maxAge: 24 * 60 * 60 * 1000,
	})
);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
	res.send('hello world');
});

app.post('/register', registerUser);
app.post('/login', loginuser);

app.get('/user', currentUser, getUser);

app.post('/store', currentUser, createStore);
app.put('/store', currentUser, updateStore);

app.use(errorHandler);

const main = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI!, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
		console.log('connected to mongodb');
	} catch (err) {
		console.log(err);
		throw new RequestError('could not connect to database', 500);
	}
	app.listen(PORT, () => {
		console.log('listening on port ', PORT);
	});
};

main();
