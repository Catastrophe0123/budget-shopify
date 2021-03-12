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
import {
	addItem,
	deleteItem,
	getItem,
	getItems,
	updateItem,
} from './controllers/inventory';
import { isAdmin } from './middlewares/isAdmin';

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

app.post('/register', registerUser); // REGULAR ROUTE
app.post('/login', loginuser); // REGULAR ROUTE

app.get('/user', currentUser, getUser); // USER ROUTE

app.post('/store', [currentUser, isAdmin], createStore); // ADMIN ROUTE
app.put('/store', [currentUser, isAdmin], updateStore); // ADMIN ROUTE

app.get('/:store/items', getItems); // REGULAR ROUTE
app.get('/:store/items/:id', getItem); // REGULAR ROUTE
app.post('/item', [currentUser, isAdmin], addItem); // ADMIN ROUTE
app.put('/item/:id', [currentUser, isAdmin], updateItem); // ADMIN ROUTE
app.delete('/item/:id', [currentUser, isAdmin], deleteItem); // ADMIN ROUTE

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
